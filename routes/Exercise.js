const mongoose = require('mongoose');
const Exercise = mongoose.model('Exercise');
const User = mongoose.model('User');

const createExercise = (app) => {
  const postHandler = async (req, res) => {
    const {
      userId,
      description,
      duration,
      date
    } = req.body;
    try {
      const userDoc = await User.findOne({ userId });
      const dataValidation = () => {
        if (!userDoc) {
          res.status(200).send('unknown _id');
        }
        const newDateObj = new Date(date);
        if (newDateObj instanceof Date && isNaN(newDateObj)) {
          res.status(200).send('invalid date string');
        }
      }
      dataValidation();
      const newExerciseDoc = {
        userId,
        description,
        duration,
        date
      }
      Exercise.create(newExerciseDoc, (err, doc) => {
        if (err) {
          throw new Error(err);
        }
        res.status(200).json(doc);
      })
    } catch(e) {
      res.status(500).json({
        error: 'system error'
      })
    }
  }

  const getHandler = async (req, res) => {
    const { userId, from, to, limit } = req.query;
    if (!userId) {
      res.status(200).send('please provide userId');
    }
    const finalLimit = !isNaN(+limit) ? (+limit) : 10;
    const queryDoc = {
      userId,
    }


    const newFromObj = new Date(from);
    const newToObj = new Date(to);

    console.log('from:', from);
    console.log(newFromObj);
    if (newFromObj instanceof Date && !isNaN(newFromObj)) {
      queryDoc.date = {};
      queryDoc.date['$gte'] = from;
    }
    if (newToObj instanceof Date && !isNaN(newToObj)) {
      queryDoc.date = {};
      queryDoc.date['$lt'] = to;
    }
    console.log('queryDoc: ', queryDoc)
    Exercise.find(queryDoc).limit(finalLimit).exec((err, docs) => {
      if (err) {
        throw new Error(err);
      }
      res.status(200).json(docs);
    })
  }
  app.post('/api/exercise/add', postHandler);
  app.get('/api/exercise/log', getHandler);
}

module.exports = createExercise;
