"use strict";
const http = require("http");
class server {
    parse(req) {
        req.url = req.url.replace('/', '');
        let url = req.url.split("/");
        return { 'url': url };
    }
    route(data) {
        let reqTable = { 'S': 'Static' };
        if (reqTable[data['url'][0]]) {
            const Server = require(`./${reqTable[data['url'][0]]}/Server`);
            data['url'].shift();
            return (new Server(data));
        }
        else {
            const Server = require(`./Web/Server`);
            return (new Server(data));
        }
    }
    respond(res, response) {
        res.writeHead(response[0], response[1]);
        res.end(response[2]);
    }
    constructor(req, res) {
        let data = this.parse(req);
        let response = this.route(data);
        this.respond(res, response);
    }
};
http.createServer((req, res) => { new server(req, res); }).listen(80, '127.0.0.1');