const { getUser } = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const { getJwtToken } = require("../helpers/createToken");
const { showError } = require("../helpers/showError");

const loginUser = async (req, res) => {
  const userSearched = req.body;
  if (userSearched.email) {
    userSearched.email.toLowerCase();
  }
  try {
    const user = await getUser(userSearched.email);
    if (user[0] === undefined) {
      res.status(404).json({
        message: "Usuario no registrado",
        code: 404,
      });
    } else {
      const isPasswordValid = await bcrypt.compare(
        userSearched.password,
        user[0].password
      );
      // DEBIDO AL APOYO DEL DESAFIO, NO SE PUEDE DEVOLVER UN OBJETO, PORQUE SINO TIRA ERROR YA Q EL SCRIPT DEL COMPONENTE PERFIL
        // NO BUSCA RECIBIR UN JSON SINO UN TOKEN PLANO.
      if (!isPasswordValid) {
        // res.status(401).json({
        //   message: "Contraseña erronea",
        //   code: 401, });
        res.status(401).send("Contraseña erronea")
      } else {
        const token = await getJwtToken(user[0]);
        // res.status(200).json({
        //   message: "Has iniciado sesion correctamente",
        //   code: 200,
        //   token,
        // });
        res.status(200).send(token)
      }
    }
  } catch (e) {
    showError(res, e);
  }
};

module.exports = { loginUser };
