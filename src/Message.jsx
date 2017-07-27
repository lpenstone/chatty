import React, {Component} from 'react';

class Message extends Component {
  render() {
    var colorStyle = {
      color: this.props.color,
    };
    console.log("Rendering <Message/>")
    if (!this.props.username){
      return (
        <div className="message system">
          {this.props.content}
        </div>
      );
    } else {
      return (
        <div className="message">
          <span className="message-username" style={colorStyle}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    }
  }
}
export default Message;