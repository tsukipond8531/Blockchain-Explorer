// src/routes/search/block/hash/[blockHash]/+page.server.ts
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
  const { blockHash } = params;

  const apiUrl = `https://api.whatsonchain.com/v1/bsv/main/block/hash/${blockHash}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch block data: ${response.statusText}`);
    }

    const blockData = await response.json();

    const formattedData = {
      'Block Hash': blockData.hash,
      'Block Height': blockData.height,
      Timestamp: new Date(blockData.time * 1000).toISOString(),
      'Number of Transactions': blockData.txcount || blockData.num_tx,
      Size: blockData.size,
      Transactions: blockData.tx,
    };
    console.log(blockData)
    return {
      blockData: formattedData,
    };
    
  } catch (err) {
    console.error('Error fetching block data:', err);
    throw error(500, 'Failed to load block data');
  }
};
