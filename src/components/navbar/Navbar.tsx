import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Box,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
        position='static'
        sx={{ backgroundColor: '#4caf50', height: 50, zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar
        sx={{
          minHeight: '50px !important',
          display: 'flex',
          justifyContent: 'space-between',
          paddingX: isMobile ? 1 : 3
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
          Система поддержки исследований в области ландшафтной географии
        </Typography>
        {/* <Box sx={{ width: isMobile ? '60%' : '250px' }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Поиск по координатам"
            variant="outlined"
            InputProps={{
              sx: {
                backgroundColor: '#fff',
                borderRadius: '4px',
                height: 36,
                fontSize: '0.85rem',
              },
            }}
          />
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;