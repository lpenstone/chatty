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
          onKeyPress={event => {
            if (event.key === 'Enter') {
              if (document.getElementById('user').value){
                var user = document.getElementById('user').value;
              } else {
                var user = "Anonymous";
              }
              this.props.changeUser(user);
            }
          }}

        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={event => {
            if (event.key === 'Enter') {
              // if (document.getElementById('user').value){
              //   var user = document.getElementById('user').value;
              // } else {
              //   var user = "Anonymous";
              // }
              const message = {
                id: Math.random(),
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
