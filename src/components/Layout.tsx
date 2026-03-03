import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
