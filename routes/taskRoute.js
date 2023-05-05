const express = require('express');
const { createTask, getAllTasks, updateTask, deleteTask, getHistory } = require("../controllers/taskController");

const router = express.Router();

router.route('/').post(createTask).get(getAllTasks);
router.route('/:id').patch(updateTask).delete(deleteTask);
router.route('/history/:task_id').get(getHistory);

module.exports = router;
