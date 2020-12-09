require('dotenv').config()
const Task = require('../models/task.model')

const createTask = async (req, res) => {

  const { id, name, status, edit, isLoaded } = req.body

  try {
      const newTask = new Task({
        id: id,
        name: name,
        status: status,
        edit: edit,
        isLoaded: true,
        message: ''
      })

    await newTask.save()
    const task = await Task.findOne({ id: req.body.id });

    function sendTask() {
    res.send(task)
    }
    setTimeout(sendTask, 3000);

    } catch (e) {
      console.log(e);
  }
};

const deleteTask = async (req, res) => {

  try {
    const deletedTask = await Task.deleteOne({ id: req.body.id });
    const task = await Task.find();

    res.json(task);
  } catch (error) {
    res.send(500).end();
  }
};

const changeStatus = async (req, res) => {

  const { id, name, status, edit } = req.body

  try {
    const task = await Task.findOne({ name: req.body.name });
    task.status = !task.status
    await task.save()
    const tasks = await Task.find();
    res.send(tasks)
  } catch (error) {
    res.send(500).end();
  }
};

const editTask = async (req, res) => {

  try {
    const task = await Task.findOne({ id: req.body.id });
    task.name = req.body.name

    await task.save()
  } catch (error) {
    res.send(500).end();
  }
};

const renderTasks = async (req, res) => {

  try {
    const tasks = await Task.find();

    function sendTasks() {
    res.send(tasks)
}
    setTimeout(sendTasks, 3000);

  } catch (error) {
    res.send(500).end();
  }
};

module.exports = {
  createTask,
  deleteTask,
  changeStatus,
  editTask,
  renderTasks
};
