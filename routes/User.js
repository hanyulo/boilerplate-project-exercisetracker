const mongoose = require('mongoose');
const User = mongoose.model('User');
const shortid = require('shortid');

const createUser = (app) => {
  const handler = async (req, res) => {
    const { username } = req.body;
    try {
      const doc = await User.findOne({ name: username });
      if (doc) {
        res.status(200).send('username already taken');
      } else {
        const newDoc = {
          name: username,
          userId: shortid.generate(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
        User.create(newDoc, (err, doc) => {
          if (err) {
            throw new Error(err);
          }
          res.status(200).json(doc);
        })
      }
    } catch(e) {
      res.statu(500).json({
        error: 'system error'
      })
    }

  }
  app.post('/api/exercise/new-user', handler)
}

module.exports = createUser;
