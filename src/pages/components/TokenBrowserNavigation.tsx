// src/pages/components/TokenBrowserNavigation.tsx
import React, { useState } from 'react';
import IndexNavigation from './IndexNavigation';

interface Asset {
  id: string;
  interface: string;
  content_metadata_name: string | null;
  content_metadata_symbol: string | null;
  token_info_symbol: string | null;
  token_info_balance: string;
  asset: {
    token_info_decimals: number | null;
    token_info_supply: string | null;
  };
}

interface TokenBrowserNavigationProps {
  setActiveAssetType: (assetType: string) => void;
  activeAssetType: string;
  fungibleTokens: Asset[];
  nftV1Assets: Asset[];
  programmableNFTs: Asset[];
  prices: Record<string, number>;
  ownerAddress: string;
  assets: Asset[];
}

const TokenBrowserNavigation: React.FC<TokenBrowserNavigationProps> = ({
  setActiveAssetType,
  activeAssetType,
  fungibleTokens,
  nftV1Assets,
  programmableNFTs,
  prices,
  ownerAddress,
  assets,
}) => {

  // Calculate total value of all assets in USD
  const totalValueUSD = [...fungibleTokens, ...nftV1Assets, ...programmableNFTs].reduce((acc, asset) => {
    const { token_info_balance, asset: { token_info_decimals, token_info_supply } } = asset;
    const price = prices[asset.id]?.price || 0;
    const balanceValue = parseFloat(token_info_balance) / Math.pow(10, token_info_decimals || 0);
    const supplyValue = parseFloat(token_info_supply || '0');
    const totalValue = balanceValue * price * supplyValue;
    return acc + totalValue;
  }, 0);

  const createIndex = async (name: string, description: string, isPublic: boolean, assetIds: string[]) => {
    try {
      const response = await fetch('/api/manage-index', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          public: isPublic,
          ownerAddress,
          assetIds,
        }),
      });

      if (response.ok) {
        const newIndex = await response.json();
        console.log('New index created:', newIndex);
        // Update the UI or perform any necessary actions after creating the index
      } else {
        console.error('Failed to create index');
      }
    } catch (error) {
      console.error('Error creating index:', error);
    }
  };

  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    // Perform any necessary actions based on the selected filter
  };

  return (
    <div className="flex items-center justify-between p-4">
      <p>Total Value (USD): <span className="text-green-700">${totalValueUSD.toFixed(2)}</span></p>


      <IndexNavigation
        createIndex={createIndex}
        assets={assets}
        ownerAddress={ownerAddress}
        onFilterChange={handleFilterChange}
      />

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
