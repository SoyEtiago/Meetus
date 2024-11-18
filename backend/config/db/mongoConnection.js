const mongoose = require('mongoose');
require('dotenv').config({path: '../.env'})

const {MONGO_ATLAS_URI} = process.env

const mongoDbConnect = async() => {
  try {
    await mongoose.connect(MONGO_ATLAS_URI)
    console.log('Connected to MongoDB cluster')
  } catch (error) {
    console.log(error)
  }
}

module.exports = mongoDbConnect

