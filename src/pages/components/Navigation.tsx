import Link from "next/link";
import LocaleStorageSettings from "./LocaleStorageSettings";
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import ThemeToggle from "./ThemeToggle";


const WalletMultiButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton), { ssr: false });

export default function Navigation() {
  const wallet = useWallet();

  return (
    <div className="flex justify-between items-center">
      <div>
        <nav>
          <Link href={'/'}><span className="text-3xl hover:cursor-pointer hover:text-stone-500" >∅</span></Link>
        </nav>
        <LocaleStorageSettings />
      </div>

      <div className="flex items-center">
        {/* Elements to the right */}
        <ThemeToggle />
        {/* Uncomment if you want the wallet button to the right of the theme toggle */}
        <div className=""> {/* Add margin for spacing */}
          <WalletMultiButton
            className=""
          />
        </div>
      </div>
    </div>
  );
}
