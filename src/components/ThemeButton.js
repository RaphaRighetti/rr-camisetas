import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import styles from '../../styles/Home.module.css';
import HomeContext from '../context/HomeContext';

export default function ThemeButton() {
  const { theme, setTheme } = useContext(HomeContext);
  return (
    <div className={ styles.themeButtonContainer }>
      <IconButton color="primary" onClick={ () => setTheme((prev) => !prev) }>
        {theme ? <LightModeIcon /> : <Brightness3Icon />}
      </IconButton>
    </div>
  );
}
