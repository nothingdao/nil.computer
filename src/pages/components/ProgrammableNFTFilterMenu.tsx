// src/pages/components/NFTV1FilterMenu.tsx
import React from 'react';

interface ProgrammableNFTFilterMenuProps {
  symbols: string[];
  onSelectSymbol: (symbol: string) => void;
}

const ProgrammableNFTFilterMenu: React.FC<ProgrammableNFTFilterMenuProps> = ({ symbols, onSelectSymbol }) => {
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

export default ProgrammableNFTFilterMenu;
