import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import pingResolver from './resolvers/ping-resolver';
import geneResolver from './resolvers/gene-resolver';
import transcriptResolver from './resolvers/transcript-resolver';
import regionResolver from './resolvers/region-resolver';

import { initializeStore } from './store/store';

const bootstrap = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        pingResolver,
        geneResolver,
        regionResolver,
        transcriptResolver
      ],
      validate: false // see https://github.com/MichalLytek/type-graphql/issues/150#issuecomment-420181526
    }),
    context: ({ req, res }) => ({ req, res, store: initializeStore() })
  });

  apolloServer.listen({ port: 5000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

bootstrap();
