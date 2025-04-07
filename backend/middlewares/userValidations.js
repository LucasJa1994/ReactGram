const { body } = require("express-validator")

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .notEmpty()
      .withMessage("O nome é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O nome deve ter pelo menos 3 caracteres"),

    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório")
      .isEmail()
      .withMessage("E-mail inválido"),

    body("password")
      .isString()
      .withMessage("A senha é obrigatória")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter pelo menos 6 caracteres"),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação de senha é obrigatória")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("As senhas não conferem")
        }
        return true
      }),
  ]
}
const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório")
      .isEmail()
      .withMessage("E-mail inválido"),
    body("password").isString().withMessage("A senha é obrigatória"),
  ]
}

module.exports = { userCreateValidation,loginValidation }
