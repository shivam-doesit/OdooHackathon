import { Router } from 'express';
// Import your chatbot controller function here
const router = Router();

// Example endpoint
router.post('/', (req, res) => res.send('Ask AI chatbot'));

export default router;