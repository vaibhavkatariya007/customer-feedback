const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userMobile: { type: Number, required: true },
  comment: { type: String },
  qna: [
    {
      question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
      question: { type: String },
      answer: { type: String },
    },
  ],
});

module.exports =
  mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);
