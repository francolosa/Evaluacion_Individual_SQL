const { DataTypes, DATE } = require("sequelize")
// const { lte } = require("../node_modules/sequelize/types/lib/operators")


module.exports = (sequelize, DataTypes) => {
    let cols = {
        name: { type: DataTypes.STRING },
        ranking: { type: DataTypes.DECIMAL },
        active: { type: DataTypes.BOOLEAN }
    }
    let config = {
        timestamps: true
    }
        let Genre = sequelize.define("Genre",cols, config);
        
        // Genre.associate = function(models){
        //     Genre.hasMany(models.Movie, {
        //         as: 'movie',
        //         foreingKey: 'genre_id'
        // })
    return Genre
}
