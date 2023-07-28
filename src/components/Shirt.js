import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import HomeContext from '../context/HomeContext';
import styles from '../../styles/Home.module.css';

export default function Shirt(props) {
  const {
    isFront,
    lightImage,
    logo,
    setLogo,
    xAxis,
    setXAxis,
    yAxis,
    setYAxis,
    widthAxis,
    setWidthAxis,
    imgUrl,
    setImgUrl,
    conversion,
  } = props;
  const { color, setColor, theme, setPrice } = useContext(HomeContext);
  const IMG_MAX_WIDTH = 520;

  useEffect(() => {
    const VIEW_PORT_HIGH = 1280;
    if (parseFloat(window.innerWidth) < IMG_MAX_WIDTH) {
      setXAxis(`${Math.round(window.innerWidth / conversion.x)}`);
      setYAxis(`${Math.round(window.innerWidth / conversion.y)}`);
      setWidthAxis(`${Math.round(window.innerWidth / conversion.width)}`);
    }
    if (parseFloat(window.innerWidth) >= VIEW_PORT_HIGH) {
      setXAxis('360');
      setYAxis('190');
      setWidthAxis('80');
    }
  }, []);

  useEffect(() => {
    const { innerWidth } = window;
    const shirtWidth = innerWidth < IMG_MAX_WIDTH ? innerWidth : IMG_MAX_WIDTH;
    const [frontShirtLogo, backShirtLogo] = [...document.querySelectorAll('#shirtLogo')];
    const BASE_SHIRT_PRICE = 29.9;
    const BASE_AREA_PRICE = 0.001384;
    const AREA_VALUE = (BASE_AREA_PRICE * (IMG_MAX_WIDTH ** 2)) / (shirtWidth ** 2);
    const FRONT_LOGO_PRICE = frontShirtLogo.width * frontShirtLogo.height * AREA_VALUE;
    const BACK_LOGO_PRICE = backShirtLogo.width * backShirtLogo.height * AREA_VALUE;
    const currentPrice = BASE_SHIRT_PRICE + FRONT_LOGO_PRICE + BACK_LOGO_PRICE;
    setPrice(currentPrice);
  }, [widthAxis]);

  const handleColor = ({ target }) => {
    setColor(target.value);
  };

  const handleFileUpload = ({ target }) => {
    try {
      const file = target.files[0];
      if (file) {
        setLogo(URL.createObjectURL(file));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAbsoluteValue = (value) => {
    const newValue = Number(value);
    const absoluteValue = Math.abs(newValue);
    return `${absoluteValue}`;
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
            onChange={ ({ target }) => setWidthAxis(getAbsoluteValue(target.value)) }
          />
        </div>
        <div className={ styles.inputBoxTwo }>
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
        <div className={ styles.inputBoxThree }>
          <label
            className="file"
            htmlFor={ isFront ? 'front-file-upload' : 'back-file-upload' }
          >
            <p className={ theme ? styles.uploadButton : styles.uploadButtonDark }>
              upload image
            </p>
            <input
              type="file"
              id={ isFront ? 'front-file-upload' : 'back-file-upload' }
              hidden
              accept="image/*"
              onChange={ handleFileUpload }
            />
          </label>
        </div>
      </div>
      <div
        className={ styles.shirtBox }
        style={ { backgroundColor: color, opacity: isFront ? '1.0' : '0.9' } }
      >
        <img
          src={ lightImage }
          alt="shirt"
          className={ styles.shirtImg }
        />
        <img
          src={ logo }
          alt="logo"
          id="shirtLogo"
          style={ { left: `${xAxis}px`, top: `${yAxis}px`, width: `${widthAxis}px` } }
          className={ styles.logoImg }
        />
      </div>
    </main>
  );
}

Shirt.propTypes = {
  isFront: PropTypes.bool.isRequired,
  lightImage: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  setLogo: PropTypes.func.isRequired,
  xAxis: PropTypes.string.isRequired,
  setXAxis: PropTypes.func.isRequired,
  yAxis: PropTypes.string.isRequired,
  setYAxis: PropTypes.func.isRequired,
  widthAxis: PropTypes.string.isRequired,
  setWidthAxis: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  setImgUrl: PropTypes.func.isRequired,
  conversion: PropTypes.shape(
    { x: PropTypes.number, y: PropTypes.number, width: PropTypes.number },
  ).isRequired,
};
