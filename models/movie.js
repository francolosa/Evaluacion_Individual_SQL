const { sequelize, DataTypes } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const movie = sequelize.define("Movie", {
        title: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        awards: DataTypes.INTEGER,
        release_date: DataTypes.DATEONLY,
        length: DataTypes.INTEGER,
        genre_id: DataTypes.INTEGER
    },{
        timestamps: false
    }
    ); 
    
    // Movie.associate = function(models){
    //     movie.belongsTo(models.Generos, {
    //         as: 'genre',
    //         foreingKey: 'genre_id'
    //     })
    // }
    return movie
}