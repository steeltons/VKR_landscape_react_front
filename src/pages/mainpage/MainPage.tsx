import { Box, CssBaseline } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { MapBox } from "../../components/mapbox/MapBox";
import LoginLogoutModal from "../../components/login/LoginLogoutModal";
import KnowledgeDatabaseModal from "../../components/knowledgedatabase/KnowledgeDatabaseModal";
import KnowledgeDatabasePlantGrid from "../../components/knowledgedatabase/components/KnowledgeDatabasePlantGrid";
import KnowledgeDatabaseReliefGrid from "../../components/knowledgedatabase/components/relief/KnowledgeDatabaseReliefGrid";
import KnowledgeDatabaseClimateGrid from "../../components/knowledgedatabase/components/climate/KnowledgeDatabaseClimateGrid";
import KnowledgeDatabaseGroundGrid from "../../components/knowledgedatabase/components/ground/KnowledgeDatabaseGroundGrid";
import KnowledgeDatabaseSoilGrid from "../../components/knowledgedatabase/components/soil/KnowledgeDatabaseSoilGrid";
import KnowledgeDatabaseWaterGrid from "../../components/knowledgedatabase/components/water/KnowledgeDatabaseWaterGrid";
import KnowledgeDatabaseLandscapeGrid from "../../components/knowledgedatabase/components/landscape/KnowledgeDatabaseLandscapeGrid";
import UserGrid from "../../components/knowledgedatabase/users/UserGrid";
import LandscapeConstructorGrid from "../../components/knowledgedatabase/landscape_constructor/LandscapeConsturctorGrid";
import KnowledgeDatabaseFoundationGrid from "../../components/knowledgedatabase/components/foundaments/KnowledgeDatabaseFoundamentGrid";
import KnowledgeDatabaseTerritoryGrid from "../../components/knowledgedatabase/components/territories/KnowledgeDatabaseTerritorieGrid";

export enum SidebarTab {
  LOGIN = 'Войти',
  PROFILE = 'Профиль',
  RELIEF = 'Рельеф',
  LANDSCAPE = 'Ландшафт',
  PLANT = 'Растения',
  FOUNDAMENTS = 'Фундаменты',
  CLIMATE = 'Климат',
  SOIL = 'Почва',
  GROUND = 'Грунт',
  WATER = 'Воды',
  TERRITORIE = 'Территории',
  CONSTRUCTOR = 'Конструктор территорий',
  USERS = 'Пользователи',
  SETTINGS = 'Настройки'
}

export default function MainPage() {
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const [renderSidebarFlag, setRenderSidebarFlag] = useState(false);
  const [selecterdSidebarTab, setSelectedSidebarTab] = useState<SidebarTab | null>(null);

  console.log(selecterdSidebarTab);

  const handleLoginClose = () => {
    setSelectedSidebarTab(null);
    setRenderSidebarFlag(prev => !prev);
  }

  const handleKnowledgeDatabaseClose = () => {
    setSelectedSidebarTab(null);
  }

  const renderModalScreen = () => {
    console.log('Selected', selecterdSidebarTab)
    switch(selecterdSidebarTab) {
      case SidebarTab.LOGIN: return <LoginLogoutModal open={ true } onClose={handleLoginClose} />;
      case SidebarTab.RELIEF: return <KnowledgeDatabaseModal open={ true } onClose={handleKnowledgeDatabaseClose} selectedTab={ selecterdSidebarTab } renderChild={() => <KnowledgeDatabaseReliefGrid />} />;
      case SidebarTab.LANDSCAPE: return <KnowledgeDatabaseModal open={ true } onClose={handleKnowledgeDatabaseClose} selectedTab={ selecterdSidebarTab } renderChild={() => <KnowledgeDatabaseLandscapeGrid />} />;
      case SidebarTab.FOUNDAMENTS: return <KnowledgeDatabaseModal open={ true } onClose={handleKnowledgeDatabaseClose} selectedTab={ selecterdSidebarTab } renderChild={() => <KnowledgeDatabaseFoundationGrid />} />;
      case SidebarTab.PLANT: return <KnowledgeDatabaseModal open={ true } onClose={handleKnowledgeDatabaseClose} selectedTab={ selecterdSidebarTab } renderChild={() => <KnowledgeDatabasePlantGrid />} />;
      case SidebarTab.CLIMATE: return <KnowledgeDatabaseModal open={ true } onClose={handleKnowledgeDatabaseClose} selectedTab={ selecterdSidebarTab } renderChild={() => <KnowledgeDatabaseClimateGrid />} />;
      case SidebarTab.GROUND: return <KnowledgeDatabaseModal open={ true } onClose={handleKnowledgeDatabaseClose} selectedTab={ selecterdSidebarTab } renderChild={() => <KnowledgeDatabaseGroundGrid />} />;
      case SidebarTab.SOIL: return <KnowledgeDatabaseModal open={ true } onClose={handleKnowledgeDatabaseClose} selectedTab={ selecterdSidebarTab } renderChild={() => <KnowledgeDatabaseSoilGrid />} />;
      case SidebarTab.TERRITORIE: return <KnowledgeDatabaseModal open={ true } onClose={handleKnowledgeDatabaseClose} selectedTab={ selecterdSidebarTab } renderChild={() => <KnowledgeDatabaseTerritoryGrid />} />;
      case SidebarTab.WATER: return <KnowledgeDatabaseModal open={ true } onClose={handleKnowledgeDatabaseClose} selectedTab={ selecterdSidebarTab } renderChild={() => <KnowledgeDatabaseWaterGrid />} />;
      case SidebarTab.USERS: return <KnowledgeDatabaseModal open={ true } onClose={handleKnowledgeDatabaseClose} selectedTab={ selecterdSidebarTab } renderChild={() => <UserGrid />} />
      case SidebarTab.CONSTRUCTOR: return <KnowledgeDatabaseModal open={ true } onClose={handleKnowledgeDatabaseClose} selectedTab={ selecterdSidebarTab } renderChild={() => <LandscapeConstructorGrid />} />
      default: return null
    }
  }

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Sidebar 
        key={renderSidebarFlag.toString()}
        onOpenKnowledgeDb={() => setKnowledgeOpen(true)}
        onLogout={() => setRenderSidebarFlag(prev => !prev)}
        setSelectedSidebarTab={setSelectedSidebarTab}
      />
      <Box
        sx={{
          marginLeft: '350px', // ширина Sidebar
          height: 'calc(100vh - 50px)', // учёт AppBar
          overflow: 'hidden',
        }}
      >
        <MapBox key={renderSidebarFlag.toString()} lat={43.1155} lng={131.8855} />
      </Box>
      {renderModalScreen()}
    </>
  );
}
