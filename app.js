const express = require('express');
const cors = require('cors');
// const formDataRoutes = require('./routes/formDataRoutes');
// const cleanupInstructionsRoutes = require('./routes/cleanupInstructionsRoutes');
const indexRoutes = require('./routes/indexRoutes');
// const ingredientsRoutes = require('./routes/ingredientsRoutes'); 
// const dataFromImageRoutes = require('./routes/dataFromImageRoutes'); 
const questionRoutes = require('./routes/questionRoutes'); 
const imageRoutes = require('./routes/imageRoutes');
const documentRoutes = require('./routes/documentRoutes');

// Import other route files as needed

// Load environment variables from .env file
require('dotenv').config();

// Initialize express app
const app = express();

// Enable cross-origin requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// logger middleware
app.use((req,res,next) =>{
  req.time = new Date(Date.now()).toString();
  res.on("finish", function() {
      console.log(req.method,req.hostname, req.path, res.statusCode, res.statusMessage, req.time,);
  });
  next();
});

// Set up routes
app.use('/', indexRoutes); // main status route
app.use('/', questionRoutes);
app.use('/', imageRoutes);
app.use('/', documentRoutes);

// Add other routes here

// Default error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Configure port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
