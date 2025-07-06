import React, { ReactNode } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SidebarTab } from '../../pages/mainpage/MainPage';

const style = {
  position: 'fixed' as const,
  top: '53%',
  left: '59%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  overflowY: 'auto',
  borderRadius: 2,
  zIndex: 1000,
  pointerEvents: 'auto',
};

export type KnowledgeDatabaseModalProps = {
  open: boolean;
  onClose: () => void;
  selectedTab: SidebarTab;
  renderChild: () => ReactNode;
};

const KnowledgeDatabaseModal = ({ open, onClose, selectedTab, renderChild }: KnowledgeDatabaseModalProps) => {
  if (!open) return null;

  return (
    <Box sx={style}>
      <IconButton
        sx={{ position: 'absolute', top: 8, right: 8 }}
        onClick={() => onClose()}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h4" align='center' sx={{ mb: 2 }}>
        База знаний {selectedTab !== null ? ` — Вкладка «${selectedTab}»` : ''}
      </Typography>
      {renderChild()}
    </Box>
  );
};

export default KnowledgeDatabaseModal;
