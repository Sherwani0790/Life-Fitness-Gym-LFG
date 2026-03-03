import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import { Button } from '@/src/UI-Components/button';

const pageNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/members': 'Members Management',
  '/employees': 'Employees Management',
  '/trainers': 'Trainers Management',
  '/packages': 'Package Management',
};

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const location = useLocation();
  const pageName = pageNames[location.pathname] || 'LFG System';

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden" 
          onClick={onMenuToggle}
        >
          <Menu size={20} />
        </Button>
        <h2 className="text-lg md:text-xl font-semibold tracking-tight">{pageName}</h2>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
      </div>
    </header>
  );
}
