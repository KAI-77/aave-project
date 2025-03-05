import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { json } from 'body-parser';
import http from 'http';
import { BaseContext, ContextFunction } from '@apollo/server';



// Define your GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// Define your resolvers
const resolvers = {
    Query: {
        hello: () => 'Hello world!'
    }
};

// Context interface
interface MyContext extends BaseContext {
    token?: string;
}

async function startServer() {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer<MyContext>({
        typeDefs,
        resolvers,
    });

    // Start the Apollo Server
    await server.start();

    // Correct context function type
    const contextFunction: ContextFunction<[{req: express.Request, res: express.Response}], MyContext> =
        async ({ req }) => {
            return {
                token: req.headers.authorization as string | undefined
            };
        };

    // Apply middleware
    app.use(
        '/graphql',
        cors(),
        json(),
        expressMiddleware(server, {
            context: contextFunction
        })
    );

    // Modified listen method to use httpServer
    const PORT = process.env.PORT || 4000;
    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});