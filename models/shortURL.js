// shortURL model - data schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortUrlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortenUrl: {
    type: String, 
    required: true 
  }
})

module.exports =  mongoose.model('ShortUrl', shortUrlSchema)