import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';


const app = express();

// MongoDB
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '1000mb'}));

// Routes


// Catch 404 Errors
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : { message: "Something went wrong. We're working on it."};
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: error.message
    }
  });
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});