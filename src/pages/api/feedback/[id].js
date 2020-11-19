import { getSession } from 'next-auth/client';
const Feedback = require('@/models/feedback');
const db = require('@/lib/db');

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    await db();
    const _id = req.query.id;
    switch (req.method) {
      case 'DELETE':
        Feedback.remove({ _id })
          .exec()
          .then(
            (result) =>
              result &&
              res.status(200).json({
                success: true,
                message: 'feedback deleted successfully.',
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
