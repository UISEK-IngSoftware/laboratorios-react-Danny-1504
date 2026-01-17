import { useEffect, useState } from "react";
import { fetchTrainers, deleteTrainer } from "../services/TrainerService";
import TrainerCard from "../componets/TrainerCard"; 
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TrainerList() {
  const [trainers, setTrainers] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));

  const loadTrainers = async () => {
    try {
      const data = await fetchTrainers();
      setTrainers(data);
    } catch (error) {
      console.error("Error al cargar entrenadores:", error);
    }
  };

  useEffect(() => {
    loadTrainers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar entrenador?")) {
      try {
        await deleteTrainer(id);
        loadTrainers();
      } catch (error) {
        console.error("Error al eliminar entrenador:", error);
      }
    }
  };

  return (
    <>
      {isLoggedIn && (
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => navigate("/add-trainer")}
        >
          Agregar Entrenador
        </Button>
      )}

      {/* Container actualizado para MUI Grid v2 */}
      <Grid container spacing={2} columns={{ xs: 12, md: 12 }}>
        {trainers.length === 0 ? (
          <p>No hay entrenadores disponibles.</p>
        ) : (
          trainers.map((trainer) => (
            <Grid key={trainer.id} span={{ xs: 12, md: 4 }}>
              <TrainerCard trainer={trainer} onDelete={handleDelete} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
