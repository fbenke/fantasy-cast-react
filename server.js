const express = require('express')
const path = require('path')

const app = express()

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleWare = require('webpack-dev-middleware')
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config.js')
  app.use(webpackMiddleWare(webpack(webpackConfig)))
} else {
  app.use(express.static('build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'))
  })
}

app.listen(8080, () => console.log('Listening'))
