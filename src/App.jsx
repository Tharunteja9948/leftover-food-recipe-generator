import React, { useState, useEffect } from "react";
import { ChefHat, ShoppingCart, Award, PlusCircle, Search } from "lucide-react";

// Seeds & Utilities
import { SEED_RECIPES } from "./data/recipes";
import { getRecipeMatches } from "./utils/matchingEngine";

// Components
import VirtualFridge from "./components/VirtualFridge";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import CookingMode from "./components/CookingMode";
import ImpactDashboard from "./components/ImpactDashboard";
import RecipeCreator from "./components/RecipeCreator";
import ShoppingList from "./components/ShoppingList";

export default function App() {
  // 1. Core State Hooks with Local Storage Hydration
  const [ingredients, setIngredients] = useState(() => {
    const saved = localStorage.getItem("fridge_ingredients");
    return saved ? JSON.parse(saved) : ["chicken", "broccoli", "rice"]; // Seed defaults
  });

  const [assumeStaples, setAssumeStaples] = useState(() => {
    const saved = localStorage.getItem("fridge_assume_staples");
    return saved ? JSON.parse(saved) : true;
  });

  const [dietaryFilters, setDietaryFilters] = useState([]);
  const [maxTimeFilter, setMaxTimeFilter] = useState(999);

  const [customRecipes, setCustomRecipes] = useState(() => {
    const saved = localStorage.getItem("fridge_custom_recipes");
    return saved ? JSON.parse(saved) : [];
  });

  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem("fridge_shopping_list");
    return saved ? JSON.parse(saved) : [];
  });

  const [cookedHistory, setCookedHistory] = useState(() => {
    const saved = localStorage.getItem("fridge_cooked_history");
    return saved ? JSON.parse(saved) : [];
  });

  // Navigation & Modal Views
  const [activeTab, setActiveTab] = useState("finder"); // finder, shopping, impact, creator
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [cookingRecipe, setCookingRecipe] = useState(null);
  const [cookingServings, setCookingServings] = useState(2);

  // 2. Persist state changes in Local Storage
  useEffect(() => {
    localStorage.setItem("fridge_ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem("fridge_assume_staples", JSON.stringify(assumeStaples));
  }, [assumeStaples]);

  useEffect(() => {
    localStorage.setItem("fridge_custom_recipes", JSON.stringify(customRecipes));
  }, [customRecipes]);

  useEffect(() => {
    localStorage.setItem("fridge_shopping_list", JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem("fridge_cooked_history", JSON.stringify(cookedHistory));
  }, [cookedHistory]);

  // 3. Combine Seed Database with User Custom Recipes
  const allRecipes = [...SEED_RECIPES, ...customRecipes];

  // 4. Engine Processing: Matching Leftovers
  const matchedRecipes = getRecipeMatches(ingredients, allRecipes, assumeStaples);

  // 5. Filter matched recipes according to preference inputs
  const filteredRecipes = matchedRecipes.filter((r) => {
    // Dietary check
    if (dietaryFilters.length > 0) {
      const hasAllTags = dietaryFilters.every(
        (tag) => r.dietaryTags && r.dietaryTags.includes(tag)
      );
      if (!hasAllTags) return false;
    }
    // Cooking Time check
    if (r.prepTime + r.cookTime > maxTimeFilter) return false;
    return true;
  });

  // 6. Action handlers
  const handleAddIngredient = (name) => {
    const clean = name.trim().toLowerCase();
    if (clean && !ingredients.includes(clean)) {
      setIngredients([...ingredients, clean]);
    }
  };

  const handleRemoveIngredient = (name) => {
    setIngredients(ingredients.filter((item) => item !== name));
  };

  const handleClearIngredients = () => {
    setIngredients([]);
  };

  const handleToggleDietaryFilter = (tag) => {
    if (dietaryFilters.includes(tag)) {
      setDietaryFilters(dietaryFilters.filter((t) => t !== tag));
    } else {
      setDietaryFilters([...dietaryFilters, tag]);
    }
  };

  // Custom Recipe Submission
  const handleAddCustomRecipe = (newRecipe) => {
    setCustomRecipes([newRecipe, ...customRecipes]);
  };

  // Shopping List Operations
  const handleAddToShoppingList = (item) => {
    const nameLower = item.name.toLowerCase().trim();
    if (!shoppingList.some((existing) => existing.name.toLowerCase() === nameLower)) {
      setShoppingList([...shoppingList, { ...item, checked: false }]);
    }
  };

  const handleRemoveFromShoppingList = (name) => {
    setShoppingList(
      shoppingList.filter((item) => item.name.toLowerCase() !== name.toLowerCase())
    );
  };

  const handleToggleShoppingItem = (name) => {
    setShoppingList(
      shoppingList.map((item) =>
        item.name.toLowerCase() === name.toLowerCase()
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  };

  const handleClearCheckedShopping = () => {
    setShoppingList(shoppingList.filter((item) => !item.checked));
  };

  const handleClearAllShopping = () => {
    setShoppingList([]);
  };

  // Step-by-Step Cooking completes
  const handleFinishCooking = (recipe, wasteSavedGrams) => {
    const cookedRecord = {
      id: recipe.id,
      title: recipe.title,
      servings: cookingServings,
      wasteSaved: wasteSavedGrams,
      timestamp: new Date().toISOString(),
    };

    setCookedHistory([cookedRecord, ...cookedHistory]);

    // Cleanup active modal states
    setCookingRecipe(null);
    setSelectedRecipe(null);
    setActiveTab("impact"); // view dashboard impact results!
  };

  return (
    <div className="app-container">
      {/* 1. Header Navigation Bar */}
      <header className="navbar glassmorphic no-print">
        <div className="logo-area">
          <ChefHat className="logo-icon animate-pulse" />
          <span className="logo-text">LeftoverChef</span>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-btn ${activeTab === "finder" ? "active" : ""}`}
            onClick={() => setActiveTab("finder")}
          >
            <Search size={16} />
            <span>Recipe Finder</span>
          </button>

          <button
            className={`nav-btn ${activeTab === "shopping" ? "active" : ""}`}
            onClick={() => setActiveTab("shopping")}
          >
            <ShoppingCart size={16} />
            <span>Shopping List</span>
            {shoppingList.length > 0 && (
              <span className="font-mono" style={{
                fontSize: "0.75rem",
                background: "var(--accent)",
                padding: "2px 6px",
                borderRadius: "50%",
                color: "#fff",
                fontWeight: 700
              }}>
                {shoppingList.length}
              </span>
            )}
          </button>

          <button
            className={`nav-btn ${activeTab === "impact" ? "active" : ""}`}
            onClick={() => setActiveTab("impact")}
          >
            <Award size={16} />
            <span>Eco-Impact</span>
          </button>

          <button
            className={`nav-btn ${activeTab === "creator" ? "active" : ""}`}
            onClick={() => setActiveTab("creator")}
          >
            <PlusCircle size={16} />
            <span>Add Recipe</span>
          </button>
        </nav>
      </header>

      {/* 2. Main Tab Router Views */}
      <main className="tab-contents">
        {activeTab === "finder" && (
          <div className="dashboard-grid animated-fade-in">
            {/* Left Fridge Panel */}
            <VirtualFridge
              ingredients={ingredients}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
              onClearIngredients={handleClearIngredients}
              assumeStaples={assumeStaples}
              onToggleStaples={() => setAssumeStaples(!assumeStaples)}
              dietaryFilters={dietaryFilters}
              onToggleDietaryFilter={handleToggleDietaryFilter}
              maxTimeFilter={maxTimeFilter}
              onSetMaxTimeFilter={setMaxTimeFilter}
            />

            {/* Right Recipe Grid Panel */}
            <section className="results-section">
              <div className="results-header-bar">
                <h2>Matched Recommendations</h2>
                <span className="text-muted font-mono" style={{ fontSize: "0.85rem" }}>
                  Showing {filteredRecipes.length} recipes
                </span>
              </div>

              {filteredRecipes.length === 0 ? (
                <div className="empty-results">
                  <div style={{ fontSize: "2.5rem" }}>🥗🥫🍂</div>
                  <h3>No matching recipes found</h3>
                  <p>
                    Try adding more leftover items in your Fridge pane or adjust your preferences to show recipes with lower matches.
                  </p>
                </div>
              ) : (
                <div className="recipes-grid">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onClick={() => setSelectedRecipe(recipe)}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === "shopping" && (
          <div className="animated-fade-in">
            <ShoppingList
              shoppingList={shoppingList}
              onAddToList={handleAddToShoppingList}
              onRemoveFromList={handleRemoveFromShoppingList}
              onToggleItemCheck={handleToggleShoppingItem}
              onClearChecked={handleClearCheckedShopping}
              onClearAll={handleClearAllShopping}
            />
          </div>
        )}

        {activeTab === "impact" && (
          <div className="animated-fade-in">
            <ImpactDashboard
              cookedHistory={cookedHistory}
              onResetHistory={() => setCookedHistory([])}
            />
          </div>
        )}

        {activeTab === "creator" && (
          <div className="animated-fade-in">
            <RecipeCreator onAddCustomRecipe={handleAddCustomRecipe} />
          </div>
        )}
      </main>

      {/* 3. Detail View Overlay Modal */}
      {selectedRecipe && !cookingRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onStartCooking={(recipe, servings) => {
            setCookingRecipe(recipe);
            setCookingServings(servings);
          }}
          shoppingList={shoppingList}
          onAddToShoppingList={handleAddToShoppingList}
          onRemoveFromShoppingList={handleRemoveFromShoppingList}
        />
      )}

      {/* 4. Active Cooking Mode overlay */}
      {cookingRecipe && (
        <CookingMode
          recipe={cookingRecipe}
          servings={cookingServings}
          onFinishCooking={handleFinishCooking}
          onExit={() => setCookingRecipe(null)}
        />
      )}
    </div>
  );
}
