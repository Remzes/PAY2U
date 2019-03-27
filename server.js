import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import {dbInit} from './server/db'

// App Init
const app = express()

// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Express Session
app.use(cookieSession({
  secret: 'sessionSecret',
  secure: false,
  keys: ["secret_keys"],
  maxAge: 360000
}))

// Cookie Parser
app.use(cookieParser())

// Error handling - global (simple one)
app.use(function (err, req, res, next) {
  if (err) {
    const title = err.stack.split('\n')[0]
    res.status(500).json({ success: false, message: title })
  } else {
    next()
  }
})


dbInit(() => {
  const Offers = require('./server/routes/offers')
  const Clicks = require('./server/routes/clicks')
  const Tickets = require('./server/routes/tickets')
  app.use('/api/offers', Offers)
  app.use('/api/clicks', Clicks)
  app.use('/api/tickets', Tickets)

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
})

app.listen(process.env.PORT || 3001, () => {
  console.log('Server running on PORT 3001')
})
