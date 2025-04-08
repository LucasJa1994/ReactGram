/**
 * Configuração de armazenamento de imagens para upload utilizando o multer.
 * Define o destino e o nome do arquivo para os uploads.
 */

const multer = require("multer")
const path = require("path")

/**
 * Configuração de armazenamento para o multer.
 * Define o destino do upload com base na URL base da requisição.
 *
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} file - Objeto que representa o arquivo enviado.
 * @param {Function} callback - Função de callback para definir o destino.
 */
const imagemStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    let folder = ""

    // Verifica se a URL base contém "users" ou "photos" para definir a pasta de destino.
    if (req.baseUrl.includes("users")) {
      folder = "users"
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos"
    }

    // Define o caminho da pasta de destino.
    callback(null, `uploads/${folder}/`)
  },

  /**
   * Define o nome do arquivo para o upload.
   * O nome é gerado com base na data atual e na extensão do arquivo original.
   *
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} file - Objeto que representa o arquivo enviado.
   * @param {Function} callback - Função de callback para definir o nome do arquivo.
   */
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname))
  },
})

const imagemUpload = multer({
  storage: imagemStorage,
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // Se o arquivo não for PNG, JPG ou JPEG, retorna um erro.
      return callback(
        new Error("Por favor, envie apenas arquivos PNG, JPG ou JPEG.")
      )
    }
    callback(undefined, true) // Se o arquivo for válido, continua o upload.
  },
})
module.exports = imagemUpload
// module.exports = imagemUpload.single("profileImage") // Para upload de imagem única
