import { Button, TextField, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTrainer, fetchTrainerById, updateTrainer } from "../services/TrainerService";

export default function TrainerForm() {
  const { id } = useParams(); // si existe, estamos editando
  const navigate = useNavigate();

  const [trainerData, setTrainerData] = useState({
    name_trainer: "",
    lastname: "",
    level: "",
    birthdate: "",
    picture: null,
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Cargar datos si estamos editando
  useEffect(() => {
    if (id) {
      fetchTrainerById(id)
        .then((data) => {
          setTrainerData({
            ...data,
            picture: null, // no cargamos la imagen, solo editarla si suben nueva
          });
        })
        .catch((err) => {
          console.error("Error al cargar entrenador:", err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      setTrainerData({
        ...trainerData,
        picture: files[0], // guardamos el archivo
      });
    } else {
      setTrainerData({
        ...trainerData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // limpiar mensaje previo

    try {
      const formData = new FormData();
      formData.append("name_trainer", trainerData.name_trainer);
      formData.append("lastname", trainerData.lastname);
      formData.append("level", parseInt(trainerData.level)); // importante número
      formData.append("birthdate", trainerData.birthdate);
      if (trainerData.picture) {
        formData.append("picture", trainerData.picture);
      }

      if (id) {
        // EDITAR
        await updateTrainer(id, formData);
        alert("Entrenador actualizado correctamente");
      } else {
        // CREAR
        await createTrainer(formData);
        alert("Entrenador creado correctamente");
      }

      navigate("/trainers");
    } catch (error) {
      console.error("Error guardando el entrenador:", error);

      // Mostrar errores enviados desde Django
      if (error.response && error.response.data) {
        const errors = error.response.data;
        const messages = Object.keys(errors)
          .map((key) => `${key}: ${errors[key].join(", ")}`)
          .join("\n");
        setErrorMessage(messages);
      } else {
        setErrorMessage("Ocurrió un error al guardar el entrenador");
      }
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {id ? "Editar Entrenador" : "Crear Entrenador"}
      </Typography>

      {errorMessage && (
        <Typography color="error" variant="body1">
          {errorMessage}
        </Typography>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Nombre"
          name="name_trainer"
          value={trainerData.name_trainer}
          onChange={handleChange}
          required
        />

        <TextField
          label="Apellido"
          name="lastname"
          value={trainerData.lastname}
          onChange={handleChange}
          required
        />

        <TextField
          label="Nivel"
          name="level"
          type="number"
          value={trainerData.level}
          onChange={handleChange}
          required
        />

        <TextField
          label="Fecha de nacimiento"
          name="birthdate"
          type="date"
          value={trainerData.birthdate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />

        <input
          type="file"
          name="picture"
          accept="image/*"
          onChange={handleChange}
        />

        <Button type="submit" variant="contained">
          {id ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </>
  );
}
