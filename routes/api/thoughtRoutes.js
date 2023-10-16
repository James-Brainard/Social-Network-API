const router = require('express').Router();
// /api/thoughts
// get all, create new
router.route('/').get(getThoughts).post(newthought);
// get single
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
// Update single thought by its _id


// POST to create a reaction stored in a single thought's reations array field

// DELETE to pull and remove a reaction by the reaction's reactionId value
