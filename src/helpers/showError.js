//helper para mostrar el Error 500. Internal server error

const showError = (res, e) => {
    const errorResponse = {
        error: 'Oops. Algo salió mal. Internal Server Error',
        message: e.message,
        code: e.code,
    }
    
    return res.status(500).json(errorResponse)
}

module.exports = { showError }