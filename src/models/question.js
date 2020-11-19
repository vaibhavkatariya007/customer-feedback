const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  question: { type: String, required: true },
  typeOfQuestion: { type: String, required: true },
  isRequired: { type: Boolean, required: true, default: false },
});

module.exports =
  mongoose.models.Question || mongoose.model('Question', questionSchema);
