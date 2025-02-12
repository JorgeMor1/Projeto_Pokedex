import React, { useEffect, useState } from "react";
import { getPokemon, getPokemonData, searchPokemon } from "./Service/api";
import "./Styles/App.css";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar";
import Pokedex from "./components/Pokemon/Pokedex";
import { FavoriteProvider } from "./contexts/FavoritesContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonDetail from "./components/Pokemon/PokemonDetail";

const favoritesKey = "favorites";

function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const itensPerPage = 30;

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const data = await getPokemon(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setTotalPages(Math.ceil(data.count / itensPerPage));
    } catch (error) {
      console.log("fetchPokemons error:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavoritePokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(favoritesKey)) || [];
    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites];
    const favoriteIndex = favorites.indexOf(name);
    if (favoriteIndex >= 0) {
      updatedFavorites.splice(favoriteIndex, 1);
    } else {
      updatedFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
    } else {
      setPokemons([result]);
      setPage(0);
      setTotalPages(1);
    }
    setLoading(false);
  };

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <Router>
        <div>
          <Navbar />
          <Searchbar onSearch={onSearchHandler} />
          {notFound ? (
            <div className="not-found-text">Não existe esse Pokemon!!!</div>
          ) : (
            <Routes>
              {}
              <Route
                path="/"
                element={
                  <Pokedex
                    pokemons={pokemons}
                    loading={loading}
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                  />
                }
              />
              {}
              <Route path="/pokemon/:id" element={<PokemonDetail />} />
            </Routes>
          )}
        </div>
      </Router>
    </FavoriteProvider>
  );
}

export default App;
