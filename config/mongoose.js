const mongoose = require('mongoose') 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/record' // record是指本地的資料庫名稱

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

module.exports = db