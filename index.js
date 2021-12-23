const express = require('express');
const app = express();
app.use(express.json());
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
// const { storageRef } = firebase.storage().ref();

// require('dotenv').config();
const bucket_url = 'gs://property-chowk-4608c.appspot.com';

app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucket_url,
});

const db = admin.firestore();

const bucket = admin.storage().bucket('gs://property-chowk-4608c.appspot.com');

module.exports = { db, bucket };
