const express = require('express');
const path = require('path');
const { getCpuUsage, simulateHeavyTask } = require('./tasks');
const client = require('prom-client');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT;

const { register, collectDefaultMetrics } = client;
collectDefaultMetrics({ register });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/cpu-usage', getCpuUsage);

app.get('/heavy', simulateHeavyTask);

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  const metrics = await register.metrics();
  res.send(metrics);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});