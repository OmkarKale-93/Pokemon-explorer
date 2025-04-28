/**
 * Fetches Pokémon data from the PokeAPI
 * @param {number} limit - Number of Pokémon to fetch
 * @returns {Promise<Array>} - Array of Pokémon data
 */
export const fetchPokemonData = async (limit = 150) => {
    try {
      // Fetch the list of Pokémon
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      const data = await response.json();
      
      // Fetch details for each Pokémon
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );
      
      return pokemonDetails;
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      throw error;
    }
  };
  
  /**
   * Extracts all unique Pokémon types from the Pokémon list
   * @param {Array} pokemonList - Array of Pokémon data
   * @returns {Array} - Sorted array of unique Pokémon types
   */
  export const extractAllTypes = (pokemonList) => {
    const allTypes = new Set();
    
    pokemonList.forEach(pokemon => {
      pokemon.types.forEach(type => {
        allTypes.add(type.type.name);
      });
    });
    
    return Array.from(allTypes).sort();
  };
  
  /**
   * Filters Pokémon based on search term and selected type
   * @param {Array} pokemonList - Original list of Pokémon
   * @param {string} searchTerm - Search term for Pokémon name
   * @param {string} selectedType - Selected Pokémon type filter
   * @returns {Array} - Filtered list of Pokémon
   */
  export const filterPokemon = (pokemonList, searchTerm, selectedType) => {
    let filtered = [...pokemonList];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by type
    if (selectedType) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(type => type.type.name === selectedType)
      );
    }
    
    return filtered;
  };
  
  /**
   * Capitalizes the first letter of a string
   * @param {string} str - Input string
   * @returns {string} - Capitalized string
   */
  export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  /**
   * Gets the color associated with a Pokémon type
   * @param {string} type - Pokémon type
   * @returns {string} - CSS color value for the type
   */
  export const getTypeColor = (type) => {
    const typeColors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    
    return typeColors[type] || '#777';
  };