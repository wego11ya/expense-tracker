const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Record", recordSchema);

// 後續再優化
// userId: {
//   type: Schema.Types.ObjectId,
//   ref: "User",
//   index: true,
//   required: true,
// },
// categoryId: {
//   type: Schema.Types.ObjectId,
//   ref: "Category",
//   index: true,
//   required: true,
// },
