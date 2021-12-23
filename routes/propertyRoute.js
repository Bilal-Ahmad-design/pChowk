const express = require('express');
const { body } = require('express-validator');

const {
  addProperty,
  getAllProperty,
  getOneProperty,
  updateProperty,
  deleteProperty,
  queryData,
  fileUpload,
  upload,
} = require('../controller/propertyController');

const router = express.Router();

router.post(
  '/addProperty',
  // [
  //   body('name', 'provide a name'),
  //   body('email', 'Please provide correct email').isEmail(),
  // ],
  
  addProperty
);
router.get('/allProperty', getAllProperty);
router.get('/allProperty/:id', getOneProperty);
router.patch(
  '/allProperty/:id',
  [
    body('name', 'provide a name'),
    body('email', 'Please provide correct email').isEmail(),
  ],
  updateProperty
);
router.delete('/allProperty/:id', deleteProperty);
router.delete('/queryData', queryData);
router.post('/upload', fileUpload);

module.exports = router;
