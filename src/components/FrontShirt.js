import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';

export default function FrontShirt() {
  const [color, setColor] = useState('#000000');
  const [logo, setLogo] = useState('https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png');
  const [xAxis, setXAxis] = useState('290');
  const [yAxis, setYAxis] = useState('160');
  const [widthAxis, setWidthAxis] = useState('80');
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    const IMG_WIDTH = 520;
    const conversion = {
      x: 1.8,
      y: 3.25,
      width: 6.5,
    };
    if (parseFloat(window.innerWidth) < IMG_WIDTH) {
      setXAxis(`${Math.round(window.innerWidth / conversion.x)}`);
      setYAxis(`${Math.round(window.innerWidth / conversion.y)}`);
      setWidthAxis(`${Math.round(window.innerWidth / conversion.width)}`);
    }
  }, []);

  const handleColor = ({ target }) => {
    setColor(target.value);
  };

  const handleButton = () => {
    if (imgUrl === '') {
      setLogo('https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png');
    } else {
      setLogo(imgUrl);
    }
  };

  return (
    <main className={ styles.main }>
      <div className={ styles.inputContainer }>
        <input
          type="color"
          value={ color }
          onChange={ handleColor }
          className={ styles.color }
        />
        <div className={ styles.inputBox }>
          <TextField
            id="standard-number"
            label="x"
            type="number"
            variant="standard"
            className={ styles.input }
            value={ xAxis }
            onChange={ ({ target }) => setXAxis(target.value) }
          />
          <TextField
            id="standard-number"
            label="y"
            type="number"
            variant="standard"
            className={ styles.input }
            value={ yAxis }
            onChange={ ({ target }) => setYAxis(target.value) }
          />
          <TextField
            id="standard-number"
            label="width"
            type="number"
            variant="standard"
            className={ styles.input }
            value={ widthAxis }
            onChange={ ({ target }) => setWidthAxis(target.value) }
          />
        </div>
        <div className={ styles.inputBox }>
          <TextField
            label="Image URL"
            type="text"
            variant="standard"
            value={ imgUrl }
            onChange={ ({ target }) => setImgUrl(target.value) }
            className={ styles.inputImage }
          />
          <Button
            variant="contained"
            disableElevation
            className={ styles.button }
            onClick={ handleButton }
          >
            Change image
          </Button>
        </div>
      </div>
      <div className={ styles.shirtBox } style={ { backgroundColor: color } }>
        <img src="/camisetaLisa.png" alt="shirt" className={ styles.shirtImg } />
        <img
          src={ logo }
          alt="logo"
          className={ styles.logoImg }
          style={ { left: `${xAxis}px`, top: `${yAxis}px`, width: `${widthAxis}px` } }
        />
      </div>
    </main>
  );
}
