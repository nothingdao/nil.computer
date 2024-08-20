// src/pages/api/get-assets-prices.ts
import { NextApiRequest, NextApiResponse } from 'next';

const JUPITER_PRICE_API_URL = 'https://price.jup.ag/v4/price';

type TokenPrice = {
    id: string;
    mintSymbol: string;
    vsToken: string;
    vsTokenSymbol: string;
    price: number;
};

type JupiterPriceResponse = {
    data: Record<string, TokenPrice>;
    timeTaken: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { ids, vsToken = 'USDC' } = req.query;

        if (!ids || typeof ids !== 'string') {
            return res.status(400).json({ error: 'Missing or invalid "ids" parameter' });
        }

        const tokenIds = ids.split(',');

        try {
            const response = await fetch(`${JUPITER_PRICE_API_URL}?ids=${tokenIds.join(',')}&vsToken=${vsToken}`);
            const data: JupiterPriceResponse = await response.json();

            if (!response.ok) {
                throw new Error(`Failed to fetch prices: ${response.statusText}`);
            }

            return res.status(200).json(data);
            console.log('Fetched token prices:', data);
        } catch (error) {
            console.error('Error fetching token prices:', error);
            return res.status(500).json({ error: 'Failed to fetch token prices' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};

export default handler;
