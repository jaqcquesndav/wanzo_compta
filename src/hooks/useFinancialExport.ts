import { useState } from 'react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import type { FinancialStatementType } from '../types/reports';

interface ExportOptions {
  type: FinancialStatementType;
  format: 'pdf' | 'excel';
  data: any;
  title: string;
  organization: any;
  generatedBy: string;
  isAudited: boolean;
  currency: 'USD' | 'CDF';
}

export function useFinancialExport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async (options: ExportOptions) => {
    setLoading(true);
    setError(null);

    try {
      if (!validateData(options.data, options.type)) {
        throw new Error('Les données sont invalides ou incomplètes');
      }

      if (!options.organization?.name || !options.organization?.registrationNumber) {
        throw new Error('Les informations de l\'organisation sont incomplètes');
      }

      if (options.format === 'pdf') {
        await exportToPDF(options);
      } else {
        await exportToExcel(options);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'export');
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
      return !!(
        data.fixedAssets?.total &&
        data.currentAssets?.total &&
        data.equity?.total &&
        data.grandTotal
      );
    case 'income':
      return !!(
        data.operatingIncome?.total &&
        data.operatingExpenses?.total &&
        data.netResult
      );
    case 'cashflow':
      return !!(
        data.operatingActivities?.total &&
        data.netCashChange &&
        data.openingCash &&
        data.closingCash
      );
    default:
      return false;
  }
}

async function exportToPDF(options: ExportOptions): Promise<void> {
  const doc = new jsPDF();
  doc.setLanguage('fr');

  // Configuration des styles
  const styles = {
    header: { fontSize: 14, fontStyle: 'bold' },
    subheader: { fontSize: 12 },
    normal: { fontSize: 10 },
    small: { fontSize: 8 },
    table: {
      headerFill: '#f3f4f6',
      headerTextColor: '#374151',
      borderColor: '#e5e7eb',
      cellPadding: 5
    }
  };

  // En-tête
  doc.setFontSize(styles.header.fontSize);
  doc.text(options.organization.name, 15, 20);
  
  doc.setFontSize(styles.normal.fontSize);
  doc.text(options.organization.address, 15, 30);
  doc.text(`RCCM: ${options.organization.registrationNumber}`, 15, 35);
  doc.text(`NINEA: ${options.organization.taxId}`, 15, 40);

  doc.setFontSize(styles.subheader.fontSize);
  doc.text(options.title, 15, 50);
  doc.text(`Exercice ${new Date().getFullYear()}`, 15, 55);

  // Tracer les lignes du tableau
  let y = 70;
  const margin = 15;
  const pageWidth = doc.internal.pageSize.width;
  const colWidth = (pageWidth - 2 * margin) / 6; // 6 colonnes pour le bilan

  // Fonction pour dessiner une ligne de tableau
  const drawTableLine = (y: number) => {
    doc.setDrawColor(styles.table.borderColor);
    doc.line(margin, y, pageWidth - margin, y);
  };

  // Fonction pour dessiner une cellule
  const drawCell = (text: string, x: number, y: number, width: number, align: 'left' | 'right' = 'left') => {
    const xPos = align === 'right' ? x + width - 2 : x + 2;
    doc.text(text, xPos, y + 5, { align });
  };

  // En-tête du tableau
  doc.setFillColor(styles.table.headerFill);
  doc.rect(margin, y, pageWidth - 2 * margin, 10, 'F');
  doc.setTextColor(styles.table.headerTextColor);

  // Contenu selon le type d'état
  switch (options.type) {
    case 'balance':
      addBalanceSheetContent(doc, options.data, y, margin, colWidth, options.currency);
      break;
    case 'income':
      addIncomeStatementContent(doc, options.data, y, margin, colWidth, options.currency);
      break;
    case 'cashflow':
      addCashFlowContent(doc, options.data, y, margin, colWidth, options.currency);
      break;
  }

  // Pied de page
  doc.setFontSize(styles.small.fontSize);
  doc.text([
    `Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`,
    `par ${options.generatedBy}`
  ], margin, 280);

  // Sauvegarder le PDF
  doc.save(`${options.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
}

function addBalanceSheetContent(
  doc: jsPDF,
  data: any,
  startY: number,
  margin: number,
  colWidth: number,
  currency: string
): void {
  const headers = ['Code', 'Libellé', 'Brut', 'Amort.', 'Net', 'N-1'];
  let y = startY;

  // En-tête du tableau
  headers.forEach((header, i) => {
    doc.text(header, margin + (i * colWidth), y, { align: i > 1 ? 'right' : 'left' });
  });

  y += 10;
  doc.line(margin, y, doc.internal.pageSize.width - margin, y);

  // Fonction pour formater les montants
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-CD', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Actif
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('ACTIF', margin, y);
  doc.setFont('helvetica', 'normal');

  // Actif immobilisé
  y += 10;
  data.fixedAssets.intangibleAssets.forEach((item: any) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.text(item.code, margin, y);
    doc.text(item.label, margin + colWidth, y);
    doc.text(formatAmount(item.brut), margin + (colWidth * 2), y, { align: 'right' });
    doc.text(formatAmount(item.amort), margin + (colWidth * 3), y, { align: 'right' });
    doc.text(formatAmount(item.net), margin + (colWidth * 4), y, { align: 'right' });
    doc.text(formatAmount(item.netN1), margin + (colWidth * 5), y, { align: 'right' });

    y += 7;
  });

  // Continuer avec les autres sections...
}

function addIncomeStatementContent(
  doc: jsPDF,
  data: any,
  startY: number,
  margin: number,
  colWidth: number,
  currency: string
): void {
  // Implémentation similaire pour le compte de résultat
}

function addCashFlowContent(
  doc: jsPDF,
  data: any,
  startY: number,
  margin: number,
  colWidth: number,
  currency: string
): void {
  // Implémentation similaire pour le tableau des flux
}

async function exportToExcel(options: ExportOptions): Promise<void> {
  const wb = XLSX.utils.book_new();
  const data = formatDataForExcel(options.data, options.type, options.currency);
  const ws = XLSX.utils.aoa_to_sheet(data);

  XLSX.utils.book_append_sheet(wb, ws, options.title);
  XLSX.writeFile(wb, `${options.title.toLowerCase().replace(/\s+/g, '-')}.xlsx`);
}

function formatDataForExcel(data: any, type: FinancialStatementType, currency: string): any[][] {
  const rows: any[][] = [];
  const formatter = new Intl.NumberFormat('fr-CD', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  });

  switch (type) {
    case 'balance':
      rows.push(['ACTIF']);
      // Ajouter les lignes du bilan...
      break;
    case 'income':
      rows.push(['COMPTE DE RÉSULTAT']);
      // Ajouter les lignes du compte de résultat...
      break;
    case 'cashflow':
      rows.push(['TABLEAU DES FLUX DE TRÉSORERIE']);
      // Ajouter les lignes du tableau des flux...
      break;
  }

  return rows;
}