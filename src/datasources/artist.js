const { DataSource } = require("apollo-datasource");

class ArtistAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }

    initialize(config) {
        this.content = config.context;
    }

    async getAllArtists() {
        const artists = await this.store.artists.findAll();
        return artists;
    }

    /**
     * This isn't working
     * @param {*} album_id
     * @returns
     */
    async getByAlbumID(album_id) {
        const artists = await this.store.artists.findAll({
            include: [
                {
                    model: this.store.albums,
                    through: {
                        where: { album_id: album_id },
                    },
                    required: true,
                },
            ],
        });

        // console.log("========");
        // console.log(artists);
        // console.log("========");

        return artists;
    }
}

module.exports = ArtistAPI;
