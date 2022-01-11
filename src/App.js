import React, { useState } from 'react'
import './App.css';
import Axios from 'axios'

function App() {
  const [pokemonName, setPokemonName] = useState("")
  const [pokemonChosen, setPokemonChosen] = useState(false)
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    type: "",
  });
  
  const searchPokemon = () =>{
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=>{
      setPokemon({
         name: pokemonName,
         species: response.data.species.name,
         img: response.data.sprites.front_default,
         hp: response.data.stats[0].base_stat,
         attack: response.data.stats[1].base_stat,
         type: response.data.types[0].type.name,
      });
      setPokemonChosen(true)
    })
  }

  return (
    <div className="App">
      <div className="heading-section">
      <h1>About Pokemon</h1>
      <input type="text" onChange={(event)=>{setPokemonName(event.target.value);}}/>
      <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="display-section">
           {!pokemonChosen ? (<h1>Please choose a pokemon</h1>) : (
             <>
             <div className="card">
           <h1>{pokemon.name}</h1>
           <img src={pokemon.img}/>
           <h3>Species: {pokemon.species}</h3>
           <h4>Type : {pokemon.type}</h4>
           <h4>Hp : {pokemon.hp}</h4>
           <h4>Attack : {pokemon.attack}</h4>
             </div>
           </>
           )}
      </div>
    </div>
  )
}

export default App

