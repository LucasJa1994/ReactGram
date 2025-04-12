const express = require("express")

const router = express.Router()

// controller
const { insertPhoto } = require("../controllers/PhotoController")
//  middleware
const photoInsertValidation = require("../middlewares/PhotoValidation")

const authGuard = require("../middlewares/authGuard")
const validator = require("../middlewares/handleValidation")
const imageUpload = require("../middlewares/imageUpload")
// routes
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validator,
  insertPhoto
)

module.exports = router
