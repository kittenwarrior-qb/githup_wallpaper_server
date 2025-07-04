const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Cấu hình body-parser để parse JSON request
app.use(bodyParser.json());

// Cấu hình endpoint webhook
app.post('/get', (req, res) => {
  const event = req.headers['x-github-event'];  // Nhận sự kiện GitHub

  console.log(`Received GitHub event: ${event}`); // In thông tin sự kiện

  // Xử lý sự kiện pull request
  if (event === 'pull_request') {
    const action = req.body.action;  // Lấy hành động pull request (opened, closed, etc.)
    const prTitle = req.body.pull_request.title;  // Lấy tiêu đề của pull request
    const prUrl = req.body.pull_request.html_url;  // Lấy URL của pull request

    console.log(`Pull request action: ${action}`);
    console.log(`Pull request title: ${prTitle}`);
    console.log(`View pull request: ${prUrl}`);

    // Thực hiện hành động bạn muốn, ví dụ gửi thông báo về pull request
    if (action === 'opened') {
      console.log('New pull request opened:', prTitle);
    }
  }

  // In payload JSON của sự kiện (bao gồm cả thông tin về pull request)
  console.log(req.body);

  res.status(200).send('Webhook received!');
});

// Khởi động server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
