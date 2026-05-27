import React, { useState } from "react";
import { Plus, Trash2, CheckCircle, ChefHat, Sparkles } from "lucide-react";

export default function RecipeCreator({ onAddCustomRecipe }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState(2);
  const [prepTime, setPrepTime] = useState(10);
  const [cookTime, setCookTime] = useState(15);
  const [wasteWeightGrams, setWasteWeightGrams] = useState(300);
  const [dietaryTags, setDietaryTags] = useState([]);
  
  // Dynamic ingredients list
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "pcs", isStaple: false, category: "Produce", substitutes: "" }
  ]);

  // Dynamic instructions list
  const [instructions, setInstructions] = useState([
    { step: 1, text: "", duration: "" }
  ]);

  const [message, setMessage] = useState(null);

  const handleDietaryToggle = (tag) => {
    if (dietaryTags.includes(tag)) {
      setDietaryTags(dietaryTags.filter(t => t !== tag));
    } else {
      setDietaryTags([...dietaryTags, tag]);
    }
  };

  const handleAddIngredientRow = () => {
    setIngredients([
      ...ingredients,
      { name: "", quantity: "", unit: "pcs", isStaple: false, category: "Produce", substitutes: "" }
    ]);
  };

  const handleRemoveIngredientRow = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, idx) => idx !== index));
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const handleAddInstructionRow = () => {
    setInstructions([
      ...instructions,
      { step: instructions.length + 1, text: "", duration: "" }
    ]);
  };

  const handleRemoveInstructionRow = (index) => {
    if (instructions.length > 1) {
      const filtered = instructions.filter((_, idx) => idx !== index);
      // Re-index steps
      const reindexed = filtered.map((step, idx) => ({
        ...step,
        step: idx + 1
      }));
      setInstructions(reindexed);
    }
  };

  const handleInstructionChange = (index, field, value) => {
    const updated = [...instructions];
    updated[index][field] = value;
    setInstructions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !description.trim()) {
      alert("Please fill out the title and description.");
      return;
    }

    const validIngredients = ingredients.filter(ing => ing.name.trim() !== "");
    if (validIngredients.length === 0) {
      alert("Please add at least one valid ingredient.");
      return;
    }

    const validInstructions = instructions.filter(inst => inst.text.trim() !== "");
    if (validInstructions.length === 0) {
      alert("Please add at least one valid instruction step.");
      return;
    }

    // Process ingredients list
    const processedIngredients = validIngredients.map(ing => ({
      name: ing.name.toLowerCase().trim(),
      quantity: ing.quantity ? parseFloat(ing.quantity) : null,
      unit: ing.unit,
      isStaple: ing.isStaple,
      category: ing.category,
      substitutes: ing.substitutes
        ? ing.substitutes.split(",").map(s => s.toLowerCase().trim()).filter(s => s !== "")
        : []
    }));

    // Process instruction list
    const processedInstructions = validInstructions.map((inst, idx) => ({
      step: idx + 1,
      text: inst.text.trim(),
      duration: inst.duration ? parseInt(inst.duration) : null
    }));

    // Construct recipe object
    const newRecipe = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      prepTime: parseInt(prepTime) || 10,
      cookTime: parseInt(cookTime) || 15,
      servings: parseInt(servings) || 2,
      wasteWeightGrams: parseInt(wasteWeightGrams) || 300,
      dietaryTags,
      ingredients: processedIngredients,
      instructions: processedInstructions,
      isCustom: true
    };

    onAddCustomRecipe(newRecipe);

    // Reset Form
    setTitle("");
    setDescription("");
    setServings(2);
    setPrepTime(10);
    setCookTime(15);
    setWasteWeightGrams(300);
    setDietaryTags([]);
    setIngredients([{ name: "", quantity: "", unit: "pcs", isStaple: false, category: "Produce", substitutes: "" }]);
    setInstructions([{ step: 1, text: "", duration: "" }]);

    setMessage("Recipe created successfully! It is now available in your Recipe Finder database.");
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <div className="creator-container glassmorphic card">
      <div className="creator-header">
        <div className="title-area">
          <Sparkles className="icon text-primary animate-pulse" />
          <h2>Custom Recipe Creator</h2>
        </div>
        <p className="subtitle">Add your family's favorite leftover configurations so they get indexed by the matching engine.</p>
      </div>

      {message && (
        <div className="status-success-banner animated-scale">
          <CheckCircle size={18} />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="creator-form">
        {/* Basic Details */}
        <div className="form-grid-2">
          <div className="form-group">
            <label>Recipe Title *</label>
            <input
              type="text"
              placeholder="e.g. Leftover Pork Fried Noodles"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <input
              type="text"
              placeholder="e.g. A fast way to clear pork chops, cabbage, and ramen noodles."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Quantities & Times */}
        <div className="form-grid-4">
          <div className="form-group">
            <label>Servings</label>
            <input
              type="number"
              min="1"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Prep Time (mins)</label>
            <input
              type="number"
              min="0"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Cook Time (mins)</label>
            <input
              type="number"
              min="0"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Est. Waste Diverted (g)</label>
            <input
              type="number"
              min="0"
              value={wasteWeightGrams}
              onChange={(e) => setWasteWeightGrams(e.target.value)}
              title="Weight in grams of leftover items this recipe diverts."
            />
          </div>
        </div>

        {/* Dietary Checkboxes */}
        <div className="form-group">
          <label>Dietary Tags</label>
          <div className="dietary-creator-chips">
            {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"].map(tag => {
              const isChecked = dietaryTags.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  className={`dietary-creator-chip ${isChecked ? "active" : ""}`}
                  onClick={() => handleDietaryToggle(tag)}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Ingredients Array */}
        <div className="form-section-builder">
          <div className="builder-header">
            <h3>Ingredients List</h3>
            <p className="subtitle-builder">List the key items required. Separate potential substitutes with commas.</p>
          </div>

          <div className="builder-rows-container">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="builder-row ingredient">
                <input
                  type="text"
                  placeholder="Ingredient name (e.g. spinach)"
                  value={ing.name}
                  onChange={(e) => handleIngredientChange(idx, "name", e.target.value)}
                  className="field-name"
                  required
                />
                
                <input
                  type="number"
                  step="0.05"
                  placeholder="Qty"
                  value={ing.quantity}
                  onChange={(e) => handleIngredientChange(idx, "quantity", e.target.value)}
                  className="field-qty font-mono"
                />
                
                <select
                  value={ing.unit}
                  onChange={(e) => handleIngredientChange(idx, "unit", e.target.value)}
                  className="field-unit"
                >
                  <option value="pcs">pcs</option>
                  <option value="cups">cups</option>
                  <option value="oz">oz</option>
                  <option value="tbsp">tbsp</option>
                  <option value="tsp">tsp</option>
                  <option value="block">block</option>
                  <option value="can">can</option>
                  <option value="stalks">stalks</option>
                  <option value="slices">slices</option>
                  <option value="fillet">fillet</option>
                </select>

                <select
                  value={ing.category}
                  onChange={(e) => handleIngredientChange(idx, "category", e.target.value)}
                  className="field-category"
                >
                  <option value="Produce">Produce</option>
                  <option value="Proteins">Proteins</option>
                  <option value="Grains">Grains</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Pantry">Pantry</option>
                  <option value="Canned Goods">Canned Goods</option>
                </select>

                <input
                  type="text"
                  placeholder="Substitutes (e.g. kale, chard)"
                  value={ing.substitutes}
                  onChange={(e) => handleIngredientChange(idx, "substitutes", e.target.value)}
                  className="field-subs"
                />

                <label className="checkbox-staple" title="Assume the user always has this ingredient (oil, salt, etc.)">
                  <input
                    type="checkbox"
                    checked={ing.isStaple}
                    onChange={(e) => handleIngredientChange(idx, "isStaple", e.target.checked)}
                  />
                  <span>Staple</span>
                </label>

                <button
                  type="button"
                  className="btn-row-delete"
                  disabled={ingredients.length <= 1}
                  onClick={() => handleRemoveIngredientRow(idx)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-add-row"
            onClick={handleAddIngredientRow}
          >
            <Plus size={16} />
            <span>Add Ingredient</span>
          </button>
        </div>

        {/* Instructions Array */}
        <div className="form-section-builder">
          <div className="builder-header">
            <h3>Cooking Directions</h3>
            <p className="subtitle-builder">List the steps in chronological order. Add durations (mins) to prompt active countdown timers.</p>
          </div>

          <div className="builder-rows-container">
            {instructions.map((inst, idx) => (
              <div key={idx} className="builder-row instruction">
                <span className="step-num font-mono">{inst.step}</span>
                
                <input
                  type="text"
                  placeholder="Step description (e.g. Sauté garlic and onions for 2 minutes)"
                  value={inst.text}
                  onChange={(e) => handleInstructionChange(idx, "text", e.target.value)}
                  className="field-instruction-text"
                  required
                />
                
                <input
                  type="number"
                  placeholder="Mins (timer)"
                  value={inst.duration}
                  onChange={(e) => handleInstructionChange(idx, "duration", e.target.value)}
                  className="field-duration font-mono"
                  title="Duration in minutes (optional). Creates a timer on this step."
                />

                <button
                  type="button"
                  className="btn-row-delete"
                  disabled={instructions.length <= 1}
                  onClick={() => handleRemoveInstructionRow(idx)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-add-row"
            onClick={handleAddInstructionRow}
          >
            <Plus size={16} />
            <span>Add Step</span>
          </button>
        </div>

        <button type="submit" className="btn btn-primary submit-creator-btn">
          <ChefHat size={18} className="btn-icon" />
          <span>Save Custom Recipe</span>
        </button>
      </form>
    </div>
  );
}
