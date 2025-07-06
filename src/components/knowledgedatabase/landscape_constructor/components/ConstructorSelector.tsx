import React, { Dispatch, SetStateAction } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

export type ListObjectUi = {
  id: number;
  name: string;
};

interface ConstructorSelectorProps {
  tabName: string;
  objects: ListObjectUi[];
  selectedObjects: number[];
  setSelectedObjects: Dispatch<SetStateAction<number[]>>,
  onToggle: (setSelectedObjects: Dispatch<SetStateAction<number[]>>, id: number) => void;
}

const ConstructorSelector: React.FC<ConstructorSelectorProps> = ({
  tabName,
  objects,
  selectedObjects,
  setSelectedObjects,
  onToggle,
}) => {
  return (
    <Paper sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>{tabName}</Typography>
      <List
        dense
        sx={{
          maxHeight: 300,
          minHeight: 300,
          overflowY: 'auto',
        }}
      >
        {objects.map((object) => (
          <ListItem key={object.id} button onClick={() => onToggle(setSelectedObjects, object.id)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedObjects.includes(object.id)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={object.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ConstructorSelector;
