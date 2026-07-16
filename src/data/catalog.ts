import { Restaurant } from "@/lib/types";

const images = {
  biryani: "https://images.pexels.com/photos/9743517/pexels-photo-9743517.jpeg?auto=compress&cs=tinysrgb&w=900",
  pizza: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=80",
  kebab: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=80",
  chinese: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80",
  thali: "https://images.pexels.com/photos/8148149/pexels-photo-8148149.jpeg?auto=compress&cs=tinysrgb&w=900",
  dosa: "https://images.pexels.com/photos/20422121/pexels-photo-20422121.jpeg?auto=compress&cs=tinysrgb&w=900",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  dessert: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
  chai: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=900&q=80",
  healthy: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
};

const dish = (id: string, name: string, price: number, veg: boolean, image: string, description: string) => ({
  id, name, price, veg, image, description, rating: Number((4.1 + (id.length % 7) / 10).toFixed(1)),
});

export const categories = ["All", "Biryani", "Pizza", "Rolls", "Chinese", "North Indian", "South Indian", "Burgers", "Desserts", "Cafe", "Healthy"];

export const restaurants: Restaurant[] = [
  { id: "biryani-express", name: "Biryani Express", category: "Biryani", cuisines: ["Biryani", "Mughlai"], rating: 4.5, eta: "22–28 min", offer: "₹125 OFF above ₹349", image: images.biryani, badge: "Crowd favourite", dishes: [
    dish("be-mutton", "Mutton Biryani", 389, false, images.biryani, "Slow-cooked mutton, fragrant basmati and saffron."),
    dish("be-chicken", "Chicken Dum Biryani", 299, false, images.biryani, "Dum-sealed chicken biryani with house masala."),
    dish("be-veg", "Veg Biryani", 229, true, images.biryani, "Seasonal vegetables layered with aromatic rice."),
    dish("be-salan", "Mirchi Salan", 79, true, images.biryani, "Tangy peanut and chilli curry."),
    dish("be-raita", "Boondi Raita", 69, true, images.thali, "Chilled curd with crisp boondi and cumin."),
  ]},
  { id: "pizza-project", name: "The Pizza Project", category: "Pizza", cuisines: ["Pizza", "Italian"], rating: 4.3, eta: "25–30 min", offer: "50% OFF up to ₹120", image: images.pizza, badge: "Stone-baked", dishes: [
    dish("pp-margherita", "Margherita", 249, true, images.pizza, "Tomato, mozzarella and fresh basil."),
    dish("pp-loaded", "Veg Loaded Pizza", 379, true, images.pizza, "Peppers, olives, corn and extra cheese."),
    dish("pp-garlic", "Garlic Bread", 159, true, images.pizza, "Oven-baked bread with garlic butter."),
    dish("pp-burst", "Cheese Burst", 429, true, images.pizza, "A molten cheese centre with herbed sauce."),
    dish("pp-fries", "Peri-Peri Fries", 139, true, images.burger, "Crisp fries dusted with peri-peri seasoning."),
  ]},
  { id: "kebab-junction", name: "Kebab Junction", category: "Rolls", cuisines: ["Rolls", "Kebabs"], rating: 4.4, eta: "20–25 min", offer: "FREE roll on ₹499", image: images.kebab, badge: "Charcoal grilled", dishes: [
    dish("kj-seekh", "Seekh Kebab Roll", 229, false, images.kebab, "Smoky seekh, onions and mint chutney."),
    dish("kj-shawarma", "Chicken Shawarma", 199, false, images.kebab, "Juicy chicken, toum and pickled vegetables."),
    dish("kj-rumali", "Rumali Wrap", 189, true, images.kebab, "Paneer tikka in a soft rumali roti."),
    dish("kj-tangdi", "Tangdi Kebab", 329, false, images.kebab, "Tandoor-roasted chicken drumsticks."),
    dish("kj-mutton", "Mutton Rumali Roll", 279, false, images.kebab, "Spiced mutton strips with crisp onions."),
  ]},
  { id: "wok-momos", name: "Wok & Momos", category: "Chinese", cuisines: ["Chinese", "Momos"], rating: 4.2, eta: "24–32 min", offer: "₹100 OFF above ₹299", image: images.chinese, badge: "Wok-tossed", dishes: [
    dish("wm-garlic", "Burnt Garlic Noodles", 239, true, images.chinese, "Smoky noodles tossed with crisp garlic."),
    dish("wm-spring", "Veg Spring Roll", 159, true, images.chinese, "Crisp rolls with a vegetable filling."),
    dish("wm-momos", "Paneer Momos", 189, true, images.chinese, "Steamed momos with chilli dip."),
    dish("wm-chilli", "Chilli Chicken", 289, false, images.chinese, "Chicken tossed with peppers and chilli sauce."),
    dish("wm-hakka", "Hakka Noodles", 219, true, images.chinese, "Classic street-style vegetable noodles."),
  ]},
  { id: "dadi-rasoi", name: "Dadi Ki Rasoi", category: "North Indian", cuisines: ["North Indian", "Home Food"], rating: 4.6, eta: "18–24 min", offer: "20% OFF home-style meals", image: images.thali, badge: "Ghar jaisa", dishes: [
    dish("dr-dal", "Dal Chawal", 179, true, images.thali, "Yellow dal tadka with steamed rice."),
    dish("dr-rajma", "Rajma Chawal", 199, true, images.thali, "Slow-cooked rajma with fluffy rice."),
    dish("dr-chole", "Chole Chawal", 189, true, images.thali, "Punjabi chole paired with jeera rice."),
    dish("dr-paneer", "Paneer Rice", 229, true, images.thali, "Mild paneer gravy over aromatic rice."),
    dish("dr-pulao", "Veg Pulao", 179, true, images.thali, "One-pot vegetable rice with whole spices."),
  ]},
  { id: "annas-tiffin", name: "Anna's Tiffin House", category: "South Indian", cuisines: ["South Indian", "Breakfast"], rating: 4.7, eta: "16–22 min", offer: "Free filter coffee above ₹249", image: images.dosa, badge: "Fresh batter daily", dishes: [
    dish("at-dosa", "Ghee Roast Dosa", 189, true, images.dosa, "Crisp dosa roasted with fragrant ghee."),
    dish("at-idli", "Idli Sambar", 119, true, images.dosa, "Soft idlis with sambar and chutneys."),
    dish("at-vada", "Medu Vada", 129, true, images.dosa, "Golden lentil vadas with coconut chutney."),
    dish("at-coffee", "Filter Coffee", 69, true, images.chai, "Strong decoction finished with frothy milk."),
    dish("at-upma", "Upma", 109, true, images.dosa, "Warm semolina tempered with curry leaves."),
  ]},
  { id: "burger-co", name: "Burger & Co.", category: "Burgers", cuisines: ["Burgers", "Fast Food"], rating: 4.1, eta: "21–29 min", offer: "Buy 2, save ₹100", image: images.burger, badge: "Made to order", dishes: [
    dish("bc-potato", "Crispy Potato Burger", 159, true, images.burger, "Crunchy potato patty with house sauce."),
    dish("bc-chicken", "Chicken Snacker Burger", 209, false, images.burger, "Crispy chicken with lettuce and mayo."),
    dish("bc-fries", "Cheese Loaded Fries", 199, true, images.burger, "Fries layered with warm cheese sauce."),
    dish("bc-wings", "Peri Wings", 299, false, images.burger, "Roasted wings glazed in peri-peri."),
    dish("bc-wrap", "Veg Wrap", 179, true, images.burger, "Spiced vegetables in a soft tortilla."),
  ]},
  { id: "sweet-tooth", name: "The Sweet Tooth", category: "Desserts", cuisines: ["Desserts", "Bakery"], rating: 4.5, eta: "19–26 min", offer: "Flat ₹80 OFF", image: images.dessert, badge: "Small-batch", dishes: [
    dish("st-brownie", "Walnut Brownie", 169, true, images.dessert, "Fudgy chocolate brownie with toasted walnuts."),
    dish("st-gulab", "Gulab Jamun", 119, true, images.dessert, "Warm khoya dumplings in cardamom syrup."),
    dish("st-mousse", "Chocolate Mousse", 189, true, images.dessert, "Airy dark chocolate mousse."),
    dish("st-sundae", "Ice Cream Sundae", 229, true, images.dessert, "Vanilla, chocolate sauce and nut brittle."),
    dish("st-cheesecake", "Cheesecake Slice", 249, true, images.dessert, "Creamy baked cheesecake with berry compote."),
  ]},
  { id: "chai-tapri", name: "The Chai Tapri", category: "Cafe", cuisines: ["Cafe", "Street Food"], rating: 4.4, eta: "15–20 min", offer: "Snacks at ₹99", image: images.chai, badge: "Tapri classics", dishes: [
    dish("ct-kulcha", "Cheese Kulcha Omelette", 189, false, images.chai, "Cheesy kulcha with masala omelette."),
    dish("ct-bun", "Bun Maska", 89, true, images.chai, "Toasted bun with a generous swipe of butter."),
    dish("ct-chai", "Masala Chai", 59, true, images.chai, "Kadak chai brewed with warming spices."),
    dish("ct-maggi", "Maggi", 109, true, images.chai, "Classic masala noodles with vegetables."),
    dish("ct-sandwich", "Bread-Cheese Sandwich", 139, true, images.chai, "Grilled sandwich with cheese and chutney."),
  ]},
  { id: "green-bowl", name: "The Green Bowl", category: "Healthy", cuisines: ["Healthy", "Salads"], rating: 4.6, eta: "20–27 min", offer: "25% OFF clean meals", image: images.healthy, badge: "Protein-forward", dishes: [
    dish("gb-salad", "Grilled Chicken Salad", 299, false, images.healthy, "Grilled chicken, greens and lemon dressing."),
    dish("gb-quinoa", "Quinoa Avocado Bowl", 329, true, images.healthy, "Quinoa, avocado, beans and seed crunch."),
    dish("gb-breast", "Grilled Chicken Breast", 349, false, images.healthy, "Herb-grilled chicken with sautéed vegetables."),
    dish("gb-egg", "Egg Bowl", 239, false, images.healthy, "Eggs, brown rice and seasonal vegetables."),
    dish("gb-oats", "Oats Bowl", 189, true, images.healthy, "Savory oats with vegetables and toasted seeds."),
  ]},
];

export const getRestaurant = (id: string) => restaurants.find((restaurant) => restaurant.id === id);

export const searchRestaurants = (query: string, category: string) => {
  const needle = query.trim().toLowerCase();
  return restaurants.filter((restaurant) => {
    const categoryMatch = category === "All" || restaurant.category === category;
    const searchMatch = !needle || restaurant.name.toLowerCase().includes(needle) || restaurant.cuisines.some((item) => item.toLowerCase().includes(needle)) || restaurant.dishes.some((item) => item.name.toLowerCase().includes(needle));
    return categoryMatch && searchMatch;
  });
};
