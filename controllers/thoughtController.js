// Need GET getThoughts - POST newThought
// to /:thoughtId GET getSingleThought - PUT updateThought - DELETE deleteThought
const { Thoughts, Users } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughtsData = await Thoughts.find({})
        .populate('reactions')
      res.json(thoughtsData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const dbSingleThought = await Thoughts.findOne({ _id: req.params.thoughtsId })
        .populate('reactions')

      if (!dbSingleThought) {
        return res.status(404).json({ message: 'No thought with that ID was found.' })
      }
      res.json(dbSingleThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async newThought(req, res) {
    try {
      const dbNewThought = await Thoughts.create(req.body);
      const updateUserThought = await Users.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: dbNewThought._id } },
        { new: true }
      )
      if (!updateUserThought) {
        return res.status(404).json({ message: 'Could not update User with new Thought.' });
      }
      res.json(updateUserThought);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async deleteThought(req, res) {
    try {
      const dbDeleteThought = await Thoughts.findOne({ _id: req.params.thoughtsId });

      if (!dbDeleteThought) {
        return res.status(400).json({ message: 'No thought with that ID was found.' })
      }
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async updateThought(req, res) {
    try {
      const dbUpdateThought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { new: true }
      )
        .populate('reactions')

      if (!dbUpdateThought) {
        return res.status(400).json({ message: 'No thought with that ID was found.' });
      }
      res.json(dbUpdateThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async newReaction(req, res) {
    try {
      const createReaction = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
      if (!createReaction) {
        res.status(404).json({ message: 'Could not create new reaction, please try again.' })
      }
      res.json(createReaction);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async deleteReaction(req, res) {
    try {
      const deleteReaction = await Thoughts.findOneAndUpdate(
        {_id: req.params.thoughtsId},
        { $pull: { reactions: req.params.reactionId} },
        { new: true, runValidators: true }
        )
      if (!deleteReaction) {
        res.status(400).json({message: 'No reaction with that id was found.'})
      }
      res.json(deleteReaction);
    } catch(err) {
      res.status(500).json(err);
    }
  }
}