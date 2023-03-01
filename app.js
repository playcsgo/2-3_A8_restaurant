const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
require('./config/mongoose')
const routes = require('./routes')
const port = 3000


app.engine('hbs', exphbs.engine({defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(routes)  // 這個要放最後  不然routes讀不到
app.listen(port, () => {
  console.log(`Express is running on http://localhost${port}`)
})
