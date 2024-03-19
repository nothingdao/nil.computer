import React from 'react';
import { TbTrash } from "react-icons/tb";

interface Asset {
  token_info?: {
    balance?: number;
    price_info?: {
      total_price?: number;
      currency?: string;
    };
  };
  interface: string;
}

interface TokenBrowserNavigationProps {
  setActiveAssetType: (assetType: string) => void;
  activeAssetType: string;
  fungibleTokens: Asset[];
  nftV1Assets: Asset[];
  programmableNFTs: Asset[];
}

const TokenBrowserNavigation: React.FC<TokenBrowserNavigationProps> = ({
  setActiveAssetType,
  activeAssetType,
  fungibleTokens,
  nftV1Assets,
  programmableNFTs
}) => {
  // Calculate total value of all assets in USD
  const totalValueUSD = [...fungibleTokens, ...nftV1Assets, ...programmableNFTs].reduce((acc, asset) => {
    return acc + (asset.token_info?.price_info?.total_price || 0);
  }, 0);

  return (
    <div className="flex items-center justify-between p-4">
      <p>Total Value (USD): <span className="text-green-700">${totalValueUSD.toFixed(2)}</span></p>

      <div className='space-x-2'>
        <button className="btn btn-sm btn-neutral">
          All
        </button>
        <button className="btn btn-sm btn-neutral">
          Long
          <div className="badge">7</div>
        </button>
        <button className="btn btn-sm btn-neutral">
          Short
          <div className="badge">39</div>
        </button>
        <button className="btn btn-sm btn-neutral">
          <TbTrash />
          <div className="badge">7</div>
        </button>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm btn-neutral m-1">Animals</div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Rugged</a></li>
            <li><a>Community Takeover</a></li>
          </ul>
        </div>
        {/* add a field that allows the user to create a new custom category in addition to "animals". Long, SHort, and Trach are default categorys, and there has to be a way to add a new category ans well as list the existing categories in a nice ui that is easy to use. */}
      </div>

      <ul className="menu menu-vertical lg:menu-horizontal border border-neutral">
        <li className={activeAssetType === 'FungibleToken' ? 'bordered' : ''} onClick={() => setActiveAssetType('FungibleToken')}>
          <a>Fungible Tokens ({fungibleTokens.length})</a>
        </li>
        <li className={activeAssetType === 'V1_NFT' ? 'bordered' : ''} onClick={() => setActiveAssetType('V1_NFT')}>
          <a>NFT (V1) ({nftV1Assets.length})</a>
        </li>
        <li className={activeAssetType === 'ProgrammableNFT' ? 'bordered' : ''} onClick={() => setActiveAssetType('ProgrammableNFT')}>
          <a>Programmable NFTs ({programmableNFTs.length})</a>
        </li>
      </ul>




    </div>
  );
};

export default TokenBrowserNavigation;
