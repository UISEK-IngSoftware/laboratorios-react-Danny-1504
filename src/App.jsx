import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Container, } from '@mui/material'
import Pokemonlist from './pages/Pokemonlist'
import Header from './componets/Header'
import PokemonForm from './pages/PokemonForm'
import Login from './pages/Login'



function App() {
  return (
    <>
      <Header />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path ='/' element = {<Pokemonlist/>}/>
            <Route path='/add-pokemon' element = {<PokemonForm/>} />
            <Route path='/login' element = {<Login/>}/>
          </Routes>
        </BrowserRouter>       
      </Container> 
    </>
  )
}

export default App
