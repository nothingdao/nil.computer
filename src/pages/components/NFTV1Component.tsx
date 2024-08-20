// src/pages/components/NFTV1ComponentComponent.tsx
import React from 'react';
import { NftV1 } from '@prisma/client';

interface NFTV1ComponentProps {
  asset: NftV1 & { asset: { id: string } };
  isChecked: boolean;
  onCheckboxChange: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const NFTV1Component: React.FC<NFTV1ComponentProps> = ({ asset, isChecked, onCheckboxChange }) => {
  return (
    <div className="border border-neutral p-2 rounded-lg relative">
      <input
        type="checkbox"
        className="mt-2 ml-2 absolute checkbox"
        checked={isChecked}
        onChange={onCheckboxChange}
      />
      <img
        src={asset.content.files?.[0]?.cdn_uri || asset.content.files?.[0]?.uri || ''}
        alt={asset.content.metadata?.name}
        className="w-full h-auto rounded-t-lg"
      />
      <div className="p-2 flex flex-col justify-between h-full">
        <div>
          <h5 className="text-lg font-bold">{asset.content.metadata?.name}</h5>
          <p>{asset.content.metadata?.symbol}</p>
          <p className="text-xs">{asset.content.metadata?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NFTV1Component;
