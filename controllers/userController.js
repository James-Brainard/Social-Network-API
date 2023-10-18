// NEED ('/') GET getUsers & POST createUser
// NEED ('/:userId) GET getSingleUser - PUT updateUser - DELETE deleteUser
const { Thoughts, User } = require('../models');



module.exports = {
  async getUsers(req, res) {
    try {
      const usersData = await User.find({})
        .populate('thoughts')
        .populate('friends')
      if (!usersData) {
        res.json({message: 'Could not get all users'})
      }
      res.json(usersData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends');

      if (!userData) {
        return res.status(404).json({ message: 'No user with that ID was found.' })
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const createUserData = await User.create(
        { username: req.body.username, email: req.body.email }
        );
      if (!createUserData) {
        res.status(404).json({ message: 'Could not create new user '})
      }
      res.json(createUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      // 
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true}
        )
        .populate('thoughts')
        .populate('friends')
        
      if (!dbUserData) {
        return res.status(400).json({ message: 'No user with that ID was found.' })
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const findDeleteUser = await User.findById(req.params.userId)
      const deleteThoughts = await Thoughts.deleteMany({ username: findDeleteUser.username })
      const dbDeleteUser = await User.deleteOne({ _id: req.params.userId })

      if (!dbDeleteUser) {
        return res.status(400).json({ message: 'No user with that ID was found.'})
      }
      res.status(200).json({message: 'User successfully deleted.'})
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addAFriend(req, res) {
    try {
      const addAFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
        )
        .populate('friends')
        .populate('thoughts')
      if (!addAFriend) {
        return res.status(404).json({ message: 'Could not Add friend, please try again.'})
      }
      res.status(200).json(addAFriend);
    } catch(err) {
      res.status(500).json(err);
    }
  },
  async deleteAFriend(req, res) {
    try {
      const deleteAFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }
      )
    if (!deleteAFriend) {
      return res.status(404).json({ message: 'Could not delete friend, please try again.'})
    }
    res.json(deleteAFriend);
    } catch(err) {
      res.status(400).json(err)
    }
  }
};