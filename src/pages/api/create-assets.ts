import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('Request Body:', req.body);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { ownerAddress, assets } = req.body;

    if (!ownerAddress || !assets || assets.length === 0) {
        return res.status(400).json({ error: 'Missing owner address or assets data' });
    }

    try {
        const user = await prisma.user.upsert({
            where: { owner_address: ownerAddress },
            update: {},
            create: { owner_address: ownerAddress },
        });
        console.log('Retrieved user:', user);

        const assetPromises = await Promise.all(
            assets.map(async (asset) => {
                const {
                    token_info,
                    content,
                    authorities,
                    compression,
                    grouping,
                    royalty,
                    creators,
                    ownership,
                    mint_extensions,
                    supply = {},
                    ...flatFields
                } = asset;

                const { print_max_supply = null, print_current_supply = null, edition_nonce = null } = supply || {};

                const assetData = {
                    ...flatFields,
                    print_max_supply,
                    print_current_supply,
                    edition_nonce,
                    content_schema: content?.$schema,
                    content_jsonUri: content?.json_uri,
                    content_files: content?.files,
                    content_metadata_name: content?.metadata?.name,
                    content_metadata_symbol: content?.metadata?.symbol,
                    content_metadata_description: content?.metadata?.description,
                    content_metadata_token_standard: content?.metadata?.token_standard,
                    content_links_image: content?.links?.image,
                    content_links_external_url: content?.links?.external_url,
                    authorities: JSON.stringify(authorities),
                    compression_eligible: compression?.eligible,
                    compression_compressed: compression?.compressed,
                    compression_data_hash: compression?.data_hash,
                    compression_creator_hash: compression?.creator_hash,
                    compression_asset_hash: compression?.asset_hash,
                    compression_tree: JSON.stringify(compression?.tree),
                    compression_seq: compression?.seq,
                    compression_leaf_id: compression?.leaf_id,
                    grouping: JSON.stringify(grouping),
                    royalty_royalty_model: royalty?.royalty_model,
                    royalty_target: royalty?.target,
                    royalty_percent: royalty?.percent,
                    royalty_basis_points: royalty?.basis_points,
                    royalty_primary_sale_happened: royalty?.primary_sale_happened,
                    royalty_locked: royalty?.locked,
                    creators: JSON.stringify(creators),
                    ownership_frozen: ownership?.frozen,
                    ownership_delegated: ownership?.delegated,
                    ownership_delegate: ownership?.delegate,
                    ownership_ownership_model: ownership?.ownership_model,
                    ownership_owner: ownership?.owner,
                    token_info_symbol: token_info?.symbol,
                    token_info_supply: token_info?.supply?.toString(),
                    token_info_decimals: token_info?.decimals,
                    token_info_token_program: token_info?.token_program,
                    token_info_associated_token_address: token_info?.associated_token_address,
                    mutable: asset.mutable,
                    burnt: asset.burnt,
                    mint_extensions: JSON.stringify(mint_extensions),
                };

                console.log('Upserting asset with data:', assetData);

                const upsertedAsset = await prisma.asset.upsert({
                    where: { id: asset.id },
                    update: assetData,
                    create: assetData,
                });

                console.log('Upserted Asset:', upsertedAsset);

                // Only attempt to create or update userAsset for FungibleToken assets with a balance
                if (asset.interface === 'FungibleToken' && token_info?.balance !== undefined) {
                    console.log(
                        'Attempting to upsert UserAsset for userId:',
                        user.id,
                        'and assetId:',
                        asset.id,
                        'with balance:',
                        token_info.balance
                    );

                    try {
                        const upsertedUserAsset = await prisma.userAsset.upsert({
                            where: { userId_assetId: { userId: user.id, assetId: asset.id } },
                            update: { balance: token_info.balance.toString() },
                            create: {
                                userId: user.id,
                                assetId: asset.id,
                                balance: token_info.balance.toString(),
                            },
                        });
                        console.log('Upserted UserAsset:', upsertedUserAsset);
                    } catch (error) {
                        if (error.code === 'P2002') {
                            console.error('Unique constraint violation for userId:', user.id, 'and assetId:', asset.id);
                        } else {
                            console.error('Error upserting UserAsset:', error);
                        }
                    }
                } else {
                    console.log(
                        'Skipping UserAsset upsert for userId:',
                        user.id,
                        'and assetId:',
                        asset.id,
                        'as it is not a FungibleToken asset or has no balance'
                    );
                }
            })
        );

        await Promise.all(assetPromises);
        return res.status(200).json({ message: 'Assets and UserAssets saved to database successfully.' });
    } catch (error) {
        console.error('Error handling assets:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}

export default handler;
