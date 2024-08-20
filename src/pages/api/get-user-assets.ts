// pages/api/get-user-assets.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { ownerAddress } = req.query;

    if (!ownerAddress || typeof ownerAddress !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid owner address' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { owner_address: ownerAddress },
            include: {
                userAssets: {
                    include: {
                        asset: true,
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const assets = user.userAssets.map((ua) => ({
            id: ua.asset.id,
            interface: ua.asset.interface,
            content_metadata_name: ua.asset.content_metadata_name,
            content_metadata_symbol: ua.asset.content_metadata_symbol,
            token_info_balance: ua.balance,
            token_info_symbol: ua.asset.token_info_symbol,
            token_info_supply: ua.asset.token_info_supply,
            token_info_decimals: ua.asset.token_info_decimals,
            asset: {
                ...ua.asset,
                content_schema: ua.asset.content_schema,
                content_jsonUri: ua.asset.content_jsonUri,
                content_files: ua.asset.content_files,
                content_metadata_description: ua.asset.content_metadata_description,
                content_metadata_token_standard: ua.asset.content_metadata_token_standard,
                content_links_image: ua.asset.content_links_image,
                content_links_external_url: ua.asset.content_links_external_url,
            },
        }));

        return res.status(200).json({ assets });
    } catch (error) {
        console.error('Error fetching user assets:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
