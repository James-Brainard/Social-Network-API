const { Schema, model, Types } = require('mongoose');
const { format_date } = require('../utils/helpers');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: value => format_date(value)
      // use a getter method to format the timestamp on query
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  }
);

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
      get: value => format_date(value)
      // Need Getter method to FORMAT TIMESTAMP on QUERY
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);


thoughtSchema
.virtual('reactionCount')
.get(function () {
  return this.reactions.length;
})

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;