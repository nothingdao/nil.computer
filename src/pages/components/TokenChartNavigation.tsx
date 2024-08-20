// src/pages/components/TokenChartNavigation.tsx
import React, { useState } from 'react';

interface Options {
  method: 'GET';
  headers: {
    'x-chain': 'solana';
    'X-API-KEY': string;
  };
}

interface ChartData {
  data: {
    items: any[];
  };
}

const TokenChartNavigation = ({ onDataReceived }: { onDataReceived: (data: ChartData) => void }) => {
  const [timeRange, setTimeRange] = useState('1H');

  const options: Options = {
    method: 'GET',
    headers: { 'x-chain': 'solana', 'X-API-KEY': 'f414d0c9d64c44bfa68a7d63299c6463' }
  };

  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(event.target.value);
    fetchData(event.target.value);
  };

  const fetchData = (range: string) => {
    const startDate = new Date('2023-04-01T00:00:00Z');
    const endDate = new Date('2023-04-04T23:59:59Z');
    const startTimestampMillis = startDate.getTime();
    const endTimestampMillis = endDate.getTime();

    fetch(`https://public-api.birdeye.so/defi/history_price?address=So11111111111111111111111111111111111111112&address_type=token&type=${range}&time_from=${startTimestampMillis}&time_to=${endTimestampMillis}`, options)
      .then(response => response.json())
      .then(response => onDataReceived(response))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <select value={timeRange} onChange={handleTimeRangeChange}>
        <option value="1m">1m</option>
        <option value="3m">3m</option>
        <option value="5m">5m</option>
        <option value="15m">15m</option>
        <option value="30m">30m</option>
        <option value="1H">1H</option>
        <option value="2H">2H</option>
        <option value="4H">4H</option>
        <option value="6H">6H</option>
        <option value="8H">8H</option>
        <option value="12H">12H</option>
        <option value="1D">1D</option>
        <option value="3D">3D</option>
        <option value="1W">1W</option>
        <option value="1M">1M</option>
      </select>
    </div>
  );
};

export default TokenChartNavigation;
