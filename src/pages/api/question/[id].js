import { getSession } from 'next-auth/client';
const Question = require('@/models/question');
const db = require('@/lib/db');

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    await db();
    const _id = req.query.id;
    const body = req.body;
    switch (req.method) {
      case 'GET':
        Question.findById(_id)
          .exec()
          .then((result) => res.status(200).json(result));
        break;
      case 'PUT':
        Question.update({ _id }, body)
          .exec()
          .then((result) => res.status(200).json(result));
        break;
      case 'DELETE':
        Question.remove({ _id })
          .exec()
          .then(
            (result) =>
              result &&
              res.status(200).json({
                success: true,
                message: 'question deleted successfully.',
              })
          );
        break;
      default:
        res.status(400).json({ error: 'Bad request' });
        break;
    }
  } else {
    res.status(401).json({ error: 'Access Not Allowed.' });
  }
};
