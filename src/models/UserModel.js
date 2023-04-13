const mongoose = require("mongoose");
const DataShema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
    },
    photo: {
      type: String,
    },
    createdData: {
      type: Date,
      defult: Date.now(),
    },
  },
  { versionkey: false }
);

const UserModel = mongoose.model("users", DataShema);
module.exports = UserModel;
