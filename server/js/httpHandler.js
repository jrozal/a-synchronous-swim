const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const keypress = require('keypress');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

// process.stdin.setRawMode(true);
// process.stdin.on('keypress', (str, key)) => {
//   console.log(`You have pressed the ${str} key`);
//   console.log(key);
// }

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  let direction = ['up', 'down', 'left', 'right'];
  if (req.method === 'GET') {
    res.writeHead(200, headers);
    let index = Math.floor(Math.random() * direction.length);
    res.end(direction[index]) // send random direction
  }
  res.writeHead(200, headers);
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
