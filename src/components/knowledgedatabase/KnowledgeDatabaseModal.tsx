import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Modal, Typography, Button, Tabs, Tab, Paper } from '@mui/material';
import KnowledgeDatabasePlantGrid from './components/KnowledgeDatabasePlantGrid';
import KnowledgeDatabaseReliefGrid from './components/relief/KnowledgeDatabaseReliefGrid';
import KnowledgeDatabaseClimateGrid from './components/climate/KnowledgeDatabaseClimateGrid';
import KnowledgeDatabaseSoilGrid from './components/soil/KnowledgeDatabaseSoilGrid';
import KnowledgeDatabaseGroundGrid from './components/ground/KnowledgeDatabaseGroundGrid';
import KnowledgeDatabaseWaterGrid from './components/water/KnowledgeDatabaseWaterGrid';
import { SidebarTab } from '../../pages/mainpage/MainPage';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '70%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  overflowY: 'auto',
  borderRadius: 2,
};

export type KnowledgeDatabaseModalProps = {
  open: boolean;
  onClose: () => void;
  selectedTab: SidebarTab;
  renderChild: () => ReactNode;
}

const KnowledgeDatabaseModal = ({ open, onClose, selectedTab, renderChild }: KnowledgeDatabaseModalProps) => {
  return (
    <Modal open={open} onClose={onClose} sx={{ backdropFilter: 'blur(4px)' }}>
      <Box sx={style}>
        <Typography variant="h4" align='center' sx={{ mb: 2 }}>
            База знаний {selectedTab !== null ? ` — Вкладка «${selectedTab}»` : ''}
        </Typography>
        {renderChild()}
      </Box>
    </Modal>
  );
};

export default KnowledgeDatabaseModal;
