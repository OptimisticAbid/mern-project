const express = require('express');
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDb = require('./config/db')
const urlRoutes = require('./routes/urlRoutes');
const userRoutes = require('./routes/userRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')

connectDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/urls', urlRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler)


app.listen(5000,() => {
    console.log("listening on Port 5000");
})