const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Cấu hình body-parser để parse JSON request
app.use(bodyParser.json());

// Cấu hình endpoint webhook
app.post('/github-webhook', (req, res) => {
  const event = req.headers['x-github-event'];  // Nhận sự kiện GitHub

  console.log(`Received GitHub event: ${event}`); // In thông tin sự kiện

  // In payload JSON của sự kiện
  console.log(req.body);

  res.status(200).send('Webhook received!');
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
