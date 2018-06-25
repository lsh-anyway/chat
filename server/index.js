const app = require('./app/app');

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server listening at ${port}`);
