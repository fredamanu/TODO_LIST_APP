import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import TodoRouter from './router/todo.js'

dotenv.config({ path: '.env' })
const app = express()

//setting up app to use these packages
app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

//Routers
app.use('/', TodoRouter)
app.use('/about', TodoRouter)
app.use('/delete', TodoRouter)

app.listen(5500, () => {
  console.log('server is running on port 5500')
})
