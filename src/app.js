const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        author: 'Alejandro'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        author: 'Alejandro'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Alejandro',
        helpMessage: 'This is the help message '
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must provide a valid address' })
    }

    geocode(req.query.address, (error, { latutide, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        else {
            forecast(latutide, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                else {
                    res.send({
                        forecast: forecastData.message,
                        location: location,
                        address: req.query.address
                    })
                }
            })
        }
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'The help page that you are looking for was not found',
        author: 'Alejandro'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'The page that you are looking for was not found',
        author: 'Alejandro'
    })
})

app.listen(4000, () => {
    console.log('Server Up on 4000')
})