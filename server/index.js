const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Expose-Headers, Platform, Token, Uid'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, GET, DELETE, OPTIONS, HEAD'
    )
    // res.header('Content-Type', 'application/json charset=utf-8')
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/health/auth', require(__dirname + '/module/auth'))
app.use('/health/user', require(__dirname + '/module/user'))
app.use('/health/exercise', require(__dirname + '/module/exercise'))
app.use('/health/heart', require(__dirname + '/module/heart'))
app.use('/health/nutrition', require(__dirname + '/module/nutrition'))

app.listen(8091, () => {
    console.log('express listen port 8091')
})
