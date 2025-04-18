const express = require("express")
const router = express.Router()
// Controller

const {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
} = require("../controllers/UserController")
//Middleware
const validate = require("../middlewares/handleValidation")
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middlewares/userValidations")
const authGuard = require("../middlewares/authGuard")
const imagemUpload = require("../middlewares/imageUpload")
// Routes
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser)
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imagemUpload.single("profileImage"),
  update
)

router.get("/:id", getUserById)
module.exports = router
