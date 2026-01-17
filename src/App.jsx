import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Container, } from '@mui/material'
import Pokemonlist from './pages/Pokemonlist'
import Header from './componets/Header'
import PokemonForm from './pages/PokemonForm'
import Login from './pages/Login'
import PokemonDetails from "./pages/PokemonDetails";
import TrainerList from "./pages/TrainerList";
import TrainerForm from "./pages/TrainerForm";
import TrainerDetail from "./pages/TrainerDetail";


function App() {
  return (
    <>

      <Container>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Pokemonlist />} />
            <Route path='/add-pokemon' element={<PokemonForm />} />
            <Route path='/login' element={<Login />} />
            <Route path='/add-pokemon' element={<PokemonForm />} />
            <Route path='/edit-pokemon/:id' element={<PokemonForm />} />
            <Route path='/pokemon/:id' element={<PokemonDetails />} />
            <Route path="/trainers" element={<TrainerList />} />
            <Route path="/trainers/:id" element={<TrainerDetail />} />
            <Route path="/add-trainer" element={<TrainerForm />} />
            <Route path="/edit-trainer/:id" element={<TrainerForm />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  )
}

export default App
