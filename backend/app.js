const express = require('express')
const app = express()
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/user')

//Pacote para reculerar as constantes do arquivo .env
require('dotenv').config()

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})
.then(() => console.log('BD está conectado'))
.catch((error) => {
    console.log(error)
})

app.use(bodyParser.json())
app.use(cookieParser)

app.use('/api',userRouter)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server está rodando na porta: ${port}`)
})