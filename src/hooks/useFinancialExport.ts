import { useState } from 'react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import QRCode from 'qrcode';
import type { FinancialStatementType } from '../types/reports';
import { CurrencyCode } from '../config/currency';
import { useCurrency } from './useCurrency';

interface ExportOptions {
  type: FinancialStatementType;
  format: 'pdf' | 'excel';
  data: any;
  title: string;
  organization: any;
  generatedBy: string;
  isAudited: boolean;
  currency: CurrencyCode;
}

export function useFinancialExport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { format: formatCurrencyHook } = useCurrency();

  const handleExport = async (options: ExportOptions) => {
    setLoading(true);
    setError(null);

    try {
      if (!validateData(options.data, options.type)) {
        throw new Error('Les données sont invalides ou incomplètes');
      }

      if (!options.organization?.name || !options.organization?.registrationNumber) {
        throw new Error("Les informations de l'entreprise sont incomplètes");
      }

      const formatAmount = (amount: number | undefined) => {
        if (typeof amount !== 'number') return '-';
        return formatCurrencyHook(amount, options.currency);
      };

      if (options.format === 'pdf') {
        await exportToPDF(options, formatAmount);
      } else {
        await exportToExcel(options);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue lors de l'export";
      setError(message);
      console.error("Export failed:", message, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleExport
  };
}

function validateData(data: any, type: FinancialStatementType): boolean {
  if (!data) return false;
  
  switch (type) {
    case 'balance':
      return !!(data.fixedAssets?.total && data.currentAssets?.total && data.equity?.total && data.grandTotal);
    case 'income':
      return !!(data.operatingIncome?.total && data.operatingExpenses?.total && data.netResult);
    case 'cashflow':
      return !!(data.operatingActivities?.total && data.netCashChange && data.openingCash && data.closingCash);
    default:
      return false;
  }
}

const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = url;
  });
};

