import { Box, Container, CssBaseline, IconButton, Menu } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { MapBox } from "../../components/mapbox/MapBox";
import KnowledgeDatabase from "../../components/knowledgedatabase/KnowledgeDatabase";
import LoginLogoutModal from "../../components/login/LoginLogoutModal";

export enum SidebarTab {
  PLANT = 'PLANT',
  CLIMATE = 'CLIMATE',
  SOIL = 'SOIL',
  WATER = 'WATER',
  GROUND = 'GROUND',
  PROFILE = 'PROFILE',
  RELIEF = 'RELIEF',
}

export default function MainPage() {
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [renderSidebarFlag, setRenderSidebarFlag] = useState(false);
  const [selecterdSidebarTab, setSelectedSidebarTab] = useState<SidebarTab | null>(null);

  const handleLoginClose = () => {
    setLoginModalOpen(false);
    setRenderSidebarFlag(prev => !prev);
  }

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Sidebar 
        key={renderSidebarFlag.toString()}
        onOpenKnowledgeDb={() => setKnowledgeOpen(true)}
        onLoginClick={() => setLoginModalOpen(true)}
        onLogout={() => setRenderSidebarFlag(prev => !prev)}
      />
      <Box
        sx={{
          marginLeft: '350px', // ширина Sidebar
          height: 'calc(100vh - 50px)', // учёт AppBar
          overflow: 'hidden',
        }}
      >
        <MapBox lat={43.1155} lng={131.8855} />
      </Box>
      <KnowledgeDatabase open={knowledgeOpen} onClose={() => setKnowledgeOpen(false)} />
      <LoginLogoutModal open={ isLoginModalOpen } onClose={handleLoginClose} />
    </>
  );
}
