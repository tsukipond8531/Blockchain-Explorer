// src/routes/search/address/[address]/+page.server.ts
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
  const { address } = params;

  const unspentUrl = `https://api.whatsonchain.com/v1/bsv/main/address/${address}/unspent`;

  try {
    const unspentResponse = await fetch(unspentUrl);
    if (!unspentResponse.ok) {
      throw new Error(`Failed to fetch address data: ${unspentResponse.statusText}`);
    }

    const unspentData = await unspentResponse.json();

    let balance = 0;
    const transactions = [];
    const txids = unspentData.map((utxo: any) => utxo.tx_hash);

    for (const txid of txids) {
      try {
        const txResponse = await fetch(`https://api.whatsonchain.com/v1/bsv/main/tx/hash/${txid}`);
        if (!txResponse.ok) {
          throw new Error(`Failed to fetch transaction data for ${txid}`);
        }

        const txDetails = await txResponse.json();
        transactions.push(txDetails);
        balance += txDetails.vout.reduce((sum: number, vout: any) => sum + vout.value, 0);
      } catch (error) {
        console.error(`Error processing transaction ${txid}:`, error);
        // Continue processing other transactions
      }
    }

    const totalReceived = balance;
    const totalSent = transactions.reduce(
      (sum, tx) =>
        sum + tx.vout.reduce((sum: any, output: any) => sum + output.value, 0),
      0
    ) - balance;

    const formattedData = {
      Address: address,
      Balance: balance,
      'Total Received': totalReceived,
      'Total Sent': totalSent,
      Transactions: transactions,
    };

    return {
      addressData: formattedData,
    };
  } catch (err) {
    console.error('Error fetching address data:', err);
    throw error(500, 'Failed to load address data');
  }
};
