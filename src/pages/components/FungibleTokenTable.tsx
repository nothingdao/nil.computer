import React, { useState } from 'react';
import FungibleTokenComponent from './FungibleTokenComponent';
import { InformationCircleIcon } from '@heroicons/react/outline';


interface FungibleTokenTableProps {
  assets: any[];
}

const FungibleTokenTable: React.FC<FungibleTokenTableProps> = ({ assets }) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortAssets = (field: string) => {
    return [...assets].sort((a, b) => {
      let valueA = a[field] || a.token_info?.[field];
      let valueB = b[field] || b.token_info?.[field];

      // Check if the values are numbers and compare numerically
      if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
        valueA = Number(valueA);
        valueB = Number(valueB);
      } else {
        // Compare as strings
        valueA = String(valueA).toLowerCase();
        valueB = String(valueB).toLowerCase();
      }

      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (field: string) => {
    const newSortOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const sortedAssets = sortField ? sortAssets(sortField) : assets;

  const [showHelpBox, setShowHelpBox] = useState(false);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} className="hover:cursor-pointer">Name</th>
            <th onClick={() => handleSort('symbol')} className="hover:cursor-pointer">Symbol</th>
            <th onClick={() => handleSort('total_price')} className="hover:cursor-pointer">Total Value USDC</th>
            <th onClick={() => handleSort('price_per_token')} className="hover:cursor-pointer">Price Per Token USDC</th>
            <th onClick={() => handleSort('balance')} className="hover:cursor-pointer">Token Balance</th>
          </tr>
        </thead>
        <tbody>
          {sortedAssets.map((asset, index) => (
            <FungibleTokenComponent key={index} asset={asset} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FungibleTokenTable;




