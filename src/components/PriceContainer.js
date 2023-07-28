import React, { useContext } from 'react';
import { Button } from '@mui/material';
import HomeContext from '../context/HomeContext';
import styles from '../../styles/Home.module.css';

export default function PriceContainer() {
  const { price } = useContext(HomeContext);
  return (
    <div className={ styles.priceContainer }>
      <p>
        Price:
        {' '}
        {price.toLocaleString('pt-BR', { style: 'currency', currency: 'brl' })}
      </p>
      <Button
        variant="contained"
        disableElevation
        className={ styles.button }
      >
        Confirm order
      </Button>
    </div>
  );
}
