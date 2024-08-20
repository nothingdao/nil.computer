// FungibleTokenComponent.tsx
import Link from 'next/link';
import React from 'react';

interface TokenProps {
  asset: {
    id: string;
    content_metadata_name?: string;
    content_metadata_symbol?: string;
    content_links_image?: string; // Now this directly uses the correct image URL
    token_info_symbol?: string;
    token_info_balance?: string;
    token_info_decimals?: number;
  };
  price?: number;
}


const FungibleTokenComponent: React.FC<TokenProps> = ({ asset, price }) => {
  if (!asset || !asset.id) {
    return null;
  }

  const {
    id,
    content_metadata_name,
    content_links_image,
    token_info_symbol,
    token_info_balance,
    token_info_decimals,
  } = asset;

  const name = content_metadata_name || 'Token';
  const imageUri = content_links_image || '';  // This should now correctly reference the nested image URI

  console.log('FungibleTokenComponent: imageUri:', imageUri);

  const formatBalance = (balance: string | undefined, decimals: number | undefined): string => {
    if (!balance || decimals === undefined) {
      return '0';
    }

    const balanceNumber = parseFloat(balance);
    return (balanceNumber / 10 ** decimals).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const calculateTotalValue = (balance: string | undefined, decimals: number | undefined, price: number | undefined): number => {
    if (!balance || decimals === undefined || !price) {
      return 0;
    }

    const balanceNumber = parseFloat(balance);
    return (balanceNumber / 10 ** decimals) * price;
  };

  const totalValue = calculateTotalValue(token_info_balance, token_info_decimals, price);

  return (
    <tr className="border border-neutral">
      <td>
        <Link href={`/token/${id}`}>
          <div className="flex items-center space-x-3 hover:cursor-pointer">
            <div className="avatar">
              <div className="w-10 rounded-full border border-neutral">
                {imageUri ? <img src={imageUri} alt={name} /> : <div>No Image Available</div>}
              </div>
            </div>
            <div>
              <div className="font-thin">{name}</div>
            </div>
          </div>
        </Link>
      </td>
      <td className="uppercase font-thin">{token_info_symbol}</td>
      <td>
        <span className="font-thin">
          ${totalValue.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || '0.00'}
          <a href={`https://birdeye.so/token/${id}?chain=solana`} target="_blank" className="text-xs text-gray-500 ml-2">
            BE
          </a>
        </span>
      </td>
      <td>
        {price !== undefined && (
          <span className="font-thin">
            {price.toLocaleString('en-US', {
              maximumFractionDigits: 6,
            }) || '0'}
          </span>
        )}
      </td>
      <td>
        <span className="font-thin">{formatBalance(token_info_balance, token_info_decimals)}</span>
      </td>
    </tr>
  );
};

export default FungibleTokenComponent;
