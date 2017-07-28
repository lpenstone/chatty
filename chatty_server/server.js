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

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

//Initially set number of users to 0
let users = 0;

wss.on('connection', (ws) => {
  console.log('Client connected');
  //Increase number of users when socket opens, and braodcast
  users++;
  let numUsers = {
    type: "incomingNumUsers",
    content: users
  }
  wss.broadcast(JSON.stringify(numUsers));

  //no colour initially set
  let color = ['none'];
  //function to change 'none' to a random color
  function assignColor(){
    let number = Math.floor(Math.random() * 6);
    let colorpick = ['blue', 'red', 'green', 'purple', 'orange', 'tomato'];
    color[0] = colorpick[number];
  }
  //if there is no colour set, assign a colour
  console.log(color[0]);
  if (color[0] === 'none') {
    assignColor();
  }

  // Callback when client closes socket, reduce number of users and broadcast
  ws.on('close', () => {
    console.log('Client disconnected')
    users--;
    let numUsers = {
      type: "incomingNumUsers",
      content: users
    }
    wss.broadcast(JSON.stringify(numUsers));
  });

  // Callback when something is sent from browser
  ws.on('message', (messageFromBrowser) => {
    let message = JSON.parse(messageFromBrowser);
    let broadcast;
    switch(message.type) {
    case "postMessage": //If a user sends a message (send message)
    console.log(color);
      broadcast = {
        type: "incomingMessage",
        id: Math.random(),
        content: message.content,
        username: message.username,
        color: color[0]
      }
      break;
    case "postNotification": //If a user changes their name (send notification)
      console.log(color);
      broadcast = {
        type: "incomingNotification",
        id: Math.random(),
        content: message.content,
      }
      break;
    }
    wss.broadcast(JSON.stringify(broadcast));
  });
});
