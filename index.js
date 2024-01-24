const http = require("http");
const url = require("url");
const { router } = require("./router")
const logger = require('./logger');

const server = http.createServer((req, res) => {
    const URL = url.parse(req.url, true);
    logger.info(`Received ${req.method} request for ${URL.pathname}`);
    router(req, res, URL);
});

const port = 3000;
server.listen(port, () => {
    logger.info(`Server listening on port: ${port}`);
});
