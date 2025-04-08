const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  // checar se no cabeçalho token existe
  if (!token) return res.status(401).json({ errors: ["acesso negado"] })

  // checar se o token é válido

  try {
    const verified = jwt.verify(token, jwtSecret)
    // adiciona o usuário verificado ao objeto de requisição
    req.user = await User.findById(verified.id).select("-password")
    next()
  } catch (error) {
    return res.status(401).json({ errors: ["token inválido"] })
  }
}

module.exports = authGuard
