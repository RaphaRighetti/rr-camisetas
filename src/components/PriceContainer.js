import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import emailjs from '@emailjs/browser';
import HomeContext from '../context/HomeContext';
import styles from '../../styles/Home.module.css';

export default function PriceContainer() {
  const { price, SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = useContext(HomeContext);
  const [emailInput, setEmailInput] = useState('');
  const [validEmailMsg, setValidEmailMsg] = useState('INVALID_CLASS');
  const [emailErrorMsg, setEmailErrorMsg] = useState('INVALID_CLASS');
  const [emailSentMsg, setEmailSentMsg] = useState('INVALID_CLASS');
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (validEmailMsg === '') {
      setValidEmailMsg(styles.enterValidEmail);
    } else if (emailErrorMsg === '') {
      setEmailErrorMsg(styles.emailErrorMsg);
    } else if (emailSentMsg === '') {
      setEmailSentMsg(styles.emailSentMsg);
    }
  }, [validEmailMsg, emailErrorMsg, emailSentMsg]);

  const handleConfirm = async () => {
    setIsDisabled(true);
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(emailInput)) {
      setValidEmailMsg('');
      return setIsDisabled(false);
    }

    const STATUS_SUCCESS = 200;
    const templateParams = {
      customer_email: emailInput,
      price: price.toLocaleString('pt-BR', { style: 'currency', currency: 'brl' }),
    };
    try {
      const response = await emailjs
        .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      if (response.status === STATUS_SUCCESS) {
        setEmailSentMsg('');
      } else {
        setEmailErrorMsg('');
      }
    } catch (err) {
      setEmailErrorMsg('');
    } finally {
      setIsDisabled(false);
    }
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
        <span className={ validEmailMsg }>
          Enter a valid e-mail!
        </span>
        <span className={ emailErrorMsg }>
          An error has occurred!
        </span>
        <span className={ emailSentMsg }>
          Email sent!
        </span>
        <TextField
          label="Your email"
          type="email"
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
