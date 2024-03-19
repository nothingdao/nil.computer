import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import TokenChart from '../components/TokenChart';
import TokenSwap from '../components/TokenSwap';
import TokenChartNavigation from '../components/TokenChartNavigation';


const TokenPage = () => {
  const [ladderSettings, setLadderSettings] = useState(null);
  const handleLadderChange = (settings) => {
    setLadderSettings(settings);
  };

  const router = useRouter();
  const { mintAddress } = router.query;
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      if (typeof mintAddress !== 'string') return;
      const url = `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'fetch-asset-details',
            method: 'getAsset',
            params: {
              id: mintAddress,
              displayOptions: {
                showFungible: true,
              },
            },
          }),
        });
        const jsonResponse = await response.json();
        console.log('jsonResponse:', jsonResponse);

        setTokenData(jsonResponse.result);
      } catch (error) {
        console.error('Failed to fetch token details:', error);
      }
    };

    fetchTokenDetails();
  }, [mintAddress]);

  return (
    <div>
      <Head>
        <title>Token Details</title>
      </Head>
      <main className="flex h-screen">
        {tokenData ? (
          <>

            <div className="flex-1 p-4">
              <TokenChartNavigation />
              <TokenChart ladderSettings={ladderSettings} />
            </div>

            <div className="flex-2 p-4 w-1/2 2xl:w-1/3">
              <TokenSwap onLadderChange={handleLadderChange} />

              <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">{tokenData.content.metadata.name || 'Token Name Unavailable'}</h1>
                <p className="mb-2">Symbol: {tokenData.token_info.symbol || 'N/A'} - Price: ${tokenData.token_info.price_info.price_per_token}</p>
                <p className="mb-4">Description: {tokenData.content.metadata.description || 'N/A'}</p>
                {tokenData.content.files && tokenData.content.files.length > 0 && (
                  <div className="flex flex-wrap mb-4">
                    {tokenData.content.files.map((file, index) => (
                      <div key={index} className="w-24 h-24 rounded-full overflow-hidden mr-4 mb-4">
                        <img src={file.cdn_uri || file.uri} alt={`Token Image ${index}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                <p>ID: {tokenData.id}</p>
                <p>Interface: {tokenData.interface}</p>
                <p>JSON URI: {tokenData.content.json_uri}</p>
                <p>Links Image: {tokenData.content.links.image}</p>
                <p>Authorities Address: {tokenData.authorities.map((authority) => authority.address).join(', ')}</p>
                <p>Authorities Scopes: {tokenData.authorities.map((authority) => authority.scopes.join(', ')).join(', ')}</p>
                <p>Compression Eligible: {tokenData.compression.eligible.toString()}</p>
                <p>Compression Compressed: {tokenData.compression.compressed.toString()}</p>
                <p>Compression Data Hash: {tokenData.compression.data_hash}</p>
                <p>Compression Creator Hash: {tokenData.compression.creator_hash}</p>
                <p>Compression Asset Hash: {tokenData.compression.asset_hash}</p>
                <p>Compression Tree: {tokenData.compression.tree}</p>
                <p>Compression Seq: {tokenData.compression.seq}</p>
                <p>Compression Leaf ID: {tokenData.compression.leaf_id}</p>
                <p>Royalty Model: {tokenData.royalty.royalty_model}</p>
                <p>Royalty Target: {tokenData.royalty.target}</p>
                <p>Royalty Percent: {tokenData.royalty.percent}</p>
                <p>Royalty Basis Points: {tokenData.royalty.basis_points}</p>
                <p>Royalty Primary Sale Happened: {tokenData.royalty.primary_sale_happened.toString()}</p>
                <p>Royalty Locked: {tokenData.royalty.locked.toString()}</p>
                <p>Creators: {tokenData.creators.map((creator) => creator.address).join(', ')}</p>
                <p>Ownership Frozen: {tokenData.ownership.frozen.toString()}</p>
                <p>Ownership Delegated: {tokenData.ownership.delegated.toString()}</p>
                <p>Ownership Delegate: {tokenData.ownership.delegate}</p>
                <p>Ownership Model: {tokenData.ownership.ownership_model}</p>
                <p>Ownership Owner: {tokenData.ownership.owner}</p>
                <p>Supply: {tokenData.supply}</p>
                <p>Mutable: {tokenData.mutable.toString()}</p>
                <p>Burnt: {tokenData.burnt.toString()}</p>
                <p>Token Info Symbol: {tokenData.token_info.symbol}</p>
                <p>Token Info Supply: {tokenData.token_info.supply}</p>
                <p>Token Info Decimals: {tokenData.token_info.decimals}</p>
                <p>Token Info Token Program: {tokenData.token_info.token_program}</p>
                <p>Token Info Price per Token: {tokenData.token_info.price_info.price_per_token}</p>
                <p>Token Info Currency: {tokenData.token_info.price_info.currency}</p>
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
