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
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      res.status(404).json({ errors: ["Usuario nao encontrado"] })
    }

    // Verifica se password e user.password existem antes de comparar
    if (!password || !user.password) {
      res.status(422).json({ erros: ["Dados de login inválidos"] })
      return
    }

    // checar se a senha está correta
    if (!(await bcrypt.compare(password, user.password))) {
      res.status(422).json({ erros: ["Senha inválida"] })
      return
    }

    // Se chegou aqui, login está ok
    res.status(201).json({
      _id: user._id,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    })
  } catch (error) {
    console.error("Erro no login:", error)
    res.status(500).json({ erros: ["Erro interno no servidor"] })
  }
}

module.exports = {
  register,
  login,
}
