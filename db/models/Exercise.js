const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const EercisePrototype = {
  userId: String,
  desciption: String,
  duration: String,
  date: String,
}

const Exercise = new Schema(EercisePrototype);
model('Exercise', Exercise);
