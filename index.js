require('dotenv').config();
const connectToMongo=require("./db")
const express = require('express')
const cors = require('cors')
connectToMongo()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

// Available Routes
app.use('/api/info',require('./routes/info'))

app.listen(port, () => {
console.log(`CRUD webapp listening on port ${port}`)
})