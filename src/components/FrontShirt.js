import React, { useState } from 'react';
import Shirt from './Shirt';

export default function FrontShirt() {
  const [logo, setLogo] = useState('https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png');
  const [xAxis, setXAxis] = useState('290');
  const [yAxis, setYAxis] = useState('160');
  const [widthAxis, setWidthAxis] = useState('80');
  const [imgUrl, setImgUrl] = useState('');

  const conversion = {
    x: 1.8,
    y: 3.25,
    width: 6.5,
  };

  return (
    <Shirt
      isFront
      conversion={ conversion }
      logo={ logo }
      setLogo={ setLogo }
      xAxis={ xAxis }
      setXAxis={ setXAxis }
      yAxis={ yAxis }
      setYAxis={ setYAxis }
      widthAxis={ widthAxis }
      setWidthAxis={ setWidthAxis }
      imgUrl={ imgUrl }
      setImgUrl={ setImgUrl }
      lightImage="/camisetaLisa.png"
    />
  );
}
