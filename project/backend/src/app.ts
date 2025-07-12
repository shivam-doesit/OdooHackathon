import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import middleware from './middleware';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(middleware);

// Routes
app.use('/api', routes);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});