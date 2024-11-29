const express = require('express');
const router = express.Router();
const departamentos = require('../services/departamentos');

/* GET */
router.get('/', async function(req, res, next) {
  try {
    res.json(await departamentos.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error al cargar los departamentos`, err.message);
    next(err);
  }
});

/* GET NOMBRES */
router.get('/nombres', async function(req, res, next) {
  try {
    res.json(await departamentos.getNombres(req.query.page));
  } catch (err) {
    console.error(`Error al cargar los nombres`, err.message);
    next(err);
  }
});

/* POST */
router.post('/', async function(req, res, next) {
  try {
    res.json(await departamentos.create(req.body));
  } catch (err) {
    console.error(`Error al agregar el departamento`, err.message);
    next(err);
  }
});

/* PUT */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await departamentos.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error actualizando el departamento`, err.message);
    next(err);
  }
});

/* DELETE */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await departamentos.remove(req.params.id));
  } catch (err) {
    console.error(`Error al borrar el departamento`, err.message);
    next(err);
  }
});

module.exports = router;