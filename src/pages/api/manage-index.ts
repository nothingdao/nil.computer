// src/pages/api/manage-index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            // Retrieve the user's indexes
            try {
                const { ownerAddress } = req.query;

                if (!ownerAddress || typeof ownerAddress !== 'string') {
                    res.status(400).json({ error: 'Missing or invalid ownerAddress' });
                    return;
                }

                const user = await prisma.user.findUnique({
                    where: { owner_address: ownerAddress },
                    include: {
                        indexes: {
                            include: {
                                assets: {
                                    include: {
                                        asset: true,
                                    },
                                },
                            },
                        },
                    },
                });

                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                    return;
                }

                res.status(200).json(user.indexes);
            } catch (error) {
                console.error('Error retrieving indexes:', error);
                res.status(500).json({ error: 'Failed to retrieve indexes', details: error.message });
            }
            break;

        case 'POST':
            // Handle the creation of a new category or index
            try {
                const { name, description, public: isPublic, ownerAddress, assetIds } = req.body;

                // Retrieve the user ID based on the ownerAddress
                const user = await prisma.user.findUnique({
                    where: { owner_address: ownerAddress },
                });

                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                    return;
                }

                const newIndex = await prisma.index.create({
                    data: {
                        name,
                        description,
                        public: isPublic,
                        createdBy: user.id,
                        assets: {
                            create: assetIds.map((assetId: string) => ({
                                asset: { connect: { id: assetId } },
                            })),
                        },
                    },
                    include: {
                        assets: {
                            include: {
                                asset: true,
                            },
                        },
                    },
                });

                res.status(200).json(newIndex);
            } catch (error) {
                console.error('Error creating index:', error);
                res.status(500).json({ error: 'Failed to create index', details: error.message });
            }
            break;

        case 'PUT':
        // Handle the updating of an existing category or index
        // ...

        case 'DELETE':
        // Handle the deletion of a category or index
        // ...

        default:
            res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
