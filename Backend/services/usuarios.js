const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const jwt = require("jsonwebtoken");
/**
 * usamos bcrypt para encriptar la constraseña del usuario y comparar la contraseña encriptada en BD.
 */
const bcrypt = require("bcrypt");
/**
 * Esta funcion se utiliza para registrar un usuario en la base de datos
 * @param {*} user objeto tiene los datos del usuario (ejem: nombre,password)
 * @returns un mensaje si el usuario ha sido creado o no
 */
async function registrar(usuario) {
  const hasedPassword = await bcrypt.hash(usuario.password, 10);

  const result = await db.query(
    `INSERT INTO usuarios (correo,contraseña) VALUES('${usuario.correo}','${hasedPassword}')`
  );
  if (!result.affectedRows) {
    return { mensaje: "No se pudo crear el usuario" };
  }
  return { mensaje: "Usuario creado exitosamente" };
}
/**
 * Funcion para loguear el usuario en la API
 * @param {*} user objeto con datos de usuario para loguear (nombre, password)
 * @returns un mensaje si el usuario y contraseña son incorrectos, o el objeto usuario obtenido de la base de datos.
 */
async function login(usuario) {
  const result = await db.query(
    `SELECT id, correo, contraseña FROM usuarios 
    WHERE correo = ?`,
    [usuario.correo]
  );
  const dbUser = result[0];
  const mensaje = { mensaje: "Usuario/Contraseña incorrectos" };
  if (!dbUser) {
    return mensaje;
  }

  const esPasswordValido = await bcrypt.compare(
    usuario.contraseña,
    dbUser.contraseña
  );
  if (!esPasswordValido) {
    return mensaje;
  }

  const token = await jwt.sign(
    { userId: dbUser.id, userName: dbUser.correo },
    config.llaveSecreta,
    {
      expiresIn: "15m",
    }
  );
  return token;
}

module.exports = {
  registrar,
  login,
};
