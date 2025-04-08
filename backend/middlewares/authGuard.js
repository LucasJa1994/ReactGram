const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const authGuard = async (req, res, next) => {

  const authHeader = req.headers["authorization"]
  if (!authHeader) {
    console.log("Sem Authorization header")
    return res.status(401).json({ msg: "Acesso negado! (sem header)" })
  }

  const token = authHeader.split(" ")[1]
  console.log("Token extraído:", token)

  if (!token) {
    console.log("Token ausente")
    return res.status(401).json({ msg: "Acesso negado! (sem token)" })
  }

  try {
    const verified = jwt.verify(token, jwtSecret)
    console.log("Token verificado com sucesso:", verified)

    req.user = await User.findById(verified.id).select("-password")

    next()
  } catch (error) {
    console.log("Erro ao verificar token:", error.message)
    return res.status(401).json({ msg: "Token inválido!" })
  }
}

module.exports = authGuard
