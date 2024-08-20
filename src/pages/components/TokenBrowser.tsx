// src/pages/components/TokenBrowser.tsx
import React, { useState, useEffect } from 'react';
import FungibleTokenTable from './FungibleTokenTable';
import NFTV1Table from './NFTV1Table';
import ProgrammableNFTTable from './ProgrammableNFTTable';
import TokenBrowserNavigation from './TokenBrowserNavigation';

interface Asset {
  id: string;
  interface: string;
  content_metadata_name: string | null;
  content_metadata_symbol: string | null;
  token_info_symbol: string | null;
  token_info_balance: string;

  asset: {
    token_info_decimals: number | null;
  };
}

interface TokenListProps {
  ownerAddress: string;
}

const TokenBrowser: React.FC<TokenListProps> = ({ ownerAddress }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [activeAssetType, setActiveAssetType] = useState<string>('FungibleToken');
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserAssets = async () => {
      setFetchLoading(true);
      setError(null);

      try {
        console.log('TokenBrowser: ownerAddress:', ownerAddress);
        const response = await fetch(`/api/get-user-assets?ownerAddress=${ownerAddress}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user assets: ${response.statusText}`);
        }
        const data = await response.json();
        setAssets(data.assets);

        // Create an array of asset IDs
        const fungibleAssets = data.assets.filter((asset: Asset) => asset.interface === 'FungibleToken');
        const assetIds = fungibleAssets.map((asset: Asset) => asset.id);
        // Fetch prices for the asset IDs
        const pricesResponse = await fetch(`/api/get-assets-prices?ids=${assetIds.join(',')}`);
        if (!pricesResponse.ok) {
          throw new Error(`Failed to fetch asset prices: ${pricesResponse.statusText}`);
        }
        const pricesData = await pricesResponse.json();
        setPrices(pricesData.data);
      } catch (error) {
        setError('Failed to fetch user assets or prices');
        console.error('Error fetching user assets or prices:', error);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchUserAssets();
  }, [ownerAddress]);

  const saveAssetsToDatabase = async () => {
    setSaveLoading(true);
    setError(null);
    setSaveSuccess(false);

    try {
      console.log('TokenBrowser: saveAssetsToDatabase: ownerAddress:', ownerAddress);

      // Fetch the user's assets from the Helius API
      const response = await fetch('https://mainnet.helius-rpc.com/?api-key=265b8b98-8025-41f1-9336-667e8d569ab7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'fetch-assets',
          method: 'getAssetsByOwner',
          params: {
            ownerAddress: ownerAddress,
            page: 1,
            limit: 1000,
            displayOptions: {
              showFungible: true //return both fungible and non-fungible tokens
            }
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch assets from Helius API: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched assets from Helius API:', data);
      const assetsData = data.result?.items || [];
      // console.log('Fetched assets from Helius API:', assetsData);

      // Save the assets to the database
      const saveResponse = await fetch('/api/create-assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerAddress, assets: assetsData }),
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json();
        throw new Error(`Error saving assets: ${errorData.error || 'Unknown Error'}`);
      }

      setSaveSuccess(true);
    } catch (error) {
      setError('Failed to save assets');
      console.error('Error saving assets to database:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  const downloadJSON = () => {
    if (assets.length === 0) {
      setError('No assets to download');
      return;
    }

    const json = JSON.stringify(assets, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assets.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const fungibleTokens = assets.filter((asset) => asset.interface === 'FungibleToken');
  const nftV1Assets = assets.filter((asset) => asset.interface === 'V1_NFT');
  const programmableNFTs = assets.filter((asset) => asset.interface === 'ProgrammableNFT');


  return (
    <div>
      <TokenBrowserNavigation
        setActiveAssetType={setActiveAssetType}
        activeAssetType={activeAssetType}
        fungibleTokens={fungibleTokens}
        nftV1Assets={nftV1Assets}
        programmableNFTs={programmableNFTs}
        prices={prices}
        ownerAddress={ownerAddress}
        assets={assets}
      />
      <div className="p-4 join font-thin">
        <button onClick={saveAssetsToDatabase} className="btn btn-xs btn-neutral join-item">
          {saveLoading ? 'Saving...' : 'Save Assets to DB'}
        </button>
        <button onClick={downloadJSON} disabled={assets.length === 0} className="btn btn-xs btn-neutral join-item">
          Download Assets JSON
        </button>
      </div>
      {error && <div>Error: {error}</div>}
      {saveSuccess && <div>Assets saved successfully!</div>}
      <div id="TokenBrowserTokens" className="p-4">
        {activeAssetType === 'FungibleToken' && <FungibleTokenTable assets={fungibleTokens} ownerAddress={ownerAddress} />}
        {activeAssetType === 'V1_NFT' && <NFTV1Table assets={nftV1Assets} />}
        {activeAssetType === 'ProgrammableNFT' && <ProgrammableNFTTable assets={programmableNFTs} />}
      </div>
    </div>
  );
};

export default TokenBrowser;
