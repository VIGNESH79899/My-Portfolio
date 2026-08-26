// Production Express Server for Adhi's AI Developer Twin Backend
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { streamChatResponse } from './services/ai.js';
import { getRelevantContext } from '../src/services/aiTwin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json({ limit: '20kb' }));

// Rate Limiter Memory Map (Simple IP Throttling)
const ipRequestMap = new Map();

const rateLimitMiddleware = (req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 30;

  const userStats = ipRequestMap.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > userStats.resetTime) {
    userStats.count = 1;
    userStats.resetTime = now + windowMs;
  } else {
    userStats.count++;
  }

  ipRequestMap.set(ip, userStats);

  if (userStats.count > maxRequests) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute before asking again.' });
  }

  next();
};

// Healthcheck Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', service: "Adhi's AI Developer Twin Backend", timestamp: new Date().toISOString() });
});

// Chat Streaming Endpoint
app.post('/api/chat', rateLimitMiddleware, async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Valid message string is required.' });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: 'Message exceeds maximum length of 2000 characters.' });
    }

    const context = getRelevantContext(message);
    await streamChatResponse(message, history || [], context, res);
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error processing AI response.' });
    }
  }
});

// Contact Submission Endpoint
app.post('/api/contact', rateLimitMiddleware, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields (name, email, subject, message) are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    console.log(`📩 [CONTACT MESSAGE RECEIVED] From: ${name} (${email}) | Subject: ${subject}`);
    console.log(`💬 Message: ${message}`);

    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for reaching out! Adhi Vignesh has received your message and will respond shortly.',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to process contact submission.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Adhi's AI Developer Twin Server active on port ${PORT}`);
});
