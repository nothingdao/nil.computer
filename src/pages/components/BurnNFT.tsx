// src/pages/components/BurnNFT.tsx
import React, { useCallback } from 'react';
// import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { Connection, PublicKey, Transaction, TransactionBlockhashCtor } from '@solana/web3.js';

import { useWallet } from '@solana/wallet-adapter-react';
import { createBurnCheckedInstruction, getAssociatedTokenAddress } from '@solana/spl-token';
import { toast } from 'react-toastify';


interface BurnNFTProps {
  mintAddress: string;
  asset: any; // Add this to receive the asset data
}

const BurnNFT: React.FC<BurnNFTProps> = ({ mintAddress, asset }) => {
  const { publicKey, sendTransaction } = useWallet();
  const rpcUrl = process.env.NEXT_PUBLIC_HELIUS_DEFAULT_RPC;
  const connection = new Connection(rpcUrl ?? '');

  const burnNFT = useCallback(async () => {
    if (!publicKey) {
      toast.error('Please connect your wallet');
      return;
    }

    if (!mintAddress) {
      toast.error('Mint address is undefined');
      return;
    }

    let toastId = null;  // Declare toastId outside of try-catch to ensure scope availability

    try {
      const mintPublicKey = new PublicKey(mintAddress);
      const associatedTokenAddress = await getAssociatedTokenAddress(mintPublicKey, publicKey);

      // const { blockhash } = await connection.getLatestBlockhash();
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

      const blockHashCtor: TransactionBlockhashCtor = {
        blockhash,
        lastValidBlockHeight,
      };

      const transaction = new Transaction({
        feePayer: publicKey,
        blockhashCtor: blockHashCtor, // Use the new TransactionBlockhashCtor interface
      }).add(
        createBurnCheckedInstruction(
          associatedTokenAddress,
          mintPublicKey,
          publicKey,
          1, // Assuming you want to burn 1 token
          0, // Assuming 0 decimals for NFT
        )
      );

      toastId = toast.loading('Waiting for wallet confirmation...');

      const signedTransaction = await sendTransaction(transaction, connection);
      toast.dismiss(toastId);
      console.log(`Transaction sent with signature: ${signedTransaction}`);

      const confirmation = await connection.confirmTransaction(signedTransaction, 'finalized');
      console.log('Transaction confirmation:', confirmation);

      toast.success(`Burn transaction successful: ${signedTransaction}`);
    } catch (error) {
      if (toastId !== null) {
        toast.dismiss(toastId);
      }
      console.error('Error burning NFT:', error);
      toast.error(`Error burning NFT: ${(error as Error).message}`);
    }
  }, [publicKey, mintAddress, sendTransaction, connection]);


  return (
    <>
      <p className='text-xs mt-2'>Mint Address: <a className='link' href={`https://solscan.io/token/${mintAddress}`} target="_blank" rel="noreferrer">{mintAddress}</a></p>
      <br />
      <img src={asset.content.files[0]?.uri || ''} alt={asset.content.metadata.name} className="w-full h-auto rounded-t-lg" />
      <p className="text-sm mt-2">
        {asset.ownership.frozen ? "This account is frozen, therefore this NFT cannot be burned. Consider hiding it by marking it as trash or try sending it the your worst enemy." : "This account is not frozen."}
      </p>
      <div className="join mt-4">
        <button className='btn btn-neutral join-item' onClick={burnNFT}>Burn</button>
        <button className='btn btn-neutral join-item' onClick={burnNFT}>Transfer</button>
        <button className='btn btn-neutral join-item' onClick={burnNFT}>Trash</button>
      </div>

    </>
  );
};


export default BurnNFT;