async function exportToPDF(
  options: ExportOptions,
  formatAmount: (amount: number | undefined) => string
): Promise<void> {
  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
  doc.setLanguage('fr');

  const styles = {
    fontSize: {
      title: 16,
      subtitle: 11,
      heading: 10,
      normal: 9,
      small: 8,
      tiny: 7,
    },
    colors: {
      primary: '#111827',
      secondary: '#4B5563',
      accent: '#374151',
      tableHeader: '#F3F4F6',
      tableBorder: '#E5E7EB',
      tableRow: '#FFFFFF',
      tableRowAlt: '#F9FAFB',
      highlight: '#374151',
    },
    margins: {
      page: 15,
    },
  };

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = styles.margins.page;
  
  let y = margin;

  // --- HEADER ---
  const maxHeaderHeight = pageHeight / 5;

  // 1. QR Code (right aligned)
  const authString = JSON.stringify({
    org: options.organization.registrationNumber,
    type: options.type,
    date: new Date().toISOString(),
    generator: options.generatedBy,
    hash: Math.random().toString(36).substring(2, 15),
  });
  const encodedAuth = btoa(authString);
  const qrValue = `https://verify.wanzo.cd/auth/${encodedAuth}`;
  
  const qrSize = 22;
  const qrX = pageWidth - margin - qrSize;
  
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(qrValue, {
        errorCorrectionLevel: 'H', type: 'image/png', margin: 1, width: 128
    });
    doc.addImage(qrCodeDataUrl, 'PNG', qrX, y, qrSize, qrSize);
    doc.setFontSize(styles.fontSize.tiny);
    doc.setTextColor(styles.colors.secondary);
    const authText = 'Authentification';
    const authTextWidth = doc.getTextWidth(authText);
    doc.text(authText, qrX + (qrSize - authTextWidth) / 2, y + qrSize + 3);
  } catch (err) {
    console.error("Failed to generate QR code", err);
  }

  // 2. Organization Info & Logo (left aligned)
  let textX = margin;
  let logoHeight = 0;

  if (options.organization.logo) {
    try {
      const logoImg = await loadImage(options.organization.logo);
      const aspectRatio = logoImg.width / logoImg.height;
      logoHeight = 20;
      let logoWidth = logoHeight * aspectRatio;
      if (logoWidth > 40) {
          logoWidth = 40;
          logoHeight = logoWidth / aspectRatio;
      }
      doc.addImage(logoImg, 'PNG', margin, y, logoWidth, logoHeight);
      textX += logoWidth + 5;
    } catch (e) {
      console.error("Could not load organization logo", e);
    }
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(styles.fontSize.heading);
  doc.setTextColor(styles.colors.primary);
  doc.text(options.organization.name.toUpperCase(), textX, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(styles.fontSize.small);
  doc.setTextColor(styles.colors.secondary);

  const ids = [
      options.organization.registrationNumber ? `RCCM: ${options.organization.registrationNumber}` : null,
      options.organization.taxId ? `ID. NAT: ${options.organization.taxId}` : null,
  ].filter(Boolean).join(' | ');
  doc.text(ids, textX, y + 10);

  const address = [
      options.organization.address,
      options.organization.phone ? `Tél: ${options.organization.phone}` : null,
  ].filter(Boolean).join(' | ');
  doc.text(address, textX, y + 15);

  y = Math.max(y + logoHeight, y + qrSize) + 8;

  // --- TITLE ---
  doc.setDrawColor(styles.colors.tableBorder);
  doc.setLineWidth(0.2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 7;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(styles.fontSize.title);
  doc.setTextColor(styles.colors.primary);
  doc.text(options.title, pageWidth / 2, y, { align: 'center' });
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(styles.fontSize.subtitle);
  const exerciceDate = options.data?.exercice || new Date().getFullYear().toString();
  doc.text(`Exercice clos le 31 décembre ${exerciceDate}`, pageWidth / 2, y, { align: 'center' });
  
  const genDate = `Généré le ${new Date().toLocaleDateString('fr-FR')}`;
  doc.setFontSize(styles.fontSize.small);
  doc.text(genDate, pageWidth - margin, y, { align: 'right' });
  y += 10;

  if (y > maxHeaderHeight) {
      console.warn(`Header height (${y}mm) exceeds max height (${maxHeaderHeight}mm).`);
  }

  // --- CONTENT ---
  switch (options.type) {
    case 'balance':
      y = addBalanceSheetContent(doc, options.data, y, styles, formatAmount);
      break;
    case 'income':
      y = addIncomeStatementContent(doc, options.data, y, styles, formatAmount);
      break;
    case 'cashflow':
      y = addCashFlowContent(doc, options.data, y, styles, formatAmount);
      break;
  }

  // --- FOOTER ---
  const footerY = pageHeight - margin + 10;
  doc.setDrawColor(styles.colors.tableBorder);
  doc.setLineWidth(0.2);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  
  doc.setFontSize(styles.fontSize.tiny);
  doc.setTextColor(styles.colors.secondary);
  
  doc.text("Pour vérifier l'authenticité: verify.wanzo.cd", margin, footerY);
  
  const copyright = "© Produit par Wanzo, développé par i-kiotahub";
  const copyrightWidth = doc.getTextWidth(copyright);
  doc.text(copyright, pageWidth - margin - copyrightWidth, footerY);

  doc.save(`${options.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
}

// Fonction utilitaire pour dessiner une table dans le PDF
function drawTable(
  doc: jsPDF,
  headers: string[],
  rows: any[][],
  startY: number,
  styles: any,
  options: {
    headerBackground?: boolean;
    lastRowHighlight?: boolean;
    startX?: number;
    colWidths?: number[];
  } = {}
): number {
  const { 
    headerBackground = true, 
    lastRowHighlight = false,
    startX = styles.margins.page,
    colWidths 
  } = options;
  
  const pageWidth = doc.internal.pageSize.width;
  const tableWidth = pageWidth - 2 * styles.margins.page;
  const cols = headers.length;
  
  // Calculer les largeurs des colonnes si non fournies
  const widths = colWidths || Array(cols).fill(tableWidth / cols);
  
  let y = startY;
  let x = startX;
  
  // Fonction pour dessiner une ligne complète
  const drawRow = (cells: any[], rowIndex: number, isHeader: boolean = false, isHighlight: boolean = false) => {
    const rowHeight = 10;
    
    // Définir les styles de remplissage
    if (isHeader && headerBackground) {
      doc.setFillColor(styles.colors.tableHeader);
    } else if (isHighlight) {
      doc.setFillColor(styles.colors.highlight);
    } else if (rowIndex % 2 === 0) {
      doc.setFillColor(styles.colors.tableRow);
    } else {
      doc.setFillColor(styles.colors.tableRowAlt);
    }
    
    // Dessiner le fond
    if (isHeader || isHighlight || rowIndex % 2 !== 0) {
      doc.rect(startX, y, tableWidth, rowHeight, 'F');
    }
    
    // Dessiner les bordures de cellules
    doc.setDrawColor(styles.colors.tableBorder);
    
    // Style du texte
    if (isHeader) {
      doc.setFont('helvetica', 'bold');
    } else if (isHighlight) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor('#ffffff');
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor('#000000');
    }
    
    doc.setFontSize(styles.fontSize.normal);
    
    // Dessiner les cellules
    let cellX = x;
    for (let i = 0; i < cells.length; i++) {
      const cellWidth = widths[i];
      
      // Dessiner la bordure
      doc.rect(cellX, y, cellWidth, rowHeight, 'S');
      
      // Dessiner le texte
      const cellValue = cells[i]?.toString() || '';
      const textX = i >= 2 ? cellX + cellWidth - 5 : cellX + 2;
      const textAlign = i >= 2 ? 'right' : 'left';
      
      doc.text(cellValue, textX, y + rowHeight / 2 + 2, { align: textAlign as any });
      
      cellX += cellWidth;
    }
    
    return y + rowHeight;
  };
  
  // Dessiner l'en-tête
  y = drawRow(headers, 0, true);
  
  // Dessiner les lignes
  rows.forEach((row, index) => {
    const isLastRow = index === rows.length - 1 && lastRowHighlight;
    
    // Vérifier si on a besoin d'une nouvelle page
    if (y > doc.internal.pageSize.height - 20) {
      doc.addPage();
      y = styles.margins.page;
      
      // Redessiner l'en-tête sur la nouvelle page
      y = drawRow(headers, 0, true);
    }
    
    y = drawRow(row, index + 1, false, isLastRow);
  });
  
  return y;
}

// Fonctions spécifiques pour chaque type d'état financier
function addBalanceSheetContent(
  doc: jsPDF,
  data: any,
  startY: number,
  styles: any,
  formatAmount: (amount: number | undefined) => string
): number {
  let y = startY;
  
  // Ajouter le titre ACTIF
  doc.setFontSize(styles.fontSize.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('ACTIF', styles.margins.page, y);
  y += 8;
  
  // En-têtes du tableau d'actif
  const actifHeaders = ['Code', 'Libellé', 'Brut', 'Amort/Prov', 'Net', 'Net N-1'];
  
  // Données du tableau pour l'actif immobilisé
  const actifRows = [
    ['', 'Actif immobilisé', '', '', '', '']
  ];
  
  // Ajouter les actifs immobilisés
  if (data.fixedAssets && Array.isArray(data.fixedAssets.intangibleAssets)) {
    data.fixedAssets.intangibleAssets.forEach((item: any) => {
      actifRows.push([
        item.code,
        item.label,
        formatAmount(item.brut),
        formatAmount(item.amort),
        formatAmount(item.net),
        formatAmount(item.netN1)
      ]);
    });
  }
  
  if (data.fixedAssets && Array.isArray(data.fixedAssets.tangibleAssets)) {
    data.fixedAssets.tangibleAssets.forEach((item: any) => {
      actifRows.push([
        item.code,
        item.label,
        formatAmount(item.brut),
        formatAmount(item.amort),
        formatAmount(item.net),
        formatAmount(item.netN1)
      ]);
    });
  }
  
  // Ajouter le total de l'actif immobilisé
  if (data.fixedAssets && data.fixedAssets.total) {
    actifRows.push([
      '',
      'Total Actif immobilisé',
      formatAmount(data.fixedAssets.total.brut),
      formatAmount(data.fixedAssets.total.amort),
      formatAmount(data.fixedAssets.total.net),
      formatAmount(data.fixedAssets.total.netN1)
    ]);
  }
  
  // Ajouter l'actif circulant
  actifRows.push(['', 'Actif circulant', '', '', '', '']);
  
  if (data.currentAssets && Array.isArray(data.currentAssets.inventory)) {
    data.currentAssets.inventory.forEach((item: any) => {
      actifRows.push([
        item.code,
        item.label,
        formatAmount(item.brut),
        formatAmount(item.amort),
        formatAmount(item.net),
        formatAmount(item.netN1)
      ]);
    });
  }
  
  // Ajouter le total de l'actif circulant
  if (data.currentAssets && data.currentAssets.total) {
    actifRows.push([
      '',
      'Total Actif circulant',
      formatAmount(data.currentAssets.total.brut),
      formatAmount(data.currentAssets.total.amort),
      formatAmount(data.currentAssets.total.net),
      formatAmount(data.currentAssets.total.netN1)
    ]);
  }
  
  // Ajouter le total général
  if (data.grandTotal) {
    actifRows.push([
      '',
      'TOTAL ACTIF',
      formatAmount(data.grandTotal.brut),
      formatAmount(data.grandTotal.amort),
      formatAmount(data.grandTotal.net),
      formatAmount(data.grandTotal.netN1)
    ]);
  }
  
  // Dessiner le tableau de l'actif
  y = drawTable(doc, actifHeaders, actifRows, y, styles, {
    lastRowHighlight: true,
    colWidths: [20, 80, 25, 25, 25, 25]
  });
  
  y += 15;
  
  // Ajouter le titre PASSIF
  doc.setFontSize(styles.fontSize.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('PASSIF', styles.margins.page, y);
  y += 8;
  
  // En-têtes du tableau de passif
  const passifHeaders = ['Code', 'Libellé', 'Net', 'Net N-1'];
  
  // Données du tableau pour le passif
  const passifRows = [
    ['', 'Capitaux propres', '', '']
  ];
  
  // Ajouter les capitaux propres
  if (data.equity && Array.isArray(data.equity.capital)) {
    data.equity.capital.forEach((item: any) => {
      passifRows.push([
        item.code,
        item.label,
        formatAmount(item.net),
        formatAmount(item.netN1)
      ]);
    });
  }
  
  // Ajouter le total des capitaux propres
  if (data.equity && data.equity.total) {
    passifRows.push([
      '',
      'Total Capitaux propres',
      formatAmount(data.equity.total.net),
      formatAmount(data.equity.total.netN1)
    ]);
  }
  
  // Ajouter le total général
  if (data.grandTotal) {
    passifRows.push([
      '',
      'TOTAL PASSIF',
      formatAmount(data.grandTotal.net),
      formatAmount(data.grandTotal.netN1)
    ]);
  }
  
  // Dessiner le tableau du passif
  y = drawTable(doc, passifHeaders, passifRows, y, styles, {
    lastRowHighlight: true,
    colWidths: [30, 100, 25, 25]
  });
  
  return y;
}

function addIncomeStatementContent(
  doc: jsPDF,
  data: any,
  startY: number,
  styles: any,
  formatAmount: (amount: number | undefined) => string
): number {
  let y = startY;
  
  // En-têtes du tableau
  const headers = ['Code', 'Libellé', 'N', 'N-1', 'Variation'];
  
  // Données du tableau
  const rows = [
    ['', "Produits d'exploitation", '', '', '']
  ];
  
  // Ajouter les produits d'exploitation
  if (data.operatingIncome && Array.isArray(data.operatingIncome.sales)) {
    data.operatingIncome.sales.forEach((item: any) => {
      rows.push([
        item.code,
        item.label,
        formatAmount(item.current),
        formatAmount(item.previous),
        `${item.variation}%`
      ]);
    });
  }
  
  // Ajouter le total des produits d'exploitation
  if (data.operatingIncome && data.operatingIncome.total) {
    rows.push([
      '',
      "Total Produits d'exploitation",
      formatAmount(data.operatingIncome.total.current),
      formatAmount(data.operatingIncome.total.previous),
      `${data.operatingIncome.total.variation}%`
    ]);
  }
  
  // Ajouter les charges d'exploitation
  rows.push(['', "Charges d'exploitation", '', '', '']);
  
  if (data.operatingExpenses && Array.isArray(data.operatingExpenses.purchases)) {
    data.operatingExpenses.purchases.forEach((item: any) => {
      rows.push([
        item.code,
        item.label,
        formatAmount(item.current),
        formatAmount(item.previous),
        `${item.variation}%`
      ]);
    });
  }
  
  // Ajouter le total des charges d'exploitation
  if (data.operatingExpenses && data.operatingExpenses.total) {
    rows.push([
      '',
      "Total Charges d'exploitation",
      formatAmount(data.operatingExpenses.total.current),
      formatAmount(data.operatingExpenses.total.previous),
      `${data.operatingExpenses.total.variation}%`
    ]);
  }
  
  // Ajouter le résultat net
  if (data.netResult) {
    rows.push([
      '',
      'RÉSULTAT NET',
      formatAmount(data.netResult.current),
      formatAmount(data.netResult.previous),
      `${data.netResult.variation}%`
    ]);
  }
  
  // Dessiner le tableau
  y = drawTable(doc, headers, rows, y, styles, {
    lastRowHighlight: true,
    colWidths: [30, 80, 25, 25, 20]
  });
  
  return y;
}

function addCashFlowContent(
  doc: jsPDF,
  data: any,
  startY: number,
  styles: any,
  formatAmount: (amount: number | undefined) => string
): number {
  let y = startY;
  
  // En-têtes du tableau
  const headers = ['Code', 'Libellé', 'N', 'N-1'];
  
  // Données du tableau
  const rows = [
    ['', "Flux de trésorerie liés à l'exploitation", '', '']
  ];
  
  // Ajouter les flux d'exploitation
  if (data.operatingActivities && data.operatingActivities.netResult) {
    rows.push([
      data.operatingActivities.netResult.code,
      data.operatingActivities.netResult.label,
      formatAmount(data.operatingActivities.netResult.current),
      formatAmount(data.operatingActivities.netResult.previous)
    ]);
  }
  
  // Ajouter la variation de trésorerie
  if (data.netCashChange) {
    rows.push([
      '',
      'VARIATION DE TRÉSORERIE',
      formatAmount(data.netCashChange.current),
      formatAmount(data.netCashChange.previous)
    ]);
  }
  
  // Dessiner le tableau
  y = drawTable(doc, headers, rows, y, styles, {
    lastRowHighlight: true,
    colWidths: [30, 100, 25, 25]
  });
  
  return y;
}

async function exportToExcel(options: ExportOptions): Promise<void> {
  const { data, type, title, organization, currency } = options;

  const wb = XLSX.utils.book_new();
  
  const formattedData = formatDataForExcel(data, type, currency, title, organization);

  const ws = XLSX.utils.aoa_to_sheet(formattedData);

  // Set column widths
  if (formattedData.length > 0) {
    const colWidths = formattedData[0].map((_, i) => ({ wch: i === 1 ? 50 : 18 }));
    ws['!cols'] = colWidths;
  }

  XLSX.utils.book_append_sheet(wb, ws, 'Rapport');

  // Add metadata
  wb.Props = {
    Title: title,
    Subject: `Rapport Financier - ${type}`,
    Author: organization.name,
    CreatedDate: new Date()
  };

  XLSX.writeFile(wb, `${title.toLowerCase().replace(/\s+/g, '-')}.xlsx`);
}

// Helper for balance sheet
function getBalanceSheetData(data: any, formatValue: (v: any) => any): any[][] {
    if (!data) return [];
    return [
        ['ACTIF'],
        ['Code', 'Libellé', 'Brut', 'Amort/Prov', 'Net', 'Net N-1'],
        ['', 'Actif immobilisé'],
        ...(data.fixedAssets?.intangibleAssets?.map((item:any) => [item.code, item.label, formatValue(item.brut), formatValue(item.amort), formatValue(item.net), formatValue(item.netN1)]) || []),
        ...(data.fixedAssets?.tangibleAssets?.map((item:any) => [item.code, item.label, formatValue(item.brut), formatValue(item.amort), formatValue(item.net), formatValue(item.netN1)]) || []),
        ['', 'Total Actif immobilisé', formatValue(data.fixedAssets?.total?.brut), formatValue(data.fixedAssets?.total?.amort), formatValue(data.fixedAssets?.total?.net), formatValue(data.fixedAssets?.total?.netN1)],
        ['', 'Actif circulant'],
        ...(data.currentAssets?.inventory?.map((item:any) => [item.code, item.label, formatValue(item.brut), formatValue(item.amort), formatValue(item.net), formatValue(item.netN1)]) || []),
        ['', 'Total Actif circulant', formatValue(data.currentAssets?.total?.brut), formatValue(data.currentAssets?.total?.amort), formatValue(data.currentAssets?.total?.net), formatValue(data.currentAssets?.total?.netN1)],
        ['', 'TOTAL ACTIF', formatValue(data.grandTotal?.brut), formatValue(data.grandTotal?.amort), formatValue(data.grandTotal?.net), formatValue(data.grandTotal?.netN1)],
        [],
        ['PASSIF'],
        ['Code', 'Libellé', 'Net', 'Net N-1'],
        ['', 'Capitaux propres'],
        ...(data.equity?.capital?.map((item:any) => [item.code, item.label, formatValue(item.net), formatValue(item.netN1)]) || []),
        ['', 'Total Capitaux propres', formatValue(data.equity?.total?.net), formatValue(data.equity?.total?.netN1)],
        ['', 'Passif circulant'],
        ...(data.liabilities?.debts?.map((item:any) => [item.code, item.label, formatValue(item.net), formatValue(item.netN1)]) || []),
        ['', 'Total Passif circulant', formatValue(data.liabilities?.total?.net), formatValue(data.liabilities?.total?.netN1)],
        ['', 'TOTAL PASSIF', formatValue(data.grandTotalPassif?.net), formatValue(data.grandTotalPassif?.netN1)],
    ];
}

// Helper for income statement
function getIncomeStatementData(data: any, formatValue: (v: any) => any): any[][] {
    if (!data) return [];
    return [
        ['Code', 'Libellé', 'Montant', 'Montant N-1'],
        ['', "Produits d'exploitation"],
        ...(data.operatingIncome?.items?.map((item:any) => [item.code, item.label, formatValue(item.amount), formatValue(item.amountN1)]) || []),
        ['', "Total Produits d'exploitation", formatValue(data.operatingIncome?.total), formatValue(data.operatingIncome?.totalN1)],
        ['', "Charges d'exploitation"],
        ...(data.operatingExpenses?.items?.map((item:any) => [item.code, item.label, formatValue(item.amount), formatValue(item.amountN1)]) || []),
        ['', "Total Charges d'exploitation", formatValue(data.operatingExpenses?.total), formatValue(data.operatingExpenses?.totalN1)],
        ['', "Résultat d'exploitation", formatValue(data.operatingResult), formatValue(data.operatingResultN1)],
        ['', 'Résultat Net', formatValue(data.netResult), formatValue(data.netResultN1)],
    ];
}

// Helper for cash flow statement
function getCashFlowStatementData(data: any, formatValue: (v: any) => any): any[][] {
    if (!data) return [];
    return [
        ['Libellé', 'Montant'],
        ["Flux de trésorerie liés à l'exploitation"],
        ...(data.operatingActivities?.items?.map((item:any) => [item.label, formatValue(item.amount)]) || []),
        ["Total des flux de trésorerie liés à l'exploitation", formatValue(data.operatingActivities?.total)],
        ["Flux de trésorerie liés aux investissements"],
        ...(data.investingActivities?.items?.map((item:any) => [item.label, formatValue(item.amount)]) || []),
        ["Total des flux de trésorerie liés aux investissements", formatValue(data.investingActivities?.total)],
        ["Flux de trésorerie liés au financement"],
        ...(data.financingActivities?.items?.map((item:any) => [item.label, formatValue(item.amount)]) || []),
        ["Total des flux de trésorerie liés au financement", formatValue(data.financingActivities?.total)],
        [],
        ['Variation nette de trésorerie', formatValue(data.netCashChange)],
        ["Trésorerie à l'ouverture", formatValue(data.openingCash)],
        ["Trésorerie à la clôture", formatValue(data.closingCash)],
    ];
}

function formatDataForExcel(
    data: any, 
    type: FinancialStatementType, 
    currency: CurrencyCode,
    title: string,
    organization: any
): any[][] {
    const header = [
        [organization.name],
        [`RCCM: ${organization.registrationNumber || 'N/A'} | ID. NAT: ${organization.taxId || 'N/A'}`],
        [title],
        [`Exercice clos le 31 décembre ${data?.exercice || new Date().getFullYear()}`],
        [`Devise: ${currency}`],
        [] // Empty row for spacing
    ];

    const footer = [
        [], // Empty row
        ["© Produit par Wanzo, développé par i-kiotahub"]
    ];
    
    const formatValue = (value: any) => {
        if (typeof value === 'number') {
            return value;
        }
        if (value === undefined || value === null) {
            return ''; // Return empty string for undefined/null values
        }
        return value;
    };

    let tableData: any[][] = [];

    switch (type) {
        case 'balance':
            tableData = getBalanceSheetData(data, formatValue);
            break;
        case 'income':
            tableData = getIncomeStatementData(data, formatValue);
            break;
        case 'cashflow':
            tableData = getCashFlowStatementData(data, formatValue);
            break;
    }

    return [...header, ...tableData, ...footer];
}