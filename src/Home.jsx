import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllPokemon() {
      let allPokemon = [];
      let url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
      while (url) {
        const response = await fetch(url);
        const data = await response.json();
        allPokemon = allPokemon.concat(data.results);
        url = data.next;
      }
      setPokemonList(allPokemon);
      setLoading(false);
    }
    fetchAllPokemon();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  async function checkPokemon() {
    if (search.trim() === '') {
      setResult('');
      setFilteredPokemon([]);
      setPokemonDetails([]);
      return;
    }
    const found = pokemonList.filter(
      (pokemon) => pokemon.name.toLowerCase() === search.trim().toLowerCase()
    );
    setFilteredPokemon(found);
    if (found.length > 0) {
      setResult('Pokemon is here');
      const detailsPromises = found.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        return {
          name: data.name,
          image: data.sprites.front_default,
          height: data.height,
          weight: data.weight,
          types: data.types.map(t => t.type.name).join(', '),
          abilities: data.abilities.map(a => a.ability.name).join(', '),
          base_experience: data.base_experience,
          habitat: speciesData.habitat ? speciesData.habitat.name : 'Unknown',
          shape: speciesData.shape ? speciesData.shape.name : 'Unknown',
          color: speciesData.color ? speciesData.color.name : 'Unknown',
          is_legendary: speciesData.is_legendary ? 'Legendary' : 'Normal',
        };
      });
      const details = await Promise.all(detailsPromises);
      setPokemonDetails(details);
    } else {
      setResult('Pokemon is not here');
      setPokemonDetails([]);
    }
  }

  function handleCardClick(pokemon) {
    navigate(`/pokemonDetails/${pokemon.name}`, { state: { pokemon } });
  }

  return (
    <div className="app-3d-bg main-container">
      <h1 className="text-2xl font-bold mb-4 heading">Pokémon Search</h1>
      <div className="mb-4 search-bar">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Type Pokémon name"
          className='input-3d search-input'
        />
        <button onClick={checkPokemon} className="btn-3d search-btn">Check</button>
      </div>
      {result && <p className="mb-4 font-semibold result-text">{result}</p>}
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <ul className="pl-0 pokemon-list">
          {pokemonDetails.map((pokemon) => (
            <li
              key={pokemon.name}
              className="card-3d pokemon-card"
              onClick={() => handleCardClick(pokemon)}
              style={{ cursor: 'pointer' }}
            >
              <img src={pokemon.image} alt={pokemon.name} className="card-img-3d pokemon-img" />
              <div className="card-info-3d pokemon-info">
                <p className="card-title pokemon-title">{pokemon.name}</p>
                <p className="pokemon-type">Type: {pokemon.types}</p>
                <p className="pokemon-height">Height: {pokemon.height}</p>
                <p className="pokemon-weight">Weight: {pokemon.weight}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App