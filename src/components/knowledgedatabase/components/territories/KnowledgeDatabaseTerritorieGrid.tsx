// KnowledgeDatabaseTerritoryGrid.tsx
import { Box, Button, Card, CardActions, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useJwtPayload } from "../../../../hooks/usejwtPayload";
import { 
  deleteTerritorie, 
  getAllTerritories, 
  TerritorieRsDto 
} from "../../../../services/territory";
import CreateTerritoryForm from "./CreateTerritoryForm";

type TerritoryUi = {
  id: number;
  landscapeId: number;
  description: string;
  color: { r: number; g: number; b: number };
};

function convertToUi(data: TerritorieRsDto): TerritoryUi {
  return {
    id: data.territorie_id,
    landscapeId: data.territorie_landscape_id,
    description: data.territorie_description,
    color: {
      r: data.territorie_color_r,
      g: data.territorie_color_g,
      b: data.territorie_color_b,
    },
  };
}

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "border 0.3s linear, box-shadow 0.3s ease-in-out",
  ":hover": {
    boxShadow: theme.shadows[16],
  },
}));

const KnowledgeDatabaseTerritoryGrid: React.FC = () => {
  const [territories, setTerritories] = useState<TerritoryUi[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selected, setSelected] = useState<TerritoryUi | null>(null);

  const { is_admin = false } = useJwtPayload() || {};

  useEffect(() => {
    const load = async () => {
      const res = await getAllTerritories();
      setTerritories(res.map(convertToUi));
    };
    load();
  }, [isCreating]);

  const handleDelete = async (id: number) => {
    await deleteTerritorie(id);
    setTerritories(prev => prev.filter(t => t.id !== id));
  };

  const handleEdit = (id: number) => {
    const terr = territories.find(t => t.id === id) || null;
    setSelected(terr);
    setIsCreating(true);
  };

  const handleAdd = () => {
    setSelected(null);
    setIsCreating(true);
  };

  if (isCreating) {
    return (
      <CreateTerritoryForm
        onCancel={() => setIsCreating(false)}
        id={selected?.id}
        isUpdate={!!selected}
        canUserEdit={is_admin}
      />
    );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {territories.map(t => (
          <Grid item xs={12} sm={6} lg={4} key={t.id}>
            <StyledCard >
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Территория #{t.id}
                </Typography>
                <Typography variant="body2">{t.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEdit(t.id)}>
                  Редактировать
                </Button>
                {is_admin && (
                  <Button color="error" size="small" onClick={() => handleDelete(t.id)}>
                    Удалить
                  </Button>
                )}
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KnowledgeDatabaseTerritoryGrid;
