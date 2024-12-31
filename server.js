require('dotenv').config()
const { error } = require('console')
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
var cors = require('cors')

const app = express()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000
const FRONTEND = process.env.FRONTEND


//CORS backend and frontend
var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//route products
app.use('/api/product', productRoute)

//route
app.get('/', (req, res) => {
    //throw new Error('here is fake error');
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog My Name is Trisa')
})

//use middleware error
app.use(errorMiddleware);

mongoose.connect(MONGO_URL)
        .then(() => {
            console.log('Database MongoDb Connected!')
            app.listen(PORT, ()=> {
            console.log("Node API is running on port " + PORT)
        })
    }).catch((error) => {
        console.log(error)
    })