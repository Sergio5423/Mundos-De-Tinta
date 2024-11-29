const config = require("../config");
const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado" });
  }
  try {
    const payload_decoded = jwt.verify(token, config.llaveSecreta);
    req.userId = payload_decoded.userId;
    req.userName = payload_decoded.userName;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res
        .status(401)
        .json({ error: "Token expiró", expiroEn: error.expiredAt });
    } else {
      res.status(401).json({ error: "Token no válido" });
    }
  }
}
module.exports = verificarToken;
