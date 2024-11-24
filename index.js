const express = require('express');
const path = require('path');
const { getCpuUsage, simulateHeavyTask } = require('./tasks');
const client = require('prom-client');
const { register } = client;
const app = express();
const port = 8000;


const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get CPU usage
app.get('/cpu-usage', getCpuUsage);

// Simulate a heavy task
app.get('/heavy', simulateHeavyTask);

// metrics
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  const metrics = await register.metrics();
  res.send(metrics);
});

// Simple Hello World endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});