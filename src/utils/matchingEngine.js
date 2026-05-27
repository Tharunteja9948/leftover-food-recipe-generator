import { normalizeIngredient } from "../data/synonyms";

/**
 * Matches user leftover ingredients against a list of recipes.
 * 
 * @param {string[]} userIngredients - List of raw ingredient strings from the user
 * @param {Object[]} recipes - List of recipe objects
 * @param {boolean} assumeStaples - Whether to automatically count staples as matched
 * @returns {Object[]} Recipies enriched with match details and sorted by match score
 */
export function getRecipeMatches(userIngredients, recipes, assumeStaples = true) {
  // Normalize user ingredients
  const normalizedUserList = userIngredients.map(ing => normalizeIngredient(ing));
  
  const matchedRecipes = recipes.map(recipe => {
    let matchedCount = 0;
    let totalKeyCount = 0;
    
    const ingredientDetails = recipe.ingredients.map(ing => {
      const normRecipeName = normalizeIngredient(ing.name);
      
      // Determine if staple
      if (ing.isStaple && assumeStaples) {
        return {
          ...ing,
          status: "matched",
          isStapleMatch: true
        };
      }
      
      // Check direct match
      const directMatchIdx = normalizedUserList.findIndex(userIng => 
        userIng === normRecipeName || 
        normRecipeName.includes(userIng) || 
        userIng.includes(normRecipeName)
      );
      
      if (directMatchIdx !== -1) {
        if (!ing.isStaple) matchedCount++;
        return {
          ...ing,
          status: "matched",
          matchedUserItem: userIngredients[directMatchIdx],
          isSubstitution: false
        };
      }
      
      // Check substitution match
      if (ing.substitutes && ing.substitutes.length > 0) {
        for (const sub of ing.substitutes) {
          const normSubName = normalizeIngredient(sub);
          const subMatchIdx = normalizedUserList.findIndex(userIng => 
            userIng === normSubName || 
            normSubName.includes(userIng) || 
            userIng.includes(normSubName)
          );
          
          if (subMatchIdx !== -1) {
            if (!ing.isStaple) matchedCount++;
            return {
              ...ing,
              status: "matched",
              matchedUserItem: userIngredients[subMatchIdx],
              isSubstitution: true,
              substitutedWith: sub
            };
          }
        }
      }
      
      // If it's a staple and not matched, and assumeStaples is false
      if (ing.isStaple) {
        return {
          ...ing,
          status: "missing"
        };
      }
      
      // Key ingredient and missing
      totalKeyCount++;
      return {
        ...ing,
        status: "missing"
      };
    });
    
    // Count total key ingredients (including the ones that were matched)
    const keyIngredients = recipe.ingredients.filter(ing => !ing.isStaple);
    const keyCount = keyIngredients.length;
    
    // Calculate percentage based on key ingredients
    const matchPercentage = keyCount > 0 ? Math.round((matchedCount / keyCount) * 100) : 100;
    
    const missingCount = ingredientDetails.filter(ing => ing.status === "missing" && !ing.isStaple).length;
    
    return {
      ...recipe,
      matchPercentage,
      matchedCount,
      keyCount,
      missingCount,
      ingredientsWithStatus: ingredientDetails
    };
  });
  
  // Sort recipes:
  // 1. Highest match percentage
  // 2. Least missing ingredients
  // 3. Most matched items (to prefer recipes that use more of their leftovers)
  return matchedRecipes.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    if (a.missingCount !== b.missingCount) {
      return a.missingCount - b.missingCount;
    }
    return b.matchedCount - a.matchedCount;
  });
}
