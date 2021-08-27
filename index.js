const express = require('express')
const path = require('path')
const fs = require('fs')
const exphbs = require('express-handlebars')
const homeRouter = require('./routes/home')
const carsRouter = require('./routes/cars')
const addRouter = require('./routes/add')
const cardRouter = require('./routes/card')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRouter)
app.use('/cars', carsRouter)
app.use('/add', addRouter)
app.use('/card', cardRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`)
})