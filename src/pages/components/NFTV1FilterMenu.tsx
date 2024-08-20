// src/pages/components/NFTV1FilterMenu.tsx
import React from 'react';

interface NFTV1FilterMenuProps {
  symbols: string[];
  onSelectSymbol: (symbol: string) => void;
}

const NFTV1FilterMenu: React.FC<NFTV1FilterMenuProps> = ({ symbols, onSelectSymbol }) => {
  return (
    <div className="filter-menu">
      {symbols.map(symbol => (
        <button key={symbol} onClick={() => onSelectSymbol(symbol)} className="mr-2 border border-neutral p-2 text-xs mb-2">
          {symbol}
        </button>

      ))}
    </div>
  );
};

export default NFTV1FilterMenu;
