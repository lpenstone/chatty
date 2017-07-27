import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = new WebSocket("ws://localhost:3001");
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.addMessage = this.addMessage.bind(this);
    this.changeUser = this.changeUser.bind(this)
}

  componentDidMount() {
    // this.socket.onopen = (event) => {
    //   event.target.send("Here's some text that the server is urgently awaiting!");
    // };
    this.socket.onmessage = (message) => {
      this.addMessage(JSON.parse(message.data));
    }
  }

addMessage(message){
  const newMessage = {
    id: message.id,
    username: message.username,
    content: message.content
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
    console.log("Rendering <App/>")
    // const addMessage = (message, socket) => {
    //   const newMessage = {
    //     id: message.id,
    //     username: message.username,
    //     content: message.content
    //   };
    //   const newMessages = this.state.messages.concat(newMessage);
    //   this.setState({
    //     messages: newMessages
    //   });
    //   //this.socket.send(JSON.stringify(message));
    // }
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar name = {this.state.currentUser.name} socket={this.socket} changeUser={this.changeUser}/>
      </div>
    );
  }
}
export default App;
