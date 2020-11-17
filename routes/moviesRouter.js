var express = require('express');
var movieController = require('../controllers/movieController');
var router = express.Router();

/* GET lista peliculas. */
router.get('/', movieController.all);

/* GET detalle pelicula. */
router.get('/detail/:id', movieController.detail);

/* GET lista peliculas (?). */
router.get('/new', movieController.new);

/* GET peliculas recomendadas. */
router.get('/recommended', movieController.reco);

/* GET formulario de creación. */
router.get('/create', movieController.getCreate);

/* GET formulario de edición. */
router.get('/edit/:id', movieController.getEdit)

/* GET detalle del actor. */
router.get('/actor/:id', movieController.actor)

/* GET peliculas asociadas a un genero. */
router.get('/genre/:id', movieController.genres)

/* PUT formulario de edición. */
router.put('/edit/:id', movieController.edit)

/* POST formulario de creación. */
router.post('/create', movieController.create)

/* POST buscar pelicula. */
router.post('/search', movieController.search);

/* DELETE eliminar película. */
router.delete('/delete/:id', movieController.delete)

module.exports = router;