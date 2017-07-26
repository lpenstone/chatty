import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <ChatBar/>")
    //console.log(this.props.currentUser)
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.name}/>
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={event => {
            if (event.key === 'Enter') {
              const message = {
                id: Math.random(),
                content: event.target.value,
                username: this.props.name
                }
              const addMessage = this.props.addMessage;
              addMessage(message);
              event.target.value = ""
            }
          }}
        />
      </footer>
    );
  }
}
export default ChatBar;
