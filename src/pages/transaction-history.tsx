import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface Transaction {
  signature: string;
  description: string;
  type: string;
  fee: number;
  feePayer: string;
  timestamp: number;
}

const TransactionHistoryPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(30);
  const wallet = useWallet();

  const fetchTransactions = async (beforeSignature?: string) => {
    if (!wallet.publicKey) return;

    let url = `https://api.helius.xyz/v0/addresses/H4K47p7GnaCG9xxFx6dkeEqFn8uSmcGJQJrw2q8uQKXg/transactions?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`;
    if (beforeSignature) {
      url += `&before=${beforeSignature}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    console.log('Fetched transactions:', data);
    return data;
  };

  const fetchAndParseTransactions = async () => {
    setLoading(true);
    let allTransactions: Transaction[] = [];
    let lastSignature = null;

    while (true) {
      const data = await fetchTransactions(lastSignature);
      if (data.length === 0) break;

      const formattedTransactions = data.map((item: any) => ({
        signature: item.signature,
        description: item.description,
        type: item.type,
        fee: item.fee,
        feePayer: item.feePayer,
        timestamp: item.timestamp,
      }));
      allTransactions = [...allTransactions, ...formattedTransactions];
      lastSignature = formattedTransactions[formattedTransactions.length - 1].signature;
    }

    setTransactions(allTransactions);
    setFilteredTransactions(allTransactions); // Ensure filteredTransactions is also updated
    setLoading(false);
  };


  const getTotalFeesInSOL = () => {
    const totalLamports = transactions.reduce((sum, transaction) => sum + transaction.fee, 0);
    return totalLamports / 1_000_000_000;
  };

  const uniqueTypes = Array.from(new Set(transactions.map(t => t.type)));

  const handleFilterChange = (type) => {
    setSelectedType(type);
    if (type === '') {
      setFilteredTransactions(transactions); // Show all transactions if "Show All" is selected
    } else {
      setFilteredTransactions(transactions.filter(transaction => transaction.type === type));
    }
    setCurrentPage(1);
  };


  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="loading loading-ring loading-lg"></div>
        <div className="text-xs">Loading transaction history...</div>
      </div>
    );
  }

  return (
    <div className="pt-6">

      <div className='bg-base-100 w-full border-b border-neutral p-6'>
        <h1>Transaction History</h1>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <button className="btn btn-sm btn-neutral flex-grow" onClick={fetchAndParseTransactions}>Fetch Transactions</button>
          <select
            className="select select-sm select-bordered flex-grow"
            onChange={(e) => handleFilterChange(e.target.value)}
            value={selectedType || ''}
          >
            <option value="">Show All</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="text-xs mt-4">All Time Fees Total: {getTotalFeesInSOL().toFixed(9)} SOL</div>
      </div>

      <div className='overflow-auto' style={{ height: 'calc(100vh - 12rem)' }}>
        {currentTransactions.length > 0 ? (
          <ul>
            {currentTransactions.map((transaction, index) => (
              <li key={index} className='border-b border-neutral p-6 text-xs'>
                <div>Signature: <a className="link" href={`https://solscan.io/tx/${transaction.signature}`} target="_blank" rel="noopener noreferrer">
                  {transaction.signature}
                </a></div>
                <div>Description: {transaction.description}</div>
                <div>Type: {transaction.type}</div>
                <div>Fee: {transaction.fee} lamports</div>
                <div>Fee Payer: <a className="link" href={`https://solscan.io/account/${transaction.feePayer}`} target="_blank" rel="noopener noreferrer">
                  {transaction.feePayer}
                </a></div>
                <div>Timestamp: {new Date(transaction.timestamp * 1000).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6">No transactions found. Or, data has not been stored to your database and you must fetch transactions above.</div>
        )}
      </div>

      <div id="page-navigation" className="bg-base-100 w-full border-t border-neutral p-4 text-center sticky bottom-0">
        <div className="join">
          <button className="join-item btn btn-sm btn-outline" onClick={() => paginate(1)} disabled={currentPage === 1}>«</button>
          <button className="join-item btn btn-sm btn-outline">Page {currentPage} of {Math.ceil(filteredTransactions.length / transactionsPerPage)}</button>
          <button className="join-item btn btn-sm btn-outline" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredTransactions.length / transactionsPerPage)}>»</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
