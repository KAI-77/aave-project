🚀 AAVE Position Tracker
A Node.js + Express.js GraphQL API to fetch collateral and borrowing positions for a given Ethereum wallet address on the AAVE protocol. The data is fetched directly from the blockchain using Infura as the RPC provider.

🛠️ Features
Fetches real-time AAVE positions for a wallet.
Provides detailed data like collateral, debts, available borrows, LTV, and health factor.
Fully typesafe with TypeScript.
Simple and clean GraphQL endpoint.

📂 Project Structure
node-graphql
src
    config
│   ├── infura.ts                 # Infura provider setup
│   └    
├── graphql
│   ├── resolvers.ts              # GraphQL resolvers to handle queries
│   └── schema.ts                 # GraphQL schema definition
├── utils
│   ├── blockchain-helper.ts      # Helper class for interacting with the AAVE smart contract
│   
├── .env                         # Environment variables
├── index.ts                     # Server setup and entry point
├── aave.ts                      # Type definitions for AAVE positions
└── package.json                 # Project dependencies

⚡ Prerequisites
Node.js (v18+)
npm or yarn
Infura account with an API key
AAVE V3 Pool contract address

📘 Setup
Clone the repository:


git clone https://github.com/yourusername/aave-position-tracker.git
cd node-graphql

Install dependencies:
npm install
Create a .env file in the root directory:
PORT=4000
ETHEREUM_NETWORK=mainnet
INFURA_PROJECT_ID=your_infura_project_id
AAVE_V3_POOL_ADDRESS=your_aave_v3_pool_address

Run the development server:
npm run dev

🔥 GraphQL Endpoint
Once the server is running, access the GraphQL Playground at:
http://localhost:4000/graphql

📊 Example Query

query GetAavePositions($walletAddress: String!) {
getAavePositions(walletAddress: $walletAddress) {
collateral_positions {
asset
amount
}
borrowing_positions {
asset
amount
}
available_borrows
current_liquidation_threshold
ltv
health_factor
}
}
🟢 Example Variables

{
"walletAddress": "0xYourEthereumWalletAddress"
}

✅ Example Response

{
"data": {
"getAavePositions": {
"collateral_positions": [
{
"asset": "Aggregate Collateral",
"amount": "0.01"
}
],
"borrowing_positions": [
{
"asset": "Aggregate Debts",
"amount": "0.00"
}
],
"available_borrows": "0.05",
"current_liquidation_threshold": "80.00",
"ltv": "75.00",
"health_factor": "5.25"
}
}
}
🧠 Explanation
Blockchain Interaction:
The app interacts with the AAVE V3 Pool smart contract using ethers.js. The blockchain-helper.ts file fetches account data like collateral and debt balances.

GraphQL API:
The API is built using Apollo Server, with a single query getAavePositions, which takes a wallet address as input and returns detailed AAVE data.

Infura as RPC Provider:
Infura is used to connect to the Ethereum blockchain, so you don’t need to run your own node. The Infura project ID is stored in the .env file.

Data Formatting:
Values returned from the blockchain are formatted using ethers.formatUnits for readability, and percentages (like LTV) are divided by 100.

🛡️ Validation
The API validates whether the provided wallet address is a valid Ethereum address.
Errors during the blockchain call are caught and handled gracefully.

📄 Scripts
npm run dev — Start the server in development mode with live reloading.
npm run build — Build the project for production.
npm start — Run the production server.

📘 Documentation
Infura
AAVE Protocol
Ethers.js

🚀 Deployment
For production, you can deploy the API to services like Render, VPS, or Heroku.

Example .env for production:

PORT=80
ETHEREUM_NETWORK=mainnet
INFURA_PROJECT_ID=your_production_infura_project_id
AAVE_V3_POOL_ADDRESS=your_aave_v3_pool_address