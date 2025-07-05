import React, { useEffect, useState } from 'react';
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Typography, Divider
} from '@mui/material';
import {
  Book, Map, Person, Settings, Logout, Login
} from '@mui/icons-material';
import { useJwtPayload } from '../../hooks/usejwtPayload';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../services/authorisation';

const drawerWidth = 350;

interface SidebarProps {
  onOpenKnowledgeDb: () => void;
  onLoginClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenKnowledgeDb, onLoginClick }) => {
  const [renderTrigger, setRenderTrigger] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleLoginButton = async () => {
    onLoginClick();
    setRenderTrigger(prev => !prev);  
  }

  const handleOnLogout = async () => {
    try {
      logoutUser();
      enqueueSnackbar('Вы успешно вышли из системы', { variant: 'success' });
      setRenderTrigger(prev => !prev);  // Перерендер
    } catch (error: any) {
      enqueueSnackbar('Что-то пошло не так', { variant: 'error' });
    }
  };
  const tokenPayload = useJwtPayload();
  const login = tokenPayload?.sub;

  useEffect(() => {
    // Debug: показываем, когда обновляется компонент
    console.log('Sidebar re-rendered due to token change');
  }, [renderTrigger]);

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
          top: 50,
          height: 'calc(100% - 50px)',
        },
      }}
    >
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Avatar src="https://via.placeholder.com/80" sx={{ width: 140, height: 140, margin: '0 auto' }} />
        <Typography variant="h6" sx={{ mt: 1 }}>
          {(login !== null && login !== undefined) ? login : 'Пользователь'}
        </Typography>
        <Typography variant="caption" color="textSecondary">superadmin@yandex.ru</Typography>
      </Box>
      <Divider />
      <List sx={{ width: '80%', m: '0 auto' }}>
        {!tokenPayload &&
          <ListItemButton onClick={() => handleLoginButton()}>
            <ListItemIcon><Login /></ListItemIcon>
            <ListItemText primary="Войти" sx={{ textAlign: 'justify' }} />
          </ListItemButton>
        }

        <ListItemButton onClick={onOpenKnowledgeDb}>
          <ListItemIcon><Book /></ListItemIcon>
          <ListItemText primary="База знаний" sx={{ textAlign: 'justify' }} />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon><Map /></ListItemIcon>
          <ListItemText primary="Территории" sx={{ textAlign: 'justify' }} />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText primary="Пользователь" sx={{ textAlign: 'justify' }} />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Настройки" sx={{ textAlign: 'justify' }} />
        </ListItemButton>
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2 }}>
        {tokenPayload &&
          <>
            <Divider />
            <List>
              <ListItemButton onClick={handleOnLogout}>
                <ListItemIcon><Logout /></ListItemIcon>
                <ListItemText primary="Выйти" />
              </ListItemButton>
            </List>
          </>
        }
      </Box>
    </Drawer>
  );
};

export default Sidebar;
