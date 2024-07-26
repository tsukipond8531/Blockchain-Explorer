<script lang="ts">
  export let data: {
    transaction: {
      'Transaction ID': string;
      Inputs: any[];
      Outputs: any[];
      Amount: number;
      Timestamp: string | null;
      'Block Hash': string;
    };
  };

  let error: string | null = null;
  if (!data.transaction) {
    error = 'Failed to load transaction data';
  }
</script>

<body class="static-gradient flex flex-col justify-center">
  <main class="flex-grow flex flex-col items-center justify-center space-y-6 px-4">
    <div class="text-center">
      <h1 class="text-4xl font-bold">Transaction Details</h1>
    </div>
    <section class="glass p-5 rounded-xl shadow-lg w-full max-w-6xl">
      {#if data.transaction}
        <div class="space-y-4 text-left">
          <div>
            <span class="font-bold">Transaction ID:</span> <span>{data.transaction['Transaction ID']}</span>
          </div>
          <div>
            <span class="font-bold">Inputs:</span> <span>{JSON.stringify(data.transaction.Inputs)}</span>
          </div>
          <div>
            <span class="font-bold">Outputs:</span> <span>{JSON.stringify(data.transaction.Outputs)}</span>
          </div>
          <div>
            <span class="font-bold">Amount:</span> <span>{data.transaction.Amount}</span>
          </div>
          <div>
            <span class="font-bold">Timestamp:</span> <span>{data.transaction.Timestamp}</span>
          </div>
          <div>
            <span class="font-bold">Block Hash:</span> <span>{data.transaction['Block Hash']}</span>
          </div>
        </div>
      {:else if error}
        <p class="text-red-500">{error}</p>
      {/if}
    </section>
  </main>
</body>
