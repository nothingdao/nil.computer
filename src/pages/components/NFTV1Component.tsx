import React from 'react';

const NFTV1Component = ({ asset }) => {
  return (
    <div className="border p-2 rounded-lg">
      <input type="checkbox" defaultChecked className="mt-2 ml-2 absolute checkbox" />

      <img src={asset.content.files[0]?.uri || ''} alt={asset.content.metadata.name} className="w-full h-auto rounded-t-lg" />
      <div className="p-2">
        <h5 className="text-lg font-bold">{asset.content.metadata.name}</h5>
        <p>{asset.content.metadata.symbol}</p>
        <p>{asset.content.metadata.description}</p>
      </div>
    </div>
  );
};

export default NFTV1Component;
