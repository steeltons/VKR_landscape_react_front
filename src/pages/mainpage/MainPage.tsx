import { Box, Container, CssBaseline, IconButton, Menu } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapBox } from "../../components/mapbox/MapBox";

function MainPage() {

   return (
    <>
      <Navbar />
      <CssBaseline />
      <Sidebar />
      <Box
        sx={{
          marginLeft: '240px', 
          padding: 3,
          height: 'calc(100vh - 50px)'
        }} 
      >
          <MapBox lat={43.06} lng={131.52}/>
      </Box>
    </>
  );
}

export default MainPage;