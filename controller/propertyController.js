const db = require('../index');
const Property = require('../model/propertyModel');
const { validationResult } = require('express-validator');

const addProperty = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }

    const pCollection = db.collection('add_property');
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
          doc.data().propertyFeatures
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

    // console.log(isUuid('11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'));
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
// const storage = getStorage();

module.exports = {
  addProperty,
  getAllProperty,
  getOneProperty,
  updateProperty,
  deleteProperty,
  queryData,
};
