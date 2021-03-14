const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema.js');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');

const AlbumAPI = require('./datasources/album')

// creates a sequelize connection once. NOT for every request
const store = createStore();

// set up any dataSources our resolvers need
const dataSources = () => ({
    albumAPI: new AlbumAPI({ store })
});

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources,
    introspection: true,
    playground: true 
});

server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
  });