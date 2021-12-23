const { db, bucket } = require('../index');
const Property = require('../model/propertyModel');
const { validationResult } = require('express-validator');
const bucket_url = 'gs://property-chowk-4608c.appspot.com';
const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(express.json());
app.use(bodyParser.json());

//file upload by Acedemind

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()} ${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpge' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const addProperty = async (req, res, next) => {
  console.log('add');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }
    //image upload

    console.log('FIle upload');
    const path = req.file.path;
    console.log(req.file);
    const uploadedImage = await bucket.upload(path, {
      destination: `properties/${req.file.filename}`,
    });
    if (uploadedImage) {
      try {
        fs.unlinkSync(path);
      } catch (error) {
        res.status(400).send(error);
      }
    }
    //
    const pCollection = db.collection('add_property');
    const createdAt = Date.now();
    req.body.createdAt = createdAt;
    await pCollection.add(req.body);
    res.status(201).json({
      status: 'Data save successfully!',
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllProperty = async (req, res, next) => {
  try {
    const getData = db.collection('add_property');
    const finalData = await getData.get();
    const propertyArray = [];
    if (finalData.empty) {
      res.status(404).send('No property found');
    } else {
      finalData.forEach((doc) => {
        const newProperty = new Property(
          doc.id,
          doc.data().propertyPurpose,
          doc.data().featureProperty,
          doc.data().propertyType,
          doc.data().propertySubType,
          doc.data().city,
          doc.data().society,
          doc.data().phase,
          doc.data().block,
          doc.data().dector,
          doc.data().name,
          doc.data().email,
          doc.data().estateName,
          doc.data().phoneNumber,
          doc.data().optionalPhoneNumber,
          doc.data().road,
          doc.data().street,
          doc.data().propertyNumber,
          doc.data().property,
          doc.data().propertyStatus,
          doc.data().propertySize,
          doc.data().price,
          doc.data().propertyDescription,
          doc.data().propertyFeatures,
          doc.data().createdAt.Date()
        );
        propertyArray.push(newProperty);
      });
      res.status(200).json({
        status: 'success',
        total_properties: propertyArray.length,
        data: propertyArray,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOneProperty = async (req, res, next) => {
  try {
    const id = req.params.id;
    const getData = db.collection('add_property').doc(id);
    const aProperty = await getData.get();
    if (!aProperty.exists) {
      res.status(404).send(`No document found with id: ${id}`);
    }
    res.send(aProperty.data());
  } catch (error) {
    res.send(error.message);
  }
};

const updateProperty = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        status: 'Something is wrong',
        msg: errors.array()[0],
      });
    }

    const id = req.params.id;
    const document = db.collection('add_property').doc(id);
    // const getDoc = await document;
    await document.update(req.body);
    res.status(200).send('property updated successfully!!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteProperty = async (req, res, next) => {
  try {
    const id = req.params.id;
    const dbCollection = db.collection('add_property').doc(id);
    // const dbData = await dbCollection.get();

    await dbCollection.delete();
    return res.status(204).send(`delete successfully!!, 204 means no content`);

    // await dbCollection.delete();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const queryData = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty) {
      return res.status(400).send({
        msg: 'Something went wrong',
        msg: error.array()[0],
      });
    }

    const dataCollection = db.collection('add_property').doc();
    const data = await dataCollection.docs;
  } catch (error) {
    console.log(error.message);
  }
};

const fileUpload = async (req, res, next) => {
  try {
    const filePath = req.body;
    console.log(filePath);
    await bucket.upload(req.body);
    res.send('file uploaded successfully');
  } catch (error) {
    console.log(error);
  }
};
// const storage = getStorage();

module.exports = {
  addProperty,
  getAllProperty,
  getOneProperty,
  updateProperty,
  deleteProperty,
  queryData,
  fileUpload,
  upload,
};
