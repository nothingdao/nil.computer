import React, { useState } from 'react';
import LadderControl from './LadderControl';

const TokenSwap = ({ onLadderChange }) => { // Accept the prop from the parent component
  const [tokens] = useState([
    { symbol: 'USDC', imageUrl: 'https://jup.ag/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&w=48&q=75' },
    { symbol: 'BONKA', imageUrl: 'https://bafybeibh32qfakyjqnxl2p3zyndqmtubjcwkbiimk3qcb6v4wyzekmr5x4.ipfs.nftstorage.link/' }
  ]);
  const [payingToken, setPayingToken] = useState(tokens[0]);
  const [receivingToken, setReceivingToken] = useState(tokens[1]);
  const [payingAmount, setPayingAmount] = useState('');
  const [receivingAmount, setReceivingAmount] = useState('');

  const swapTokens = () => {
    setPayingToken(receivingToken);
    setReceivingToken(payingToken);
  };

  // This method is called when ladder settings are changed in the LadderControl component
  const handleLadderChange = (ladderSettings) => {
    console.log('Ladder settings changed:', ladderSettings);
    onLadderChange(ladderSettings); // Call the prop function to notify the parent component
  };

  return (
    <div className="p-4 space-y-4 border border-neutral">
      <ul className="menu menu-sm menu-horizontal bg-base-200">
        <li><a>Swap</a></li>
        <li><a>Limit</a></li>
        <li><a>Ladder</a></li>
      </ul>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-start gap-2">
          <img src={payingToken.imageUrl} alt={payingToken.symbol} className="w-10 h-10 rounded-full" />
          <div className="flex flex-col">
            <select
              className="select select-bordered w-full"
              value={payingToken.symbol}
              onChange={e => setPayingToken(tokens.find(t => t.symbol === e.target.value))}
            >
              {tokens.map(t => (
                <option key={t.symbol} value={t.symbol}>
                  {t.symbol}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              className="input input-bordered w-full mt-2"
              value={payingAmount}
              onChange={e => setPayingAmount(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-neutral" onClick={swapTokens}>
          ⇅
        </button>

        <div className="flex items-start gap-2">
          <img src={receivingToken.imageUrl} alt={receivingToken.symbol} className="w-10 h-10 rounded-full" />
          <div className="flex flex-col">
            <select
              className="select select-bordered w-full"
              value={receivingToken.symbol}
              onChange={e => setReceivingToken(tokens.find(t => t.symbol === e.target.value))}
            >
              {tokens.map(t => (
                <option key={t.symbol} value={t.symbol}>
                  {t.symbol}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              className="input input-bordered w-full mt-2"
              value={receivingAmount}
              onChange={e => setReceivingAmount(e.target.value)}
            />
          </div>
        </div>
      </div>

      <LadderControl onLadderChange={handleLadderChange} />
    </div>
  );
};

export default TokenSwap;
