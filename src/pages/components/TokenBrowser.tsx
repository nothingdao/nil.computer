import React, { useEffect, useState } from 'react';
import FungibleTokenTable from './FungibleTokenTable';
import NFTV1Table from './NFTV1Table';
import ProgrammableNFTTable from './ProgrammableNFTTable';
import TokenBrowserNavigation from './TokenBrowserNavigation';

const heliusApiUrl = `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`;

interface TokenListProps {
  ownerAddress: string;
}

const TokenBrowser: React.FC<TokenListProps> = ({ ownerAddress }) => {
  const [assets, setAssets] = useState<any[]>([]);
  const [activeAssetType, setActiveAssetType] = useState<string>('FungibleToken');

  useEffect(() => {
    const getAssetsByOwner = async () => {
      try {
        const response = await fetch(heliusApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'fetch-assets',
            method: 'getAssetsByOwner',
            params: {
              ownerAddress: ownerAddress,
              page: 1,
              limit: 1000,
              displayOptions: { showFungible: true },
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch assets: ${response.statusText}`);
        }

        const { result } = await response.json();
        setAssets(result.items);
        console.log('Fetched assets:', result.items);

      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    if (ownerAddress) {
      getAssetsByOwner();
    }
  }, [ownerAddress]);

  const fungibleTokens = assets.filter(asset => asset.interface === 'FungibleToken');
  const nftV1Assets = assets.filter(asset => asset.interface === 'V1_NFT');
  const programmableNFTs = assets.filter(asset => asset.interface === 'ProgrammableNFT');

  return (
    <div>

      <TokenBrowserNavigation
        setActiveAssetType={setActiveAssetType}
        activeAssetType={activeAssetType}
        fungibleTokens={fungibleTokens}
        nftV1Assets={nftV1Assets}
        programmableNFTs={programmableNFTs}
      />
      <div id="TokenBrowserTokens" className="p-4">
        {activeAssetType === 'FungibleToken' && <FungibleTokenTable assets={fungibleTokens} />}
        {activeAssetType === 'V1_NFT' && <NFTV1Table assets={nftV1Assets} />}
        {activeAssetType === 'ProgrammableNFT' && <ProgrammableNFTTable assets={programmableNFTs} />}
      </div>
    </div>
  );
};

export default TokenBrowser;
