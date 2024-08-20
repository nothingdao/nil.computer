import React from 'react';

const DexScreenerEmbed: React.FC = () => {
  return (
    <div>
      <style>
        {`
          #dexscreener-embed {
            position: relative;
            width: 100%;
            padding-bottom: 125%;
          }
          @media (min-width: 1400px) {
            #dexscreener-embed {
              padding-bottom: 65%;
            }
          }
          #dexscreener-embed iframe {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border: 0;
          }
        `}
      </style>
      <div id="dexscreener-embed">
        <iframe
          src="https://dexscreener.com/solana/8mY8bif63v5vAHYaHPhpob71K4uJsDKXVx7h9h1XmJ6N?embed=1&theme=dark&info=0"
          title="DexScreener Embed"
        ></iframe>
      </div>
    </div>
  );
};

export default DexScreenerEmbed;
