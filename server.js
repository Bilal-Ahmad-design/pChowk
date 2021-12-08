const express = require('express');
const propertyRoutes = require('./routes/propertyRoutes');
const app = express();

app.use(express.json());

app.use('/property', );

app.listen(8000, () => {
  console.log(`App is running at port: 8000`);
});
