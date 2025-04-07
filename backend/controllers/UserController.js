const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

// GENERATE TOKEN user

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "30d",
  })
}

//register user e sing in

const register = async (req, res) => {
  const { name, email, password } = req.body
  //check if user existes
  const user = await User.findOne({ email })
  if (user) {
    res.status(422).json({ message: "Esse e-mail já está cadastrado!" })
    return
  }
  // generate passaword hash
  const salt = await bcrypt.genSalt()
  const passwordHash = await bcrypt.hash(password, salt)
  // create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  })

  // se user for criado com sucesso, gerar o token

  if (!newUser) {
    res.status(422).json({ errors: ["Erro ao criar usuário!"] })
    return
  }
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  })
}
// login user
const login = async (req, res) => {
  res.send("Usuario logado com sucesso!")
}
module.exports = {
  register,
  login,
}
