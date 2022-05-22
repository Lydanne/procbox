import http from "http";
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({});

http
  .createServer((req, res) => {
    proxy.web(req, res, {
      target: "http://localhost:3000",
    });
  })
  .listen(3000);
