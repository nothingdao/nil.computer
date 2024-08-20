// src/components/Layout.tsx
import React from 'react';
import Navigation from './Navigation';
import Link from 'next/link';
import { TbCurrencySolana, TbSettingsCog, TbArrowsExchange2, TbInbox } from 'react-icons/tb';
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { TbHistory } from "react-icons/tb";
import { TfiWallet } from "react-icons/tfi";


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-20 p-4 fixed top-0 left-0 right-0 z-10 border-b border-neutral bg-base-100">
        <Navigation />
      </header>
      <div className="flex flex-1 overflow-hidden pt-20 pb-12"> {/* Adjusted mt-20 to pt-20 */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        <aside className="flex-initial w-auto border-l border-neutral flex flex-col">
          <Link href="/dashboard">
            <span className="text-lg border-b border-neutral py-4 px-4 hover:cursor-pointer hover:bg-neutral"><TfiWallet />
            </span>
          </Link>
          <Link href="/transaction-history">
            <span className="text-lg border-b border-neutral py-4 px-4 hover:cursor-pointer hover:bg-neutral"><TbHistory />
            </span>
          </Link>
          <Link href="/account-settings">
            <span className="text-lg border-b border-neutral py-4 px-4 hover:cursor-pointer hover:bg-neutral"><TbSettingsCog />
            </span>
          </Link>
          <Link href={'/nil'}><span className="text-sm border-b border-neutral py-4 px-4 text-center hover:cursor-pointer hover:bg-neutral" >NIL</span></Link>
        </aside>

      </div>
      <footer className="h-12 p-4 fixed bottom-0 left-0 right-0 z-10 border-t border-neutral bg-base-100">
        <div className="flex items-center">
          <TbCurrencySolana />
          <p className="text-xs text-thin mr-l"><span className="font-bold ml-2 mr-1">NIL</span> by @nothingdao</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
