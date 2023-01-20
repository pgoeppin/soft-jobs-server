const { createUser, getUser } = require("../models/usersModel");
const { showError } = require("../helpers/showError");
const jwt = require('jsonwebtoken')
const userRegister = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await createUser(user);
    res.status(201).json(newUser);
  } catch (e) {
    showError(res, e);
  }
};

const showUsers = async (req, res) => {
  const token = req.header('Authorization').split(' ')[1]
  const { email } = jwt.decode(token)
  try {
    const user = await getUser(email)
    // DEBIDO A QUE EL COMPONENTE PERFIL BUSCA RECIBIR UN DATO PLANO Y NO UN JSON, SE DEBE ENVIAR LA POSICION 0 DEL ARRAY
    // PORQUE SI NO QUEDA EL JSON COMPLETO Y NO LOS DATOS DEL USUARIO. 
    res.json(user[0])
  } catch (e) {
    showError(res, e)
  }
}

module.exports = { userRegister, showUsers };
