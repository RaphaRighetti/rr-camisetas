import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import HomeContext from '../context/HomeContext';
import styles from '../../styles/Home.module.css';

export default function PriceContainer() {
  const { price } = useContext(HomeContext);
  const [emailInput, setEmailInput] = useState('');
  const [emailClassName, setEmailClassName] = useState('INVALID_CLASS');
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (emailClassName === '') {
      setEmailClassName(styles.enterValidEmail);
    }
  }, [emailClassName]);

  const handleConfirm = () => {
    setIsDisabled(true);
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(emailInput)) {
      setEmailClassName('');
      setIsDisabled(false);
    }
    setIsDisabled(false);
  };

  return (
    <div className={ styles.priceContainer }>
      <div>
        <p>
          Price:
          {' '}
          {price.toLocaleString('pt-BR', { style: 'currency', currency: 'brl' })}
        </p>
      </div>
      <div className={ styles.confirmOrderBox }>
        <span className={ emailClassName }>
          Enter a valid e-mail!
        </span>
        <TextField
          label="Your email"
          type="text"
          variant="standard"
          value={ emailInput }
          onChange={ ({ target }) => setEmailInput(target.value) }
          className={ styles.inputImage }
        />
        <Button
          variant="contained"
          disableElevation
          className={ styles.button }
          onClick={ handleConfirm }
          disabled={ isDisabled }
        >
          Confirm order
        </Button>
      </div>
    </div>
  );
}
