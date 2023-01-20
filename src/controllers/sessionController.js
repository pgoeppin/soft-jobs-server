const { getUser } = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const { getJwtToken } = require("../helpers/createToken");

const loginUser = async (req, res) => {
  const userSearched = req.body;
  if (userSearched.email) {
    userSearched.email.toLowerCase();
  }
  try {
    const user = await getUser(userSearched);
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
      if (!isPasswordValid) {
        res.status(401).json({
          message: "Contraseña erronea",
          code: 401,
        });
      } else {
        const token = await getJwtToken(user[0]);
        res.status(200).json({
          message: "Has iniciado sesion correctamente",
          code: 200,
          token,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

module.exports = { loginUser };
