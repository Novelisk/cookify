import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="searchbar__input"
        placeholder="Buscar receta..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <button type="submit" className="searchbar__button">
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
