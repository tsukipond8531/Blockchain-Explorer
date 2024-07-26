# Timechain Explorer

Timechain Explorer is a blockchain explorer application that allows users to search for blocks, transactions, and addresses using the WhatsOnChain API.

## Features

- **Search for Blocks**: Enter a block hash or height to get details.
- **Search for Transactions**: Enter a transaction ID (TXID) to get details.
- **Search for Addresses**: Enter a blockchain address to get details.

## User Journey

1. **Home Page**
   - Search bar with options to search by block, transaction, or address.
2. **Search for Blocks**
   - Enter block hash or height and view block details.
3. **Search for Transactions**
   - Enter transaction ID and view transaction details.
4. **Search for Addresses**
   - Enter blockchain address and view address details.

## API Endpoints

Using the WhatsOnChain API:

- **Get Block by Hash**: `/api/v1/bsv/block/hash/{blockhash}`
- **Get Block by Height**: `/api/v1/bsv/block/height/{blockheight}`
- **Get Transaction by ID**: `/api/v1/bsv/tx/hash/{txid}`
- **Get Address Details**: `/api/v1/bsv/address/{address}`

Backend Endpoints:

- **Search Block**: `/api/search/block`
- **Search Transaction**: `/api/search/transaction`
- **Search Address**: `/api/search/address`

## Getting Started

1. Clone the repository
   ```sh
   git clone https://github.com/yourusername/timechain-explorer.git
2. Install dependencies
   ```sh
   cd timechain-explorer
   npm install
3. Start the application
   ```sh
   npm start
