import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import style from './Join.module.css';
import { Input } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../UseContext/UserContext';

export default function Join({ setChatVisibility, setSocket }) {
  const [userData] = useContext(UserContext);
  const usernameRef = useRef();

  useEffect(() => {
    const username = userData.name;
    const socket = io.connect('http://localhost:3333');
    setSocket(socket);
    socket.emit('joinRoom', { userId: userData._id });

    // Emitir a mensagem do usuário recém-conectado
    socket.emit('message', { user: userData._id, message: 'Entrou na sala', username: username });

    setChatVisibility(true);
  }, [userData, setSocket, setChatVisibility]);

  return (
    <div className={style['join-container']}>
      <h2>Chat em tempo real</h2>
      <Input
        inputRef={usernameRef}
        placeholder="Nome de usuário"
        value={userData.name}
        disabled
      />
    </div>
  );
}
