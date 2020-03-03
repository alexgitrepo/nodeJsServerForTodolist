const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
const todoListSchema = new mongoose.Schema({
    title: {type: String, required: true},
    created_at: {type: Date, required: true, default: Date.now}
})
const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    todolistId: {type: String, required: true},
    created_at: {type: Date, required: true, default: Date.now},
    order: {type: Number},
    priority: {type: Number},
    status: {type: Number}
})
const Task = mongoose.model('tasks', taskSchema)
const Todolist = mongoose.model('todolist', todoListSchema)
const getTodolists = () => {
    return Todolist.find()
}
const addTodolist = async (title) => {
    const todolist = new Todolist({title})
    await todolist.save()
    return todolist
}

const deleteTodolist = async(todolistId) => {
    await Todolist.deleteOne({_id: todolistId})
    return Task.deleteMany({todolistId: todolistId})
}
const getTasks = (todolistId) => {
    return Task.find({todolistId: todolistId})
}
const addTask = async (taskTitle, todolistId) => {
    let order = await Task.count({todolistId:todolistId})
    order++
    const task = new Task({title: taskTitle, todolistId: todolistId, order: order, priority: 1, status: 0})
    await task.save()
    return task
}
const updateTask = async (task, taskId) => {
    return Task.update({_id:taskId},{...task})

}
const deleteTask = (taskId, todolistId) => {
    return Task.deleteOne({_id: taskId})
}
exports.getTodolists = getTodolists
exports.addTodolist = addTodolist
exports.deleteTodolist = deleteTodolist
exports.addTask = addTask
exports.deleteTask = deleteTask
exports.getTasks = getTasks
exports.updateTask=updateTask