import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';
import {
  Home,
  Book,
  Map,
  Person,
  Settings,
  Logout,
} from '@mui/icons-material';

const drawerWidth = 350;

const menuItems = [
  { text: 'Главный экран', icon: <Home /> },
  { text: 'База знаний', icon: <Book /> },
  { text: 'Территории', icon: <Map /> },
  { text: 'Пользователь', icon: <Person /> },
  { text: 'Настройки', icon: <Settings /> },
];

export const Sidebar: React.FC = () => {
  return (
    <Drawer
        variant="permanent"
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f4f6f8',
            borderRight: '1px solid #ccc',
            top: 50, // чтобы не перекрывал AppBar
            height: 'calc(100% - 50px)',
            },
        }}
    >
      <Box 
        sx={{ 
            padding: 2, 
            textAlign: 'center' 
        }}
      >
        <Avatar
          src="https://via.placeholder.com/80"
          sx={{ width: 140, height: 140, margin: '0 auto' }}
        />
        <Typography variant="h6" sx={{ mt: 1 }}>
          Иванов Пётр
        </Typography>
        <Typography variant="caption" color="textSecondary">
          superadmin@yandex.ru
        </Typography>
      </Box>
      <Divider />
      <List
        sx={{
            width: '80%',
            m: '0 auto'
        }}
      >
        {menuItems.map(({ text, icon }) => (
        <ListItemButton key={text}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText  
                primary={text}
                sx={{
                    textAlign: 'justify'
                }} 
            />
        </ListItemButton>
        ))}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2 }}>
        <Divider />
        <List>
          <ListItemButton>
            <ListItemIcon><Logout /></ListItemIcon>
            <ListItemText primary="Выйти" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;