import { useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../src/components/Header';
import FrontShirt from '../src/components/FrontShirt';
import BackShirt from '../src/components/BackShirt';
import HomeContext from '../src/context/HomeContext';
import ThemeButton from '../src/components/ThemeButton';
import PriceContainer from '../src/components/PriceContainer';
import styles from '../styles/Home.module.css';

export default function Home() {
  const INITIAL_PRICE = 49.9;
  const [price, setPrice] = useState(INITIAL_PRICE);
  const [color, setColor] = useState('#000000');
  const [theme, setTheme] = useState(true);
  const value = useMemo(
    () => ({ color, setColor, theme, setTheme, price, setPrice }),
    [color, theme, price],
  );
  const pageTheme = createTheme({
    palette: {
      mode: theme ? 'light' : 'dark',
    },
  });
  return (
    <HomeContext.Provider value={ value }>
      <ThemeProvider theme={ pageTheme }>
        <CssBaseline />
        <Header />
        <ThemeButton />
        <main className={ styles.main }>
          <FrontShirt />
          <BackShirt />
          <PriceContainer />
        </main>
      </ThemeProvider>
    </HomeContext.Provider>
  );
}
