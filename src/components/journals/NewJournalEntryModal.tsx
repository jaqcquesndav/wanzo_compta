import { Modal } from '../ui/Modal';
import { NewJournalEntryForm } from './NewJournalEntryForm';
import type { JournalEntry } from '../../types/accounting';

interface NewJournalEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (entry: Partial<JournalEntry>) => Promise<void>;
  initialEntry?: Partial<JournalEntry>;
}

export function NewJournalEntryModal({
  isOpen,
  onClose,
  onSubmit,
  initialEntry
}: NewJournalEntryModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nouvelle Écriture Comptable"
      size="xl"
      containerClassName="max-h-[90vh] flex flex-col"
      noPadding
    >
      <div className="p-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <NewJournalEntryForm
          onClose={onClose}
          onSubmit={onSubmit}
          initialEntry={initialEntry}
        />
      </div>
    </Modal>
  );
}