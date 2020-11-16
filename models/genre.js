const { DataTypes, sequelize} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre',{
        name: DataTypes.STRING,
        ranking: DataTypes.DECIMAL,
        active: DataTypes.INTEGER
    },{
        timestamps: false
    });        
        Genre.associate = models => {
            Genre.hasMany(models.Movie, {
                as: 'genre',
                foreingKey: 'genre_id'
            })
        }
    return Genre
}
