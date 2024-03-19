// pages/holders/[mintAddress].tsx
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const HoldersPage = () => {
  const router = useRouter();
  const { mintAddress } = router.query;
  const [holders, setHolders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); // Start with loading true to show spinner immediately
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchHolders = async () => {
      // Initial fetch setup; setLoading(true) is only necessary if it's the first page being loaded.
      if (page === 1) setLoading(true);

      if (!mintAddress || typeof mintAddress !== 'string' || !hasMore) return;

      const url = `https://mainnet.helius-rpc.com/?api-key=265b8b98-8025-41f1-9336-667e8d569ab7`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'getTokenAccounts',
            id: 'helius-test',
            params: {
              mint: mintAddress,
              page: page,
              limit: 1000,
              displayOptions: {},
            },
          }),
        });

        const data = await response.json();
        console.log(data);

        if (!data.result || data.result.token_accounts.length === 0) {
          // Set hasMore to false to indicate no further data is available
          // and setLoading to false since loading is complete.
          setHasMore(false);
          setLoading(false);
        } else {
          const newHolders = data.result.token_accounts.map((account, index) => ({
            number: (page - 1) * 1000 + index + 1,
            owner: account.owner,
            amount: account.amount,
          }));
          setHolders(prevHolders => [...prevHolders, ...newHolders]);
          setPage(prevPage => prevPage + 1); // Setup for the next page
        }
      } catch (error) {
        console.error('Failed to fetch holders:', error);
        // Stop loading due to error and indicate no further pages are expected
        setHasMore(false);
        setLoading(false);
      }
    };

    // Trigger the data fetch if more pages are expected
    if (hasMore && mintAddress) {
      fetchHolders();
    }
  }, [mintAddress, page, hasMore]);

  const downloadCSV = () => {
    const csvRows = holders.map(holder => `${holder.owner},${holder.amount}`).join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'holders.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };



  return (
    <div>
      <Head>
        <title>Token Holders</title>
      </Head>
      <main className="mt-28">
        {/* Conditionally render the Download CSV button */}
        {!loading && holders.length > 0 && (
          <>
            <button onClick={downloadCSV} style={{ marginTop: '20px', display: 'block' }}>
              Download CSV
            </button>
            all done
          </>
        )}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '10px' }}>Loading...</div>
            {/* Loading spinner */}
            <div style={{ borderTop: "4px solid rgba(0, 0, 0, .1)", borderRight: "4px solid rgba(0, 0, 0, .1)", borderBottom: "4px solid rgba(0, 0, 0, .1)", borderLeft: "4px solid #000", borderRadius: "50%", width: "24px", height: "24px", animation: "spin 1s linear infinite" }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}
        <p>Pages loaded: {page - 1}</p>
        <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Holder Address</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {holders.map((holder, index) => (
                <tr key={index}>
                  <td>{holder.number}</td>
                  <td>{holder.owner}</td>
                  <td>{holder.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default HoldersPage;
