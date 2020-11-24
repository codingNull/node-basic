const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message:</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message") {
    fs.writeFileSync("message.txt", "message....");
    res.setHeader("Location", "/");
    res.statusCode = 302;
    return res.end();
  }
});

server.listen(3000);
