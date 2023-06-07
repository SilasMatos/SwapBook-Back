import React from 'react'
import styles from './myCards.module.css'
import api from '../../../Services/Api';
import { useEffect ,useContext } from 'react'
import { UserContext } from "../../UseContext/UserContext";
import { Link } from 'react-router-dom';
import { Dropdown, IconButton } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import MoreIcon from '@rsuite/icons/More';
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';
import { FaIcon } from 'react-icons/fa';
import "../MyAnnunciments/mycard.css"



const renderIconButton = (props, ref) => {
  return (
    <IconButton {...props} ref={ref} icon={<MoreIcon />} circle color="blue" appearance="primary" className='z-3 position-absolute ' />
  );
};

const MyCards = ({name, author, price, synopsis, _id, src}) => {
  const [userData, setUserData] = useContext(UserContext);


  async function deleteProduct() {
    try {
      await api.delete(`${userData._id}/product/${_id}`,{
        headers: {
          auth: userData._id
        }
      });
      alert("Anuncio deletado com sucesso")
    } catch (err) {
      console.log("Erro ao apagar anuncio");
    }
  }

  return (
  

    <div className="card-anum">
    <Dropdown className="dropdown-annum" title="" renderToggle={renderIconButton}>
      <Dropdown.Item id='drop-edit1' icon={<TrashIcon id='icon-delete'/>} onClick={deleteProduct}>
        
      </Dropdown.Item>
      <Link to={`/editar_produto/${_id}`}>
        <Dropdown.Item id='drop-edit2' icon={<EditIcon id='icon-edit'/>}></Dropdown.Item>
      </Link>
    </Dropdown>
    <img src={`http://localhost:3333/${src}`} alt="Imagem do livro" className="book-image" />
    <div className="card-content">
      <h2 className="book-title">{name}</h2>
      <p className="book-synopsis">{synopsis}</p>
      <div className="book-info-row">
      <p className="book-info-ds">1</p>
    
      <p className="book-info"><span className='span-txt'> Ano: </span> {price}</p>
        <p className="book-info"><span className='span-txt'> Autor:</span> {author}</p>
        <p className="book-info"><span className='span-txt'> Data:</span> asdasd</p>
        
      </div>
    </div>
  </div>
  



    /*
    <div className="image-with-title">
      <div className="icon-container-ca">
      <Dropdown className="" title="" renderToggle={renderIconButton}>
          
          <Dropdown.Item icon={<TrashIcon />}onClick={deleteProduct}>
          </Dropdown.Item>
          <Link to={`/editar_produto/${_id}`}>
            <Dropdown.Item icon={<EditIcon/>} >
            </Dropdown.Item>
          </Link>
          
      </Dropdown>
      </div>
      <img  src={`http://localhost:3333/${src}`} alt="Imagem" className="image-ca" />
      <h3 className="title-ca">{name}</h3>
    </div>
*/
  /*
    <div className={` cards container d-flex`}>
      
      <div>
        
      <div className={`${styles.cardinho} `}>
     
        </div>
        <Dropdown className={`${styles.drops} z-3`} title="" renderToggle={renderIconButton}>
          
          <Dropdown.Item icon={<TrashIcon />}onClick={deleteProduct}>
          </Dropdown.Item>
          <Link to={`/editar_produto/${_id}`}>
            <Dropdown.Item icon={<EditIcon/>} >
            </Dropdown.Item>
          </Link>
          
      </Dropdown>
      </div>
        <img
          src={`http://localhost:3333/${src}`}
          alt="Denim Jeans"
        ></img>
        <div className={`${styles.continfos} `}>
        <h1>Tiulo:{name}</h1>
        <p className="price">Preço R${price}</p>
        <p>Sinopse:{synopsis}</p>
        
      </div>
      
    </div>
    
  */
  )
}

export default MyCards
