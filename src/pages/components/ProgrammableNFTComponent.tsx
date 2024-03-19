import React from 'react';

const ProgrammableNFTComponent = ({ asset, isChecked, onCheckboxChange }) => {
  return (
    <div className="border border-neutral p-2 rounded-lg relative">
      <input
        type="checkbox"
        className="mt-2 ml-2 absolute checkbox"
        checked={isChecked}
        onChange={onCheckboxChange}
      />
      <img src={asset.content.files[0]?.uri || ''} alt={asset.content.metadata.name} className="w-full h-auto rounded-t-lg" />
      <div className="p-2 flex flex-col justify-between h-full">
        <div>
          <h5 className="text-lg font-bold">{asset.content.metadata.name}</h5>
          <p>{asset.content.metadata.symbol}</p>
          <p className="text-xs">{asset.content.metadata.description}</p>
        </div>
        {/* <div className='bottom-0 right-0 absolute'>
          <div className="dropdown dropdown-top dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">Manage</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a href="#">Transfer</a></li>
              <li><a href="#">Burn</a></li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProgrammableNFTComponent;
