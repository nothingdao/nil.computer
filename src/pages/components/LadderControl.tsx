import React, { useState } from 'react';

const LadderControl = ({ onLadderChange }) => {
  const [startPrice, setStartPrice] = useState('');
  const [endPrice, setEndPrice] = useState('');
  const [numberOfOrders, setNumberOfOrders] = useState('');
  const [priceScale, setPriceScale] = useState('linear');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert string to number
    const parsedStartPrice = parseFloat(startPrice);
    const parsedEndPrice = parseFloat(endPrice);
    const parsedNumberOfOrders = parseInt(numberOfOrders, 10);

    onLadderChange({
      startPrice: parsedStartPrice,
      endPrice: parsedEndPrice,
      numberOfOrders: parsedNumberOfOrders,
      priceScale
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 border border-neutral">
      <div className="flex flex-col gap-2">
        <label>
          Start Price:
          <input
            type="number"
            value={startPrice}
            onChange={(e) => setStartPrice(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>
        <label>
          End Price:
          <input
            type="number"
            value={endPrice}
            onChange={(e) => setEndPrice(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>
        <label>
          Number of Orders:
          <input
            type="number"
            value={numberOfOrders}
            onChange={(e) => setNumberOfOrders(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>
        <label>
          Price Scale:
          <select
            value={priceScale}
            onChange={(e) => setPriceScale(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="linear">Linear</option>
            <option value="exponential">Exponential</option>
            <option value="fibonacci">Fibonacci</option>
          </select>
        </label>
        <button type="submit" className="btn btn-primary">
          Apply Ladder
        </button>
      </div>
    </form>
  );
};

export default LadderControl;
