import React from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img 
        src={pokemon.sprites.front_default} 
        alt={pokemon.name} 
        className="pokemon-image"
      />
      <h3 className="pokemon-name">{pokemon.name}</h3>
      <p className="pokemon-id">#{pokemon.id}</p>
      <div className="pokemon-types">
        {pokemon.types.map((type, index) => (
          <span 
            key={index} 
            className={`type-badge type-${type.type.name}`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;