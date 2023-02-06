const Task = require('../models/task');
const catchAsync = require('../utils/catchAsync');

exports.createTask = catchAsync(async (req, res, next) => {
    const task = await Task.create(req.body);

    res.json({
        task: task,
        status: "success"
    });
})

exports.updateTask = catchAsync(async (req, res, next) => {
    await Task.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    res.json({
        status: "success"
    });
})

exports.deleteTask = catchAsync(async (req, res, next) => {
    const task = await Task.destroy({
        where: {
            device_id: req.body.device_id,
            id: req.params.id
        }
    });

    res.status(204).json({
        status: "deleted"
    });
})

exports.getAllTasks = catchAsync(async (req, res, next) => {
    const tasks = await Task.findAll({
        where: {
            device_id: req.query.device_id
        },
        limit: parseInt(req.query.limit),
        offset: parseInt(req.query.offset)
    });

    res.status(200).json({
        tasks: tasks,
        status: "success"
    });
})