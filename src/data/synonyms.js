export const SYNONYM_MAP = {
  // Grains
  "spaghetti": "pasta",
  "penne": "pasta",
  "linguine": "pasta",
  "fettuccine": "pasta",
  "macaroni": "pasta",
  "noodles": "pasta",
  "brown rice": "rice",
  "white rice": "rice",
  "jasmine rice": "rice",
  "quinoa": "rice",
  "baguette": "bread",
  "toast": "bread",
  "bun": "bread",
  
  // Proteins
  "eggs": "eggs",
  "egg": "eggs",
  "chicken breast": "chicken",
  "chicken thigh": "chicken",
  "leftover chicken": "chicken",
  "beef steak": "beef",
  "ground beef": "beef",
  "steak": "beef",
  "pork chop": "pork",
  "bacon strips": "bacon",
  "ham slice": "bacon",
  "chickpeas": "canned chickpeas",
  "garbanzo beans": "canned chickpeas",
  
  // Produce
  "scallion": "green onions",
  "scallions": "green onions",
  "green onion": "green onions",
  "chives": "green onions",
  "onion": "onion",
  "onions": "onion",
  "shallot": "onion",
  "shallots": "onion",
  "garlic clove": "garlic",
  "garlic cloves": "garlic",
  "ginger root": "ginger",
  "bell pepper": "bell peppers",
  "capsicum": "bell peppers",
  "peppers": "bell peppers",
  "carrots": "carrots",
  "carrot": "carrots",
  "potato": "potatoes",
  "sweet potato": "potatoes",
  "sweet potatoes": "potatoes",
  "tomato": "tomatoes",
  "cherry tomatoes": "tomatoes",
  "spinach leaves": "spinach",
  "baby spinach": "spinach",
  "mushrooms": "mushrooms",
  "mushroom": "mushrooms",
  "button mushrooms": "mushrooms",
  
  // Dairy / Pantry
  "heavy cream": "cream",
  "coconut cream": "cream",
  "milk": "milk",
  "parmesan cheese": "parmesan",
  "cheddar cheese": "cheese",
  "mozzarella": "cheese",
  "mozzarella cheese": "cheese",
  "feta cheese": "feta",
  "butter": "butter",
  "margarine": "butter"
};

// Function to normalize an ingredient name to its base form
export function normalizeIngredient(name) {
  const clean = name.toLowerCase().trim().replace(/s$/, ""); // very basic singularization
  
  // Check direct match
  if (SYNONYM_MAP[clean]) {
    return SYNONYM_MAP[clean];
  }
  
  // Check if name contains any synonym keys
  for (const key of Object.keys(SYNONYM_MAP)) {
    if (clean.includes(key) || key.includes(clean)) {
      return SYNONYM_MAP[key];
    }
  }
  
  return clean;
}
