import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function TrainerCard({ trainer, onDelete }) {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));

  // Evitar doble /media/ en la URL
  const trainerImage =
    trainer.picture?.startsWith("http")
      ? trainer.picture
      : trainer.picture
      ? `${API_MEDIA_URL}/${trainer.picture}`
      : undefined;

  return (
    <Card>
      {trainerImage && (
        <CardMedia
          component="img"
          height={200}
          image={trainerImage}
          alt={`${trainer.name_trainer} ${trainer.lastname}`}
        />
      )}

      <CardContent>
        <Typography variant="h6">
          {trainer.name_trainer} {trainer.lastname}
        </Typography>
        <Typography>Nivel: {trainer.level}</Typography>
      </CardContent>

      <CardActions>
        <Button onClick={() => navigate(`/trainers/${trainer.id}`)}>Ver detalles</Button>
        {isLoggedIn && (
          <>
            <Button onClick={() => navigate(`/edit-trainer/${trainer.id}`)}>Editar</Button>
            <Button color="error" onClick={() => onDelete(trainer.id)}>Eliminar</Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}

