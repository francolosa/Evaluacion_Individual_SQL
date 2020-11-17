const {Movie, Sequelize, Genre, Actor} = require('../models/');
const Op = Sequelize.Op

module.exports = {
    all: async (req,res)=>{
         try {
             const movies = await Movie.findAll({
                 include:'genre'
             })
             res.render('movies', {movies: movies})
        } catch (error) { console.log(error) }
        console.log('se accedió a películas')
    },
    detail: async (req,res)=>{
        try {
        const detail = await Movie.findByPk(
            req.params.id,{
                include: ['genre','actor']
            })
            console.log(detail.actor)
        res.render('detail', {detail})

        } catch (error) { console.log(error) }
        console.log('se accedió detalle')
    },
    new: async (req,res)=>{
        try {
        const newMovies = await Movie.findAll({
            order_by: [
                ['release_date', 'DESC']
            ],
                limit: 5
            })
        res.render('new', {newMovies})
        console.log('se accedió a novedades')
        } catch (error) { console.log(error) }
    },
    reco: async (req, res)=>{
        try {
        const reco = await Movie.findAll({
            where: { 
                rating: { [Op.gte]: 8 }
            }
        })
        res.render('recommended', {reco})
         } catch (error) { console.log(error) } 
        console.log('se accedió a recomendadas')
    },
    search: async (req,res)=>{
        try {
            if(req.body.orden != undefined){
                orden = "'"+req.body.orden+"'"
            }  else { orden = 'ASC'}
            const search = await Movie.findAll({
                where: {
                    title: { [Op.like]: '%'+req.body.title+'%'  }
                },
                order: [
                    ['title', req.body.order]
            ]
            }) 
            const searched = req.body.title
            res.render('search',{search, searched})
        } catch (error) { console.log(error) }
        console.log('se realizo una búsqueda')
    },
    getCreate: async (req,res)=>{
        try {
        const generos = await Genre.findAll()
        res.render('create', {genre: generos})
    } catch (error) { console.log(error) }
         console.log('se accedió al formulario de creación')
    },
    create: async (req,res)=>{
        try {
            await Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre,
            }) 
            res.redirect('/movies');
        } catch (error) { console.log(error) }
    },
    getEdit: async (req,res)=>{
        const editMovie = await Movie.findByPk(req.params.id)
        const genre = await Genre.findAll()
        const genre2 = (genre[editMovie.genre_id-1])
        res.render('edit', {detail: editMovie, genre, genre2})
    },
    edit: async (req,res)=>{
        try {
        await Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre
        },
        {   where: {
            id: req.params.id
        }}
        )
        res.redirect('/movies')
    } catch (error) { console.log(error) }
        },
    delete: async (req,res)=>{
        try {
        await Movie.destroy({
            where: { 
                id: req.params.id 
            }
        })
        res.redirect('/movies')
    } catch (error) { console.log(error) }  
    },
    genres: async (req,res)=>{
        try {
            const genres = await Movie.findAll({
                where: { 
                    genre_id: req.params.id  
                },
                include: 'genre' 
            })
            console.log(genres)
            res.render('genres', {movies: genres} )
        } catch (error) { console.log(error) }   
    },
    actor: async (req,res) => {
        try {
            const actor = await Actor.findByPk(req.params.id,{
                include: 'movie'
            })
            res.render('actor', {actor: actor})
            console.log(actor.movie)
        } catch (error) { console.log(error) }   
    }
}