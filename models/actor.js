const { sequelize, DataTypes } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    let Actor = sequelize.define('Actor', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        favorite_movie_id: DataTypes.TINYINT
    });
    Actor.associate = models => {
        Actor.belongsToMany(models.Movie, {
            as: 'movie',
            through: 'actor_movie',
            foreingKey: 'actor_id',
            otherKey: 'movie_id',
            timestamps: false
        })
        Actor.belongsTo(models.Movie,{
            as: 'favorite_movie',
            foreingKey: 'favorite_movie_id'
        })
        Actor.belongsToMany(models.Movie, {
            as: 'peliculas',
            through: 'actor_movie'
        })
    }
    return Actor
}
