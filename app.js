const express = require('express')
const req = require('express/lib/request')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hi')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING IS PORT ${PORT}`)
})