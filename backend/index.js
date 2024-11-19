const express = require('express')
const cors = require('cors')
const eventRouter = require('./routes/eventRoute.js')
const mongoDbConnect = require('./config/db/mongoConnection')
require('dotenv').config({path: '../.env'})
const usuarioRoute = require('./routes/usuarioRoute.js')

const {PORT} = process.env

const app = express()

app.use(express.json())
app.use(cors())

mongoDbConnect()

app.use('/api', eventRouter);
app.use('/api', usuarioRoute);

app.get('/', (req, res)=> {
  res.send("API Meetus")
})

app.listen(PORT, ()=> {
  console.log(`Servidor corriendo en puerto: ${PORT}`)
})