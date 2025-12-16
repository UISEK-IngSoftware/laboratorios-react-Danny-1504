import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Container, } from '@mui/material'
import Pokemonlist from './componets/Pokemonlist'
import Header from './componets/Header'
import PokemonForm from './componets/PokemonForm'


function App() {
  return (
    <>
      <Header />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path ='/' element = {<Pokemonlist/>}/>
            <Route path='/add-pokemon' element = {<PokemonForm/>} />
          </Routes>
        </BrowserRouter>       
      </Container> 
    </>
  )
}

export default App
