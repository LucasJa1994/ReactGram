const { validationResult } = require("express-validator")

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const extractedErrors = []
    errors.array().map((err) => extractedErrors.push(err.msg))
    return res.status(422).json({
      errors: extractedErrors,
    })
  }

  next() // Só chama next se estiver tudo certo
}

module.exports = validate
