const router = require('express').Router();
const { getThoughts, newthought, getSingleThought, updateThought, deleteThought, newReaction, deleteReaction } = require('../../controllers/thoughtController');
// /api/thoughts


router.route('/').get(getThoughts).post(newthought);

router.route('/:thoughtsId')

router.route('/:thoughtsId').get(getSingleThought).put(updateThought).delete(deleteThought);
