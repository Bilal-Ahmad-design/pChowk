const db = require('../firebase');

const addProperty = async (req, res, next) => {

  const data = req.body;

  try {
    const sendData = db.collection('contact-page');
    await sendData.add(req.body);
    console.log(data);

    res.status(201).send(data);
  } catch (error) {
    res.status(400).send(erroconst db = require('../firebase');

const addProperty = async (req, res, next) => {

  const data = req.body;

  try {
    const sendData = db.collection('contact-page');
    await sendData.add(req.body);
    console.log(data);

    res.status(201).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = addProperty;
