<script lang="ts">
    export let data: {
      addressData: {
        Address: string;
        Balance: number;
        'Total Received': number;
        'Total Sent': number;
        Transactions: any[];
      };
    };
  
    let error: string | null = null;
    if (!data.addressData) {
      error = 'Failed to load address data';
    }
  </script>
  
  <body class="static-gradient flex flex-col justify-center">
    <main class="flex-grow flex flex-col items-center justify-center space-y-6 px-4">
      <div class="text-center">
        <h1 class="text-4xl font-bold">Address Details</h1>
      </div>
      <section class="glass p-8 rounded-xl shadow-lg w-full max-w-6xl">
        {#if data.addressData}
          <div class="space-y-4 text-left">
            <div>
              <span class="font-bold">Address:</span> <span>{data.addressData.Address}</span>
            </div>
            <div>
              <span class="font-bold">Balance:</span> <span>{data.addressData.Balance}</span>
            </div>
            <div>
              <span class="font-bold">Total Received:</span> <span>{data.addressData['Total Received']}</span>
            </div>
            <div>
              <span class="font-bold">Total Sent:</span> <span>{data.addressData['Total Sent']}</span>
            </div>
            <div>
              <span class="font-bold">Transactions:-</span>
              <ul>
                {#each data.addressData.Transactions as tx}
                  <li>
                    <span class="font-bold">Transaction ID:</span> <span>{tx.txid}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        {:else if error}
          <p class="text-red-500">{error}</p>
        {/if}
      </section>
    </main>
  </body>
  