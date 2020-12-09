const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller');

router
  .route('/')
  .get(taskController.renderTasks)
  .post(taskController.createTask)

router
  .route('/delete')
  .post(taskController.deleteTask)

router
  .route('/changeStatus')
  .post(taskController.changeStatus)

router
  .route('/edit')
  .post(taskController.editTask)

module.exports = router;
