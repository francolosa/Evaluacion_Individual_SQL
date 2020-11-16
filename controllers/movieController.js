const fs = require('fs');
const path = require('path');
const { brotliDecompressSync } = require('zlib');
const {Movie, Sequelize} = require('../models/');
const Op = Sequelize.Op


module.exports = {
    all: async (req,res)=>{
         try {
             const movies = await Movie.findAll()
             res.render('movies', {movies})
        } catch (error){
            console.log(error)}
       
        console.log('se accedió a películas')
    },
    detail: async (req,res)=>{
        try {
        const detail = await Movie.findByPk(req.params.id)
        res.render('detail', {detail})

        } catch (error) {
            console.log(error)}

        console.log('se accedió detalle')
    },
    new: async (req,res)=>{
        try {
        const newMovies = await Movie.findAll({
            order_by: [
                ['release_date', 'DESC']
            ]
             ,
            limit: 5
        })
        console.log(newMovies)
        console.log(Date.now())
        res.render('new', {newMovies})
        console.log('se accedió a novedades')
    } catch (error) {
        console.log(error)
    }
    },
    reco: async (req, res)=>{
        try {
        const reco = await Movie.findAll({
            where: { 
                rating: { [Op.gte]: 8 }
            }
        })
        res.render('recommended', {reco})
         } catch (error) {
            console.log(error)
        } 
        
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
            res.render('search',{search})
        } catch (error) {
            console.log(error)
        }
        console.log('se realizo una búsqueda')
    },
    getCreate: (req,res)=>{
        res.render('create')

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
        } catch (error) {
            console.log(error)
        }
    },
    getEdit: async (req,res)=>{
        const editMovie = await Movie.findByPk(req.params.id)
        res.render('edit', {detail: editMovie})
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
    } catch (error) {
        console.log(error)
    }
        },
    delete: async (req,res)=>{
        try {
        await Movie.destroy({
            where: { 
                id: req.params.id 
            }
        }
        )
        res.redirect('/movies')
    } catch (error) {
        console.log(error)
    }

}
}