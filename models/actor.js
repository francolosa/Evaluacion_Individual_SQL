const { DataTypes, DATE } = require("sequelize")
// const { lte } = require("../node_modules/sequelize/types/lib/operators")


module.exports = (sequelize, DataTypes) => {
    let cols = {
        first_name: { type: DataTypes.STRING },
        last_name: { type: DataTypes.STRING },
        rating: { type: DataTypes.DECIMAL },
        favourite_movie_id: { type: DataTypes.TINYINT }
    }
    let config = {
        timestamps: true
    }
        let Actor = sequelize.define("Actor",cols, config)
    return Actor
}
