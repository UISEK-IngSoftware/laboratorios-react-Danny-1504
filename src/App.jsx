import './App.css'
import { Container, } from '@mui/material'
import Pokemonlist from './componets/Pokemonlist'
import Header from './componets/Header'

function App() {
  return (
    <>
      <Header />
      <Container>
        <Pokemonlist/>        
      </Container> 
    </>
  )
}

export default App
