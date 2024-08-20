// src/pages/components/ProgrammableNFTTable.tsx
import React, { useMemo, useState, useEffect } from 'react';
import ProgrammableNFTComponent from './ProgrammableNFTComponent';
import ProgrammableNFTNavigation from './ProgrammableNFTNavigation';
import ProgrammableNFTFilterMenu from './ProgrammableNFTFilterMenu';

interface Asset {
  id?: string; // Make id optional
}

interface ProgrammableNFTTableProps {
  ownerAddress: string;
}

const ProgrammableNFTTable: React.FC<ProgrammableNFTTableProps> = ({ ownerAddress }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [lastIndex, setLastIndex] = useState<number | null>(null);
  const [filterSymbol, setFilterSymbol] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      // Fetch assets from the API using ownerAddress
      // Update assets state with fetched data
    };

    fetchAssets();
  }, [ownerAddress]);

  const symbols = useMemo(() => [...new Set(assets.map(asset => asset.content.metadata?.symbol))], [assets]);

  const filteredAssets = useMemo(() => {
    return filterSymbol ? assets.filter(asset => asset.content.metadata?.symbol === filterSymbol) : assets;
  }, [assets, filterSymbol]);

  const handleSelectSymbol = (symbol: string) => {
    setFilterSymbol(symbol);
  };

  const handleSelectAsset = (index: number, isShiftKey: boolean) => {
    // Handle asset selection
  };

  const isSelected = (index: number) => selectedIndices.includes(index);

  const selectedAssets = selectedIndices.map(index => filteredAssets[index]);

  return (
    <div>
      {selectedAssets.length > 0 && <ProgrammableNFTNavigation selectedAssets={selectedAssets} />}
      <ProgrammableNFTFilterMenu symbols={symbols} onSelectSymbol={handleSelectSymbol} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {filteredAssets.map((asset, index) => (
          <ProgrammableNFTComponent
            key={asset.id || index.toString()} // Use index as fallback key
            asset={asset}
            isChecked={isSelected(index)}
            onCheckboxChange={(event: React.KeyboardEvent<HTMLInputElement>) => handleSelectAsset(index, event.shiftKey)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgrammableNFTTable;
