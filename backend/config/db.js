require("dotenv").config()
const mongoose = require("mongoose")

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const conn = async () => {
  console.log("Iniciando tentativa de conexão...")

  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@reactgram.xhrbhkd.mongodb.net/?retryWrites=true&w=majority&appName=ReactGram`
    )
    console.log("MongoDB conectado com sucesso!")
    return dbConn
  } catch (error) {
    console.log("Erro ao conectar com o MongoDB:", error.message)
  }
}

module.exports = conn
