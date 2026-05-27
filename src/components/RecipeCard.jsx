import React from "react";
import { Clock, Leaf, AlertTriangle, CheckCircle, Scale } from "lucide-react";

// Helper to return a colored background or emoji based on recipe id
function getRecipeVisuals(id) {
  const visuals = {
    "chicken-fried-rice": { emoji: "🍛", gradient: "var(--grad-warm)" },
    "vegetable-stir-fry": { emoji: "🥢", gradient: "var(--grad-accent)" },
    "pasta-marinara": { emoji: "🍝", gradient: "var(--grad-strawberry)" },
    "creamy-mushroom-pasta": { emoji: "🍄", gradient: "linear-gradient(135deg, #a88beb, #aac1f0)" },
    "chicken-quesadilla": { emoji: "🌮", gradient: "linear-gradient(135deg, #fbc2eb, #a6c1ee)" },
    "crispy-tofu-curry": { emoji: "🍲", gradient: "linear-gradient(135deg, #fdcbf1, #e6dee9)" },
    "egg-frittata": { emoji: "🍳", gradient: "linear-gradient(135deg, #ff9a9e, #fecfef)" },
    "vegetable-soup": { emoji: "🥣", gradient: "linear-gradient(135deg, #84fab0, #8fd3f4)" },
    "loaded-potatoes": { emoji: "🥔", gradient: "linear-gradient(135deg, #fccb90, #d5d114)" },
    "tuna-salad-sandwich": { emoji: "🥪", gradient: "linear-gradient(135deg, #a1c4fd, #c2e9fb)" },
    "banana-oat-pancakes": { emoji: "🥞", gradient: "linear-gradient(135deg, #cfd9df, #e2ebf0)" },
    "beef-broccoli": { emoji: "🥦", gradient: "linear-gradient(135deg, #f5f7fa, #c3cfe2)" },
    "chickpea-salad": { emoji: "🥗", gradient: "linear-gradient(135deg, #d4fc79, #96e6a1)" },
    "bruschetta": { emoji: "🍅", gradient: "linear-gradient(135deg, #ffecd2, #fcb69f)" },
    "garlic-butter-salmon": { emoji: "🐟", gradient: "linear-gradient(135deg, #fdfbf7, #e1eec3)" }
  };
  
  return visuals[id] || { emoji: "🍽️", gradient: "var(--grad-primary)" };
}

export default function RecipeCard({ recipe, onClick }) {
  const { emoji, gradient } = getRecipeVisuals(recipe.id);
  
  // Destructure matching stats added by the matching engine
  const { matchPercentage, missingCount, ingredientsWithStatus, wasteWeightGrams, dietaryTags, prepTime, cookTime } = recipe;
  
  // Highlight match percentage color
  let matchColorClass = "match-high";
  if (matchPercentage < 50) {
    matchColorClass = "match-low";
  } else if (matchPercentage < 80) {
    matchColorClass = "match-med";
  }

  // Get list of matched ingredients and missing ingredients
  const matchedList = ingredientsWithStatus
    .filter(i => i.status === "matched" && !i.isStapleMatch)
    .map(i => i.isSubstitution ? `${i.substitutedWith} (for ${i.name})` : i.name);
    
  const missingList = ingredientsWithStatus
    .filter(i => i.status === "missing" && !i.isStaple)
    .map(i => i.name);

  return (
    <div className="recipe-card glassmorphic animated-scale" onClick={onClick}>
      {/* Visual Header */}
      <div className="recipe-card-banner" style={{ background: gradient }}>
        <span className="recipe-emoji">{emoji}</span>
        <div className={`match-badge ${matchColorClass}`}>
          {matchPercentage}% Match
        </div>
      </div>
      
      {/* Content */}
      <div className="recipe-card-body">
        <div className="recipe-meta">
          <span className="meta-item">
            <Clock size={12} />
            {prepTime + cookTime} mins
          </span>
          <span className="meta-item waste-saved text-accent font-semibold">
            <Scale size={12} />
            Saves {wasteWeightGrams}g
          </span>
        </div>
        
        <h3 className="recipe-title">{recipe.title}</h3>
        <p className="recipe-desc">{recipe.description}</p>
        
        {/* Match Details */}
        <div className="match-status-details">
          {matchedList.length > 0 && (
            <div className="matched-ingredients-summary">
              <CheckCircle size={14} className="text-success inline-icon" />
              <span className="summary-text text-success font-medium">
                Uses: {matchedList.slice(0, 3).join(", ")}
                {matchedList.length > 3 ? ` +${matchedList.length - 3} more` : ""}
              </span>
            </div>
          )}
          
          {missingList.length > 0 ? (
            <div className="missing-ingredients-summary">
              <AlertTriangle size={14} className="text-warning inline-icon" />
              <span className="summary-text text-warning font-medium">
                Missing: {missingList.slice(0, 2).join(", ")}
                {missingList.length > 2 ? ` +${missingList.length - 2} more` : ""}
              </span>
            </div>
          ) : (
            <div className="missing-ingredients-summary perfect-match">
              <CheckCircle size={14} className="text-primary inline-icon" />
              <span className="summary-text text-primary font-semibold">
                Perfect Match! You have all ingredients.
              </span>
            </div>
          )}
        </div>

        {/* Dietary Badges */}
        {dietaryTags && dietaryTags.length > 0 && (
          <div className="dietary-badges-row">
            {dietaryTags.map(tag => (
              <span key={tag} className="dietary-badge-pill">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
