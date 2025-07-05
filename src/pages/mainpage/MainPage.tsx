import { Box, Container, CssBaseline, IconButton, Menu } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { MapBox } from "../../components/mapbox/MapBox";
import KnowledgeDatabase from "../../components/knowledgedatabase/KnowledgeDatabase";
import LoginLogoutModal from "../../components/login/LoginLogoutModal";

export default function MainPage() {
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Sidebar 
        onOpenKnowledgeDb={() => setKnowledgeOpen(true)}
        onLoginClick={() => setLoginModalOpen(true)}
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
      {/* <LoginModal open={ isLoginModalOpen } onClose={() => setLoginModalOpen(false)} /> */}
        <LoginLogoutModal open={ isLoginModalOpen } onClose={() => setLoginModalOpen(false)} />
    </>
  );
}
