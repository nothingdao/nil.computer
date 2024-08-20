// src/pages/components/ProgrammableNFTComponent.tsx
import React from 'react';
import { ProgrammableNft } from '@prisma/client';

interface ProgrammableNFTComponentProps {
  asset: ProgrammableNft;
  isChecked: boolean;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProgrammableNFTComponent: React.FC<ProgrammableNFTComponentProps> = ({ asset, isChecked, onCheckboxChange }) => {
  // Destructure content and metadata from asset with default values
  const { content = {}, content: { metadata = {} } } = asset;

  return (
    <div className="border border-neutral p-2 rounded-lg relative">
      <input
        type="checkbox"
        className="mt-2 ml-2 absolute checkbox"
        checked={isChecked}
        onChange={onCheckboxChange}
      />
      <img src={content.files?.[0]?.uri || ''} alt={metadata.name || 'Asset'} className="w-full h-auto rounded-t-lg" />
      <div className="p-2 flex flex-col justify-between h-full">
        <div>
          <h5 className="text-lg font-bold">{metadata.name || 'Untitled'}</h5>
          <p>{metadata.symbol || 'Unknown'}</p>
          <p className="text-xs">{metadata.description || 'No description available'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgrammableNFTComponent;
