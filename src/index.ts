import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import pingResolver from './resolvers/ping-resolver';
import geneResolver from './resolvers/gene-resolver';
import regionResolver from './resolvers/region-resolver';

const bootstrap = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        pingResolver,
        geneResolver,
        regionResolver
      ]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.listen({ port: 5000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

bootstrap();
