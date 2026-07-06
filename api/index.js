require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified successfully!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  console.log('Incoming webhook:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

module.exports = app;
module.exports.handler = serverless(app);