const { DataTypes } = require('sequelize');
const User = require('./user.js');
const sequelize = require('../connectDatabase');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    device_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
            len: {
                args: [0, 80],
                msg: "Device_id length must be less than 80 characters"
            }
        }
    },
    title: {
        type: DataTypes.STRING,
        validate: {

            len: {
                args: [0, 80],
                msg: "Title length must be less than 80 characters"
            }
        },
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [0, 140],
                msg: "Body length must be less than 140 characters"
            }
        }
    },
    retry: {
        type: DataTypes.ENUM('none', 'daily', 'weekly', 'monthly', 'yearly'),
        validate: {
            isIn: {
                args: [['none', 'daily', 'weekly', 'monthly', 'yearly']],
                msg: "Must be none or daily, or weekly, or monthly, or yearly"
            }
        },
        defaultValue: 'Monday'
    },
    notification_time: {
        type: DataTypes.ENUM('none', 'hour', 'day', 'week', 'month'),
        validate: {
            isIn: {
                args: [['none', 'hour', 'day', 'week', 'month']],
                msg: "Must be none or hour, or day, or week, or month"
            }
        },
        defaultValue: 'none'
    },
    is_closed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { timestamps: false });

Task.belongsTo(User, {
    foreignKey: 'device_id'
});

module.exports = Task;