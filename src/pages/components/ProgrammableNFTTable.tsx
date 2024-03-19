import React, { useState } from 'react';
import ProgrammableNFTComponent from './ProgrammableNFTComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProgrammableNFTTableProps {
  assets: any[];
}

const ProgrammableNFTTable: React.FC<ProgrammableNFTTableProps> = ({ assets }) => {
  const notify = () => toast("Wow so easy!");

  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [lastIndex, setLastIndex] = useState<number | null>(null);

  const handleSelectAsset = (index: number, isShiftKey: boolean) => {
    if (isShiftKey && lastIndex !== null) {
      // Determine the start and end indices for the range
      const start = Math.min(lastIndex, index);
      const end = Math.max(lastIndex, index);

      // Get the current state of the first item in the range to decide if we should select or deselect the range
      const shouldSelect = !selectedIndices.includes(start);

      let updatedSelectedIndices = new Set(selectedIndices);
      for (let i = start; i <= end; i++) {
        if (shouldSelect) {
          updatedSelectedIndices.add(i);
        } else {
          updatedSelectedIndices.delete(i);
        }
      }

      setSelectedIndices(Array.from(updatedSelectedIndices));
    } else {
      // For a single click, toggle the selection of the single index
      let updatedSelectedIndices = new Set(selectedIndices);
      if (updatedSelectedIndices.has(index)) {
        updatedSelectedIndices.delete(index);
      } else {
        updatedSelectedIndices.add(index);
      }
      setSelectedIndices(Array.from(updatedSelectedIndices));
    }

    setLastIndex(index);
  };



  const isSelected = (index: number) => selectedIndices.includes(index);

  return (
    <div>
      {selectedIndices.length > 0 && (
        <div className="menu-bar p-2 rounded-lg mb-4">
          <div>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
          <button onClick={notify} className='className="btn btn-md mr-2'>Notify!</button>
          <button className="btn btn-md mr-2" onClick={() => document.getElementById('my_modal_5').showModal()}>Burn</button>
          <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Press ESC key or click the button below to close</p>
              <button onClick={notify} className='className="btn btn-md mr-2'>Notify!</button>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          <button className="btn btn-md" onClick={() => document.getElementById('my_modal_5').showModal()}>Transfer</button>
          <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Press ESC key or click the button below to close</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>


        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {assets.map((asset, index) => (
          <ProgrammableNFTComponent
            key={index}
            asset={asset}
            isChecked={isSelected(index)}
            onCheckboxChange={(event) => handleSelectAsset(index, event.shiftKey)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgrammableNFTTable;
