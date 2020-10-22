const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messagesQ = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  let direction = ['up', 'down', 'left', 'right'];
  res.writeHead(200, headers);
  if(req.method === 'GET') {
    let currentDirection = messagesQ.dequeue();
    console.log(currentDirection);
    if(!currentDirection) {
      currentDirection = 'empty';
    }
    res.write(currentDirection)
  }

  //RANDOMIZE
  // let index = Math.floor(Math.random() * direction.length);
  // res.end(direction[index]) // send random direction
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
