import React from 'react';
import '../styles/Message.css';

const Message = ({message}) => {
    return (
        <div className = "message">{message ? message : 'No messages.'}</div>
    )
};
export default Message;