// src/pages/components/FungibleTokenTable.tsx
import React, { useState, useEffect } from 'react';
import FungibleTokenComponent from './FungibleTokenComponent';

interface Asset {
  id: string;
  interface: string;
  content_metadata_name: string | null;
  content_metadata_symbol: string | null;
  token_info_symbol: string | null;
  token_info_balance: string;
  content_links_image: string | null;
  asset: {
    token_info_decimals: number | null;
  };
}

const FungibleTokenTable: React.FC<{ ownerAddress: string }> = ({ ownerAddress }) => {
  const [fungibleAssets, setFungibleAssets] = useState<Asset[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string }>({
    key: 'token_info_total_value_usdc',
    direction: 'desc',
  });

  useEffect(() => {
    const fetchUserAssets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/get-user-assets?ownerAddress=${ownerAddress}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user assets: ${response.statusText}`);
        }
        const data = await response.json();
        const fungibleAssets = data.assets.filter((asset: Asset) => asset.interface === 'FungibleToken');

        setFungibleAssets(fungibleAssets);

        // Create an array of asset IDs for fungible tokens
        const assetIds = fungibleAssets.map((asset: Asset) => asset.id);

        // Fetch prices only for fungible token assets

        const pricesResponse = await fetch(`/api/get-assets-prices?ids=${assetIds.join(',')}`);
        if (!pricesResponse.ok) {
          throw new Error(`Failed to fetch asset prices: ${pricesResponse.statusText}`);
        }
        const pricesData = await pricesResponse.json();
        setPrices(pricesData.data);
        console.log('Fetched user assets:', fungibleAssets);
      } catch (error) {
        setError('Error fetching user assets or prices');
        console.error('Error fetching user assets or prices:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserAssets();
  }, [ownerAddress]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAssets = fungibleAssets.slice().sort((a, b) => {
    let valueA;
    let valueB;

    if (sortConfig.key === 'token_info_total_value_usdc') {
      valueA = calculateTotalValue(a.token_info_balance, a.asset.token_info_decimals, prices[a.id]?.price);
      valueB = calculateTotalValue(b.token_info_balance, b.asset.token_info_decimals, prices[b.id]?.price);
    } else if (sortConfig.key === 'token_info_price_per_token_usdc') {
      valueA = prices[a.id]?.price || 0;
      valueB = prices[b.id]?.price || 0;
    } else {
      valueA = a[sortConfig.key] || 0;
      valueB = b[sortConfig.key] || 0;
    }

    if (valueA < valueB) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th onClick={() => handleSort('content_metadata_name')}>
              Name
              {sortConfig.key === 'content_metadata_name' && (
                <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
              )}
            </th>
            <th onClick={() => handleSort('content_metadata_symbol')}>
              Symbol
              {sortConfig.key === 'content_metadata_symbol' && (
                <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
              )}
            </th>
            <th onClick={() => handleSort('token_info_total_value_usdc')}>
              Total Value
              {sortConfig.key === 'token_info_total_value_usdc' && (
                <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
              )}
            </th>
            <th onClick={() => handleSort('token_info_price_per_token_usdc')}>
              Price
              {sortConfig.key === 'token_info_price_per_token_usdc' && (
                <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
              )}
            </th>
            <th onClick={() => handleSort('token_info_balance')}>
              Balance
              {sortConfig.key === 'token_info_balance' && (
                <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedAssets.map((asset) => (
            <FungibleTokenComponent
              key={asset.id}
              asset={{
                id: asset.id,
                content_metadata_name: asset.content_metadata_name,
                content_metadata_symbol: asset.content_metadata_symbol,
                content_links_image: asset.asset.content_links_image, // Accessing the nested content_links_image
                token_info_symbol: asset.token_info_symbol,
                token_info_balance: asset.token_info_balance,
                token_info_decimals: asset.asset.token_info_decimals, // Accessing the nested token_info_decimals
              }}
              price={prices[asset.id]?.price}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper function to calculate the total value
const calculateTotalValue = (balance: string | undefined, decimals: number | undefined, price: number | undefined): number => {
  if (balance === undefined || decimals === undefined || price === undefined) {
    return 0;
  }

  const balanceNumber = parseFloat(balance);
  const totalValue = (balanceNumber / 10 ** decimals) * price;
  return totalValue;
};

export default FungibleTokenTable;
