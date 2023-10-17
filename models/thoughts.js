const { Schema, model } = require('mongoose');
const { format_date } = require('../utils/helpers')

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
      get: (date) => {
        if (date) return date.format_date
      }
      // Need Getter method to FORMAT TIMESTAMP on QUERY
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [
      reactionSchema
        // Array of nested documents created with the reactionSchema
    ]
  },
  {
    toJSON: {
      virtuals: true,
    }
  }
);

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return date.format_date
      }
      // use a getter method to format the timestamp on query
    }
  }
);

thoughtSchema
.virtual('reactionCount')
.get(function () {
  return this.reactions.length;
})

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;