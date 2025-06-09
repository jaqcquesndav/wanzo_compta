import React from 'react';
import { AI_MODELS } from '../../types/chat';
import { Sparkles } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface ModelSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: typeof AI_MODELS[0];
  onSelect: (model: typeof AI_MODELS[0]) => void;
}

export function ModelSelector({ isOpen, onClose, selectedModel, onSelect }: ModelSelectorProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sélectionner un modèle"
      size="sm"
    >
      <div className="space-y-4">
        {AI_MODELS.map(model => (
          <button
            key={model.id}
            onClick={() => {
              onSelect(model);
              onClose();
            }}
            className={`
              w-full p-4 rounded-lg text-left transition-colors
              ${selectedModel.id === model.id
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-gray-50'
              }
            `}
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">{model.name}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{model.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {model.capabilities.map(cap => (
                <span
                  key={cap}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {cap}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </Modal>
  );
}