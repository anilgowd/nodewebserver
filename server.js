const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')
var app = express()

const port = process.env.PORT || 3000

hbs.registerPartials(path.join(__dirname, '/views', 'partials'))
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.path}`

  console.log(log)
  fs.appendFile('server.log', log + '\n', () => {
    console.log('Unable to save log')
  })

  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(path.join(__dirname, '/public')))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>')
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my Page'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'My Projects'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    error: {
      message: 'unable to handle request'
    }
  })
})
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
