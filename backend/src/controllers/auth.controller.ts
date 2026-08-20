import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { isStrongPassword } from '../utils/password.util';

const createToken = (user: InstanceType<typeof User>) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not configured');

  return jwt.sign({ id: String(user._id), role: user.role }, secret, { expiresIn: '7d' });
};

const serializeUser = (user: InstanceType<typeof User>) => ({
  id: String(user._id),
  name: user.username,
  email: user.email,
  points: user.points,
  role: user.role,
  avatar: user.avatar,
  createdAt: user.createdAt.toISOString()
});

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }
    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters and include an uppercase letter, number, and special character' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();
    if (!normalizedUsername || !normalizedEmail) {
      return res.status(400).json({ message: 'Username and email cannot be empty' });
    }

    const existingUser = await User.findOne({ $or: [{ email: normalizedEmail }, { username: normalizedUsername }] });
    if (existingUser) {
      return res.status(409).json({ message: 'An account with that email or username already exists' });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ username: normalizedUsername, email: normalizedEmail, password: hashed });
    return res.status(201).json({ token: createToken(user), user: serializeUser(user) });
  } catch (error) {
    console.error('Registration failed:', error);
    return res.status(500).json({ message: 'Unable to register at this time' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (user.blocked) {
      return res.status(403).json({ message: 'This account has been blocked' });
    }

    return res.json({ token: createToken(user), user: serializeUser(user) });
  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({ message: 'Unable to sign in at this time' });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Authentication required' });

    const user = await User.findById(userId);
    if (!user || user.blocked) {
      return res.status(401).json({ message: 'Session is no longer valid' });
    }

    return res.json({ user: serializeUser(user) });
  } catch (error) {
    console.error('Current-user lookup failed:', error);
    return res.status(500).json({ message: 'Unable to load the current user' });
  }
};
