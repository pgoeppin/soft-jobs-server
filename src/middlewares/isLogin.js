const { validateToken } = require('../helpers/validateToken')
const { showError } = require('../helpers/showError')

const isLogin = async (req, res, next) => {
    try {
        if(!req.header('Authorization')) {
            return res.status(401).send({ message: 'Por favor, inicie sesion'})
        }
        const token = req.header('Authorization').split(' ')[1];
        const tokenData = await validateToken(token, res)
        if (!tokenData) {
            return res.status(401).send({ message: 'Token invalido' })
        }
        req.user = tokenData
        next();
    } catch (e) {
        showError(res, e)
    }
}

module.exports = { isLogin }