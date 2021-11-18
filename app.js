const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const router = require('./routes/index')

//Load config 
//dotenv loads environment variables from the .env file, which we created
dotenv.config({ path: './config/config.env' })

//Instantiate the db connection
connectDB()

//express is the server itself
const app = express()

//Logging if server is in dev mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


//Handlebars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs')

// Routes
app.use('/', router)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))