import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const TokenChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      width: 800,
      height: 600,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add a line series
    const lineSeries = chart.addLineSeries();

    // Set the data
    lineSeries.setData([
      { time: "2023-03-08", value: 100 },
      { time: "2023-03-09", value: 105 },
      { time: "2023-03-10", value: 100 },
    ]);
  }, []);

  return <div ref={chartRef} />;
};

export default TokenChart;



// import React, { useEffect, useRef } from 'react';
// import { createChart } from 'lightweight-charts';

// interface PriceData {
//   address: string;
//   dateTime?: Date | number; // dateTime can be a Date object, a Unix timestamp, or undefined
//   value: number;
// }

// interface ChartData {
//   data: {
//     items: PriceData[];
//   };
// }

// const TokenChart = ({ data }: { data: ChartData }) => {
//   const chartContainerRef = useRef(null);
//   const chartRef = useRef(null);



//     chartRef.current = createChart(chartContainerRef.current, chartOptions);
//     const candlestickSeries = chartRef.current.addCandlestickSeries({
//       upColor: '#4bffb5',
//       downColor: '#ff4976',
//       borderVisible: true,
//       borderColor: '#454545',
//       wickUpColor: '#4bffb5',
//       wickDownColor: '#ff4976',
//     });

//     data.data.items.forEach((item) => {
//       const dateTime = item.dateTime;
//       if (dateTime !== undefined) {
//         const time = typeof dateTime === 'number' ? dateTime / 1000 : dateTime.getTime() / 1000;

//         candlestickSeries.update({
//           time,
//           open: item.value,
//           high: item.value,
//           low: item.value,
//           close: item.value,
//         });
//       }
//     });

//     chartRef.current.timeScale().fitContent();

//     return () => {
//       chartRef.current.remove();
//     };
//   }, [data]);

//   return <div ref={chartContainerRef} style={{ width: '100%', height: '500px' }}></div>;
// };

// export default TokenChart;
