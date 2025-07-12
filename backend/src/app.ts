import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import itemRoutes from './routes/item.routes';
import swapRoutes from './routes/swap.routes';
import chatbotRoutes from './routes/chatbot.routes';
import messageRoutes from './routes/message.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Register all routes
app.use('/api/auth', authRoutes);           // User authentication routes
app.use('/api/items', itemRoutes);          // Item CRUD routes
app.use('/api/swaps', swapRoutes);          // Swap request routes
app.use('/api/ask-bot', chatbotRoutes);     // AI chatbot endpoint
app.use('/api/messages', messageRoutes);    // Messaging routes
app.use('/api/admin', adminRoutes);         // Admin routes

// Health check endpoint
app.get('/', (_req, res) => {
  res.send('ReWear backend is running');
});

export default app;