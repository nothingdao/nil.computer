import React from 'react';

interface TokenListFiltersProps {
  hideZeroBalances: boolean;
  setHideZeroBalances: (value: boolean) => void;
  selectedInterfaces: string[];
  setSelectedInterfaces: (value: string[]) => void; // New prop for setting the selected interfaces
}

const TokenListFilters: React.FC<TokenListFiltersProps> = ({
  hideZeroBalances,
  setHideZeroBalances,
  selectedInterfaces,
  setSelectedInterfaces,
}) => {
  // Handles updating the selected interfaces
  const handleInterfaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedInterfaces(value);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={hideZeroBalances}
          className="toggle"
          onChange={(e) => setHideZeroBalances(e.target.checked)}
        /> Hide Zero Balances
      </label>
    </div>
  );
};

export default TokenListFilters;
