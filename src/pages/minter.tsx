import * as React from 'react';
import { toast } from 'react-toastify';
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { ExternalLinkIcon } from '@heroicons/react/outline';

const nftImageUrl = "https://nothingdao.vercel.app/nft.png";
const nftExternalUrl = "https://nothingdao.vercel.app/";

const Finished = () => {
  const [apiUrl, setApiUrl] = React.useState<string>("");
  const [nft, setNft] = React.useState<string>("");
  const [nftImage, setNftImage] = React.useState<string>("");

  const { connection } = useConnection();
  const { publicKey } = useWallet();

  console.log("PUBLIC KEY", publicKey);


  const mintCompressedNft = async (event: { preventDefault: () => void }) => {
    // prevent react app from resetting
    event.preventDefault();

    // make api call to create cNFT
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'nothingdao-0-0-0',
        method: 'mintCompressedNft',
        params: {
          name: "NIL_0.0.0",
          symbol: 'NIL',
          owner: publicKey,
          description:
            "Probably nothing",
          attributes: [
            {
              trait_type: 'Utility',
              value: 'Yes',
            },
          ],
          imageUrl: nftImageUrl,
          externalUrl: nftExternalUrl,
          sellerFeeBasisPoints: 6900,
        },
      })
    });

    const { result } = await response.json();
    console.log("RESULT", result);

    if (!result) {
      toast.error("Request failed")
      throw "Request failed"
    }

    setNft(result.assetId);

    fetchNFT(result.assetId, event);
  };

  // fetch nft after it's minted
  const fetchNFT = async (assetId: string, event: { preventDefault: () => void }) => {
    // prevent app from reloading
    event.preventDefault();

    // api call to fetch nft
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'applicaiton/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getAsset',
        params: {
          id: assetId
        }
      })
    });

    // extrapolate api response
    const { result } = await response.json();

    // set nft image in state variable
    setNftImage(result.content.links.image);

    // return api result
    return { result };
  };

  // display function outputs to ui
  const outputs = [
    {
      title: 'Asset ID...',
      dependency: nft,
      href: `https://xray.helius.xyz/token/${nft}?network=devnet`,
    }
  ];

  // set api url onload
  React.useEffect(() => {
    setApiUrl(
      connection.rpcEndpoint.includes("devnet")
        ? "https://devnet.helius-rpc.com/?api-key=265b8b98-8025-41f1-9336-667e8d569ab7"
        : "https://mainnet.helius-rpc.com/?api-key=265b8b98-8025-41f1-9336-667e8d569ab7"
    );
  }, [connection]);

  return (
    <main className='max-w-7xl grid grid-cols-1 sm:grid-cols-6 gap-4 p-4'>
      <form onSubmit={event => mintCompressedNft(event)} className='rounded-xs min-h-content p-4 sm:col-span-6 lg:col-start-2 lg:col-end-6'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg sm:text-2xl'>
            cNFT Minter
          </h2>
          <button
            type='submit'
            className='bg-helius-orange rounded-sm py-1 sm:py-2 px-4 font-semibold transition-all duration-200 border border-neutral  disabled:opacity-50 disabled:hover:bg-helius-orange hover: disabled:cursor-not-allowed'
            disabled={!publicKey || !connection}
          >
            Mint
          </button>
        </div>

        <div className='text-sm font-semibold mt-8 border border-neutral rounded-sm p-2'>
          <ul className='p-2'>
            {outputs.map(({ title, dependency, href }, index) => (
              <li key={title} className={`flex justify-between items-center ${index !== 0 && 'mt-4'}`}>
                <p className='tracking-wider'>{title}</p>
                {
                  dependency &&
                  <a
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex text-[#80ebff] italic hover:text-white transition-all duration-200'
                  >
                    {dependency.toString().slice(0, 25)}...
                    <ExternalLinkIcon className='w-5 ml-1' />
                  </a>
                }
              </li>
            ))}
          </ul>
        </div>

        <div className='mt-8 border border-neutral rounded-sm p-4 h-[400px] flex justify-center items-center'>
          {
            nftImage // if nftImage exists, render image, otherwise render text
              ?
              <img
                width={300}
                height={300}
                src={nftImage}
                className='rounded-sm border border-neutral '
              />
              :
              <>
                {/* NFT Image Goes Here */}
              </>
          }
        </div>
      </form>
    </main>
  );
};

export default Finished;
