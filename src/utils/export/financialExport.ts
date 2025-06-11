// Constantes pour la configuration
const PDF_CONFIG = {
  FONT: 'helvetica',
  SIZES: {
    TITLE: 14,
    SUBTITLE: 12,
    BODY: 10,
    SMALL: 8
  },
  MARGINS: {
    LEFT: 15,
    TOP: 15
  },
  PAGE_HEIGHT: 280
} as const;

import { jsPDF } from 'jspdf';
import { CurrencyCode } from '../../config/currency';

// Memoization des formats monétaires
const currencyFormatters = new Map<CurrencyCode, Intl.NumberFormat>();

function getCurrencyFormatter(currency: CurrencyCode): Intl.NumberFormat {
  if (!currencyFormatters.has(currency)) {
    currencyFormatters.set(currency, new Intl.NumberFormat('fr-CD', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0
    }));
  }
  return currencyFormatters.get(currency)!;
}

// Fonction optimisée pour le formatage des montants
function formatAmount(amount: number | undefined, currency: CurrencyCode = 'CDF'): string {
  if (amount === undefined) return '-';
  return getCurrencyFormatter(currency).format(amount);
}

// Classe utilitaire pour la gestion des positions dans le PDF
class PDFPosition {
  private currentY: number;

  constructor(startY: number = PDF_CONFIG.MARGINS.TOP) {
    this.currentY = startY;
  }

  get y(): number {
    return this.currentY;
  }

  advance(amount: number): void {
    this.currentY += amount;
  }

  reset(y: number = PDF_CONFIG.MARGINS.TOP): void {
    this.currentY = y;
  }

  needsNewPage(): boolean {
    return this.currentY > PDF_CONFIG.PAGE_HEIGHT - 20;
  }
}

// Classe pour la gestion des exports
export class FinancialExporter {
  private doc: jsPDF;
  private position: PDFPosition;
  private currency: CurrencyCode;

  constructor(currency: CurrencyCode = 'CDF') {
    this.doc = new jsPDF();
    this.position = new PDFPosition();
    this.currency = currency;
    this.initializeDocument();
  }

  private initializeDocument(): void {
    this.doc.setLanguage('fr');
    this.doc.setFont(PDF_CONFIG.FONT);
  }

  addHeader(organization: any, title: string): void {
    this.doc.setFontSize(PDF_CONFIG.SIZES.TITLE);
    this.doc.text(organization.name, PDF_CONFIG.MARGINS.LEFT, this.position.y);
    this.position.advance(10);

    this.doc.setFontSize(PDF_CONFIG.SIZES.BODY);
    const headerInfo = [
      organization.address,
      `RCCM: ${organization.registrationNumber}`,
      `NINEA: ${organization.taxId}`,
      '',
      title,
      `Exercice ${new Date().getFullYear()}`
    ];

    headerInfo.forEach(line => {
      this.doc.text(line, PDF_CONFIG.MARGINS.LEFT, this.position.y);
      this.position.advance(6);
    });
  }

  addTable(headers: string[], rows: any[][], colWidths: number[]): void {
    if (this.position.needsNewPage()) {
      this.doc.addPage();
      this.position.reset();
    }

    // En-tête du tableau
    this.doc.setFontSize(PDF_CONFIG.SIZES.SMALL);
    this.doc.setFont(PDF_CONFIG.FONT, 'bold');
    
    let xPos = PDF_CONFIG.MARGINS.LEFT;
    headers.forEach((header, i) => {
      this.doc.text(header, xPos, this.position.y);
      xPos += colWidths[i];
    });

    this.position.advance(8);
    this.doc.setFont(PDF_CONFIG.FONT, 'normal');

    // Contenu du tableau
    rows.forEach(row => {
      if (this.position.needsNewPage()) {
        this.doc.addPage();
        this.position.reset();
      }

      xPos = PDF_CONFIG.MARGINS.LEFT;
      row.forEach((cell, i) => {
        const formattedCell = typeof cell === 'number' 
          ? formatAmount(cell, this.currency as CurrencyCode)
          : cell.toString();
        this.doc.text(formattedCell, xPos, this.position.y);
        xPos += colWidths[i];
      });
      this.position.advance(6);
    });
  }

  addFooter(): void {
    this.doc.setFontSize(PDF_CONFIG.SIZES.SMALL);
    this.doc.text(
      `Document généré le ${new Date().toLocaleDateString('fr-FR')}`,
      PDF_CONFIG.MARGINS.LEFT,
      PDF_CONFIG.PAGE_HEIGHT
    );
  }

  save(filename: string): void {
    this.addFooter();
    this.doc.save(filename);
  }
}

// Fonction principale d'export optimisée
export async function exportFinancialStatement(
  type: string,
  data: any,
  options: {
    format: 'pdf' | 'excel';
    title: string;
    organization: any;
    currency: CurrencyCode;
  }
): Promise<void> {
  if (options.format === 'pdf') {
    const exporter = new FinancialExporter(options.currency);
    exporter.addHeader(options.organization, options.title);
    
    // Ajouter le contenu selon le type
    switch (type) {
      case 'balance':
        addBalanceSheetContent(exporter, data);
        break;
      case 'income':
        addIncomeStatementContent(exporter, data);
        break;
      case 'cashflow':
        addCashFlowContent(exporter, data);
        break;
    }

    exporter.save(`${options.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  } else {
    await exportToExcel(type, data, options);
  }
}

// Fonctions d'aide pour chaque type d'état (implémentation similaire)
function addBalanceSheetContent(exporter: FinancialExporter, data: any): void {
  // Implémentation spécifique pour le bilan
  const headers = ['Compte', 'Libellé', 'Montant'];
  const colWidths = [40, 100, 40];
  
  // Exemple d'implémentation - à personnaliser selon la structure réelle des données
  if (data.assets && Array.isArray(data.assets)) {
    exporter.addTable(
      headers,
      data.assets.map((item: any) => [item.code || '', item.name || '', item.amount || 0]),
      colWidths
    );
  }
}

function addIncomeStatementContent(exporter: FinancialExporter, data: any): void {
  // Implémentation spécifique pour le compte de résultat
  const headers = ['Poste', 'Description', 'Montant'];
  const colWidths = [40, 100, 40];
  
  // Exemple d'implémentation - à personnaliser selon la structure réelle des données
  if (data.revenues && Array.isArray(data.revenues)) {
    exporter.addTable(
      headers,
      data.revenues.map((item: any) => [item.code || '', item.name || '', item.amount || 0]),
      colWidths
    );
  }
}

function addCashFlowContent(exporter: FinancialExporter, data: any): void {
  // Implémentation spécifique pour le tableau de flux
  const headers = ['Activité', 'Description', 'Montant'];
  const colWidths = [40, 100, 40];
  
  // Exemple d'implémentation - à personnaliser selon la structure réelle des données
  if (data.operations && Array.isArray(data.operations)) {
    exporter.addTable(
      headers,
      data.operations.map((item: any) => [item.category || '', item.description || '', item.amount || 0]),
      colWidths
    );
  }
}

async function exportToExcel(type: string, data: any, options: any): Promise<void> {
  // Implémentation optimisée pour Excel
  console.log(`Exporting ${type} to Excel with title: ${options.title}`);
  
  // Cette fonction nécessiterait l'utilisation d'une bibliothèque comme xlsx
  // Ici, nous avons juste un exemple minimal pour éviter les avertissements de TypeScript
  if (data && type && options) {
    // Logique d'export Excel à implémenter
    return Promise.resolve();
  }
}