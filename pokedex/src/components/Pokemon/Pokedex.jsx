import React from "react";
import Pagination from "../Pagination";
import Pokemon from "./Pokemon";

const Pokedex = ({ pokemons, loading, page, setPage, totalPages }) => {
  const onLeftClickHandler = () => {
    if (page > 0) setPage(page - 1);
  };

  const onRightClickHandler = () => {
    if (page + 1 !== totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <div className="pokedex-header">
        <h1>Pokedex</h1>
        <Pagination
          page={page + 1}
          totalPages={totalPages}
          onLeftClick={onLeftClickHandler}
          onRightClick={onRightClickHandler}
        />
      </div>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="pokedex-grid">
          {pokemons.map((pokemon, index) => (
            <Pokemon key={index} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
