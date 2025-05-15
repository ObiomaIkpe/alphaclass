const express = require('express')
const connectDB = require('./DB/connect')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')

const app = express()


app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})


const start = async () => {
    try {
        await connectDB(process.env.DB_URI)
        app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
    } catch (error) {
        console.log(error)
    }    
}

start()

