import React, { useEffect, useRef, useState, useContext } from 'react';
import { Input } from '@mui/material';
import { FaTelegramPlane } from 'react-icons/fa';
import style from './Chat.module.css';
import NavBar from '../Navbar2/Navbar2';
import Footer from '../Footer/Footer';
import { UserContext } from '../UseContext/UserContext';

export default function Chat({ socket }) {
  const bottomRef = useRef();
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);
  const [userData] = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);

  const sendMessage = (message) => {
    if (!message.trim()) return;
    socket.emit('message', { user: userData._id, message, username: userData.name, selectedUser });
    clearInput();
    focusInput();
  };

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessageList((current) => [...current, message]);
    });

    return () => socket.off('receive_message');
  }, [socket]);

  useEffect(() => {
    scrollDown();
  }, [messageList]);

  const handleSubmit = () => {
    const message = messageRef.current.value;
    sendMessage(message);
  };

  const clearInput = () => {
    messageRef.current.value = '';
  };

  const focusInput = () => {
    messageRef.current.focus();
  };

  const getEnterKey = (e) => {
    if (e.key === 'Enter') sendMessage(messageRef.current.value);
  };

  const scrollDown = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUserSelection = (userId) => {
    setSelectedUser(userId);
  };

  return (
    <div>
      <NavBar />
      <div className={style['containerSize']}>
        <div className={style['chat-container']}>
          <div className={style['chat-body']}>
            {messageList.map((message, index) => (
              <div
                className={`${style['message-container']} ${
                  message.user === userData._id && style['message-mine']
                }`}
                key={index}
              >
                <div className="message-author">
                  <strong>{message.user === userData._id ? 'Você' : message.username}</strong>
                </div>
                <div className="message-text">{message.message}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className={style['chat-footer']}>
            <Input
              inputRef={messageRef}
              placeholder="Mensagem"
              onKeyDown={(e) => getEnterKey(e)}
              fullWidth
            />
            <FaTelegramPlane sx={{ m: 1, cursor: 'pointer' }} onClick={handleSubmit} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
