const mongoose = require('mongoose') 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/url-shortener' // url-shortener指本地的資料庫名稱

require('dotenv').config()
const baseUrl = process.env.baseUrl || `http://localhost:${PORT}/`

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

module.exports = { db, baseUrl}