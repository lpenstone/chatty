import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
const uuidv4 = require('uuid/v4');

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = new WebSocket("ws://localhost:3001"); //connect to websocket
    this.state = {
      currentUser: {name: "Anonymous"}, // user initially set as Anonymous
      messages: [{
        id: uuidv4(),
        content: "Welcome to Chatty! Start typing!"
      }],
      numUsers: 0 //Initial number of users on the app is zero
    }
    this.addMessage = this.addMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.displayUsers = this.displayUsers.bind(this);
  }

  componentDidMount() {
    //When message is recived, check the type, and execute functions accordingly
    this.socket.onmessage = (message) => {
      var recieved = JSON.parse(message.data);
      switch(recieved.type) {
      case "incomingMessage":
        this.addMessage(recieved);
        break;
      case "incomingNotification":
        this.addMessage(recieved);
        break;
      case "incomingNumUsers":
        this.displayUsers(recieved);
        break;
      }
    }
  }

  //Change number of users online
  displayUsers(users){
    this.setState({
      numUsers: users.content + " User(s) Online"
    });
  }

  //Add message to chat
  addMessage(message){
    let regexp = /(https?:\/\/.*\.(?:png|jpg|gif))/i; //regular exp to check for photo
    let anyphoto = message.content.match(regexp); //assign photo url to variable
    let photoUrl = null; //Assume no photo
    let fullMessage = message.content;
    if (anyphoto){ //If there is a photo in the message, assign photoURL
      photoUrl = anyphoto[0];
      fullMessage = fullMessage.replace(anyphoto[0], "");
    }
    const newMessage = { //Put together new message
      id: message.id,
      username: message.username,
      content: fullMessage,
      color: message.color,
      photo: photoUrl
    };
    const newMessages = this.state.messages.concat(newMessage); //Add the new message to the set.state
    this.setState({
      messages: newMessages
    });
  }

  //Change user's name
  changeUser(user){
    this.setState({currentUser: {name: user}});
  }

  render() {
    var usersStyle = {
      float: 'right',
      margin: '20px'
    };
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span style={usersStyle}>{this.state.numUsers}</span>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar name = {this.state.currentUser.name} socket={this.socket} changeUser={this.changeUser}/>
      </div>
    );
  }
}
export default App;
