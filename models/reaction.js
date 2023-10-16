const { Schema } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {

    },
    reactionBody: {

    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use a getter method to format the timestamp on query
    }
  }
)