import { getSession } from 'next-auth/client';
const mongoose = require('mongoose');
const Feedback = require('@/models/feedback');
const db = require('@/lib/db');

export default async (req, res) => {
  const session = await getSession({ req });

  await db();
  const feedback = new Feedback({
    _id: new mongoose.Types.ObjectId(),
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userMobile: req.body.userMobile,
    comment: req.body.comment,
    qna: req.body.qna,
  });
  switch (req.method) {
    case 'GET':
      if (session) {
        Feedback.find()
          .select('_id userName userEmail userMobile comment qna')
          .exec()
          .then((result) => res.status(200).json(result));
      } else {
        res.status(401).json({ error: 'Access Not Allowed.' });
      }
      break;
    case 'POST':
      try {
        feedback
          .save()
          .then((result) => {
            res.status(201).json({
              success: true,
              ...result,
            });
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
