const express = require("express");
const { createUser, getMyData, updateUser, getUsers } = require('../controllers/userController');

const router = express.Router();

router.route('/').post(createUser).get(getUsers);
router.route('/:id').get(getMyData).patch(updateUser);

module.exports = router;