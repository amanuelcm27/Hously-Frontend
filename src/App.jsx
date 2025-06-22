import React, { useState } from 'react';
import { ThemeProvider, createTheme, Container, Box, CssBaseline } from '@mui/material';
import HouseForm from './components/HouseForm';
import PriceDisplay from './components/PriceDisplay';
import './App.css';

const spotifyTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DB954',
    },
    background: {
      default: '#121212',
      paper: '#181818',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handlePredict = (price) => {
    setPredictedPrice(price);
  };
  

  return (
    <ThemeProvider theme={spotifyTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 2 }}>
        <Container maxWidth="xl">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '3fr 1fr' },
            gap: 3,
            alignItems: 'start',
          }}>
            <Box sx={{ 
              borderRadius: 2, 
              p: 3, 
              bgcolor: 'background.paper',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <HouseForm onPredict={handlePredict} />
            </Box>
            <Box sx={{ 
              borderRadius: 2, 
              p: 3, 
              bgcolor: 'background.paper',
              border: '1px solid rgba(255,255,255,0.1)',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <PriceDisplay price={predictedPrice} />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
