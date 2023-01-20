const pool = require("../database/connDB").pool
const bcrypt = require("bcryptjs")

const getUser = async (email) => {
    const query = "SELECT * FROM usuarios WHERE email = $1"
    const values = [email]
    const result = await pool.query(query, values)
    const rowCount = result.rowCount;
    if(!rowCount) throw {
        code: 404,
        message: "No se encontró ningún usuario con este mail"
    }
    return result.rows
}

const createUser = async (user) => {
    const passwordEncrypted = bcrypt.hashSync(user.password);
    const query = "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *"
    const values = [user.email, passwordEncrypted, user.rol, user.lenguage] 
    const result = await pool.query(query, values)
    const rowCount = result.rowCount;
    if (!rowCount) throw { code: 404, message: "No se pudo crear el usuario" }
    return result.rows;
}

module.exports = { createUser, getUser }