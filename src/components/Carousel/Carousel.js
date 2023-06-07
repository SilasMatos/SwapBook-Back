import { useState } from 'react';

import banner02 from '../img/banner_01.png'
import '../Carousel/Carousel.css'
function CarouselFadeExample() {
  
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
  return (
    <div className='container edit-car'>
    <div className='col-t1'>
      <div className='col-t2'>
        <h6>Reinvente sua biblioteca, compartilhe suas paixões</h6>
        <h1 id='edit-from-h1'>SWAP BOOK</h1>
        <h5>Explore, venda, troque e mergulhe em um mar de possibilidades literárias.</h5>
      </div>
      <div className='col-t3'>
        
            <img  className='img-banner' src={banner02} alt='Second slide' />


      </div>
    </div>
  </div>
  )
}

export default CarouselFadeExample
/*
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>*/