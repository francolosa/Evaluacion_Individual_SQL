const {sequelize, DataTypes} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
        title: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        awards: DataTypes.INTEGER,
        release_date: DataTypes.DATEONLY,
        length: DataTypes.INTEGER,
        genre_id: DataTypes.INTEGER
    },{
        timestamps: false
    });
        
    Movie.associate = models =>{
        Movie.belongsTo(models.Genre, {
            as: 'genre',
            foreingKey: 'genre_id'
        })
        Movie.belongsToMany(models.Actor, {
            as: 'actor',
            through: 'actor_movie',
            foreingKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
        })
        // Movie.belongsTo(models.Actor)
    }
    return Movie
}