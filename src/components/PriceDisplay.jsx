import React from 'react';
import { Box, Typography } from '@mui/material';

const PriceDisplay = ({ price }) => {
  const formatPrice = (p) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(p);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      {price === null ? (
        <Typography variant="h5">
          Click "Predict Price" to see estimate
        </Typography>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            🏷 Estimated Price
          </Typography>
          <Typography variant="h3" color="primary.main">
            {formatPrice(price)}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PriceDisplay; 