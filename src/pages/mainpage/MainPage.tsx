import { Box, Container, CssBaseline, IconButton, Menu } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapBox } from "../../components/mapbox/MapBox";
import KnowledgeDatabase from "../../components/knowledgedatabase/KnowledgeDatabase";

export default function MainPage() {
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Sidebar onOpenKnowledgeDb={() => setKnowledgeOpen(true)} />
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
    </>
  );
}
