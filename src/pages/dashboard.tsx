// src/pages/dashboard.tsx
import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useWallet } from '@solana/wallet-adapter-react';
import TokenBrowser from './components/TokenBrowser';

const DashboardPage: NextPage = () => {
  const wallet = useWallet();

  console.log('DashboardPage: wallet.publicKey:', wallet.publicKey);

  return (
    <div>
      <Head>
        <title>NIL: Wallet Browser</title>
        <meta name="description" content="View your wallet's dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          {wallet.publicKey && (
            <TokenBrowser ownerAddress={wallet.publicKey.toBase58()} />
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
