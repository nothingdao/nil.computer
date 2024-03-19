import dynamic from 'next/dynamic';
import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import html2canvas from 'html2canvas'; // Import html2canvas library

const Sketch = dynamic(() => import('react-p5'), {
  ssr: false,
});

const nftExternalUrl = "https://nothingdao.vercel.app/";

const ModernAbstract = () => {
  const [key, setKey] = useState(Date.now());
  const p5Ref = useRef(null);
  const [apiUrl, setApiUrl] = React.useState<string>("");
  const [nft, setNft] = React.useState<string>("");
  const [nftImage, setNftImage] = React.useState<string>("");

  const { connection } = useConnection();
  const { publicKey } = useWallet();

  console.log("PUBLIC KEY", publicKey);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5Ref.current = p5;
    p5.background(0, 0); // Transparent background
    generateModernAbstract(p5); // Generate modern abstract art

    // Add text to the canvas
    p5.textSize(24);
    p5.fill(55); // White color
    p5.textFont('Jetbrains Mono, monospace');
    p5.textStyle(p5.THIN); // Make the text bold
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text('NIL_0.0.0', p5.width / 2, p5.height / 2); // Centered text
  };

  const draw = (p5) => {
    // No need for continuous animation, so leave draw function empty
  };

  const generateModernAbstract = (p5) => {
    p5.noFill();
    const numShapes = p5.random(20, 50); // Random number of shapes
    for (let i = 0; i < numShapes; i++) {
      const opacity = p5.random(50, 255); // Random opacity value
      const shapeColor = p5.color(p5.random(150, 255), p5.random(150, 255), p5.random(150, 255), opacity); // Random color with transparency
      p5.stroke(shapeColor);
      const x = p5.random(p5.width);
      const y = p5.random(p5.height);
      const size = p5.random(20, 200);
      const type = p5.random(['ellipse', 'rect']);
      if (type === 'ellipse') {
        p5.ellipse(x, y, size, size);
      } else if (type === 'rect') {
        p5.rect(x, y, size, size);
      }
    }
  };

  const generateArt = async () => {
    setKey(Date.now()); // Change the key to re-render the Sketch component
    await captureArt(); // Capture the generated art
  };

  const captureArt = async () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      try {
        const imageData = await html2canvas(canvas).then((canvas) => canvas.toDataURL());
        setNftImage(imageData); // Set the captured image data as nftImage
      } catch (error) {
        console.error('Error capturing art:', error);
      }
    }
  };

  const mintCompressedNft = async () => {
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
          description: "Probably nothing",
          attributes: [
            {
              trait_type: 'Utility',
              value: 'Yes',
            },
          ],
          imageUrl: nftImage, // Use the captured image as imageUrl
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
    fetchNFT(result.assetId);
  };

  const fetchNFT = async (assetId) => {
    // api call to fetch nft
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      <div className='flex flex-col items-center justify-center sm:col-span-6 lg:col-start-2 lg:col-end-6'>
        <h1 className='mt-12 mb-6'>NIL SHAPES</h1>
        <div className='border border-neutral'>
          <Sketch key={key} setup={setup} draw={draw} />
        </div>
        <div className='join'>
          <button className='mt-6 btn btn-sm border-neutral join-item' onClick={generateArt}>
            GENERATE ART
          </button>
          <button className='mt-6 btn btn-sm border-neutral join-item' onClick={mintCompressedNft}>
            MINT cNFT
          </button>
        </div>
      </div>
      <div className='sm:col-span-6 lg:col-start-2 lg:col-end-6'>
        <div className='mt-8 border border-neutral rounded-sm p-4 h-[400px] flex justify-center items-center'>
          {nftImage ? (
            <img width={300} height={300} src={nftImage} className='rounded-sm border border-neutral ' />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default ModernAbstract;
