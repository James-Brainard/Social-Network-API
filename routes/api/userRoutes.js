const router = require('express').Router();
// Require exports from USER CONTROLLER BELOW
const { getUsers, createUser, getSingleUser, updateUser, deleteUser } = require('../../controllers/userController');

// This can contain below AND MAYBE POST & DELETE to add and remove friend from users list?
// Get ALL & Get One user
// POST new user
router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
// PUT update user by its _id
// DELETE remove user by its _id


module.exports = router;