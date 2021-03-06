const { paginateResults } = require("./utils");

module.exports = {
    Query: {
        albums: async (_, { pageSize = 20, after }, { dataSources }) => {
            const allAlbums = await dataSources.albumAPI.getAllAlbums();
            // we want these in reverse chronological order
            allAlbums.reverse();

            const albums = paginateResults({
                after,
                pageSize,
                results: allAlbums,
            });

            // return {
            //   albums,
            //   cursor: albums.length ? albums[albums.length - 1].cursor : null,
            //   hasMore: albums.length
            //     ? albums[albums.length - 1].cursor !==
            //       allAlbums[allAlbums.length - 1].cursor
            //     : false,
            // };
            return albums;
        },
    },
    Album: {
        artists: async (album, { pageSize = 20, after }, { dataSources }) => {
            const allArtists = await album.getArtists();
            // const allArtists =
            //     (await dataSources.artistAPI.getByAlbumID(album.id)) || [];

            const artists = paginateResults({
                after,
                pageSize,
                results: allArtists,
            });
            return artists;
        },
    },
};
