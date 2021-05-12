const express = require('express')
const exphbs = require('express-handlebars')
const { urlencoded } = require("body-parser")
const app = express()
const generateUrl = require('./generate_url')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(urlencoded({ extended: true })) // body-parser
app.use(express.static('public')) // 如果會用到靜態資料夾 public

require('./config/mongoose')
const ShortUrl = require('./models/shortURL') // 載入shortURL model, 使用mongoose提供的data schema, 方便建立db資料，並access相關資料

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', async (req, res) => {
  const { url } = req.body
  let shortUrl = ''

  try {
    // 先查url在db是否有紀錄，若有就直接帶出資料，防止重複生成不必要的網址組合
    const result = await ShortUrl.find({ originalUrl: url }).lean()
    console.log("查url在db是否有紀錄: ", result);

    if (result.length !== 0) {

      shortUrl = result[0]['shortenUrl']
      console.log("既有的shortUrl: ", shortUrl);

    } else {
      // 若db沒資料，則生成生成專屬亂數5碼; 檢查亂數是否重複，沒才使用
      do {
        shortUrl = generateUrl()
  
        const result = await ShortUrl.find({
          shortenUrl: shortUrl
        }).lean()
  
        console.log("查詢亂數是否重複結果： ", result);
        console.log("沒紀錄，新生成的url: ", shortUrl);

        // 若 result.length === 0 代表沒重複，可以停止迴圈
        // 若 result.length !== 0 代表重複，繼續迴圈
        if(result.length === 0) break

      } while(result.length !== 0)

      console.log("沒紀錄，新生成的url: ", shortUrl);
     
      // 並在db建一筆資料
      ShortUrl.create({
        originalUrl: url,
        shortenUrl: shortUrl
      })

      shortUrl = `https://ls-url-shortener.herokuapp.com/${shortUrl}`

    }

    res.render('index', { url, shortUrl })

  } catch (err) {
    console.log(err)
  }

})

app.get('/:shortenUrl', async (req, res) => {
  try {
    const result = await ShortUrl.find({ shortenUrl: req.params.shortenUrl }).lean()
    
    // if type wrong url
    if(result.length === 0) return res.status(404).send(" Sorry, this URL doesn't exist! ")
    const [{ originalUrl }] = result
    return res.redirect(originalUrl)

  } catch (err) {
    console.log(err)
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})