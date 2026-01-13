import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Container, } from '@mui/material'
import Pokemonlist from './pages/Pokemonlist'
import Header from './componets/Header'
import PokemonForm from './pages/PokemonForm'
import Login from './pages/Login'
import PokemonDetails from "./pages/PokemonDetails";



function App() {
  return (
    <>
      
      <Container>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path ='/' element = {<Pokemonlist/>}/>
            <Route path='/add-pokemon' element = {<PokemonForm/>} />
            <Route path='/login' element = {<Login/>}/>
            <Route path='/add-pokemon' element={<PokemonForm />} />
            <Route path='/edit-pokemon/:id' element={<PokemonForm />} />
            <Route path='/pokemon/:id' element={<PokemonDetails />} />
          </Routes>
        </BrowserRouter>       
      </Container> 
    </>
  )
}

export default App
