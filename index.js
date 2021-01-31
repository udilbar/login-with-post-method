const express = require('express')
const users = require('./users')
const url = require('url')

const app = express()

let my_token = ''

app.use(express.json())

app.use((req, res, next) => {

  if (url.parse(req.url).pathname !== '/login') {

    const { token } = req.headers

    if (token === my_token) {

      next()
    }
    else {

      res.status(403).end()
    }
  }
  else {
    next()
  }
})

app.post('/login', (req, res) => {
  const { username, password } = req.body

  let userInfo = users.find(user => user.username === username && user.password === password)

  const token = String(Math.floor(Math.random() * 1000000))
  my_token = token

  if (userInfo) {
    res.send({
      token: token,
      user: {
        id: userInfo.id
      }
    })
  } else {
    res.status(401).send('Error, sign up firstly')
  }

  res.end()
})

app.get('/numbers', (_, res) => {
  res.send([1, 2, 3])
})

app.listen(4002, console.log(4002))