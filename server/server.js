const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 8080;

connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/faq', require('./routes/faqRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => {console.log(`Listing to port ${port}`)});