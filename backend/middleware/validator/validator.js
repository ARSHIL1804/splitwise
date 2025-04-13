const { check, validationResult } = require('express-validator');
const ErrorCodes = require('../../utility/ErrorCode');


const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(ErrorCodes.BAD_REQUEST).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  };
};


module.exports = validate;