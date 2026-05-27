import React, { useState } from "react";
import { X, Clock, Users, Scale, ShoppingCart, Plus, Minus, ChefHat, Check } from "lucide-react";

export default function RecipeModal({
  recipe,
  onClose,
  onStartCooking,
  shoppingList,
  onAddToShoppingList,
  onRemoveFromShoppingList
}) {
  const [scaleServings, setScaleServings] = useState(recipe.servings);
  const ratio = scaleServings / recipe.servings;
  
  // Destructure matching details
  const { ingredientsWithStatus, wasteWeightGrams, dietaryTags, prepTime, cookTime } = recipe;

  // Check if an item is already on the shopping list
  const isItemOnList = (name) => {
    return shoppingList.some(item => item.name.toLowerCase() === name.toLowerCase());
  };

  const handleToggleShoppingList = (ing) => {
    if (isItemOnList(ing.name)) {
      onRemoveFromShoppingList(ing.name);
    } else {
      const scaledQty = ing.quantity ? Number((ing.quantity * ratio).toFixed(2)) : null;
      onAddToShoppingList({
        name: ing.name,
        quantity: scaledQty,
        unit: ing.unit,
        category: ing.category || "Pantry"
      });
    }
  };

  const handleAddAllMissing = () => {
    const missingIngredients = ingredientsWithStatus.filter(ing => ing.status === "missing" && !ing.isStaple);
    missingIngredients.forEach(ing => {
      if (!isItemOnList(ing.name)) {
        const scaledQty = ing.quantity ? Number((ing.quantity * ratio).toFixed(2)) : null;
        onAddToShoppingList({
          name: ing.name,
          quantity: scaledQty,
          unit: ing.unit,
          category: ing.category || "Pantry"
        });
      }
    });
  };

  const missingCount = ingredientsWithStatus.filter(ing => ing.status === "missing" && !ing.isStaple).length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glassmorphic animated-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Header Visual */}
        <div className="modal-visual-header">
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
          <div className="modal-header-info">
            {dietaryTags && dietaryTags.length > 0 && (
              <div className="modal-tags">
                {dietaryTags.map(tag => (
                  <span key={tag} className="dietary-badge-pill">{tag}</span>
                ))}
              </div>
            )}
            <h1 className="modal-title">{recipe.title}</h1>
          </div>
        </div>

        {/* Recipe Quick Stats */}
        <div className="modal-quick-stats">
          <div className="stat-card">
            <Clock className="stat-icon" />
            <div className="stat-text">
              <span className="stat-val">{prepTime}m / {cookTime}m</span>
              <span className="stat-lbl">Prep / Cook Time</span>
            </div>
          </div>

          <div className="stat-card">
            <Users className="stat-icon" />
            <div className="stat-text">
              <div className="servings-scaler">
                <button 
                  disabled={scaleServings <= 1} 
                  onClick={() => setScaleServings(s => s - 1)}
                  className="scaler-btn"
                >
                  <Minus size={14} />
                </button>
                <span className="stat-val">{scaleServings}</span>
                <button 
                  onClick={() => setScaleServings(s => s + 1)}
                  className="scaler-btn"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="stat-lbl">Servings</span>
            </div>
          </div>

          <div className="stat-card">
            <Scale className="stat-icon text-accent" />
            <div className="stat-text">
              <span className="stat-val text-accent">{Math.round(wasteWeightGrams * ratio)}g</span>
              <span className="stat-lbl">Waste Prevented</span>
            </div>
          </div>
        </div>

        {/* Modal Columns */}
        <div className="modal-body-layout">
          {/* Ingredients Column */}
          <div className="ingredients-section">
            <div className="section-header-row">
              <h3>Ingredients Checklist</h3>
              {missingCount > 0 && (
                <button className="text-btn add-all-missing" onClick={handleAddAllMissing}>
                  <ShoppingCart size={14} className="inline-icon" />
                  Add All Missing to List
                </button>
              )}
            </div>

            <ul className="ingredients-checklist-list">
              {ingredientsWithStatus.map((ing, idx) => {
                const scaledQty = ing.quantity ? (ing.quantity * ratio).toFixed(2).replace(/\.00$/, "") : "";
                const isStaple = ing.isStaple;
                const isMatched = ing.status === "matched";
                const isSub = ing.isSubstitution;
                const onShoppingList = isItemOnList(ing.name);

                return (
                  <li 
                    key={idx} 
                    className={`ingredient-item-row ${isMatched ? "matched" : "missing"} ${isStaple ? "staple" : ""}`}
                  >
                    <div className="ing-info">
                      <div className={`status-dot ${isMatched ? "matched" : "missing"}`}>
                        {isMatched ? <Check size={12} /> : null}
                      </div>
                      
                      <div className="ing-text-block">
                        <span className="ing-qty-unit font-mono">
                          {scaledQty} {ing.unit}
                        </span>{" "}
                        <span className="ing-name font-semibold">{ing.name}</span>
                        {isStaple && <span className="staple-label">(pantry staple)</span>}
                        {isSub && (
                          <span className="substitute-label">
                            (using your leftover: <strong className="text-primary">{ing.matchedUserItem}</strong>)
                          </span>
                        )}
                        {!isMatched && ing.substitutes && ing.substitutes.length > 0 && (
                          <span className="substitute-tip">
                            Tip: You can use: {ing.substitutes.join(", ")}
                          </span>
                        )}
                      </div>
                    </div>

                    {!isMatched && !isStaple && (
                      <button 
                        className={`shopping-list-toggle-btn ${onShoppingList ? "on-list" : ""}`}
                        onClick={() => handleToggleShoppingList(ing)}
                        title={onShoppingList ? "Remove from Shopping List" : "Add to Shopping List"}
                      >
                        <ShoppingCart size={14} />
                        <span>{onShoppingList ? "Added" : "Add"}</span>
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Description & Cook Instructions Summary */}
          <div className="cooking-preview-section">
            <h3>Recipe Walkthrough</h3>
            <p className="description-text">{recipe.description}</p>
            
            <div className="preview-steps-list">
              {recipe.instructions.map((step) => (
                <div key={step.step} className="step-preview-row">
                  <div className="step-preview-num">{step.step}</div>
                  <p className="step-preview-text">{step.text}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="modal-action-buttons">
              <button 
                className="btn btn-primary start-cooking-btn"
                onClick={() => onStartCooking(recipe, scaleServings)}
              >
                <ChefHat className="btn-icon" />
                Start Cooking Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
