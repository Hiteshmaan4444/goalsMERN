const express= require('express')
const dotenv = require("dotenv").config()
const colors = require('colors');
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDb = require('./config/db');
const port = process.env.PORT

connectDb();
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler);

app.listen(port,()=>{console.log(`server started at port ${port}`)});