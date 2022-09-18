import _ from 'lodash'
import Date from '../date.js'
import Home from '../model/home.js'
import CustomList from '../model/list.js'

const defaultTasks = [
  { name: 'Welcome to your todolist!' },
  { name: 'Hit the + button to add a new task' },
  { name: '<-- Hit this to delete a task' },
]

export const getHomeTodos = async (req, res) => {
  try {
    const day = Date.getDay()
    const homeTodos = await Home.find({})
    if (homeTodos) {
      if (homeTodos.length === 0) {
        await Home.insertMany(defaultTasks)
        res.redirect('/')
      } else {
        res.render('list', { listTitle: `Today - ${day}`, newListItems: homeTodos })
      }
    } else {
      console.log(err)
    }
  } catch (error) {
    console.log(error)
    res.render('error')
  }
}

export const getCustomTodos = async (req, res) => {
  try {
    const day = Date.getDay()
    const customListName = _.capitalize(req.params.customListName)
    const foundList = await CustomList.findOne({ name: customListName })
    if (foundList) {
      res.render('list', {
        listTitle: `${foundList.name} - ${day}`,
        newListItems: foundList.lists,
      })
    } else if (customListName === 'Favicon.ico') {
      return
    } else {
      const newList = new CustomList({
        name: customListName,
        lists: defaultTasks,
      })
      newList.save()
      res.redirect(`/${customListName}`)
    }
  } catch (error) {
    console.log(error)
    res.render('error')
  }
}

export const receivePostedTasks = async (req, res) => {
  try {
    const listName = req.body.list
    const isInclude = listName.includes("Today")
    const newTodo = new Home({
      name: req.body.newItem,
    })
    if (isInclude) {
      await newTodo.save()
      res.redirect('/')
    } else {
      const foundList = await CustomList.findOne({ name: listName })
      if (foundList) {
        foundList.lists.push(newTodo)
        foundList.save()
        res.redirect(`/${listName}`)
      }
    }
  } catch (error) {
    console.log(error)
    res.render('error')
  }
}

export const handleDeleteTaskRequest = async (req, res) => {
  try {
    const taskObj = req.body
    const listName = Object.keys(taskObj)[0]
    const isInclude = listName.includes("Today")
    const taskId = Object.values(taskObj)[0]
    if (isInclude) {
      await Home.findByIdAndDelete(taskId)
        .then(() => {
          res.redirect('/')
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      await CustomList.findOneAndUpdate(
        { name: listName },
        { $pull: { lists: { _id: taskId } } }
      )
      res.redirect(`/${listName}`)
    }
  } catch (err) {
    console.log(err)
    res.render('error')
  }
}
