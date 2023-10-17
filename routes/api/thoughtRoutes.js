const router = require('express').Router();
const { getThoughts, newThought, getSingleThought, updateThought, deleteThought, newReaction, deleteReaction } = require('../../controllers/thoughtController');
// /api/thoughts


router.route('/').get(getThoughts).post(newThought);

router.route('/:thoughtsId')

router.route('/:thoughtsId').get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;