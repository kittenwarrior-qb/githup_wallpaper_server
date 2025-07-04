const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();

// Secret for verifying webhook payload (ensure this matches the secret you set in GitHub)
const GITHUB_SECRET = 'your_secret_here';  // Replace with your GitHub secret

// Cấu hình body-parser để parse JSON request
app.use(bodyParser.json());

// Verify GitHub webhook secret
function verifySignature(req, res, next) {
  const signature = req.headers['x-hub-signature'];
  const payload = JSON.stringify(req.body);

  const hmac = crypto.createHmac('sha1', GITHUB_SECRET);
  const digest = 'sha1=' + hmac.update(payload).digest('hex');

  if (signature !== digest) {
    return res.status(400).send('Invalid signature');
  }

  next();
}

// Cấu hình endpoint webhook
app.post('/get', verifySignature, (req, res) => {
  const event = req.headers['x-github-event'];  // Nhận sự kiện GitHub

  console.log(`Received GitHub event: ${event}`);  // Log sự kiện nhận được

  // In payload JSON của sự kiện (bao gồm cả thông tin về pull request, push...)
  console.log(req.body);

  // Xử lý sự kiện ping
  if (event === 'ping') {
    console.log('Ping event received');
  }

  // Xử lý sự kiện push
  if (event === 'push') {
    console.log('Push event received');
    console.log(`Push to branch: ${req.body.ref}`);
  }

  // Xử lý sự kiện pull_request
  if (event === 'pull_request') {
    console.log('Pull request event received');
    const action = req.body.action;
    const prTitle = req.body.pull_request.title;
    const prUrl = req.body.pull_request.html_url;
    console.log(`Pull request action: ${action}`);
    console.log(`Pull request title: ${prTitle}`);
    console.log(`View pull request: ${prUrl}`);
  }

  res.status(200).send('Webhook received!');
});

// Khởi động server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
