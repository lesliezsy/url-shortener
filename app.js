const express = require('express')
const exphbs = require('express-handlebars')
const { urlencoded } = require("body-parser")

require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.use(urlencoded({ extended: true })) // body-parser
app.use(express.static('public')) // 如果會用到靜態資料夾 public

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
