const express = require('express');
const bodyParser = require("body-parser");

const app = express();


require('dotenv').config()
const knex = require('./dbConfig');
const authRoutes = require('./routes/authRouter');
const taskRoutes = require('./routes/taskRouter');




app.get("/", async(req,res)=>{
    const users =await knex.select().table('users')
    res.send(`length ${users.length}`)
})

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/',authRoutes)
app.use('/',taskRoutes)


const PORT = process.env.PORT || 5000;
 
app.listen(PORT,()=>{
    console.log(`sever run is port ${PORT}`)
})