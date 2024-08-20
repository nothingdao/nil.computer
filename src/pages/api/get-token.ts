// pages/api/get-token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { mintAddress, userId } = req.query;

    if (typeof mintAddress !== 'string' || typeof userId !== 'string') {
        return res.status(400).json({ error: 'Invalid mintAddress or userId' });
    }

    try {
        const userAsset = await prisma.userAsset.findUnique({
            where: {
                userId_assetId: {
                    userId: parseInt(userId),
                    assetId: mintAddress,
                },
            },
            include: {
                asset: true,
            },
        });

        if (!userAsset) {
            return res.status(404).json({ error: 'User asset not found' });
        }

        return res.status(200).json(userAsset);
    } catch (error) {
        console.error('Error fetching user asset details:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
