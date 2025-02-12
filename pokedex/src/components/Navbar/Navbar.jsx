import React, { useContext } from "react";
import FavoriteContext from "../../contexts/FavoritesContext";

const Navbar = () => {
  const { favoritePokemons } = useContext(FavoriteContext);
  const logoImg ="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";

  return (
    <nav>
      <div>
        <img alt="pokeapi-logo" src={logoImg} className="navbar-img" />
      </div>
      <div> Pokemons Favoritos: <strong>{favoritePokemons.length}</strong> ❤️</div>
    </nav>
  );
};

export default Navbar;
