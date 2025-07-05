import React, { useEffect, useState } from 'react';
import { Box, Modal, Typography, Button, Tabs, Tab, Paper } from '@mui/material';
import KnowledgeDatabasePlantGrid from './components/KnowledgeDatabasePlantGrid';

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

enum KnowledgeDatabaseTab {
    PLANT = 'Растение',
    CLIMATE = 'Климат',
    SOIL = 'Почва',
    GROUND = 'Грунт',
    WATER = 'Воды'
}

const KnowledgeDatabase = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [selectedTab, setSelectedTab] = useState<KnowledgeDatabaseTab | null>(null)

  const handleChange = (_: any, newValue: KnowledgeDatabaseTab) => {
    setSelectedTab(newValue as KnowledgeDatabaseTab)
  };

  const renderContent = () => {
    switch (selectedTab) {
        case KnowledgeDatabaseTab.PLANT: return <KnowledgeDatabasePlantGrid />
        case KnowledgeDatabaseTab.CLIMATE: return <>Почва</>
        default: return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ backdropFilter: 'blur(4px)' }}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 2 }}>
            База знаний {selectedTab !== null ? ` — Вкладка «${selectedTab}»` : ''}
        </Typography>

        <Tabs value={selectedTab} onChange={handleChange} sx={{ mb: 2 }}>
            {Object.entries(KnowledgeDatabaseTab).map(([key, label]) => (
                <Tab key={ label } label={ label } value={ label } />
            ))}
        </Tabs>
        {renderContent()}
      </Box>
    </Modal>
  );
};

export default KnowledgeDatabase;
