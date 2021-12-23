const express = require('express');
const bodyParser = require('body-parser');
const propertyRoutes = require('./routes/propertyRoute');
const app = express();
// const path = require('path');
const { bucket } = require('./index');
// const admin = require('firebase-admin');
const fs = require('fs');
//

app.use(express.json());

//
// const myStorage = multer.memoryStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'gs://property-chowk-4608c.appspot.com');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({
//   storage: myStorage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
// });

// app.use((req, res, next) => {
//   console.log('middleware');
//   next();
// });

// by Acedemind

const multer = require('multer');

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

app.use(bodyParser.json());

app.post(
  '/fileupload',
  upload.array('propertyimages', 3),
  async (req, res, next) => {
    console.log('FIle upload');
    const files = req.files;
    if (files.length != 0) {
      for (const file of files) {
        const uploadedImage = await bucket.upload(file.path, {
          destination: `properties/${file.filename}`,
        });
      }
      console.log(uploadedImage);
    }
    // console.log(path);
    // const uploadedImage = await bucket.upload(path, {
    //   destination: `properties/${req.files.filename}`,
    // });

    // console.log(uploadedImage);
    // if (uploadedImage) {
    //   try {
    //     fs.unlinkSync(path);
    //   } catch (error) {
    //     res.status(400).send(error);
    //   }
    // }
    res.send(req.body.name);
  }
);

// till Academind

app.use('/api/v1/properties', propertyRoutes);

app.listen(6000, () => console.log(`App is running at port: 6000`));
