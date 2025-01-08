
import { productsList } from '../store/productsList';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ setquery }) {
  const listContainRef = useRef(null);
  const inputRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [query1, setQuery1] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listContainRef.current && !listContainRef.current.contains(e.target)) {
        listContainRef.current.classList.remove('visible');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (query1.trim()) {
      navigate(`/search/${query1.trim()}`);
      setquery(query1.trim().toLowerCase());
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery1(value);
    setquery(value.toLowerCase());

    if (value.length > 0) {
      const filteredSuggestions = productsList.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);

      if (filteredSuggestions.length > 0) {
        listContainRef.current?.classList.add('visible');
      } else {
        listContainRef.current?.classList.remove('visible');
      }
    } else {
      setSuggestions([]);
      listContainRef.current?.classList.remove('visible');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery1(suggestion.title);
    setquery(suggestion.title.toLowerCase());
    navigate(`/${suggestion.id}`);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0) {
        handleSuggestionClick(suggestions[highlightedIndex]);
      } else {
        handleSearch();
      }
    }
  };

  return (
    <div className="search-container">
      <i onClick={handleSearch} className="fa-solid fa-magnifying-glass"></i>
      <input
        className="imnp"
        type="text"
        placeholder="Search products..."
        value={query1}
        onChange={handleChange}
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      <div
        className={`list-contain ${suggestions.length > 0 ? 'visible' : ''}`}
        ref={listContainRef}
      >
        <ul>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`list-item ${
                index === highlightedIndex ? 'highlighted' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}






