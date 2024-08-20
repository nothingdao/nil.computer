// src/pages/components/NFTV1Navigation.tsx
import React from 'react';
import BurnNFT from './BurnNFT';

interface NFTV1NavigationProps {
  selectedAssets: any[]; // Assuming selectedAssets array contains objects with a property for the token account address
}

const NFTV1Navigation: React.FC<NFTV1NavigationProps> = ({ selectedAssets }) => {
  // Use the associated token address from the selected asset
  const selectedAsset = selectedAssets.length > 0 ? selectedAssets[0] : null;
  const mintAddress = selectedAssets.length > 0 ? selectedAssets[0].id : null;
  const asset = selectedAssets.length > 0 ? selectedAssets[0] : null;


  return (
    <>
      <div className="menu-bar p-2 rounded-lg mb-4">
        <button className="btn btn-md mr-2" onClick={() => (document.getElementById('burn_modal') as HTMLDialogElement).showModal()}>Burn</button>
        <dialog id="burn_modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Burn V1 NFT</h3>
            {mintAddress && selectedAsset && <BurnNFT mintAddress={mintAddress} asset={selectedAsset} />}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
            </div>
          </div>
        </dialog>
        {/* Transfer button and modal code... */}
      </div>
    </>
  );
}

export default NFTV1Navigation;
