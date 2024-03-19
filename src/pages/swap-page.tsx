// sr/pages/swap-page.tsx
import { useRouter } from 'next/router';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

const SwapPage = () => {
  const router = useRouter();
  const { publicKey } = useWallet();
  const [tokenA, setTokenA] = useState('');
  const [tokenB, setTokenB] = useState('');

  useEffect(() => {
    // Extract token information from URL parameters
    const { tokenA, tokenB } = router.query;
    if (tokenA && tokenB) {
      setTokenA(tokenA as string);
      setTokenB(tokenB as string);
    }
  }, [router.query]);

  const handleSwapTokens = () => {
    // Implement token swap logic using publicKey for transaction signing
    // Add your custom logic here
  };

  return (
    <div className="mt-48">
      {publicKey && <p>Wallet address: {publicKey.toBase58()}</p>}
      <h1>Swap Tokens</h1>
      <p>Token A: {tokenA}</p>
      <p>Token B: {tokenB}</p>
      <button onClick={handleSwapTokens}>Swap Tokens</button>
    </div>
  );
};

export default SwapPage;
