import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn-secondary"
        >
          Précédent
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn-secondary"
        >
          Suivant
        </button>
      </div>
      
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-text-secondary">
            Page <span className="font-medium text-text-primary">{currentPage}</span> sur{' '}
            <span className="font-medium text-text-primary">{totalPages}</span>
          </p>
        </div>
        
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn-secondary rounded-l-md"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {pages.map(page => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`
                  relative inline-flex items-center px-4 py-2 border text-sm font-medium
                  ${currentPage === page
                    ? 'z-10 bg-primary text-on-primary border-primary'
                    : 'bg-background text-text-primary hover:bg-hover border-secondary'
                  }
                `}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn-secondary rounded-r-md"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}