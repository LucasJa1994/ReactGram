/**
 * Carrega variáveis de ambiente de um arquivo .env para process.env.
 */
require("dotenv").config()
/**
 * Importa o framework Express para construção de aplicações web.
 */
const express = require("express")
/**
 * Importa o módulo path para trabalhar com caminhos de arquivos e diretórios.
 */
const path = require("path")
/**
 * Importa o middleware CORS para habilitar o compartilhamento de recursos entre origens diferentes.
 */
const cors = require("cors")
/**
 * Importa a biblioteca Mongoose para modelagem de objetos MongoDB.
 */
const mongoose = require("mongoose")
/**
 * Importa o módulo dotenv para gerenciamento de variáveis de ambiente.
 */
const dotenv = require("dotenv")
/**
 * Recupera o número da porta a partir das variáveis de ambiente.
 */
const port = process.env.PORT
/**
 * Inicializa a aplicação Express.
 */
const app = express()
/**
 * Configura o app para interpretar dados JSON e dados de formulários codificados em URL.
 */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
/**
 * Configura o CORS para permitir requisições da origem especificada.
 */
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
/**
 * Serve arquivos estáticos do diretório "uploads".
 */
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))
const conn = require("./config/db.js")
conn()
// Conecta ao banco de dados MongoDB usando Mongoose.
/**
 *
 * Importa e utiliza o roteador principal da aplicação.
 */
const router = require("./routes/Router")
app.use(router)
/**
 * Inicia o servidor e escuta na porta especificada.
 */
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
