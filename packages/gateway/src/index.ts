import http from "http";
import httpProxy from "http-proxy";
// import defaultConfig from "@/config";

export function createGatewayService(config: any) {
  const proxy = httpProxy.createProxyServer({});

  return http
    .createServer((req, res) => {
      proxy.web(req, res, {
        target: "http://localhost:3000",
      });
    })
    .listen(config.port);
}
