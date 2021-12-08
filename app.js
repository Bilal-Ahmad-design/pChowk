const express = require('express');
const app = express();
app.use(express.json());
var admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
// require('dotenv').config();
const { body, validationResult } = require('express-validator');
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const port = 5000;

app.post(
  '/add',
  body('name', 'Please check your name').isString().isLength({ min: 3 }),
  body('email', 'Email is invalid').isEmail().normalizeEmail(),
  body('propertyDescription', `Can't be empty`).not().isEmpty().trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0] });
    }
    const userDB = db.collection('add_property');

    await userDB.add({
      propertyPurpose: req.body.propertyPurpose,
      featureProperty: req.body.featureProperty,
      propertyType: req.body.propertyType,
      propertySubType: req.body.propertySubType,
      city: req.body.city,
      society: req.body.society,
      phase: req.body.phase,
      block: req.body.block,
      dector: req.body.dector,
      name: req.body.name,
      email: req.body.email,
      estateName: req.body.estateName,
      phoneNumber: req.body.phoneNumber,
      optionalPhoneNumber: req.body.optionalPhoneNumber,
      road: req.body.road,
      street: req.body.street,
      propertyNumber: req.body.propertyNumber,
      property: req.body.property,
      propertyStatus: req.body.propertyStatus,
      propertySize: req.body.propertySize,
      price: req.body.price,
      propertyDescription: req.body.propertyDescription,
      propertyFeatures: req.body.propertyFeatures,
      createdAt: new Date(),
    });
    res.status(200).send('Your form has been added successfully!!');
  }
);

app.get('/properties/id', async (req, res) => {
  const pCollection = db.collection('add_property').doc('3pBLFwiW1RMKdibG7igF');
  const property = await pCollection.get();

  if (!property.exists) {
    res.status(404).send('No document found');
  } else {
    res.send(property.data());
  }
});

app.get('/properties/allproperties', async (req, res) => {
  const pCollection = db.collection('add_property');
  const property = await pCollection.get();

  if (!property.exists) {
    res.status(404).send('No document found');
  } else {
    res.send(property.data());
  }
});

app.post('/deleteCollecton', (req, res) => {
  const user = db.collection('add_property').doc('j-15-15').delete();
  res.send('Collection deleted successfully');
});

app.listen(port, () => {
  console.log(`App is running at port: ${port}`);
});
