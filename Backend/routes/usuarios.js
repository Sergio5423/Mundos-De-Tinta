const express = require("express");
const router = express.Router();
const users = require("../services/usuarios");

/* POST */
router.post("/registrar", async function (req, res, next) {
  try {
    res.json(await users.registrar(req.body));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.post("/login", async function (req, res, next) {
    try {
      res.json(await users.login(req.body));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });

module.exports = router;
