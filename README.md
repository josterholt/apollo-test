# Apollo GraphQL Music App

A sample Apollo GraphQL server. Exposes API endpoint to fetch a list of albums.

## Technical Stack

-   NodeJS
-   [Apollo Server](https://www.apollographql.com/) ([GraphQL](https://graphql.org/))
-   [Sequelize](http://sequelize.org/) (ORM)
-   [MySQL Database Server](https://www.mysql.com/) (run in [Docker](https://www.docker.com/))

## Getting Started

1. Spin up MySQL Server (optional if database already exists)

```
docker compose up
```

2. Install dependencies and run app

```
yarn install
yarn start
```

3. Explore GraphQL Playground

-   Open browser and navigate to http://localhost:4000 (Apollo Playground)
-   Explore SCHEMA tab to the right of the screen.
-   Run queries from the left hand side pane.

## Types

-   Album
-   Artist

## Sample GraphQL Query

```
query GetAlbumAndArtist {
  albums {
    name
    artists {
    	name
  	}
  }
}
```
