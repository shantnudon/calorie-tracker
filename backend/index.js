const express = require('express')
const mongoose = require('mongoose');
require("dotenv").config();

const app = express()
const port = 6969

const Schema = mongoose.Schema;
const calorieDataInSchema = new Schema({
  meal: String
},{ collection: 'data' });

const dataInsertionModel = mongoose.model('dataInsertionModel', calorieDataInSchema);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((err) => {
    console.error('Error occurred while connecting to MongoDB', err);
  });

app.get('/', (req, res) => {
  res.send('Hello World!')  
})

app.use(express.json()); 
app.post('/insertDataDon', async (req, res) => {
  const { meal } = req.body;
  if (!meal) {
    return res.status(400).json({ error: 'Meal data is required' });
  }
  try {
    const doc = new dataInsertionModel({meal});
    const result = await doc.save();
    console.log('Document inserted:', result._id);
    res.status(201).json({ message: 'Document inserted successfully', data: result });
  }catch (err) {
    console.error('Error occurred while inserting document', err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


