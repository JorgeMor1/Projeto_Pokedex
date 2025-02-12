import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FavoriteContext from "../../contexts/FavoritesContext";

const Pokemon = (props) => {
  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);
  const { pokemon } = props;

  const onHeartClick = () => {
    updateFavoritePokemons(pokemon.name);
  };

  const heart = favoritePokemons.includes(pokemon.name) ? "❤️" : "🩶";

  return (
    <div className="pokemon-card">
      <div className="pokemon-image-container">
        <Link to={`/pokemon/${pokemon.id}`} className="link-details">
          {" "}
          Ver Características{" "}
        </Link>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-image"
        />
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{pokemon.name}</h3>
          <div>#{pokemon.id}</div>
        </div>
        <div className="card-bottom">
          <div className="pokemon-type">
            {pokemon.types.map((type, index) => (
              <div key={index} className="pokemon-type-text">
                {type.type.name}
              </div>
            ))}
          </div>
          <button className="pokemon-heart-btn" onClick={onHeartClick}>
            {heart}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
