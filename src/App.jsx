import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = new WebSocket("ws://localhost:3001");
    this.state = {
      currentUser: {
      name: "Anonymous",
      color: "blue"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [{
        id: 0.00000000003,
        content: "Welcome to Chatty! Start typing!"
      }],
      numUsers: 0
    }
    this.addMessage = this.addMessage.bind(this);
    //this.addNotification = this.addNotification.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.displayUsers = this.displayUsers.bind(this);
}

  componentDidMount() {
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

displayUsers(users){
  this.setState({
    numUsers: users.content + " User(s) Online"
  });
}

addMessage(message){
  const newMessage = {
    id: message.id,
    username: message.username,
    content: message.content,
    color: message.color
  };
  const newMessages = this.state.messages.concat(newMessage);
  this.setState({
    messages: newMessages
  });
}

// addNotification(notification){
//   const newNotif = {
//     id: Math.random(),
//     content: notification.content
//   };
//   const newNotifs = this.state.notifications.concat(newNotif);
//   this.setState({
//     notifications: newNotifs
//   });
// }

changeUser(user){
  this.setState({currentUser: {name: user}});
}


  render() {
    var usersStyle = {
      float: 'right',
      margin: '20px'
    };
    console.log("Rendering <App/>")
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
