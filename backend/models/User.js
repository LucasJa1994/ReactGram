const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema(
  {
    nome: String,
    email: String,
    senha: String,
    prifileImage: String,
    bio: String,
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)
module.exports = User
// const mongoose = require("mongoose")
