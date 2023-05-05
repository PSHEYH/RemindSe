const AppError = require('../exceptions/app.exception');

const handleForeignKeyError = (err) => {
    const message = `Foreign key constraints failed in field ${err.fields[0]}`;
    return new AppError(message, 404);
}

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 404);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err,
    });
};

const sendErrorProduction = (err, res) => {

    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            err: err,
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    const errorName = err.name;
    let error = { ...err };
    if (errorName === 'SequelizeForeignKeyConstraintError') {
        error = handleForeignKeyError(error);
    }
    if (errorName === 'SequelizeValidationError') {
        error = handleValidationErrorDB(error);
    }
    ///sendErrorProduction(error, res);
    sendErrorDev(error, res);
};
