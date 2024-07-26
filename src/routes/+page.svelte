<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation'; // Import goto for navigation

  let placeholderText = 'Search by Block Height';
  const placeholders = ["Search by Block Hash", "Search by Transaction ID", "Search by Address", "Search by Block Height"];
  let currentIndex = 0;
  let searchValue = '';

  // Function to determine the type of input and navigate accordingly
  /**
   * @param {{ preventDefault: () => void; }} event
   */
  function handleSubmit(event) {
    event.preventDefault();
    if (searchValue.trim()) {
      let route = '';

      if (isBlockHash(searchValue)) {
        route = `/search/block/hash/${searchValue}`;
      } else if (isBlockHeight(searchValue)) {
        route = `/search/block/height/${searchValue}`;
      } else if (isTxid(searchValue)) {
        route = `/search/transaction/${searchValue}`;
      } else if (isAddress(searchValue)) {
        route = `/search/address/${searchValue}`;
      } else {
        alert('Invalid search input');
        return;
      }

      goto(route); // Redirect to the appropriate route
    }
  }

  // Utility functions to determine the type of input
  /**
     * @param {string} input
     */
  function isBlockHash(input) {
    return /^[0-9a-fA-F]{64}$/.test(input) && /^0{8,}/.test(input);
  }

  /**
     * @param {string} input
     */
  function isBlockHeight(input) {
    return /^\d+$/.test(input);
  }

  /**
     * @param {string} input
     */
  function isTxid(input) {
    return /^[0-9a-fA-F]{64}$/.test(input) && !/^0{8,}/.test(input);
  }

  /**
     * @param {string} input
     */
  function isAddress(input) {
    return /^[1-9A-HJ-NP-Za-km-z]{26,35}$/.test(input);
  }

  onMount(() => {
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % placeholders.length;
      placeholderText = placeholders[currentIndex];
    }, 2000);

    return () => clearInterval(interval);
  });
</script>

<body class="static-gradient flex flex-col justify-center">
  <main class="flex-grow flex flex-col items-center justify-center space-y-6 px-4">
    <div class="text-center">
      <h1 class="text-4xl font-bold">Welcome to</h1>
      <h2 class="text-4xl font-bold cursive mb-10">Timechain Explorer!</h2>
    </div>
    <div class="flex flex-col md:flex-row items-center md:items-start space-y-14 md:space-y-0 md:space-x-20 max-w-4xl">
      <div class="text-center md:text-left max-w-md">
        <p class="text-center text-lg mb-6">
          Explore the blockchain by searching for block heights, transaction IDs, addresses, and more. Discover detailed information and stay up-to-date with the latest blocks and transactions.
        </p>
        <section class="glass p-8 rounded-xl shadow-lg w-full max-w-lg">
          <form class="flex flex-col space-y-4" on:submit={handleSubmit}>
            <input 
              type="text" 
              class="w-full p-4 text-lg text-gray-900 rounded-lg focus:outline-none" 
              style="width: 100%;" 
              placeholder={placeholderText} 
              bind:value={searchValue}
            />
            <button 
              type="submit" 
              class="w-full p-4 text-lg bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
      <div class="flex justify-center md:justify-start">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src="/src/images/image.png" alt="Description Image" class="w-full max-w-xs rounded-lg">
      </div>
    </div>
  </main>
</body>
