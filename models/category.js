const { DataTypes } = require('sequelize');
const sequelize = require('../connectDatabase');

const Category = sequelize.define('Category', {
    device_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
});


console.log(Category === sequelize.models.Category);

module.exports = Category;