const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  empleadoid: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  nationality: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
    trim: true,
  },
  civilStatus: {
    type: String,
    require: true,
  },
  birthday: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
UserSchema.index({ "$**": "text" });

module.exports = mongoose.model("User", UserSchema);
