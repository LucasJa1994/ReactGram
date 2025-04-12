const Photo = require("../models/Photo")
const user = require("../models/User")
const mongoose = require("mongoose")

// insert a photo, with an user related to it

const insertPhoto = async (req, res) => {
  const { title } = req.body
  const image = req.file.filename

  const reqUser = req.user

  const userId = new mongoose.Types.ObjectId(reqUser.id)

  // create a photo

  const newPhoto = await Photo.create({
    image,
    title,
    userID: userId,
    userName: reqUser.name,
  })

  // if photo is created, return data
  if (!newPhoto) {
    return res.status(422).json({ message: "Photo not created" })
  }
  res.status(201).json(newPhoto)
  // return the photo created
}
module.exports = { insertPhoto }
