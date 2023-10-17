// NEED ('/') GET getUsers & POST createUser
// NEED ('/:userId) GET getSingleUser - PUT updateUser - DELETE deleteUser
const User = require('../models/users');


module.exports = {
  async getUsers(req, res) {
    try {
      const usersData = await User.find();
      res.json(usersData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId })
        .populate('thoughts', 'friends')
      
        if (!userData) {
          return res.status(404).json({ message: 'No user with that ID was found.'})
        }
        res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try{ 
      const createUserData = await User.create(req.body);
      res.json(createUserData);
    } catch(err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      // 
      const { thoughts, reactions } = req.body
      const dbUserData = await User.findOne({ _id: req.params.userId})
      if (!dbUserData) {
        return res.status(400).json({message: 'No user with that ID was found.'})
      }
      User.reactions = reactions;
      User.thoughts = thoughts;
    } catch(err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try{
      const dbDeleteUser = await User.findOne({_id: req.params.userId})
      if (!dbDeleteUser) {
        return res.status(400).json({message: 'No user with that ID was found.'})
      }
    } catch(err) {
      res.status(500).json(err);
    }
  }
};