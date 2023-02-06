const express = require('express');
const { createTask, getAllTasks, updateTask, deleteTask } = require("../controllers/taskController");

const router = express.Router();


router.route('/').post(createTask).get(getAllTasks);
router.route('/:id').patch(updateTask).delete(deleteTask);

module.exports = router;
