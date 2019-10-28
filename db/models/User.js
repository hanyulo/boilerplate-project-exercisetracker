const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const UserPrototype = {
  name: String,
  userId: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
}
const User = new Schema(UserPrototype);
model('User', User);
