const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Need Getter method to FORMAT TIMESTAMP on QUERY
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: {
      // Array of nested documents created with the reactionSchema
    }
  }
);

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;