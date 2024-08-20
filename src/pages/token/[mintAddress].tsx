// src/pages/token/[mintAddress].tsx
// src/pages/token/[mintAddress].tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ExternalLinkIcon } from '@heroicons/react/outline';

const TokenPage = () => {
  const router = useRouter();
  const { mintAddress } = router.query;
  const [tokenData, setTokenData] = useState(null);
  const [price, setPrice] = useState(null);
  const [ownershipPercentage, setOwnershipPercentage] = useState(0);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      if (typeof mintAddress !== 'string') return;

      try {
        const userId = '1'; // Replace with the actual user ID
        const response = await fetch(`/api/get-token?mintAddress=${mintAddress}&userId=${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch token details: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Token data:', data);

        setTokenData(data);
        calculateOwnershipPercentage(data);

        // Fetch the price from the price API
        const priceResponse = await fetch(`/api/get-assets-prices?ids=${mintAddress}`);
        if (!priceResponse.ok) {
          throw new Error(`Failed to fetch token price: ${priceResponse.statusText}`);
        }
        const priceData = await priceResponse.json();
        setPrice(priceData.data[mintAddress]?.price);
      } catch (error) {
        console.error('Failed to fetch token details or price:', error);
      }
    };

    fetchTokenDetails();
  }, [mintAddress]);

  const calculateOwnershipPercentage = (data) => {
    const balance = parseInt(data.balance);
    const supply = parseInt(data.asset.supply);

    if (isNaN(balance) || isNaN(supply) || supply === 0) {
      setOwnershipPercentage(0);
      return;
    }

    const percentage = (balance / supply) * 100;
    setOwnershipPercentage(percentage);
  };

  const externalLinks = [
    { href: `https://birdeye.so/token/${tokenData?.asset.id}`, label: 'BE' },
    { href: `https://dexscreener.com/solana/${tokenData?.asset.id}`, label: 'DS' },
    { href: `https://solscan.io/token/${tokenData?.asset.id}`, label: 'SS' },
    { href: `https://rugcheck.xyz/tokens/${tokenData?.asset.id}`, label: 'RC' },
    { href: `https://xray.helius.xyz/token/${tokenData?.asset.id}`, label: 'XR' },
    { href: `https://analytics.step.finance/defionsolana/token?mint=${tokenData?.asset.id}`, label: 'SF' },
  ];

  return (
    <div>
      <Head>
        <title>NIL</title>
        <meta name="description" content="View your wallet's dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen">
        {tokenData ? (
          <>
            <div className="flex-1 p-4">
              {/* todo: token chart */}
            </div>

            <div className="flex-2 p-4 w-1/2 2xl:w-1/3">
              <div className="">
                <div>
                  <div className="py-6 float-end">
                    {externalLinks.map((link, index) => (
                      <React.Fragment key={index}>
                        <a
                          className="text-xs border border-outline border-neutral p-1 mr-1"
                          target="_blank"
                          href={link.href}
                        >
                          {link.label}
                        </a>

                        {index < externalLinks.length - 1}
                      </React.Fragment>
                    ))}

                    <ExternalLinkIcon className='w-6 text-xs border border-outline border-base-100 p-1 mr-1 float-end' />
                  </div>

                  <h1 className="text-2xl font-bold mb-4">{tokenData.asset.content_metadata_name || 'Token Name Unavailable'}</h1>

                  <p className="text-lg">${tokenData.asset.content_metadata_symbol || 'N/A'} &middot; ${price}</p>

                  <p className="text-xs py-4">{tokenData.asset.content_metadata_description || 'N/A'}</p>

                  <p>Total Supply: {tokenData.asset.supply}</p>
                  <p>Balance: {tokenData.balance}</p>
                  <p>Ownership Percentage: {ownershipPercentage.toFixed(4)}%</p>

                  {tokenData.asset.content_files && tokenData.asset.content_files.length > 0 && (
                    <div className='py-4'>
                      <div className="flex flex-wrap">
                        {tokenData.asset.content_files.map((file, index) => (
                          <div key={index} className="w-24 h-24 rounded-full overflow-hidden mr-4 mb-4">
                            <img src={file.cdn_uri || file.uri} alt={`Token Image ${index}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

export default TokenPage;
