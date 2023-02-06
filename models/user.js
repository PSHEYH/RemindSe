const { DataTypes } = require('sequelize');
const sequelize = require('../connectDatabase');

const User = sequelize.define('User', {
    device_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
            max: 64
        }
    },
    fcm_token: {
        type: DataTypes.STRING,
        validate: {
            max: 200
        }
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            max: 40
        }
    },
    is_notify: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
}, { timestamps: false });


console.log(User === sequelize.models.User);

module.exports = User;