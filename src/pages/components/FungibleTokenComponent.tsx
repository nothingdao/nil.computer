// src/pages/components/TokenComponent.tsx
import Link from 'next/link';
import React from 'react';

interface TokenProps {
  asset: {
    interface: string; // 'FungibleToken', 'V1_NFT', etc.
    id: string;
    content: {
      metadata: {
        name?: string;
        symbol?: string;
        // Add other fields as needed
      };
      files?: Array<{ uri: string; cdn_uri?: string; mime?: string }>;
    };
    token_info?: {
      balance?: number;
      symbol?: string;
      supply?: number;
      decimals?: number;
      price_info?: {
        price_per_token: number;
        total_price: number;
        currency: string;
      };
    };
  };
}

const FungibleTokenComponent: React.FC<TokenProps> = ({ asset }) => {
  const { content, token_info, id } = asset;
  const name = content.metadata.name;
  const symbol = content.metadata.symbol || token_info?.symbol;
  const imageUri = content.files?.[0]?.cdn_uri || content.files?.[0]?.uri;

  // Format total_price with two decimal places and commas
  const formattedTotalPrice = token_info?.price_info?.total_price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedBalance = token_info?.balance && token_info?.decimals !== undefined
    ? (token_info.balance / Math.pow(10, token_info.decimals)).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: Math.min(Math.max(token_info.decimals, 2), 20),
    })
    : null;

  // Sample data for testing purposes
  const testData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 17875600));

  return (
    <tr className='border border-neutral'>
      <td>
        <Link
          href={`/token/${id}`}
        >
          <div className="flex items-center space-x-3 hover:cursor-pointer">
            <div className="avatar">
              <div className="w-8 rounded-full skeleton">
                {imageUri && <img src={imageUri} alt={name || 'Token'} />}
              </div>
            </div>
            <div>
              {name && <div className="font-bold">{name}</div>}
            </div>
          </div>
        </Link>
      </td>
      <td className="uppercase">{symbol}</td>
      <td>{formattedTotalPrice}</td>
      <td>{token_info?.price_info?.price_per_token}</td>
      <td>{formattedBalance}</td>
    </tr>
  );
};

export default FungibleTokenComponent;
