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
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
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