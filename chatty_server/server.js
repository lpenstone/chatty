// server.js

const express = require('express');
const SocketServer = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

let i = 0;
wss.on('connection', (ws) => {
  console.log('Client connected');
  i++;
  console.log(i);

  let numUsers = {
    type: "incomingNumUsers",
    content: i
  }
  wss.broadcast(JSON.stringify(numUsers));
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {console.log('Client disconnected')
  i--;
  let numUsers = {
    type: "incomingNumUsers",
    content: i
  }
  wss.broadcast(JSON.stringify(numUsers));
  });

  ws.on('message', (messageFromBrowser) => {
    console.log(messageFromBrowser);
    let message = JSON.parse(messageFromBrowser);
    let broadcast;
    switch(message.type) {
    case "postMessage":
      broadcast = {
        type: "incomingMessage",
        id: Math.random(),
        content: message.content,
        username: message.username
      }
      break;
    case "postNotification":
      broadcast = {
        type: "incomingNotification",
        id: Math.random(),
        content: message.content
      }
      break;
    }

    wss.broadcast(JSON.stringify(broadcast));
    });
});
