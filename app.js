const express = require('express');
const User = require('./app');
const app = express();
app.use(express.json());
var admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
// require('dotenv').config();
const { body, validateResult } = require('express-validator');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const port = 5000;

app.post(
  '/add',
  body('name').isString(),
  body('email').isEmail(),
  async (req, res) => {
    const data = req.body;
    console.log(data);
    const userDB = db.collection('contact-page');
    const user1 = userDB.doc(req.body.id);

    await user1.set({
      name: req.body.name,
      email: req.body.email,
      EstateName: req.body.EstateName,
      PhoneNumber: req.body.PhoneNumber,
      OptionalPhoneNumber: req.body.OptionalPhoneNumber,
      createdAt: new Date(),
    });
    res.status(200).send('Your form has been added successfully!!');
  }
);

app.get('/users', async (req, res) => {
  const user = await db.collection('contact-page').doc('j').get();
  if (!user) {
    console.log('No user found');
  } else {
    res.send(user);
  }
});

app.post('/deleteCollecton', (req, res) => {
  const user = db.collection('contact-page').doc('j-15-15').delete();
  res.send('Collection deleted successfully');
});

app.listen(port, () => {
  console.log(`App is running at port: ${port}`);
});
