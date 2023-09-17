const url = require('url');
const qs = require('querystring');
const fs = require('fs');

module.exports = {
  serverHandle: function (req, res) {
    const route = url.parse(req.url);
    const path = route.pathname;
    const params = qs.parse(route.query);

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if(path === '/')
    {
      res.writeHead(200, {'Content-Type':'text/html'});
      res.write('Use the command "localhost:8080/hello?name=..." with your name or click on this link : <a href="/hello?name=John">here</a>');
    }
    else if (path === '/hello' && 'name' in params) {
      if (params['name'] === 'Charlotte') {
        res.write('Hello my name is Charlotte, I am 21 and I am a student at ECE PARIS');
      } else {
        res.write('Hello ' + params['name']);
      }
    } 
    else if (path === '/about') {
      const jsonPath='./content/about.json'

      fs.access(jsonPath, fs.constants.F_OK, (err) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          const jsonData=require(jsonPath)
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(jsonData))
        }
        res.end();
      });
    } 
      else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
      }
 
  }
};
