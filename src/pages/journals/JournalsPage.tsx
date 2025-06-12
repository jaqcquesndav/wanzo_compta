import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { JournalFilters } from '../../components/journals/JournalFilters';
import { JournalEntryView } from '../../components/journals/JournalEntryView';
import { NewJournalEntryModal } from '../../components/journals/NewJournalEntryModal';
import { JournalEntryEditModal } from '../../components/journals/JournalEntryEditModal';
import { AgentEntryEditModal } from '../../components/journals/AgentEntryEditModal';
import { UnifiedJournalList } from '../../components/journals/UnifiedJournalList';
import { Modal } from '../../components/ui/Modal';
import { useJournalEntries } from '../../hooks/useJournalEntries';
import { useAgentEntries } from '../../hooks/useAgentEntries';
import { useJournalFilters } from '../../hooks/useJournalFilters';
import { exportToCSV, exportToExcel, exportToPDF } from '../../utils/export/exportUtils';
import type { JournalEntry } from '../../types/accounting';

export function JournalsPage() {
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAgentEditModal, setShowAgentEditModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [agentCurrentPage, setAgentCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const { entries, loading, addEntry, updateEntry, deleteEntry } = useJournalEntries();
  const { 
    entries: agentEntries, 
    loading: agentLoading, 
    validateEntry, 
    validateBatchEntries, 
    updateEntry: updateAgentEntry, 
    deleteEntry: deleteAgentEntry 
  } = useAgentEntries();
  const { setFilters, applyFilters } = useJournalFilters();

  const handleNewEntry = async (data: Partial<JournalEntry>) => {
    try {
      await addEntry(data);
      setShowNewEntryModal(false);
    } catch (error) {
      console.error('Failed to add journal entry:', error);
    }
  };

  const handleView = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setShowViewModal(true);
  };

  const handleEdit = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setShowEditModal(true);
  };

  const handleDelete = async (entry: JournalEntry) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette écriture ?')) {
      try {
        await deleteEntry(entry.id);
      } catch (error) {
        console.error('Failed to delete journal entry:', error);
      }
    }
  };

  const handleUpdate = async (updatedEntry: JournalEntry) => {
    try {
      await updateEntry(updatedEntry.id, updatedEntry);
      setShowEditModal(false);
      setSelectedEntry(null);
    } catch (error) {
      console.error('Failed to update journal entry:', error);
    }
  };

  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    try {
      const filteredData = applyFilters(entries);
      const headers = ['Date', 'N° Pièce', 'Journal', 'Libellé', 'Débit', 'Crédit', 'TVA'];
      const formattedContent = filteredData.map(entry => 
        `${new Date(entry.date).toLocaleDateString('fr-FR')},${entry.reference},${entry.journalType},${entry.description},${entry.totalDebit},${entry.totalCredit},${entry.totalVat || 0}`
      ).join('\n');

      switch (format) {
        case 'csv':
          exportToCSV(filteredData, headers, 'journal_comptable');
          break;
        case 'excel':
          exportToExcel(filteredData, headers, 'journal_comptable');
          break;
        case 'pdf':
          exportToPDF(formattedContent, 'journal_comptable');
          break;
      }
    } catch (error) {
      console.error(`Failed to export as ${format}:`, error);
    }
  };

  const handleAgentEntryEdit = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setShowAgentEditModal(true);
  };

  const handleAgentEntryUpdate = async (updatedEntry: JournalEntry) => {
    try {
      await updateAgentEntry(updatedEntry.id, updatedEntry);
      setShowAgentEditModal(false);
      setSelectedEntry(null);
    } catch (error) {
      console.error('Failed to update agent entry:', error);
    }
  };

  const handleAgentEntryValidate = async (entry: JournalEntry) => {
    if (window.confirm('Êtes-vous sûr de vouloir valider cette écriture ?')) {
      try {
        await validateEntry(entry.id);
      } catch (error) {
        console.error('Failed to validate agent entry:', error);
      }
    }
  };

  const handleAgentEntryDelete = async (entry: JournalEntry) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette écriture ?')) {
      try {
        await deleteAgentEntry(entry.id);
      } catch (error) {
        console.error('Failed to delete agent entry:', error);
      }
    }
  };

  const handleAgentBatchValidate = async (entries: JournalEntry[]) => {
    if (window.confirm(`Êtes-vous sûr de vouloir valider les ${entries.length} écritures sélectionnées ?`)) {
      try {
        const ids = entries.map(entry => entry.id);
        await validateBatchEntries(ids);
      } catch (error) {
        console.error('Failed to validate batch entries:', error);
      }
    }
  };

  const filteredEntries = applyFilters(entries);
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEntries = filteredEntries.slice(startIndex, startIndex + itemsPerPage);

  const agentTotalPages = Math.ceil(agentEntries.length / itemsPerPage);
  const agentStartIndex = (agentCurrentPage - 1) * itemsPerPage;
  const paginatedAgentEntries = agentEntries.slice(agentStartIndex, agentStartIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">Journaux Comptables</h1>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setShowNewEntryModal(true)}
        >
          Nouvelle Écriture
        </Button>
      </div>

      <div className="card p-6">
        <JournalFilters onFilterChange={(filterUpdates) => {
          setFilters(prev => ({ ...prev, ...filterUpdates }));
        }} />
        
        <UnifiedJournalList
          entries={paginatedEntries}
          agentEntries={paginatedAgentEntries}
          onView={handleView}
          onEdit={(entry) => entry.source === 'agent' ? handleAgentEntryEdit(entry) : handleEdit(entry)}
          onDelete={(entry) => entry.source === 'agent' ? handleAgentEntryDelete(entry) : handleDelete(entry)}
          onValidate={handleAgentEntryValidate}
          onValidateAll={handleAgentBatchValidate}
          onExport={handleExport}
          loading={loading || agentLoading}
          page={currentPage}
          totalPages={Math.max(totalPages, agentTotalPages)}
          onPageChange={(page) => {
            setCurrentPage(page);
            setAgentCurrentPage(page); // Synchroniser les deux pages
          }}
        />
      </div>

      <NewJournalEntryModal
        isOpen={showNewEntryModal}
        onClose={() => setShowNewEntryModal(false)}
        onSubmit={handleNewEntry}
      />

      {selectedEntry && (
        <>
          <Modal
            isOpen={showViewModal}
            onClose={() => {
              setShowViewModal(false);
              setSelectedEntry(null);
            }}
            title={`Écriture ${selectedEntry.reference}`}
            size="xl"
          >
            <JournalEntryView 
              entry={selectedEntry}
              onDownloadAttachment={(url) => window.open(url, '_blank')}
              onViewAttachment={(url) => window.open(url, '_blank')}
            />
          </Modal>

          <JournalEntryEditModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedEntry(null);
            }}
            entry={selectedEntry}
            onSave={handleUpdate}
          />

          <AgentEntryEditModal
            isOpen={showAgentEditModal}
            onClose={() => {
              setShowAgentEditModal(false);
              setSelectedEntry(null);
            }}
            entry={selectedEntry}
            onSave={handleAgentEntryUpdate}
            onValidate={handleAgentEntryValidate}
          />
        </>
      )}
    </div>
  );
}