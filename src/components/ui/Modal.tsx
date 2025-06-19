import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  containerClassName?: string;
  noPadding?: boolean; // Permet de désactiver le padding par défaut
}

export function Modal({ isOpen, onClose, title, children, size = 'md', containerClassName, noPadding = false }: ModalProps) {
  // Empêcher le scroll du body quand la modale est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }[size];

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} /> 
      
      <div className="fixed inset-0 overflow-hidden">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className={`relative ${sizeClasses} w-full modal ${containerClassName || ''}`}>
            {/* Header */}
            <div className="modal-header flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Body - avec scroll */}
            <div className={`${noPadding ? '' : 'modal-body'}`}> 
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}