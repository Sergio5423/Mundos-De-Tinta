const express = require('express');
const router = express.Router();
const categorias = require('../services/categorias');

/* GET  */
router.get('/', async function(req, res, next) {
  try {
    res.json(await categorias.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error al obtener las categorias`, err.message);
    next(err);
  }
});

/* GET NOMBRES */
router.get('/nombres', async function(req, res, next) {
  try {
    res.json(await categorias.getNombres(req.query.page));
  } catch (err) {
    console.error(`Error al cargar los nombres`, err.message);
    next(err);
  }
});

/*POST*/
router.post('/', async function(req, res, next) {
  try {
    res.json(await categorias.create(req.body));
  } catch (err) {
    console.error(`Error al agregar la categoria`, err.message);
    next(err);
  }
});

/* PUT */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await categorias.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error al actualizar la categoria`, err.message);
    next(err);
  }
});

/* DELETE */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await categorias.remove(req.params.id));
  } catch (err) {
    console.error(`Error al eliminar la categoria`, err.message);
    next(err);
  }
});

module.exports = router;