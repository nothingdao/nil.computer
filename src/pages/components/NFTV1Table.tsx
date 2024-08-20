// src/pages/components/NFTV1Table.tsx
import React, { useMemo, useState } from 'react';
import { NftV1 } from '@prisma/client';
import NFTV1Component from './NFTV1Component';
import NFTV1Navigation from './NFTV1Navigation';
import NFTFilterMenu from './NFTV1FilterMenu';

interface NFTV1TableProps {
  assets: (NftV1 & { asset?: { id: string } })[]; // Make asset.id optional
}

const NFTV1Table: React.FC<NFTV1TableProps> = ({ assets }) => {
  const [filterSymbol, setFilterSymbol] = useState<string | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [lastIndex, setLastIndex] = useState<number | null>(null);

  const symbols = useMemo(() => [...new Set(assets.map(asset => asset.content.metadata?.symbol))], [assets]);

  const filteredAssets = useMemo(() => {
    return filterSymbol ? assets.filter(asset => asset.content.metadata?.symbol === filterSymbol) : assets;
  }, [assets, filterSymbol]);

  const handleSelectSymbol = (symbol: string) => {
    setFilterSymbol(symbol);
  };

  const handleSelectAsset = (index: number, isShiftKey: boolean) => {
    const actualIndex = assets.findIndex(asset => asset === filteredAssets[index]);

    if (isShiftKey && lastIndex !== null) {
      const start = Math.min(lastIndex, actualIndex);
      const end = Math.max(lastIndex, actualIndex);
      const updatedSelectedIndices = new Set(selectedIndices);

      for (let i = start; i <= end; i++) {
        updatedSelectedIndices.has(i) ? updatedSelectedIndices.delete(i) : updatedSelectedIndices.add(i);
      }

      setSelectedIndices(Array.from(updatedSelectedIndices));
    } else {
      setSelectedIndices(
        selectedIndices.includes(actualIndex)
          ? selectedIndices.filter(i => i !== actualIndex)
          : [...selectedIndices, actualIndex]
      );
    }

    setLastIndex(actualIndex);
  };

  const isSelected = (index: number) => {
    const actualIndex = assets.findIndex(asset => asset === filteredAssets[index]);
    return selectedIndices.includes(actualIndex);
  };

  const selectedAssets = selectedIndices.map(index => assets[index]);

  return (
    <>
      {selectedAssets.length > 0 && <NFTV1Navigation selectedAssets={selectedAssets} />}
      <NFTFilterMenu symbols={symbols} onSelectSymbol={handleSelectSymbol} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset, index) => (
            <NFTV1Component
              key={asset.asset?.id || index.toString()} // Use index as fallback key
              asset={asset}
              isChecked={isSelected(index)}
              onCheckboxChange={(event: React.KeyboardEvent<HTMLInputElement>) => handleSelectAsset(index, event.shiftKey)}
            />
          ))
        ) : (
          <p>No NFT V1 assets found.</p>
        )}
      </div>
    </>
  );
};

export default NFTV1Table;
