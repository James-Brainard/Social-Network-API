const router = require('express').Router();
// Require exports from USER CONTROLLER BELOW
const { getUsers, createUser, getSingleUser, updateUser, deleteUser, addAFriend, deleteAFriend } = require('../../controllers/userController');

// This can contain below AND MAYBE POST & DELETE to add and remove friend from users list?
// Get ALL & Get One user
// POST new user
router.route('/')
  .get(getUsers)
  .post(createUser);
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:userId/friends/:friendId')
  .post(addAFriend)
  .delete(deleteAFriend);


module.exports = router;