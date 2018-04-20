var express = require('express')
var app = express()

app.use('/frontend', express.static('build'))
app.listen(8080)
