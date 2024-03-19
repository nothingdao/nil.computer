import React from 'react';
import NFTV1Component from './NFTV1Component';

interface NFTV1TableProps {
  assets: any[];
}

const NFTV1Table: React.FC<NFTV1TableProps> = ({ assets }) => {
  return (
    <div className="grid grid-cols-6 gap-4">
      {assets.length > 0 ? (
        assets.map((asset, index) => <NFTV1Component key={index} asset={asset} />)
      ) : (
        <p>No NFT V1 assets found.</p>
      )}
    </div>
  );
};

export default NFTV1Table;
