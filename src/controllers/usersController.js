const { createUser } = require("../models/usersModel");
const { showError } = require("../helpers/showError");

const userRegister = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await createUser(user);
    res.status(201).json(newUser);
  } catch (e) {
    showError(res, e);
  }
};

module.exports = { userRegister };
