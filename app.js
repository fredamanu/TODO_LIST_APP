import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import {
  getCustomTodos,
  getHomeTodos,
  handleDeleteTaskRequest,
  receivePostedTasks,
} from './controller/todo.js'

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
    console.log(process.env.MONGODB_URI);
  })
  .catch((err) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

//Routers
app.get('/', getHomeTodos)
app.get('/:customListName', getCustomTodos)
app.post('/', receivePostedTasks)
app.post('/delete', handleDeleteTaskRequest)

let port = process.env.PORT
if (port == null || port == '') {
  port = 5500
}

app.listen(port, () => {
  console.log('server is running...')
})
