import React from 'react';

interface Asset {
  token_info?: {
    balance?: number;
    price_info?: {
      total_price?: number;
      currency?: string;
    };
  };
  interface: string; // 'FungibleToken', 'V1_NFT', or 'ProgrammableNFT'
}

interface WalletStatsProps {
  fungibleTokens: Asset[];
  nftV1Assets: Asset[];
  programmableNFTs: Asset[];
}

const WalletStats: React.FC<WalletStatsProps> = ({
  fungibleTokens,
  nftV1Assets,
  programmableNFTs,
}) => {
  // Calculate total value of all assets in USD
  const totalValueUSD = [...fungibleTokens, ...nftV1Assets, ...programmableNFTs].reduce((acc, asset) => {
    return acc + (asset.token_info?.price_info?.total_price || 0);
  }, 0);

  return (
    <div>
      <h3>Wallet Statistics</h3>
      <p>Total Value (USD): ${totalValueUSD.toFixed(2)}</p>
      <p>Fungible Tokens: {fungibleTokens.length}</p>
      <p>NFTs (V1): {nftV1Assets.length}</p>
      <p>Programmable NFTs: {programmableNFTs.length}</p>
    </div>
  );
};

export default WalletStats;
