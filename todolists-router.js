const express = require('express')
const router = express.Router()
const {getTodolists, addTodolist, deleteTodolist, addTask, getTasks, deleteTask,updateTask} = require('./repository')

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
})

router.get('/', async (req, res) => {
    let todolists = await getTodolists()
    res.send(todolists)
})

router.post('/', async (req, res) => {
        try {
            let title = req.body.title
           let todolist= await addTodolist(title)
            res.send({resultCode: 0,item:todolist})
        } catch (e) {
            res.status(400).send('Something wrong')
        }
    }
)
router.delete('/:todolistId', async (req, res) => {
        let todolistId = req.params.todolistId
        try {
            await deleteTodolist(todolistId)
            res.send({resultCode: 0})
        } catch (e) {
            res.status(400).send('Something wrong')
        }
    }
)
router.get('/:todolistId/tasks', async (req, res) => {
        let todolistId = req.params.todolistId
        try {
            let tasks = await getTasks(todolistId)
            res.send(tasks)
        } catch (e) {
            res.status(400).send('Something wrong')
        }
    }
)
router.post('/:todolistId/tasks', async (req, res) => {
    let taskTitle = req.body.title
    let todolistId = req.params.todolistId
    try {
        let task = await addTask(taskTitle, todolistId)
        res.send({item: task, resultCode: 0})
    } catch (e) {
        res.status(400).send('Something wrong')
    }
})

router.delete('/:todolistId/tasks/:taskId', async (req, res) => {
        let taskTitle = req.params.taskId
        let todolistId = req.params.todolistId
        try {
            await deleteTask(taskTitle, todolistId)
            res.send({resultCode: 0})
        } catch (e) {
            res.status(400).send('Something wrong')
        }
    }
)
router.put('/:todolistId/tasks/:taskId', async (req, res) => {
        let taskId = req.params.taskId
        let task = req.body
        try {
           await updateTask(task, taskId)
            res.send({resultCode: 0,item:task})
        } catch (e) {
            res.status(400).send('Something wrong')
        }
    }
)

module.exports = router;
