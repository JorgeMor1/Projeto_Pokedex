import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { searchPokemon } from "../../Service/api";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await searchPokemon(id);
      setPokemon(data);
    };
    fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return <div>Carregando informações do Pokemon...</div>;
  }

  return (
    <div className="pokemon-detail">
      {}
      <header className="header">
        <div className="div-link">
          <Link to="/" className="home-link">
            🔙 Voltar à Página Principal
          </Link>
        </div>
      </header>

      <h1 className="pokemon-name-detail">{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-image-detail"
      />
      <div className="descriptions">
        <div className="div-types">
          <h3 className="title-types">Tipos:</h3>
          {pokemon.types.map((type, index) => (
            <div key={index}>{type.type.name}</div>
          ))}
        </div>
        <div className="div-caractere">
          <h3 className="title-habilites">Habilidades:</h3>
          {pokemon.abilities.map((ability, index) => (
            <div key={index}>{ability.ability.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
