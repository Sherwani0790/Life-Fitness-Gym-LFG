import React from 'react';
import { Dumbbell } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8", showText = true }) => {
  const LOGO_URL = "/Logo.jpeg";
  return (
    <div className="flex items-center gap-3">
      <div className={`relative flex items-center justify-center rounded-full text-white ${className}`}>
        {/* <Dumbbell className="w-full h-full" /> */}
         <img
              src={LOGO_URL}
              alt="Company Logo"
              className="w-full h-full object-cover rounded-full"
            />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-xl tracking-tight leading-none text-foreground">LFG</span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">Life Fitness Gym</span>
        </div>
      )}
    </div>
  );
};
