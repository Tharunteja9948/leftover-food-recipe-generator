export const SEED_RECIPES = [
  {
    id: "chicken-fried-rice",
    title: "Leftover Chicken Fried Rice",
    description: "The ultimate leftover recipe. Turn cold cooked rice, cooked chicken, and lingering vegetables into a savory, restaurant-style fried rice.",
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    wasteWeightGrams: 400,
    dietaryTags: ["Dairy-Free"],
    ingredients: [
      { name: "rice", quantity: 2, unit: "cups", isStaple: false, category: "Grains", substitutes: ["quinoa", "cauliflower rice"] },
      { name: "chicken", quantity: 1, unit: "cup", isStaple: false, category: "Proteins", substitutes: ["tofu", "pork", "beef", "turkey"] },
      { name: "eggs", quantity: 2, unit: "pcs", isStaple: false, category: "Proteins", substitutes: ["scrambled tofu"] },
      { name: "soy sauce", quantity: 2, unit: "tbsp", isStaple: true, category: "Pantry", substitutes: ["tamari", "coconut aminos"] },
      { name: "green onions", quantity: 3, unit: "stalks", isStaple: false, category: "Produce", substitutes: ["onion", "chives"] },
      { name: "garlic", quantity: 2, unit: "cloves", isStaple: true, category: "Pantry" },
      { name: "peas and carrots", quantity: 0.5, unit: "cup", isStaple: false, category: "Produce", substitutes: ["broccoli", "corn", "bell peppers"] },
      { name: "vegetable oil", quantity: 2, unit: "tbsp", isStaple: true, category: "Pantry" },
      { name: "sesame oil", quantity: 1, unit: "tsp", isStaple: true, category: "Pantry" }
    ],
    instructions: [
      { step: 1, text: "Heat vegetable oil in a large skillet or wok over high heat. Add minced garlic and the white parts of the green onions. Sauté for 1 minute until fragrant.", duration: 1 },
      { step: 2, text: "Add the peas and carrots (frozen or fresh) along with the chopped cooked chicken. Stir-fry for 2-3 minutes until heated through.", duration: 3 },
      { step: 3, text: "Push ingredients to the side of the pan. Crack the eggs into the empty side and scramble them with a spatula until fully cooked. Mix with the other ingredients.", duration: 2 },
      { step: 4, text: "Add the cold cooked rice to the pan, breaking up any clumps with your spatula. Stir-fry for 3-4 minutes to heat the rice and get it slightly crispy.", duration: 4 },
      { step: 5, text: "Drizzle soy sauce and sesame oil over the rice. Toss everything together until evenly coated. Cook for 1 more minute.", duration: 1 },
      { step: 6, text: "Garnish with the green parts of the green onions and serve hot." }
    ]
  },
  {
    id: "vegetable-stir-fry",
    title: "Garlic Ginger Vegetable Stir-Fry",
    description: "Clear out your crisper drawer with this vibrant stir-fry. High heat and a simple savory glaze make any combination of vegetables taste amazing.",
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    wasteWeightGrams: 350,
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"],
    ingredients: [
      { name: "broccoli", quantity: 1.5, unit: "cups", isStaple: false, category: "Produce", substitutes: ["cauliflower", "brussels sprouts"] },
      { name: "carrots", quantity: 1, unit: "pc", isStaple: false, category: "Produce", substitutes: ["zucchini", "parsnip"] },
      { name: "bell peppers", quantity: 1, unit: "pc", isStaple: false, category: "Produce", substitutes: ["snap peas", "mushrooms"] },
      { name: "soy sauce", quantity: 3, unit: "tbsp", isStaple: true, category: "Pantry", substitutes: ["tamari", "coconut aminos"] },
      { name: "garlic", quantity: 3, unit: "cloves", isStaple: true, category: "Pantry" },
      { name: "ginger", quantity: 1, unit: "tbsp", isStaple: false, category: "Produce", substitutes: ["ginger powder"] },
      { name: "vegetable oil", quantity: 2, unit: "tbsp", isStaple: true, category: "Pantry" },
      { name: "cornstarch", quantity: 1, unit: "tsp", isStaple: true, category: "Pantry" },
      { name: "sugar", quantity: 1, unit: "tsp", isStaple: true, category: "Pantry", substitutes: ["honey", "maple syrup"] }
    ],
    instructions: [
      { step: 1, text: "Chop broccoli into bite-size florets, carrots into thin rounds, and bell peppers into strips.", duration: 5 },
      { step: 2, text: "In a small bowl, whisk together soy sauce, cornstarch, sugar, and 2 tablespoons of water. Set aside to form the stir-fry glaze.", duration: 2 },
      { step: 3, text: "Heat vegetable oil in a large skillet over medium-high heat. Add minced garlic and grated ginger. Sauté for 30 seconds.", duration: 0.5 },
      { step: 4, text: "Add the carrots and broccoli to the pan. Stir-fry for 3-4 minutes. Add bell peppers and cook for another 2 minutes until veggies are tender-crisp.", duration: 5 },
      { step: 5, text: "Give the soy sauce mixture a quick stir and pour it into the skillet. Toss immediately. The sauce will bubble and thicken in about 1 minute.", duration: 1 },
      { step: 6, text: "Remove from heat and serve hot over rice or noodles." }
    ]
  },
  {
    id: "pasta-marinara",
    title: "Classic Pasta Marinara",
    description: "A simple, comforting Italian staple using pantry ingredients and leftover onions or garlic. Perfect for a quick weeknight dinner.",
    prepTime: 5,
    cookTime: 15,
    servings: 3,
    wasteWeightGrams: 200,
    dietaryTags: ["Vegetarian", "Vegan", "Dairy-Free"],
    ingredients: [
      { name: "pasta", quantity: 8, unit: "oz", isStaple: false, category: "Grains", substitutes: ["spaghetti", "penne", "macaroni", "rice noodles"] },
      { name: "tomato paste", quantity: 2, unit: "tbsp", isStaple: true, category: "Pantry" },
      { name: "canned tomatoes", quantity: 14, unit: "oz", isStaple: false, category: "Canned Goods", substitutes: ["fresh tomatoes", "tomato sauce"] },
      { name: "onion", quantity: 0.5, unit: "pc", isStaple: false, category: "Produce", substitutes: ["shallot", "leek"] },
      { name: "garlic", quantity: 3, unit: "cloves", isStaple: true, category: "Pantry" },
      { name: "olive oil", quantity: 2, unit: "tbsp", isStaple: true, category: "Pantry" },
      { name: "basil", quantity: 0.25, unit: "cup", isStaple: false, category: "Produce", substitutes: ["oregano", "parsley", "dried basil"] }
    ],
    instructions: [
      { step: 1, text: "Bring a large pot of salted water to a boil. Cook pasta according to package instructions until al dente. Reserve 1/2 cup of pasta water, then drain.", duration: 10 },
      { step: 2, text: "While pasta cooks, heat olive oil in a pan over medium heat. Add finely chopped onion and sauté for 4-5 minutes until translucent.", duration: 5 },
      { step: 3, text: "Add minced garlic and tomato paste. Sauté for 2 minutes, stirring constantly, until the tomato paste darkens in color.", duration: 2 },
      { step: 4, text: "Pour in the canned crushed tomatoes (or chopped fresh tomatoes) and stir to combine. Simmer gently for 8-10 minutes.", duration: 10 },
      { step: 5, text: "Stir in chopped fresh basil. Season with salt and black pepper. Stir in cooked pasta and toss, adding a splash of reserved pasta water to loosen the sauce if needed.", duration: 2 },
      { step: 6, text: "Divide into bowls and top with vegan or regular parmesan cheese if desired." }
    ]
  },
  {
    id: "creamy-mushroom-pasta",
    title: "Rich Creamy Mushroom Pasta",
    description: "Elevate forgotten mushrooms into a luxurious, velvety pasta dish. Ready in under 20 minutes.",
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    wasteWeightGrams: 300,
    dietaryTags: ["Vegetarian"],
    ingredients: [
      { name: "pasta", quantity: 6, unit: "oz", isStaple: false, category: "Grains", substitutes: ["spaghetti", "linguine", "fettuccine"] },
      { name: "mushrooms", quantity: 8, unit: "oz", isStaple: false, category: "Produce", substitutes: ["zucchini", "eggplant"] },
      { name: "cream", quantity: 0.5, unit: "cup", isStaple: false, category: "Dairy", substitutes: ["coconut cream", "whole milk", "sour cream"] },
      { name: "butter", quantity: 2, unit: "tbsp", isStaple: true, category: "Pantry", substitutes: ["olive oil"] },
      { name: "garlic", quantity: 3, unit: "cloves", isStaple: true, category: "Pantry" },
      { name: "parmesan", quantity: 0.25, unit: "cup", isStaple: false, category: "Dairy", substitutes: ["cheddar", "pecorino"] },
      { name: "spinach", quantity: 1.5, unit: "cups", isStaple: false, category: "Produce", substitutes: ["kale", "arugula"] }
    ],
    instructions: [
      { step: 1, text: "Boil a pot of salted water and cook your pasta according to package directions. Drain and set aside.", duration: 10 },
      { step: 2, text: "Clean mushrooms and slice them thinly. Heat butter in a skillet over medium-high heat. Add mushrooms and sear without stirring for 2-3 minutes, then stir and cook for another 3 minutes until golden brown.", duration: 6 },
      { step: 3, text: "Add minced garlic and sauté for 1 minute until fragrant.", duration: 1 },
      { step: 4, text: "Reduce heat to medium. Pour in the heavy cream and bring to a gentle simmer. Cook for 2-3 minutes to allow the cream to thicken slightly.", duration: 3 },
      { step: 5, text: "Add the baby spinach and grated parmesan. Stir until spinach is wilted and cheese is melted into the sauce.", duration: 2 },
      { step: 6, text: "Toss in the cooked pasta. Season with salt, pepper, and optionally a squeeze of lemon juice. Serve immediately." }
    ]
  },
  {
    id: "chicken-quesadilla",
    title: "Crispy Chicken & Cheese Quesadilla",
    description: "A fast, cheesy, and crunchy way to use up leftover cooked chicken, stray tortillas, and cheese blocks.",
    prepTime: 5,
    cookTime: 10,
    servings: 1,
    wasteWeightGrams: 250,
    ingredients: [
      { name: "chicken", quantity: 0.75, unit: "cup", isStaple: false, category: "Proteins", substitutes: ["tofu", "beef", "black beans", "pork"] },
      { name: "tortillas", quantity: 2, unit: "pcs", isStaple: false, category: "Grains", substitutes: ["bread slices (for a melt)"] },
      { name: "cheese", quantity: 0.75, unit: "cup", isStaple: false, category: "Dairy", substitutes: ["vegan cheese"] },
      { name: "bell peppers", quantity: 0.25, unit: "cup", isStaple: false, category: "Produce", substitutes: ["corn", "jalapenos", "tomatoes"] },
      { name: "onion", quantity: 0.25, unit: "cup", isStaple: false, category: "Produce", substitutes: ["green onions"] },
      { name: "butter", quantity: 1, unit: "tbsp", isStaple: true, category: "Pantry", substitutes: ["olive oil"] }
    ],
    instructions: [
      { step: 1, text: "Chop the cooked chicken, onion, and bell peppers into small bite-sized pieces.", duration: 3 },
      { step: 2, text: "Melt butter in a large skillet over medium heat. Place one tortilla in the skillet.", duration: 1 },
      { step: 3, text: "Sprinkle half of the cheese over the tortilla. Distribute the chopped chicken, onions, and peppers evenly across the cheese. Top with the remaining cheese and the second tortilla.", duration: 2 },
      { step: 4, text: "Cook for 3-4 minutes until the bottom tortilla is crisp and golden brown. Carefully flip the quesadilla using a spatula.", duration: 4 },
      { step: 5, text: "Cook the second side for another 3 minutes until the cheese is completely melted and the second tortilla is crispy.", duration: 3 },
      { step: 6, text: "Transfer to a cutting board, slice into wedges, and serve with salsa, sour cream, or guacamole if you have them." }
    ]
  },
  {
    id: "crispy-tofu-curry",
    title: "Easy Coconut Tofu Curry",
    description: "Combine stray vegetables and tofu with coconut milk for an aromatic, warming curry that clears out the vegetable drawer.",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    wasteWeightGrams: 500,
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"],
    ingredients: [
      { name: "tofu", quantity: 1, unit: "block", isStaple: false, category: "Proteins", substitutes: ["chicken", "chickpeas", "shrimp"] },
      { name: "coconut milk", quantity: 1, unit: "can", isStaple: false, category: "Canned Goods", substitutes: ["cream", "milk"] },
      { name: "curry paste", quantity: 2, unit: "tbsp", isStaple: false, category: "Pantry", substitutes: ["curry powder"] },
      { name: "carrots", quantity: 1, unit: "pc", isStaple: false, category: "Produce", substitutes: ["potatoes", "sweet potato"] },
      { name: "bell peppers", quantity: 1, unit: "pc", isStaple: false, category: "Produce", substitutes: ["zucchini", "peas", "spinach"] },
      { name: "rice", quantity: 1, unit: "cup", isStaple: false, category: "Grains", substitutes: ["quinoa", "naan bread"] },
      { name: "vegetable oil", quantity: 1, unit: "tbsp", isStaple: true, category: "Pantry" },
      { name: "onion", quantity: 0.5, unit: "pc", isStaple: false, category: "Produce", substitutes: ["shallots"] }
    ],
    instructions: [
      { step: 1, text: "Press tofu to drain excess water, then cut into 1-inch cubes. Slice carrots and peppers, and chop the onion.", duration: 8 },
      { step: 2, text: "Heat oil in a deep pan or pot over medium-high heat. Add tofu cubes and cook for 5-6 minutes, turning occasionally, until golden brown on all sides. Remove tofu and set aside.", duration: 6 },
      { step: 3, text: "In the same pan, add chopped onion and carrots. Cook for 3 minutes. Add bell peppers and curry paste, stirring to coat the veggies. Cook for 2 minutes until fragrant.", duration: 5 },
      { step: 4, text: "Pour in the coconut milk, stirring to scrape up any browned bits from the bottom of the pan. Bring to a boil, then reduce heat and simmer for 5-7 minutes until the carrots are soft.", duration: 7 },
      { step: 5, text: "Return the crispy tofu to the pan. Simmer for 2 minutes to let it absorb the curry flavor. Season with salt and pepper.", duration: 2 },
      { step: 6, text: "Serve hot over steamed rice." }
    ]
  },
  {
    id: "egg-frittata",
    title: "Garden Vegetable Egg Frittata",
    description: "An open-faced omelet baked or fried in a skillet. It's the ultimate blank canvas for leftover cheese, wilted spinach, and tomatoes.",
    prepTime: 5,
    cookTime: 12,
    servings: 2,
    wasteWeightGrams: 300,
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    ingredients: [
      { name: "eggs", quantity: 6, unit: "pcs", isStaple: false, category: "Proteins" },
      { name: "spinach", quantity: 2, unit: "cups", isStaple: false, category: "Produce", substitutes: ["kale", "chard", "broccoli florets"] },
      { name: "tomatoes", quantity: 0.5, unit: "cup", isStaple: false, category: "Produce", substitutes: ["bell peppers", "sundried tomatoes"] },
      { name: "milk", quantity: 0.25, unit: "cup", isStaple: false, category: "Dairy", substitutes: ["cream", "water"] },
      { name: "cheese", quantity: 0.5, unit: "cup", isStaple: false, category: "Dairy", substitutes: ["feta", "goat cheese", "parmesan"] },
      { name: "onion", quantity: 0.25, unit: "pc", isStaple: false, category: "Produce", substitutes: ["shallot", "green onions"] },
      { name: "olive oil", quantity: 1, unit: "tbsp", isStaple: true, category: "Pantry" }
    ],
    instructions: [
      { step: 1, text: "In a medium bowl, whisk together the eggs, milk, half of the cheese, a pinch of salt, and black pepper. Set aside.", duration: 2 },
      { step: 2, text: "Heat olive oil in an oven-safe skillet over medium heat. Sauté the chopped onion for 3 minutes until soft.", duration: 3 },
      { step: 3, text: "Add chopped tomatoes and baby spinach. Sauté for 1-2 minutes until the spinach is wilted and excess moisture evaporates.", duration: 2 },
      { step: 4, text: "Pour the egg mixture over the vegetables, tilting the pan to ensure it spreads evenly. Let cook undisturbed for 2 minutes to set the bottom.", duration: 2 },
      { step: 5, text: "Sprinkle the remaining cheese on top. Reduce heat to low, cover the pan with a lid, and cook for 6-8 minutes until the eggs are puffed and set in the center. (Alternatively, bake at 400°F/200°C for 8 minutes).", duration: 8 },
      { step: 6, text: "Slide out of the pan, slice like a pizza, and serve warm or at room temperature." }
    ]
  },
  {
    id: "vegetable-soup",
    title: "Hearty Kitchen-Sink Vegetable Soup",
    description: "Got odds and ends of vegetables? Simmer them with stock, canned tomatoes, and potatoes for a rich, warming soup that freezes beautifully.",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    wasteWeightGrams: 600,
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"],
    ingredients: [
      { name: "carrots", quantity: 2, unit: "pcs", isStaple: false, category: "Produce", substitutes: ["parsnips", "butternut squash"] },
      { name: "potatoes", quantity: 2, unit: "pcs", isStaple: false, category: "Produce", substitutes: ["sweet potatoes", "turnips"] },
      { name: "onion", quantity: 1, unit: "pc", isStaple: false, category: "Produce", substitutes: ["shallots", "leeks"] },
      { name: "canned tomatoes", quantity: 14, unit: "oz", isStaple: false, category: "Canned Goods", substitutes: ["tomato sauce", "fresh tomatoes"] },
      { name: "vegetable broth", quantity: 4, unit: "cups", isStaple: false, category: "Pantry", substitutes: ["chicken broth", "water + bouillon cubes"] },
      { name: "garlic", quantity: 3, unit: "cloves", isStaple: true, category: "Pantry" },
      { name: "celery", quantity: 2, unit: "stalks", isStaple: false, category: "Produce", substitutes: ["fennel", "cabbage"] },
      { name: "olive oil", quantity: 1, unit: "tbsp", isStaple: true, category: "Pantry" }
    ],
    instructions: [
      { step: 1, text: "Chop the onion, carrots, celery, and potatoes into even bite-sized pieces. Mince the garlic.", duration: 10 },
      { step: 2, text: "Heat olive oil in a large stockpot over medium heat. Add onion, carrots, and celery. Cook for 5-6 minutes until softening.", duration: 6 },
      { step: 3, text: "Add garlic and cook for 1 minute. Stir in diced potatoes, canned tomatoes (with their juices), and vegetable broth.", duration: 2 },
      { step: 4, text: "Bring the soup to a boil, then reduce heat to low. Cover and simmer for 15-20 minutes, or until the potatoes and carrots are easily pierced with a fork.", duration: 20 },
      { step: 5, text: "Taste and season with salt, pepper, dried oregano, or thyme. If you have leftover spinach or peas, throw them in for the last 2 minutes.", duration: 2 },
      { step: 6, text: "Ladle into bowls and serve with crusty bread." }
    ]
  },
  {
    id: "loaded-potatoes",
    title: "Loaded Twice-Baked Potato Skins",
    description: "Transform leftover baked or raw potatoes into a crowd-pleasing cheesy appetizer or full meal.",
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    wasteWeightGrams: 350,
    dietaryTags: ["Gluten-Free"],
    ingredients: [
      { name: "potatoes", quantity: 2, unit: "large pcs", isStaple: false, category: "Produce", substitutes: ["sweet potatoes"] },
      { name: "cheese", quantity: 1, unit: "cup", isStaple: false, category: "Dairy", substitutes: ["cheddar", "mozzarella", "monterey jack"] },
      { name: "bacon", quantity: 4, unit: "strips", isStaple: false, category: "Proteins", substitutes: ["ham", "leftover chicken", "black beans"] },
      { name: "sour cream", quantity: 0.5, unit: "cup", isStaple: false, category: "Dairy", substitutes: ["greek yogurt", "cream cheese"] },
      { name: "green onions", quantity: 2, unit: "stalks", isStaple: false, category: "Produce", substitutes: ["chives", "onion"] },
      { name: "butter", quantity: 2, unit: "tbsp", isStaple: true, category: "Pantry" }
    ],
    instructions: [
      { step: 1, text: "If using raw potatoes, poke with a fork and microwave on high for 7-8 minutes until soft, or bake. If using leftovers, proceed to next step.", duration: 8 },
      { step: 2, text: "In a pan, cook bacon until crispy, then crumble it into small bits.", duration: 5 },
      { step: 3, text: "Cut potatoes in half lengthwise. Scoop out the centers into a bowl, leaving a thin shell (about 1/4 inch thick) to make skins. Brush skins with melted butter.", duration: 5 },
      { step: 4, text: "Bake or air-fry the skins at 400°F/200°C for 8 minutes until crispy. Meanwhile, mash the potato centers in the bowl with butter, sour cream, and salt.", duration: 8 },
      { step: 5, text: "Stuff the potato skins with the mashed mixture, then top with crumbled bacon and cheese. Bake for another 5 minutes until cheese is bubbly.", duration: 5 },
      { step: 6, text: "Garnish with chopped green onions and serve hot." }
    ]
  },
  {
    id: "tuna-salad-sandwich",
    title: "Pantry-Hero Tuna Salad Melt",
    description: "Got a can of tuna and some stale bread? This recipe turns pantry basics into a crispy, satisfying sandwich.",
    prepTime: 5,
    cookTime: 5,
    servings: 2,
    wasteWeightGrams: 200,
    ingredients: [
      { name: "canned tuna", quantity: 1, unit: "can", isStaple: false, category: "Canned Goods" },
      { name: "bread", quantity: 4, unit: "slices", isStaple: false, category: "Grains", substitutes: ["bagels", "tortillas (for a wrap)"] },
      { name: "mayo", quantity: 3, unit: "tbsp", isStaple: false, category: "Pantry", substitutes: ["greek yogurt", "mashed avocado"] },
      { name: "onion", quantity: 0.25, unit: "cup", isStaple: false, category: "Produce", substitutes: ["green onions", "celery"] },
      { name: "cheese", quantity: 2, unit: "slices", isStaple: false, category: "Dairy", substitutes: ["shredded cheddar"] },
      { name: "butter", quantity: 1, unit: "tbsp", isStaple: true, category: "Pantry" }
    ],
    instructions: [
      { step: 1, text: "Drain canned tuna and place in a small bowl. Finely dice the onion.", duration: 3 },
      { step: 2, text: "Mix the tuna, diced onion, and mayonnaise together. Season with salt, pepper, and a dash of lemon juice or mustard if available.", duration: 2 },
      { step: 3, text: "Spread the tuna mixture onto 2 slices of bread. Top each with a slice of cheese, and place the remaining bread slices on top.", duration: 2 },
      { step: 4, text: "Butter the outer sides of the sandwiches. Heat a skillet over medium heat.", duration: 1 },
      { step: 5, text: "Grill the sandwiches in the skillet for 3 minutes per side, pressing down gently with a spatula, until the bread is golden-brown and cheese is melted.", duration: 6 },
      { step: 6, text: "Cut diagonally and serve hot." }
    ]
  },
  {
    id: "banana-oat-pancakes",
    title: "Zero-Waste Banana Oat Pancakes",
    description: "Got brown, overripe bananas? Don't throw them away! Blend them with oats and eggs for healthy, flourless pancakes.",
    prepTime: 5,
    cookTime: 8,
    servings: 2,
    wasteWeightGrams: 250,
    dietaryTags: ["Vegetarian", "Gluten-Free", "Dairy-Free"],
    ingredients: [
      { name: "banana", quantity: 2, unit: "large pcs", isStaple: false, category: "Produce" },
      { name: "oats", quantity: 1, unit: "cup", isStaple: false, category: "Grains", substitutes: ["flour"] },
      { name: "eggs", quantity: 2, unit: "pcs", isStaple: false, category: "Proteins" },
      { name: "milk", quantity: 0.25, unit: "cup", isStaple: false, category: "Dairy", substitutes: ["almond milk", "water"] },
      { name: "cinnamon", quantity: 0.5, unit: "tsp", isStaple: true, category: "Pantry" },
      { name: "butter", quantity: 1, unit: "tsp", isStaple: true, category: "Pantry", substitutes: ["oil"] }
    ],
    instructions: [
      { step: 1, text: "Mash bananas completely in a medium bowl until smooth. Alternatively, put everything into a blender.", duration: 3 },
      { step: 2, text: "Whisk the eggs, milk, and cinnamon into the mashed bananas until thoroughly combined.", duration: 2 },
      { step: 3, text: "Stir in the rolled or quick oats (if blending, blend until smooth). Let the batter sit for 3 minutes to thicken.", duration: 3 },
      { step: 4, text: "Melt butter in a non-stick skillet over medium heat. Pour small circles of batter (about 3 inches wide) into the pan.", duration: 1 },
      { step: 5, text: "Cook for 3-4 minutes until bubbles form on top, then flip and cook for 2 more minutes until golden brown.", duration: 6 },
      { step: 6, text: "Serve warm, topped with leftover fruit, honey, or maple syrup." }
    ]
  },
  {
    id: "beef-broccoli",
    title: "Quick Beef & Broccoli Stir-Fry",
    description: "Turn leftover steak or ground beef, and broccoli crowns into a quick, savory Cantonese-style dish.",
    prepTime: 8,
    cookTime: 8,
    servings: 2,
    wasteWeightGrams: 350,
    dietaryTags: ["Dairy-Free"],
    ingredients: [
      { name: "beef", quantity: 8, unit: "oz", isStaple: false, category: "Proteins", substitutes: ["chicken", "pork", "tofu"] },
      { name: "broccoli", quantity: 2, unit: "cups", isStaple: false, category: "Produce", substitutes: ["broccolini", "snap peas"] },
      { name: "soy sauce", quantity: 3, unit: "tbsp", isStaple: true, category: "Pantry" },
      { name: "garlic", quantity: 2, unit: "cloves", isStaple: true, category: "Pantry" },
      { name: "ginger", quantity: 1, unit: "tsp", isStaple: false, category: "Produce" },
      { name: "cornstarch", quantity: 1.5, unit: "tsp", isStaple: true, category: "Pantry" },
      { name: "rice", quantity: 1, unit: "cup", isStaple: false, category: "Grains" },
      { name: "vegetable oil", quantity: 1, unit: "tbsp", isStaple: true, category: "Pantry" }
    ],
    instructions: [
      { step: 1, text: "Cut beef into thin bite-sized strips. In a small bowl, toss the beef with 1 teaspoon of cornstarch and 1 tablespoon of soy sauce. Chop broccoli into florets.", duration: 6 },
      { step: 2, text: "In another bowl, mix the remaining soy sauce, cornstarch, 1/4 cup of water, grated ginger, and minced garlic to make the stir-fry sauce.", duration: 2 },
      { step: 3, text: "Heat vegetable oil in a skillet over high heat. Add the beef strips and cook for 2-3 minutes until browned. Transfer beef to a plate.", duration: 3 },
      { step: 4, text: "Add broccoli florets and 2 tablespoons of water to the skillet. Cover with a lid and steam cook for 2 minutes until bright green and tender.", duration: 2 },
      { step: 5, text: "Pour the sauce into the pan and return the cooked beef. Stir fry for 1-2 minutes until the sauce bubbles and thickens, coating the beef and broccoli.", duration: 2 },
      { step: 6, text: "Serve immediately over hot steamed rice." }
    ]
  },
  {
    id: "chickpea-salad",
    title: "Fresh Mediterranean Chickpea Salad",
    description: "No cooking required. Toss canned chickpeas with leftover cucumbers, tomatoes, and herbs for a fresh, protein-packed salad.",
    prepTime: 8,
    cookTime: 0,
    servings: 2,
    wasteWeightGrams: 300,
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    ingredients: [
      { name: "canned chickpeas", quantity: 1, unit: "can", isStaple: false, category: "Canned Goods", substitutes: ["canned black beans", "white beans"] },
      { name: "cucumber", quantity: 1, unit: "pc", isStaple: false, category: "Produce", substitutes: ["zucchini (thinly sliced)"] },
      { name: "tomatoes", quantity: 1, unit: "large pc", isStaple: false, category: "Produce", substitutes: ["bell pepper"] },
      { name: "onion", quantity: 0.25, unit: "pc", isStaple: false, category: "Produce", substitutes: ["green onions"] },
      { name: "olive oil", quantity: 2, unit: "tbsp", isStaple: true, category: "Pantry" },
      { name: "feta", quantity: 0.5, unit: "cup", isStaple: false, category: "Dairy", substitutes: ["vegan cheese", "goat cheese"] }
    ],
    instructions: [
      { step: 1, text: "Drain and rinse the canned chickpeas.", duration: 2 },
      { step: 2, text: "Chop the cucumber, tomato, and red onion into uniform, small cubes.", duration: 5 },
      { step: 3, text: "Place chickpeas and chopped vegetables in a large salad bowl.", duration: 1 },
      { step: 4, text: "Drizzle olive oil over the mixture. If you have lemon juice or vinegar, add 1 tablespoon. Season with salt, pepper, and dried oregano.", duration: 2 },
      { step: 5, text: "Crumble the feta cheese on top and stir gently to combine.", duration: 1 },
      { step: 6, text: "Let sit for 5 minutes before serving to allow flavors to meld. Excellent chilled." }
    ]
  },
  {
    id: "bruschetta",
    title: "Rustic Tomato Basil Bruschetta",
    description: "Resurrect stale baguette or bread slices by brushing them with olive oil, garlic, and loading them with tomatoes.",
    prepTime: 5,
    cookTime: 5,
    servings: 2,
    wasteWeightGrams: 200,
    dietaryTags: ["Vegetarian", "Vegan", "Dairy-Free"],
    ingredients: [
      { name: "bread", quantity: 4, unit: "thick slices", isStaple: false, category: "Grains", substitutes: ["baguette slices"] },
      { name: "tomatoes", quantity: 2, unit: "pcs", isStaple: false, category: "Produce" },
      { name: "garlic", quantity: 2, unit: "cloves", isStaple: true, category: "Pantry" },
      { name: "olive oil", quantity: 2, unit: "tbsp", isStaple: true, category: "Pantry" },
      { name: "basil", quantity: 6, unit: "leaves", isStaple: false, category: "Produce", substitutes: ["dried basil", "parsley"] }
    ],
    instructions: [
      { step: 1, text: "Dice tomatoes finely and place in a bowl, draining excess liquid.", duration: 3 },
      { step: 2, text: "Toss tomatoes with 1 tablespoon of olive oil, chopped fresh basil, salt, and pepper.", duration: 2 },
      { step: 3, text: "Preheat oven to 400°F/200°C or heat a grill pan. Brush bread slices with the remaining olive oil.", duration: 2 },
      { step: 4, text: "Toast bread slices for 4-5 minutes until golden brown and crispy.", duration: 5 },
      { step: 5, text: "Cut a garlic clove in half and rub the cut side firmly over the warm, toasted bread slices.", duration: 1 },
      { step: 6, text: "Spoon the tomato-basil mixture onto the toasted bread slices and serve immediately." }
    ]
  },
  {
    id: "garlic-butter-salmon",
    title: "10-Minute Garlic Butter Salmon",
    description: "Got a salmon fillet that needs cooking? Sauté it with butter, garlic, and a splash of lemon juice for an elegant meal.",
    prepTime: 3,
    cookTime: 7,
    servings: 1,
    wasteWeightGrams: 200,
    dietaryTags: ["Gluten-Free"],
    ingredients: [
      { name: "salmon", quantity: 1, unit: "fillet", isStaple: false, category: "Proteins", substitutes: ["shrimp", "white fish"] },
      { name: "garlic", quantity: 2, unit: "cloves", isStaple: true, category: "Pantry" },
      { name: "butter", quantity: 1.5, unit: "tbsp", isStaple: true, category: "Pantry", substitutes: ["olive oil"] },
      { name: "parsley", quantity: 1, unit: "tbsp", isStaple: false, category: "Produce", substitutes: ["dill", "thyme"] }
    ],
    instructions: [
      { step: 1, text: "Pat salmon dry with a paper towel. Season both sides with salt and pepper.", duration: 2 },
      { step: 2, text: "Melt butter in a non-stick skillet over medium-high heat. Add salmon skin-side up.", duration: 1 },
      { step: 3, text: "Sear the salmon for 3-4 minutes until a golden crust forms, then flip.", duration: 4 },
      { step: 4, text: "Add minced garlic to the pan, letting it sizzle in the butter. Spoon the garlic butter over the salmon for 2-3 minutes until salmon is cooked through.", duration: 3 },
      { step: 5, text: "Stir in chopped parsley and squeeze fresh lemon juice over the top.", duration: 1 },
      { step: 6, text: "Remove from pan and serve immediately." }
    ]
  }
];
