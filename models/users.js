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
      validate: {
        isEmail: true,
      }
    },
    thoughts: {

    },
    friends: {

    }
  }
);
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const User = model('User', userSchema);

module.exports = User;