const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messagesQ = require('./messageQueue');
// const defaultBackgroundImage = require('../spec/water-lg.jpg')

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if(req.method === 'OPTIONS') {
    res.writeHead(200, headers)
    res.end();
    next();
  }
  if(req.method === 'GET') {
    if (req.url === '/background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end();
          next();
        } else {
          res.writeHead(200, headers);
          res.write(data);
          res.end();
          next();
        }
      });
    } else {
      res.writeHead(200, headers);
      let currentDirection = messagesQ.dequeue();
      if (!currentDirection) {
        currentDirection = 'empty';
      }
      res.write(currentDirection)
      res.end();
      next();
    }
  }
   // invoke next() at the end of a request to help with testing!
};
