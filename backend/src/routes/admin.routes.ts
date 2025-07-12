import { Router } from 'express';
// Import your admin controller functions here
const router = Router();

// Example endpoints
router.get('/users', (req, res) => res.send('Get all users'));
router.get('/items', (req, res) => res.send('Get all items'));
router.put('/block/:userId', (req, res) => res.send('Block user'));
router.delete('/item/:itemId', (req, res) => res.send('Remove spam item'));

export default