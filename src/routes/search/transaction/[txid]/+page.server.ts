// src/routes/search/transaction/[txid]/+page.server.ts
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
  const { txid } = params;

  const apiUrl = `https://api.whatsonchain.com/v1/bsv/main/tx/hash/${txid}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch transaction data: ${response.statusText}`);
    }

    const transactionData = await response.json();

    const formattedData = {
      'Transaction ID': transactionData.txid,
      Inputs: transactionData.vin,
      Outputs: transactionData.vout,
      Amount: transactionData.vout.reduce((sum: number, vout: any) => sum + vout.value, 0),
      Timestamp: transactionData.time ? new Date(transactionData.time * 1000).toISOString() : null,
      'Block Hash': transactionData.blockhash,
    };

    return {
      transaction: formattedData,
    };
  } catch (err) {
    console.error('Error fetching transaction:', err);
    throw error(500, 'Failed to load transaction data');
  }
};
