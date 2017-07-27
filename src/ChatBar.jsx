import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <ChatBar/>")
    //console.log(this.props.currentUser)
    return (
      <footer className="chatbar">
        <input
          id = "user"
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onBlur={event => {
            if (document.getElementById('user').value && document.getElementById('user').value !== this.props.name){
              var initialUser = this.props.name;
              var user = "";
              if (document.getElementById('user').value){
                user = document.getElementById('user').value;
              } else {
                user = "Anonymous";
              }
              this.props.changeUser(user);
              const newuser = {
                type: "postNotification",
                content: initialUser + " has changed their name to " + user
              }
              this.props.socket.send(JSON.stringify(newuser))
            }
          }}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={event => {
            if (event.key === 'Enter') {
              const message = {
                type: "postMessage",
                content: event.target.value,
                username: this.props.name
                }
              this.props.socket.send(JSON.stringify(message))
              event.target.value = ""
            }
          }}
        />
      </footer>
    );
  }
}
export default ChatBar;
