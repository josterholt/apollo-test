const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    albums: [Album]
  }

  type Album {
    name: String
    artists: [Artist]
  }

  type Artist {
    name: String
    albums: [Album]
  }
`;

module.exports = typeDefs;