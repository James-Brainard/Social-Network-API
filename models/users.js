const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        'Please enter a valid email'
      ]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    }
  }
);
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
.virtual('friendCount')
.get(function () {
  return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;