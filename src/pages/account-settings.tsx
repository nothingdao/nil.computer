// sr/pages/swap-page.tsx
import { useWallet } from '@solana/wallet-adapter-react';

const AccountPage = () => {
  const { publicKey } = useWallet();


  return (


    <div className="flex items-center justify-center">

      <div className="p-4">
        <div className="">
          <h1 className="mt-12">Account Settings Page</h1>
          <div className="w-96 mt-4">

            <p className='text-xs'>Connected Wallet: {publicKey ? publicKey.toBase58() : 'N/A'}</p>
            <label className="input input-bordered flex items-center gap-2 mt-2">
              Account Name
              <input type="text" className="grow" placeholder="Snout" />
            </label>
            <p className='mt-2 text-xs'>This is the name or label that that represents your connected wallet.</p>
            <hr className="my-4" />
            <label className="input input-bordered flex items-center gap-2 mt-6">
              RPC ENDPOINT
              <input type="text" className="grow" placeholder="https://burned-rough-morning.solana-mainnet.quiknode.pro/403ec683bc1854ed5c17dd769aa41769c1b6061d/" />
            </label>
            <hr className="my-4" />

            <label className="input input-bordered flex items-center gap-2 mt-4 mb-2">
              HELIUS API KEY
              <input type="text" className="grow" placeholder="265b8b98-8025-41f1-9336-667e8d569ab7" />
            </label>
            <span className='text-xs'>Acquire credentials from <a className="link" target="_blank" href="https://dev.helius.xyz/">helius</a> in order to take full advanage of this application.</span>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info">
                <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
                <div tabIndex={0} className="card-body">
                  <p> There are no shared resources supplied to our user base by design. </p>
                  <p>Each account, will attain these resources according to their needs. Your mileage will vary as your volume might demand.</p><p>A free account with helius should suffice for most users.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  );
};

export default AccountPage;
