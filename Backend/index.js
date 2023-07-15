/* eslint-disable prettier/prettier */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import your routes
const notesRoutes = require('./router/notes');
const todoRoutes = require('./router/todos');

require('dotenv').config();
const app = express();

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(error => console.error('Error connecting to MongoDB Atlas:', error));

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Routes
app.use('/notes', notesRoutes);
app.use('/todos', todoRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
