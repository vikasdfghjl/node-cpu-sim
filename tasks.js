const osUtils = require('os-utils');
const faker = require('faker');

let successCount = 0;
let errorCount = 0;

function getCpuUsage(req, res) {
  osUtils.cpuUsage((usage) => {
    res.json({ usage: (usage * 100).toFixed(2) });
  });
}

function simulateHeavyTask(req, res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const startTime = Date.now();
  let progress = 0;

  const interval = setInterval(() => {
    progress += faker.datatype.number({ min: 1, max: 20 }); // Random progress increment between 1 and 20
    if (progress > 100) progress = 100; // Ensure progress does not exceed 100
    const elapsedTime = Date.now() - startTime;

    osUtils.cpuUsage((usage) => {
      if (progress < 100 && Math.random() < 0.1) { // 10% chance of error
        clearInterval(interval);
        errorCount++;
        res.write(`data: Error: Something went wrong\n\n`);
        res.write(`data: ErrorCount: ${errorCount}\n\n`);
        res.end();
      } else {
        res.write(`data: ${progress}% - Elapsed time: ${elapsedTime}ms - CPU Usage: ${(usage * 100).toFixed(2)}%\n\n`);
        if (progress === 100) {
          clearInterval(interval);
          successCount++;
          res.write(`data: Success: Task completed\n\n`);
          res.write(`data: SuccessCount: ${successCount}\n\n`);
          res.end();
        }
      }
    });
  }, faker.datatype.number({ min: 500, max: 1500 })); // Random interval between 500ms and 1500ms
}

module.exports = { getCpuUsage, simulateHeavyTask };