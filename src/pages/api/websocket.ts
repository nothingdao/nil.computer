//src/pages/api/websocket.ts
import React, { useEffect, useState } from 'react';
import WebSocket from 'ws';

const TokenChart = ({ mintAddress }) => {
    const [socket, setSocket] = useState(null);
    const [timeFrame, setTimeFrame] = useState('1m');
    const [priceData, setPriceData] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('wss://localhost:3000/api/websocket');
        setSocket(ws);

        ws.onopen = () => {
            console.log('WebSocket connection established');
            ws.send(JSON.stringify({ type: 'SET_MINT_ADDRESS', data: { mintAddress } }));
            ws.send(JSON.stringify({ type: 'SET_TIME_FRAME', data: { timeFrame } }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // Handle incoming price updates
            setPriceData(data.priceData);
        };

        return () => {
            ws.close();
        };
    }, [mintAddress, timeFrame]);

    const handleTimeFrameChange = (newTimeFrame) => {
        setTimeFrame(newTimeFrame);
        socket.send(JSON.stringify({ type: 'SET_TIME_FRAME', data: { timeFrame: newTimeFrame } }));
    };

    return (
        <div>
            <select value={timeFrame} onChange={(e) => handleTimeFrameChange(e.target.value)}>
                <option value="1m">1 minute</option>
                <option value="15m">15 minutes</option>
                <option value="1h">1 hour</option>
                <option value="4h">4 hours</option>
            </select>
            {/* Render the chart with priceData */}
        </div>
    );
};

export default TokenChart;
