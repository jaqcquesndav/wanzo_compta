import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import type { JournalEntry } from '../../types/accounting';

// Fonction utilitaire pour l'en-tête
export function generateHeader(title: string, organization: any, user: any) {
  return `
WANZO COMPTABILITÉ - i-kiotahub
${organization?.name || ''}
${organization?.address || ''}, ${organization?.city || ''}, ${organization?.country || ''}
RCCM: ${organization?.registrationNumber || ''} - NINEA: ${organization?.taxId || ''}

${title}
Exporté par: ${user?.name || ''} le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
Période: ${new Date().getFullYear()}
  `.trim();
}

// Export CSV
export function exportToCSV(data: any[], headers: string[], filename: string) {
  try {
    const csv = Papa.unparse({
      fields: headers,
      data: data
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export as CSV:', error);
    throw new Error('Failed to export as CSV');
  }
}

// Export Excel
export function exportToExcel(data: any[], headers: string[], filename: string) {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  } catch (error) {
    console.error('Failed to export as Excel:', error);
    throw new Error('Failed to export as Excel');
  }
}

// Export PDF
export function exportToPDF(content: string, filename: string) {
  try {
    const doc = new jsPDF();
    
    // Configuration française
    doc.setLanguage('fr');
    
    // Police et taille
    doc.setFont('helvetica');
    doc.setFontSize(10);
    
    // Ajouter le contenu avec retour à la ligne automatique
    const splitText = doc.splitTextToSize(content, 180);
    doc.text(splitText, 15, 15);
    
    // Sauvegarder le PDF
    doc.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Failed to export as PDF:', error);
    throw new Error('Failed to export as PDF');
  }
}

// Fonction spécifique pour les écritures comptables
export function formatJournalEntries(entries: JournalEntry[]) {
  return entries.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('fr-FR'),
    reference: entry.reference,
    journal: entry.journalType,
    description: entry.description,
    debit: entry.totalDebit.toLocaleString('fr-FR', { minimumFractionDigits: 2 }),
    credit: entry.totalCredit.toLocaleString('fr-FR', { minimumFractionDigits: 2 }),
    tva: entry.totalVat ? entry.totalVat.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) : '-'
  }));
}