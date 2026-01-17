import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTrainerById } from "../services/TrainerService";
import { Typography, Button } from "@mui/material";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function TrainerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    fetchTrainerById(id).then(setTrainer);
  }, [id]);

  if (!trainer) return <p>Cargando...</p>;

  // Construir la URL de la imagen correctamente
  const trainerImage =
    trainer.picture?.startsWith("http")
      ? trainer.picture
      : trainer.picture
      ? `${API_MEDIA_URL}/${trainer.picture}`
      : undefined;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {trainer.name_trainer} {trainer.lastname}
      </Typography>

      <Typography>Nivel: {trainer.level}</Typography>
      <Typography>Fecha de nacimiento: {trainer.birthdate}</Typography>

      {trainerImage && (
        <img
          src={trainerImage}
          width={300}
          alt={`${trainer.name_trainer} ${trainer.lastname}`}
          style={{ marginTop: "16px", borderRadius: "8px" }}
        />
      )}

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => navigate("/trainers")}
      >
        Volver a la lista
      </Button>
    </div>
  );
}
