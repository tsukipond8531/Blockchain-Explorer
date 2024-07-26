<script lang="ts">
  export let data: {
    blockData: {
      'Block Hash': string;
      'Block Height': number;
      Timestamp: string;
      'Number of Transactions': number;
      Size: number;
      Transactions: any[];
    };
  };

  let error: string | null = null;
  if (!data.blockData) {
    error = 'Failed to load block data';
  }
</script>

<body class="static-gradient flex flex-col justify-center">
  <main class="flex-grow flex flex-col items-center justify-center space-y-6 px-4">
    <div class="text-center">
      <h1 class="text-4xl font-bold">Block Data by Hash</h1>
    </div>
    <section class="glass p-8 rounded-xl shadow-lg w-full max-w-6xl">
      {#if data.blockData}
        <div class="space-y-4 text-left">
          <div>
            <span class="font-bold">Block Hash:</span> <span>{data.blockData['Block Hash']}</span>
          </div>
          <div>
            <span class="font-bold">Block Height:</span> <span>{data.blockData['Block Height']}</span>
          </div>
          <div>
            <span class="font-bold">Timestamp:</span> <span>{data.blockData.Timestamp}</span>
          </div>
          <div>
            <span class="font-bold">Number of Transactions:</span> <span>{data.blockData['Number of Transactions']}</span>
          </div>
          <div>
            <span class="font-bold">Size:</span> <span>{data.blockData.Size} bytes</span>
          </div>
          <div>
            <span class="font-bold">Transaction ID:</span> <span>{data.blockData.Transactions}</span>
          </div>
        </div>
      {:else if error}
        <p class="text-red-500">{error}</p>
      {/if}
    </section>
  </main>
</body>
