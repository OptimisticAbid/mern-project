const express = require('express');
const app = express();
const urlRoutes = require('./routes/urlRoutes');
const { errorHandler } = require('./middleware/errorMiddleware')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', urlRoutes);
app.use(errorHandler)


app.listen(5000,() => {
    console.log("listening on Port 5000");
})