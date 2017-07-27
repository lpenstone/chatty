import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>")
    const listMessages = this.props.messages.map((message) => {
      return <Message username={message.username} key={message.id} content={message.content}/>
    });
    return (
      <main className="messages">
        {listMessages}
      </main>
    );
  }
}
export default MessageList;