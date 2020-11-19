const mongoose = require('mongoose');
const Question = require('@/models/question');
const db = require('@/lib/db');

export default async (req, res) => {
  await db();
  const question = new Question({
    _id: new mongoose.Types.ObjectId(),
    question: req.body.question,
    typeOfQuestion: req.body.typeOfQuestion,
    isRequired: req.body.isRequired,
  });
  switch (req.method) {
    case 'GET':
      try {
        Question.find()
          .select('_id question typeOfQuestion isRequired')
          .exec()
          .then((result) => {
            res.status(200).json(result);
          });
      } catch (error) {
        res.status(500).json({
          error: error,
        });
      }
      break;
    case 'POST':
      try {
        question
          .save()
          .then((result) => {
            res.status(201).json(result);
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      } catch (error) {
        res.status(500).json({
          error: error,
        });
      }
      break;
    default:
      res.status(400).json({ error: 'Bad request' });
      break;
  }
};
