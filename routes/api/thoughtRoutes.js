const router = require('express').Router();
const { getThoughts, newThought, getSingleThought, updateThought, deleteThought, newReaction, deleteReaction } = require('../../controllers/thoughtController');
// /api/thoughts


router.route('/')
  .get(getThoughts)
  .post(newThought);


router.route('/:thoughtsId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtsId/reactions')
  .post(newReaction);

router.route('/:thoughtsId/reactions/:reactionId')
  .delete(deleteReaction)

module.exports = router;