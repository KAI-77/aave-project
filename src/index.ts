import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { json } from 'body-parser';
import { createResolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";
import playground from 'graphql-playground-middleware-express'

// Start the server
async function startServer() {
    const app = express();

    // Initialize Apollo Server with schema and resolvers
    const server = new ApolloServer({
        typeDefs, // GraphQL schema
        resolvers: createResolvers(process.env.INFURA_PROJECT_ID as string), // Resolvers to handle GraphQL queries
        introspection: true,

    });

    app.get("/", playground({ endpoint: "/graphql", settings: {
        "editor.reuseHeaders": true,
        },
        tabs: [
            {
                endpoint: "/graphql",
                query: `query GetAavePositions($walletAddress: String!) {
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
}`,
                variables: `{
  "walletAddress": "0xYourWalletAddressHere"
}`
            }
        ]
    }));

    // Start the Apollo Server
    await server.start();

    // Apply middleware for handling GraphQL requests
    app.use(
        '/graphql',
        cors(), // Enable Cross-Origin Resource Sharing (CORS)
        json(), // Parse incoming requests as JSON
        expressMiddleware(server)
    );

    // Start the server on the specified port
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}/graphql`);
    });
}

// Handle server startup errors
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
