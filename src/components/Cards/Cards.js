import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../UseContext/UserContext';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { AiOutlineInfoCircle, AiOutlineShopping } from 'react-icons/ai';
import { MdFavoriteBorder } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import api from '../../Services/Api.js';
import './cardsStyle.css';
function Cards({ src, name, author, price, _id, obj, props }) {
  const [cart, setCart] = useState([]);
  const [userData] = useContext(UserContext);
  const [favorite, setFavorite] = useState(false); 
  const navigate = useNavigate();

 // Front-end code
const handleChatOpen = async () => {
  const userid = getUserId()
  try {
    const response = await api.post('/chats', {
      
      user: userid,
      message: 'Mensagem de exemplo',
      username: 'Nome de usuário'
    });
    
    const chatId = response.data.chatId;
    navigate(`/chat/${chatId}`);
  } catch (error) {
    console.error('Erro ao iniciar a conversa:', error);
    alert(error)
  }
};

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some((fav) => fav._id === _id);

    setFavorite(isFavorite); 
  }, []);

  async function handleClick() {
    try {
      const userId = getUserId();
      const productId = _id;

      if (favorite) {
        await removeFavorite(userId, productId);
      } else {
        await addFavorite(userId, productId);
      }

      setFavorite(!favorite); 

      updateFavoritesStorage(productId);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  async function addFavorite(userId, productId) {
    try {
      const response = await api.post(`/user/${userId}/favorites/${productId}`);
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
      alert('Error adding favorite');
    }
  }

  async function removeFavorite(userId, productId) {
    try {
      const response = await api.delete(`/user/${userId}/favorites/${productId}`);
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
     
    }
  }

  function getUserId() {
    if (userData && userData._id) {
      return userData._id;
    }
    return null;
  }

  function updateFavoritesStorage(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const updatedFavorites = favorites.filter((fav) => fav._id !== productId);

    if (!favorite) {
      const product = obj;
      updatedFavorites.push(product);
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }



  return (
    <div className="product-card">
      <div className="product-tumb">
        <img src={`${process.env.REACT_APP_API}/${src}`} id="img-card" alt="Denim Jeans" />
      </div>
      <div className="product-details">
        <span className="product-catagory">
          Por <span id="author-edit">{author}</span>
        </span>
        <h6>
          <a href="">{name}</a>
        </h6>
        <div className="product-bottom-details">
          <div className="product-price">R${price}</div>
          <div className="product-links">
            <a href="">
              {' '}
              <AiOutlineShopping id="icon-info" onClick={handleChatOpen} />
            </a>
            <button className="fs-5" onClick={handleClick}>
              {favorite ? <AiFillHeart id='icon-fav-1' /> : <MdFavoriteBorder id="icon-fav-2" />}
            </button>
            <a href={`/details/${_id}`}>
              {' '}
              <AiOutlineInfoCircle id="icon-info" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
