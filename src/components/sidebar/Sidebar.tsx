import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Divider
} from '@mui/material';
import {
  Book, Map, Person, Settings, Logout, Login,
  LocalFloristOutlined,
  LandscapeOutlined,
  ForestOutlined,
  FilterDrama,
  FilterDramaOutlined,
  GrassOutlined,
  WaterOutlined,
  PersonOutline,
  ConstructionOutlined,
  FoundationOutlined,
  BorderColorOutlined
} from '@mui/icons-material';
import { useJwtPayload } from '../../hooks/usejwtPayload';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../services/authorisation';
import UserProfile from './components/UserProfile';
import UserProfileForm from './components/UserProfileForm';
import { SidebarTab } from '../../pages/mainpage/MainPage';

const drawerWidth = 350;

interface SidebarProps {
  onOpenKnowledgeDb: () => void;
  onLogout: () => void;
  setSelectedSidebarTab: Dispatch<SetStateAction<SidebarTab | null>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenKnowledgeDb, onLogout, setSelectedSidebarTab }) => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const tokenPayload = useJwtPayload();

  const handleOnLogout = async () => {
    try {
      await logoutUser();
      enqueueSnackbar('Вы успешно вышли из системы', { variant: 'success' });
      setSelectedSidebarTab(null);
      onLogout();
    } catch (error: any) {
      enqueueSnackbar('Что-то пошло не так', { variant: 'error' });
    }
  };

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
              <ListItemButton onClick={() => setSelectedSidebarTab(SidebarTab.LOGIN)}>
                <ListItemIcon><Login /></ListItemIcon>
                <ListItemText primary="Войти" sx={{ textAlign: 'justify' }} />
              </ListItemButton>
            }

            {tokenPayload?.is_admin &&
              <ListItemButton onClick={() => setSelectedSidebarTab(SidebarTab.CONSTRUCTOR)}>
                  <ListItemIcon><ConstructionOutlined /></ListItemIcon>
                  <ListItemText primary="Конструктор ландшафтов" sx={{ textAlign: 'justify' }}/>
              </ListItemButton>
            }

            <ListItemButton onClick={() => setSelectedSidebarTab(SidebarTab.TERRITORIE)}>
              <ListItemIcon><BorderColorOutlined /></ListItemIcon>
              <ListItemText primary="Территории" sx={{ textAlign: 'justify' }}/>
            </ListItemButton>

            <ListItemButton onClick={() => setSelectedSidebarTab(SidebarTab.RELIEF)}>
              <ListItemIcon><Map /></ListItemIcon>
              <ListItemText primary="Рельефы" sx={{ textAlign: 'justify' }}/>
            </ListItemButton>

            <ListItemButton onClick={() => setSelectedSidebarTab(SidebarTab.LANDSCAPE)}>
              <ListItemIcon><LandscapeOutlined /></ListItemIcon>
              <ListItemText primary="Ландшафты" sx={{ textAlign: 'justify' }}/>
            </ListItemButton>

            <ListItemButton onClick={() => setSelectedSidebarTab(SidebarTab.FOUNDAMENTS)}>
              <ListItemIcon><FoundationOutlined /></ListItemIcon>
              <ListItemText primary="Фундаменты" sx={{ textAlign: 'justify' }}/>
            </ListItemButton>

            <ListItemButton onClick={() => setSelectedSidebarTab(SidebarTab.PLANT)}>
              <ListItemIcon><ForestOutlined /></ListItemIcon>
              <ListItemText primary="Растения" sx={{ textAlign: 'justify' }}/>
            </ListItemButton>

            <ListItemButton onClick={() => setSelectedSidebarTab(SidebarTab.CLIMATE)}>
              <ListItemIcon><FilterDramaOutlined /></ListItemIcon>
              <ListItemText primary="Климат" sx={{ textAlign: 'justify' }}/>
            </ListItemButton>

            <ListItemButton onClick={() => setSelectedSidebarTab(SidebarTab.SOIL)}>
              <ListItemIcon><GrassOutlined /></ListItemIcon>
              <ListItemText primary="Почвы" sx={{ textAlign: 'justify' }}/>
            </ListItemButton>

            <ListItemButton onClick={() => setSelectedSidebarTab(SidebarTab.GROUND)}>
              <ListItemIcon><LocalFloristOutlined /></ListItemIcon>
              <ListItemText primary="Грунты" sx={{ textAlign: 'justify' }}/>
            </ListItemButton>

            <ListItemButton onClick={() => setSelectedSidebarTab(SidebarTab.WATER)}>
              <ListItemIcon><WaterOutlined /></ListItemIcon>
              <ListItemText primary="Воды" sx={{ textAlign: 'justify' }}/>
            </ListItemButton>

            {tokenPayload && tokenPayload.is_admin && 
                <ListItemButton onClick={() => setSelectedSidebarTab(SidebarTab.USERS)}>
                  <ListItemIcon><PersonOutline /></ListItemIcon>
                  <ListItemText primary="Пользователи" sx={{ textAlign: 'justify' }} />
                </ListItemButton>
            }

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
