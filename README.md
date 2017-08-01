# Chatty

## About the Project
Simple web application built with Javascript, React.js, HTML5, and CSS3.

### Problem Statement

An application that allows anyone with the URL to participate in an online chat.

### Expected Usage

This program should be used in the browser to communicate with others on the web. Users can remain anonymous or change their name (and continue changing their name as much as they want). When a users joins the conversation, they are assigned a user colour until they close the app. A notification is sent out to everyone in the chat every time a name change is made so everyone can stay in the loop. Photos can be sent as URL's and rendered in real time.

## Getting Started
1. Install all dependencies using the `npm install` command. 
2. Run the app web server using the `npm start` command. 
3. In a new terminal tab, enter the `chatty_server` folder. Run the websocket server using the `npm start` command. 
4. Visit the page: http://localhost:3000/ in your browser.

### Dependencies
- babel-core: 6.23.1
  - babel-loader: 6.3.1
  - babel-preset-es2015: 6.22.0
  - babel-preset-react: 6.23.0
  - babel-preset-stage-0: 6.22.0
- css-loader: 0.26.1
- eslint: 3.15.0
- eslint-plugin-react: 6.9.0
- node-sass: 4.5.0
- sass-loader: 6.0.0
- sockjs-client: ^1.1.2
- style-loader: 0.13.1
- webpack: ^2.2.1
  - webpack-dev-server: 2.3.0

## Final Product
### Single page appication:
  - Displays number of users
  - Each user has an assigned colour
  - Users can change their name
!["Homepage, Tweet form hidden."](https://github.com/lpenstone/chatty/blob/master/images/chatty-general-chat.png?raw=true)
### Send images:
  - Send as URL
  - Image renders immediately for viewing
!["Send photos as URL"](https://github.com/lpenstone/chatty/blob/master/images/chatty-photosharing-1.png?raw=true)
!["Photos get rendered"](https://github.com/lpenstone/chatty/blob/master/images/chatty-photosharing-2.png?raw=true)
