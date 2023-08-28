"use strict";
const http = require("http");
class server {
    // This function will parse the req object. This function is responsible for extracting imp. info. from the req object. It will return all the imp. info. as an object. The req object is huge in 
    // size and because of that if we pass the whole req object it will consume a lot of data and time so we would extract imp. info. from the req object and pass only that imp. info. to save space and time.
    parse(req) {
        req.url = req.url.replace('/', '');
        let url = req.url.split("/");
        return { 'url': url }; // This object contains all the imp. info.
    }
    // This function will route the request to the specific handler function.
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
    // This function will give the response to the client.
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
