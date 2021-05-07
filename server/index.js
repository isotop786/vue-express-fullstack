const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')



const app = express()

// Middleware

app.use(bodyParser.json())
app.use(cors());

// database 
// const db = require('./db')
// app.use(db)

// routes
const posts = require('./routes/api/posts')

app.use('/api/posts',posts)

const port = process.env.PORT || 5000; 

app.listen(port,err=>{
    if(err){
        console.log(`Error is ${err}`)
    }

    console.log(`Server is running on port ${port}`)
})