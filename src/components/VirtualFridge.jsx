import React, { useState, useRef, useEffect } from "react";
import { Plus, X, Search, Sparkles, Flame, Check, HelpCircle } from "lucide-react";
import { SYNONYM_MAP } from "../data/synonyms";

// Predefined common ingredients grouped by category for quick clicking
const FRIDGE_SHELVES = {
  Proteins: ["chicken", "beef", "tofu", "eggs", "bacon", "salmon", "canned tuna"],
  Produce: ["broccoli", "carrots", "spinach", "bell peppers", "onion", "tomatoes", "cucumber", "mushrooms", "banana", "garlic", "ginger"],
  Grains: ["rice", "pasta", "bread", "tortillas", "oats"],
  Dairy: ["cheese", "milk", "cream", "butter", "parmesan", "feta"],
  Pantry: ["canned chickpeas", "coconut milk", "curry paste", "soy sauce", "tomato paste", "canned tomatoes"]
};

// Flatten list of all unique ingredients for autocomplete
const ALL_AUTOCOMPLETE_ITEMS = Array.from(
  new Set([
    ...Object.values(FRIDGE_SHELVES).flat(),
    ...Object.keys(SYNONYM_MAP)
  ])
).sort();

export default function VirtualFridge({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  onClearIngredients,
  assumeStaples,
  onToggleStaples,
  dietaryFilters,
  onToggleDietaryFilter,
  maxTimeFilter,
  onSetMaxTimeFilter
}) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState("Produce");
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);

  // Handle autocomplete search
  useEffect(() => {
    if (inputValue.trim() === "") {
      setSuggestions([]);
      return;
    }

    const query = inputValue.toLowerCase().trim();
    const filtered = ALL_AUTOCOMPLETE_ITEMS.filter(
      item => 
        item.includes(query) && 
        !ingredients.map(i => i.toLowerCase()).includes(item)
    ).slice(0, 5); // Limit suggestions to 5

    setSuggestions(filtered);
  }, [inputValue, ingredients]);

  // Close suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAdd = (item) => {
    const cleanItem = item.trim().toLowerCase();
    if (cleanItem && !ingredients.map(i => i.toLowerCase()).includes(cleanItem)) {
      onAddIngredient(item);
    }
    setInputValue("");
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length > 0) {
        handleAdd(suggestions[0]);
      } else if (inputValue.trim()) {
        handleAdd(inputValue);
      }
    }
  };

  return (
    <div className="fridge-container glassmorphic card">
      <div className="fridge-header">
        <div className="title-area">
          <Sparkles className="icon text-primary animate-pulse" />
          <h2>My Virtual Fridge</h2>
        </div>
        <p className="subtitle">Add ingredients you have in your kitchen to generate recipes.</p>
      </div>

      {/* Autocomplete Input */}
      <div className="input-search-wrapper" ref={dropdownRef}>
        <div className={`search-bar ${isFocused ? "focused" : ""}`}>
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Type an ingredient (e.g. egg, broccoli, salmon...)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          {inputValue && (
            <button className="clear-input-btn" onClick={() => setInputValue("")}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Suggestion Dropdown */}
        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((suggestion) => (
              <li 
                key={suggestion} 
                onClick={() => handleAdd(suggestion)}
                className="suggestion-item"
              >
                <Plus size={14} className="text-muted" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Add Shelves */}
      <div className="shelves-section">
        <h4 className="section-title">Quick Add from Shelves</h4>
        <div className="shelf-tabs">
          {Object.keys(FRIDGE_SHELVES).map((category) => (
            <button
              key={category}
              className={`shelf-tab-btn ${activeTab === category ? "active" : ""}`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="shelf-items-grid">
          {FRIDGE_SHELVES[activeTab].map((item) => {
            const hasItem = ingredients.map(i => i.toLowerCase()).includes(item);
            return (
              <button
                key={item}
                className={`shelf-item-chip ${hasItem ? "owned" : ""}`}
                onClick={() => hasItem ? onRemoveIngredient(item) : handleAdd(item)}
              >
                {hasItem ? <Check size={12} className="chip-check" /> : <Plus size={12} />}
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Fridge Inventory */}
      <div className="fridge-contents">
        <div className="contents-header">
          <h4 className="section-title">Fridge Inventory ({ingredients.length} items)</h4>
          {ingredients.length > 0 && (
            <button className="text-btn clear-all" onClick={onClearIngredients}>
              Clear All
            </button>
          )}
        </div>
        
        {ingredients.length === 0 ? (
          <div className="empty-fridge-placeholder">
            <div className="fridge-art">🥫🥛🧀</div>
            <p>Your fridge is empty! Click items above or search to fill it.</p>
          </div>
        ) : (
          <div className="inventory-chips">
            {ingredients.map((ing) => (
              <span key={ing} className="inventory-chip animated-scale">
                {ing}
                <button className="remove-chip-btn" onClick={() => onRemoveIngredient(ing)}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Settings and Filters */}
      <div className="fridge-filters">
        <h4 className="section-title">Preferences & Filters</h4>
        
        {/* Assume Staples Switch */}
        <div className="filter-option toggle-option">
          <div className="option-label">
            <span className="bold-label">Pantry Staples</span>
            <span className="description">Assume I have oil, salt, garlic, soy sauce, etc.</span>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={assumeStaples} 
              onChange={onToggleStaples} 
            />
            <span className="slider round"></span>
          </label>
        </div>

        {/* Dietary Filters */}
        <div className="dietary-filter-group">
          <span className="group-title">Dietary Filters:</span>
          <div className="dietary-chips">
            {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"].map(tag => {
              const isActive = dietaryFilters.includes(tag);
              return (
                <button
                  key={tag}
                  className={`dietary-chip ${isActive ? "active" : ""}`}
                  onClick={() => onToggleDietaryFilter(tag)}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Limit Filter */}
        <div className="time-filter-wrapper">
          <div className="time-header">
            <span className="group-title">Max Cook Time:</span>
            <span className="time-value">
              {maxTimeFilter === 999 ? "Any Time" : `Under ${maxTimeFilter} mins`}
            </span>
          </div>
          <div className="time-slider-container">
            <input
              type="range"
              min="10"
              max="45"
              step="5"
              value={maxTimeFilter === 999 ? 45 : maxTimeFilter}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                onSetMaxTimeFilter(val === 45 ? 999 : val);
              }}
              className="time-slider"
            />
            <div className="slider-labels">
              <span>10m</span>
              <span>20m</span>
              <span>30m</span>
              <span>40m+ (Any)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
