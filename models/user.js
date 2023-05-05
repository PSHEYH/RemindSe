const { DataTypes } = require('sequelize');
const sequelize = require('../connectDatabase');

const User = sequelize.define('User', {
    device_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
            len: {
                msg: "Device_id must be less than 64 characters",
                args: [0, 64]
            }
        }
    },
    fcm_token: {
        type: DataTypes.STRING,
        validate: {
            len: {
                msg: "Fcm token must be less than 250 characters",
                args: [0, 250]
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            len: {
                msg: "Name must be less than 40 characters",
                args: [0, 40]
            }
        }
    },
    is_notify: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
}, { timestamps: false, underscored: true });


module.exports = User;