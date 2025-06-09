import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Breadcrumb } from '../ui/Breadcrumb';
import { LoadingScreen } from '../ui/LoadingScreen';
import { Calculator } from '../calculator/Calculator';
import { useCalculatorStore } from '../../hooks/useCalculatorStore';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isLoading, setIsLoading] = useState(true);
  const isCalculatorOpen = useCalculatorStore(state => state.isOpen);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
    if (isMobile) {
      document.body.style.overflow = !sidebarOpen ? 'hidden' : 'auto';
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary">
      <Header onToggleSidebar={handleSidebarToggle} />
      
      <div className="flex pt-16">
        <Sidebar isOpen={sidebarOpen} onClose={() => isMobile && setSidebarOpen(false)} />
        
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <main className={`
          flex-1 p-4 md:p-6 overflow-auto h-[calc(100vh-4rem)]
          transition-all duration-200
          ${isMobile && sidebarOpen ? 'blur-sm' : ''}
        `}>
          <div className="max-w-7xl mx-auto space-y-4">
            <Breadcrumb />
            {children}
          </div>
        </main>
      </div>

      {isCalculatorOpen && <Calculator />}
    </div>
  );
}