const Category = require('../models/category');
const Task = require('../models/task');
const catchAsync = require('../utils/catchAsync');
Category.hasMany(Task, {
    foreignKey: 'category_id'
});
Task.belongsTo(Category, { as: "category" });

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
            id: parseInt(req.params.id)
        },
    });

    const task = await Task.findByPk(req.params.id, {
        attributes: {
            exclude: ['device_id', 'categoryId']
        }
    });

    res.json({
        task: task,
        status: "success"
    });
})



exports.deleteTask = catchAsync(async (req, res, next) => {
    await Task.destroy({
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
        attributes: { exclude: ['device_id', 'categoryId'] },
        order: [
            ["created_at", "DESC"]
        ],
        where: {
            device_id: req.query.device_id,
            is_closed: false
        },
        limit: parseInt(req.query.limit),
        offset: parseInt(req.query.offset),
        include: { model: Category, as: "category" },
    });

    res.status(200).json({
        tasks: tasks,
        status: "success"
    });
})

exports.getHistory = catchAsync(async (req, res, next) => {
    const tasks = await Task.findAll({
        attributes: { exclude: ['device_id', 'CategoryId'] },
        order: [
            ["created_at", "DESC"]
        ],
        where: {
            device_id: req.query.device_id,
            is_closed: true
        },
        limit: parseInt(req.query.limit),
        offset: parseInt(req.query.offset),
        include: { model: Category, as: "category" },
    });

    res.status(200).json({
        tasks: tasks,
        status: "success"
    });
})