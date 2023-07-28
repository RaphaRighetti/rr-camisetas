import React, { useState } from 'react';
import Shirt from './Shirt';

export default function FrontShirt() {
  const [logo, setLogo] = useState('https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png');
  const [xAxis, setXAxis] = useState('180');
  const [yAxis, setYAxis] = useState('100');
  const [widthAxis, setWidthAxis] = useState('150');
  const [imgUrl, setImgUrl] = useState('');

  const conversion = {
    x: 2.9,
    y: 5.2,
    width: 3.5,
  };

  return (
    <Shirt
      isFront={ false }
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
      lightImage="/camisetaLisaCostas.png"
    />
  );
}
