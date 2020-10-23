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
      fs.readFile(testImg, (err, data) => {
        if (err) {
          res.writeHead(404, headers);
          res.end();
          next();
        } else {
          res.writeHead(200, headers);
          res.write(data);
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
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    console.log(body);

    req.on('end', () => {
      res.writeHead(200, headers);
      res.end();
    })

    // fs.writeFile('/background.jpg', 'new image', (err) => {
    //   // console.log(formData);
    //   if (err) {
    //     console.log('image POST error');
    //   } else {
    //     console.log('the image has been saved');
    //     res.writeHead(200, headers);
    //     res.write(formData);
    //     res.end();
    //     next();
    //   }
    // });
    // console.log(formData);
  }

};
