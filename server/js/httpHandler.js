const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  //if req.url is random
  // console.log(req.url);
  // if(req.url === '/random') {
  //   //send a random res
  //   res.writeHead(200, headers);
  //   res.end('yo world')
  // }
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
