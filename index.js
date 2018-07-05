const server = require('./app/socket');

// 启动服务器
const port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server listening at ${port}`);
