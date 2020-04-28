const Task = require('../models/Task');

let showTasks = async (req, res)=>{
   await Task.find({
    _listId: req.params.listId
   }).lean()
    .then( tasks=>{
        res.send(tasks);
    })
    .catch((e)=>{
        res.send(e)
    })
}

let addTask = (req, res)=>{
    let newTask = new Task({
        title : req.body.title,
        _listId: req.params.listId
    })
    newTask.save().then(tasknew =>{
        res.json({status: true, msg: 'new task added' })
    })
}

let updateTask = async(req, res)=>{
    await Task.findOneAndUpdate({
        _id:req.params.taskId,
        _listId: req.params.listId
    },{$set: req.body})
    .then(taskupdate =>{
        res.json({status: true, msg: 'task updated' })
    })
}

let deleteTask = async (req, res)=>{
    await Task.findOneAndRemove({
        _id:req.params.taskId,
        _listId: req.params.listId
    })
    .then(taskupdate =>{
        res.json({status: true, msg: 'task has been removed' })
    })
}

module.exports = { showTasks, addTask, updateTask, deleteTask}