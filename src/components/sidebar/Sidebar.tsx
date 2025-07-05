import React, { useEffect, useState } from 'react';
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Divider
} from '@mui/material';
import {
  Book, Map, Person, Settings, Logout, Login
} from '@mui/icons-material';
import { useJwtPayload } from '../../hooks/usejwtPayload';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../services/authorisation';
import UserProfile from './components/UserProfile';
import UserProfileForm from './components/UserProfileForm';

const drawerWidth = 350;

interface SidebarProps {
  onOpenKnowledgeDb: () => void;
  onLoginClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenKnowledgeDb, onLoginClick }) => {
  const [renderTrigger, setRenderTrigger] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const tokenPayload = useJwtPayload();

  const handleLoginButton = async () => {
    onLoginClick();
    setRenderTrigger(prev => !prev);  
  };

  const handleOnLogout = async () => {
    try {
      logoutUser();
      enqueueSnackbar('Вы успешно вышли из системы', { variant: 'success' });
      setRenderTrigger(prev => !prev);
    } catch (error: any) {
      enqueueSnackbar('Что-то пошло не так', { variant: 'error' });
    }
  };

  useEffect(() => {
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
          overflowY: 'auto',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        {showProfileForm ? <UserProfileForm onBack={() => setShowProfileForm(false)} /> : <UserProfile />}
      </Box>
      {!showProfileForm &&
        <>
          <Divider />
          <List sx={{ width: '80%', m: '0 auto' }}>
            {tokenPayload &&
              <ListItemButton onClick={() => setShowProfileForm(!showProfileForm)}>
                <ListItemIcon><Person /></ListItemIcon>
                <ListItemText primary="Профиль" sx={{ textAlign: 'justify' }} />
              </ListItemButton>
            }

            {!tokenPayload &&
              <ListItemButton onClick={handleLoginButton}>
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
        </>
      }
    </Drawer>
  );
};

export default Sidebar;
