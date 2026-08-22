import { Recipe } from "@/lib/types";

export const recipes: Recipe[] = [
  {
    id: "dal-chawal",
    slug: "dal-chawal",
    title: "Dal Chawal",
    category: "North Indian",
    image: "https://images.pexels.com/photos/2672025/pexels-photo-2672025.jpeg?auto=compress&cs=tinysrgb&w=900",
    rating: 4.7,
    ingredients: "1 cup toor dal, 2 cups basmati rice, 1 tsp turmeric, 1 tsp cumin seeds, 2 cloves garlic, 1 inch ginger, 2 tomatoes, 1 green chilli, salt, ghee, cilantro",
    instructions: "Wash dal and rice separately. Pressure cook dal with turmeric, ginger, garlic and salt for 3 whistles. In a pan, temper cumin seeds in ghee, add chopped tomatoes and green chilli. Add cooked dal, simmer 5 minutes. Cook rice separately. Serve hot dal over rice, garnish with cilantro.",
    steamingTimeMinutes: 30,
    servings: 3,
    difficulty: "Easy",
  },
  {
    id: "paneer-tikka",
    slug: "paneer-tikka",
    title: "Paneer Tikka",
    category: "North Indian",
    image: "https://images.pexels.com/photos/3665461/pexels-photo-3665461.jpeg?auto=compress&cs=tinysrgb&w=900",
    rating: 4.5,
    ingredients: "250g paneer cubes, 1 cup thick curd, 2 tbsp besan, 1 tbsp ginger-garlic paste, 1 tsp Kashmiri red chilli powder, 1/2 tsp garam masala, 1 tsp cumin powder, 1 tsp mustard oil, bell peppers, onion, lemon",
    instructions: "Marinate paneer, bell peppers and onion in whisked curd mixed with besan, ginger-garlic paste, red chilli powder, garam masala, cumin powder, salt and mustard oil. Refrigerate 1 hour. Skewer paneer and veggies, grill on charcoal or oven at 220°C for 15 minutes. Squeeze lemon before serving.",
    steamingTimeMinutes: 60,
    servings: 2,
    difficulty: "Medium",
  },
  {
    id: "veg-biryani",
    slug: "veg-biryani",
    title: "Veg Biryani",
    category: "Biryani",
    image: "https://images.pexels.com/photos/7072360/pexels-photo-7072360.jpeg?auto=compress&cs=tinysrgb&w=900",
    rating: 4.6,
    ingredients: "2 cups basmati rice, 1 cup mixed vegetables (carrots, beans, peas, cauliflower), 1 onion, 2 tomatoes, 1/4 cup mint-coriander paste, 2 tbsp biryani masala, 1 tsp turmeric, 4 cloves, 2 bay leaves, 1 inch cinnamon, ghee, fried onions, saffron milk, curd",
    instructions: "Soak rice 30 minutes. Sauté whole spices in ghee, add sliced onion until golden. Add chopped tomatoes, mint-coriander paste and biryani masala. Add vegetables and curd, cook 5 minutes. Layer half rice, vegetable masala, fried onions, saffron milk, repeat. Dum seal with dough, cook on low heat 20 minutes. Rest 5 minutes, fluff and serve.",
    steamingTimeMinutes: 75,
    servings: 4,
    difficulty: "Hard",
  },
];

export const getRecipeBySlug = (slug: string) => recipes.find((r) => r.slug === slug);
