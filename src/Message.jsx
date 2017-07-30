import React, {Component} from 'react';

class Message extends Component {
  render() {
    var colorStyle = {
      color: this.props.color,
    };
    var alignStyle = {
      display: 'inline-block',
      'padding-left': '23.5%'
    }
    console.log("Rendering <Message/>")
    if (!this.props.username){
      return (
        <div className="message system">
          {this.props.content}
        </div>
      );
    } else {
      if (this.props.photo){ //If there's a photo, render for display
        return (
        <div className="message">
          <span className="message-username" style={colorStyle}>{this.props.username}</span>
          <span className="message-content">{this.props.content}<br/><img src={this.props.photo} width='60%'/></span>
        </div>
        );
      } else { //If there's no photo, return a regular message
        return (
          <div className="message">
            <span className="message-username" style={colorStyle}>{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        );
      }
    }
  }
}
export default Message;