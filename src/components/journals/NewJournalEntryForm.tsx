import React, { useState, useRef } from 'react';
import { FormField, Input, Select } from '../ui/Form';
import { Button } from '../ui/Button';
import { JournalEntryLines } from './JournalEntryLines';
import { useJournalEntry } from '../../hooks/useJournalEntry';
import { JOURNAL_TYPES } from '../../config/accounting';
import { CloudinaryService } from '../../services/cloudinary/CloudinaryService';
import { Upload, X } from 'lucide-react';
import type { JournalEntry } from '../../types/accounting';

interface NewJournalEntryFormProps {
  onClose: () => void;
  onSubmit?: (entry: Partial<JournalEntry>) => Promise<void>;
  initialEntry?: Partial<JournalEntry>;
}

export function NewJournalEntryForm({ onClose, onSubmit, initialEntry }: NewJournalEntryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    entry,
    errors,
    totals,
    updateEntry,
    addLine,
    removeLine,
    updateLine,
    validate,
    reset,
    addAttachment,
    removeAttachment
  } = useJournalEntry(initialEntry);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (!validation.isValid) return;

    setIsSubmitting(true);
    try {
      const newEntry = {
        ...entry,
        totalDebit: totals.totalDebit,
        totalCredit: totals.totalCredit,
        totalVat: totals.totalVat,
        lines: entry.lines?.map(line => ({
          ...line,
          id: line.id || crypto.randomUUID()
        }))
      };

      await onSubmit?.(newEntry);
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to submit journal entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadError(null);

    for (const file of files) {
      try {
        const localUrl = URL.createObjectURL(file);
        const attachmentId = crypto.randomUUID();
        
        addAttachment({
          id: attachmentId,
          name: file.name,
          localUrl,
          status: 'pending'
        });

        if (navigator.onLine) {
          addAttachment({
            id: attachmentId,
            name: file.name,
            localUrl,
            status: 'uploading'
          });

          const url = await CloudinaryService.uploadFile(file, 'journal_attachments');
          
          addAttachment({
            id: attachmentId,
            name: file.name,
            url,
            localUrl,
            status: 'uploaded'
          });
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadError(`Erreur lors de l'upload de ${file.name}`);
        
        addAttachment({
          id: crypto.randomUUID(),
          name: file.name,
          status: 'error'
        });
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField label="Date" required>
          <Input
            type="date"
            value={entry.date}
            onChange={(e) => updateEntry({ date: e.target.value })}
            required
          />
        </FormField>

        <FormField label="Journal" required>
          <Select
            value={entry.journalType}
            onChange={(e) => updateEntry({ journalType: e.target.value })}
            required
            options={Object.entries(JOURNAL_TYPES).map(([value, config]) => ({
              value,
              label: `${config.code} - ${config.label}`
            }))}
          />
        </FormField>

        <FormField label="N° Pièce" required>
          <Input
            value={entry.reference || ''}
            onChange={(e) => updateEntry({ reference: e.target.value })}
            placeholder="Ex: FAC2024-001"
            required
          />
        </FormField>
      </div>

      <FormField label="Libellé" required>
        <Input
          value={entry.description}
          onChange={(e) => updateEntry({ description: e.target.value })}
          placeholder="Description de l'écriture"
          required
        />
      </FormField>

      <JournalEntryLines
        lines={entry.lines || []}
        onUpdate={updateLine}
        onRemove={removeLine}
        onAdd={addLine}
        totalDebit={totals.totalDebit}
        totalCredit={totals.totalCredit}
        totalVat={totals.totalVat}
      />

      {/* Section pièces jointes */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">Pièces justificatives</h3>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileSelect}
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={Upload}
            onClick={() => fileInputRef.current?.click()}
          >
            Ajouter un document
          </Button>
        </div>

        {uploadError && (
          <p className="text-sm text-red-600">{uploadError}</p>
        )}

        {entry.attachments && entry.attachments.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {entry.attachments.map(attachment => (
              <div 
                key={attachment.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {attachment.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {attachment.status === 'pending' && 'En attente...'}
                      {attachment.status === 'uploading' && 'Upload en cours...'}
                      {attachment.status === 'uploaded' && 'Téléchargé'}
                      {attachment.status === 'error' && 'Erreur'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeAttachment(attachment.id)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-600">{error}</p>
          ))}
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting || errors.length > 0}
        >
          Enregistrer
        </Button>
      </div>
    </form>
  );
}