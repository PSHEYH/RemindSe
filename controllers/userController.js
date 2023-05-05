const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

exports.createUser = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body);
    await user.save();

    res.json({
        data: user,
        status: "success"
    });
})

exports.getUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({ limit: req.body.limit, offset: req.body.offset });
    res.json({
        users: users,
        status: "success"
    });
})

exports.updateUser = catchAsync(async (req, res, next) => {
    await User.update(req.body, {
        where: {
            device_id: req.params.id
        },
        fields: ["name", "fcm_token", "is_notify", "avatar"]
    });

    res.json({
        status: "update"
    });
})

exports.getMyData = catchAsync(async (req, res, next) => {
    const mydata = await User.findByPk(req.params.id);
    res.json({
        data: mydata,
        status: "success"
    });
})