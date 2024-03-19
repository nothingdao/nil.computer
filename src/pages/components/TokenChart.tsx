import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const TokenChart = ({ ladderSettings }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      height: 300,
      layout: {
        background: { type: 'solid', color: 'transparent' },
        textColor: '#999',
        fontFamily: 'Arial',
        fontSize: 12,
      },
      grid: {
        vertLines: {
          color: '#333',
          style: 4,
          visible: true,
        },
        horzLines: {
          color: '#333',
          style: 4,
          visible: true,
        },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: '#fff',
          width: 0.5,
          style: 1,
          visible: true,
          labelVisible: true,
        },
        horzLine: {
          color: '#fff',
          width: 0.5,
          style: 1,
          visible: true,
          labelVisible: true,
        },
      },
      priceScale: {
        borderColor: '#333',
        scaleMargins: {
          top: 0.30,
          bottom: 0.25,
        },
        autoScale: true,
      },
      timeScale: {
        borderColor: '#333',
        rightOffset: 10,
        barSpacing: 5,
      },
      localization: {
        locale: 'en-US',
      },
      watermark: {
        color: '#eee',
        visible: true,
        text: 'USDC / BONKA',
        fontSize: 12,
        horzAlign: 'left',
        vertAlign: 'top',
      },
    };

    chartRef.current = createChart(chartContainerRef.current, chartOptions);
    const candlestickSeries = chartRef.current.addCandlestickSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderVisible: true,
      borderColor: '#454545',
      wickUpColor: '#4bffb5',
      wickDownColor: '#ff4976',
    });

    const data = [
      { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
      { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 },
      { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
      { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
      { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 },
      { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
      { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 },
      { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 },
      { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 },
      { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
    ];

    candlestickSeries.setData(data);
    chartRef.current.timeScale().fitContent();

    return () => {
      chartRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (!ladderSettings || !chartRef.current) return;

    const lineSeries = chartRef.current.addLineSeries();
    const { startPrice, endPrice, numberOfOrders } = ladderSettings;
    const stepSize = (endPrice - startPrice) / (numberOfOrders - 1);

    for (let i = 0; i < numberOfOrders; i++) {
      const price = startPrice + stepSize * i;
      lineSeries.createPriceLine({
        price: price,
        color: 'rgba(100, 149, 237, 0.6)',
        lineWidth: 1,
        lineStyle: 0,
      });
    }
  }, [ladderSettings]); // Dependency array ensures this effect runs when ladderSettings change

  return <div ref={chartContainerRef} style={{ width: '100%', height: '500px' }}></div>;
};

export default TokenChart;


