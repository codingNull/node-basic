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
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    /*     req.on("end", () => {
      const parsedbody = Buffer.concat(body).toString("utf-8");
      const message = parsedbody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
    res.setHeader("Location", "/");
    res.statusCode = 302;
    return res.end(); */
    req.on("end", () => {
      const parsedbody = Buffer.concat(body).toString();
      const message = parsedbody.split("=")[1];
      fs.writeFile("message.txt", message, (error) => {
        res.setHeader("Location", "/");
        res.statusCode = 302;
        return res.end();
      });
    });
  }
});

server.listen(3000);
