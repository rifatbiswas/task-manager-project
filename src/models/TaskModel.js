const mongoose = require("mongoose");
const DataShema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
    email: {
      type: String,
    },
    createDate: {
      type: Data,
      defult: Date.now(),
    },
  },
  { versionkey: false }
);

const TaskModel = mongoose.model ("tasks", DataShema);
module.exports = TaskModel