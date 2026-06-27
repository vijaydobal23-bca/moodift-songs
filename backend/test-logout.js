require("dotenv").config();
const app = require("./src/app");
const http = require("http");

const server = http.createServer(app);
server.listen(3002, () => {
  console.log("Server listening on 3002");
  
  const req = http.request({
    hostname: 'localhost',
    port: 3002,
    path: '/api/auth/logout',
    method: 'GET',
    headers: {
      'Cookie': 'token=my-test-token-12345'
    }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log("Logout response status:", res.statusCode);
      console.log("Logout response data:", data);
      
      const redis = require("./src/config/cache");
      setTimeout(() => {
        redis.get("my-test-token-12345").then(val => {
          console.log("Value in redis:", val);
          process.exit(0);
        }).catch(err => {
          console.log("Redis get error:", err);
          process.exit(1);
        });
      }, 1000);
    });
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    process.exit(1);
  });
  req.end();
});
