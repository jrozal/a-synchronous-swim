const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messagesQ = require('./messageQueue');
var testImg = path.join('.', 'spec', 'water-lg.jpg');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers)
    res.end();
    next();
  }
  if (req.method === 'GET') {
    // GET request for background image
    if (req.url === '/background.jpg') {
      fs.readFile(path.join('.', 'background.jpg'), (err, data) => {
        if (err) {
          res.writeHead(404, headers);
          res.end();
          next();
        } else {
          res.writeHead(200, headers);
          res.write(data, 'binary');
          res.end();
          next();
        }
      });
    }
    // GET request for swimmer from server input
    else if (req.url === '/') {
      res.writeHead(200, headers);
      let currentDirection = messagesQ.dequeue();
      if (!currentDirection) {
        currentDirection = 'empty';
      }
      res.write(currentDirection)
      res.end();
      next();
    // else handle no image path
    } else {
      res.writeHead(404, headers);
      res.end();
      next();
    }
  }
  if (req.method === 'POST') {
    let message = Buffer.alloc(0);
    req.on('data', chunk => {
      message = Buffer.concat([message, chunk]);
    });

    req.on('end', () => {
      let image = multipart.getFile(message);
      fs.writeFile(path.join('.', 'background.jpg'), image.data, (err) => {
        if (err) {
          res.writeHead(400, headers);
          console.log('image POST error');
        } else {
          res.writeHead(201, headers);
          console.log('the image has been saved');
        }
        res.end();
        next();
      });
    })
  }

};
