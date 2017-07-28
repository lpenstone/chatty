import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = new WebSocket("ws://localhost:3001");
    this.state = {
      currentUser: {name: "Anonymous"}, // if currentUser is not defined, it means the user is Anonymous
      messages: [{
        id: 1,
        content: "Welcome to Chatty! Start typing!"
      }],
      numUsers: 0
    }
    this.addMessage = this.addMessage.bind(this);
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
    let regexp = /(https?:\/\/.*\.(?:png|jpg|gif))/i;
    let anymatch = message.content.match(regexp);
    let photoUrl = null;
    let fullMessage = message.content;
    if (anymatch){
      photoUrl = anymatch[0];
      fullMessage = fullMessage.replace(anymatch[0], "");
    }
    const newMessage = {
      id: message.id,
      username: message.username,
      content: fullMessage,
      color: message.color,
      photo: photoUrl
    };
    const newMessages = this.state.messages.concat(newMessage);
    this.setState({
      messages: newMessages
    });
  }

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
