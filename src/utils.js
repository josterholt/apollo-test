const { Sequelize } = require("sequelize");

module.exports.paginateResults = ({
    after: cursor,
    pageSize = 20,
    results,
    // can pass in a function to calculate an item's cursor
    getCursor = () => null,
}) => {
    if (pageSize < 1) return [];

    if (!cursor) return results.slice(0, pageSize);
    const cursorIndex = results.findIndex((item) => {
        // if an item has a `cursor` on it, use that, otherwise try to generate one
        let itemCursor = item.cursor ? item.cursor : getCursor(item);

        // if there's still not a cursor, return false by default
        return itemCursor ? cursor === itemCursor : false;
    });

    return cursorIndex >= 0
        ? cursorIndex === results.length - 1 // don't let us overflow
            ? []
            : results.slice(
                  cursorIndex + 1,
                  Math.min(results.length, cursorIndex + 1 + pageSize)
              )
        : results.slice(0, pageSize);
};

module.exports.createStore = () => {
    const db = new Sequelize("music", "dbuser", "dbuser", {
        host: "localhost",
        dialect: "mysql",
        subQuery: false,
    });

    const albums = db.define(
        "albums",
        {
            name: Sequelize.STRING,
        },
        {
            timestamps: false,
        }
    );

    const artists = db.define(
        "artists",
        {
            name: Sequelize.STRING,
        },
        {
            timestamps: false,
        }
    );

    const artists_albums = db.define(
        "artists_albums",
        {
            album_id: Sequelize.STRING,
            artist_id: Sequelize.INTEGER,
        },
        {
            timestamps: false,
        }
    );

    albums.belongsToMany(artists, {
        through: artists_albums,
        foreignKey: "album_id",
    });

    artists.belongsToMany(albums, {
        through: artists_albums,
        foreignKey: "artist_id",
    });

    return { db, albums, artists, artists_albums };
};
