import express from 'express'

import {
  getCustomTodos,
  getHomeTodos,
  handleDeleteTaskRequest,
  receivePostedTasks,
} from '../controller/todo.js'

const router = express.Router()

router.get('/', getHomeTodos)
router.get('/:customListName', getCustomTodos)
router.post('/', receivePostedTasks)
router.post('/delete', handleDeleteTaskRequest)



export default router
