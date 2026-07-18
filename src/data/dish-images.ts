// Per-dish image URLs.
// - Most dishes: verified Unsplash/Pexels food photos (all checked HTTP 200).
// - 10 specialty dishes: locally-hosted PNGs in /public/dishes (downloaded from
//   Emergent's generated specialty shots) so the app has no external dependency.
// Every entry below was reachability-verified. No two dishes intentionally share an image.
const LOCAL = (name: string) => `/dishes/${name}.png`;

export const dishImages: Record<string, string> = {
  // Biryani Express
  "be-mutton": LOCAL("mutton_biryani"),
  "be-chicken": "https://images.pexels.com/photos/34484975/pexels-photo-34484975.jpeg?auto=compress&cs=tinysrgb&w=900",
  "be-veg": LOCAL("veg_biryani"), // replaced (was small/boy image)
  "be-salan": LOCAL("be-salan"),
  "be-raita": LOCAL("boondi_raita"), // replaced (was wrong)
  // The Pizza Project
  "pp-margherita": "https://images.pexels.com/photos/31596394/pexels-photo-31596394.jpeg?auto=compress&cs=tinysrgb&w=900",
  "pp-loaded": "https://images.unsplash.com/photo-1613564834361-9436948817d1?auto=format&fit=crop&w=900&q=80",
  "pp-garlic": "https://images.pexels.com/photos/13062441/pexels-photo-13062441.jpeg?auto=compress&cs=tinysrgb&w=900",
  "pp-burst": "https://images.pexels.com/photos/13724267/pexels-photo-13724267.jpeg?auto=compress&cs=tinysrgb&w=900",
  "pp-fries": "https://images.pexels.com/photos/35123981/pexels-photo-35123981.jpeg?auto=compress&cs=tinysrgb&w=900",
  // Kebab Junction
  "kj-seekh": "https://images.unsplash.com/photo-1781332143834-19a40f746cd9?auto=format&fit=crop&w=900&q=80",
  "kj-shawarma": "https://images.pexels.com/photos/5779364/pexels-photo-5779364.jpeg?auto=compress&cs=tinysrgb&w=900",
  "kj-rumali": LOCAL("chicken_rumali_wrap"), // replaced (was wrong)
  "kj-tangdi": LOCAL("kj-tangdi"),
  "kj-mutton": LOCAL("kj-mutton"),
  // Wok & Momos
  "wm-garlic": "https://images.pexels.com/photos/34170981/pexels-photo-34170981.jpeg?auto=compress&cs=tinysrgb&w=900",
  "wm-spring": "https://images.pexels.com/photos/15801051/pexels-photo-15801051.jpeg?auto=compress&cs=tinysrgb&w=900",
  "wm-momos": "https://images.pexels.com/photos/28445589/pexels-photo-28445589.jpeg?auto=compress&cs=tinysrgb&w=900",
  "wm-chilli": "https://images.pexels.com/photos/28674534/pexels-photo-28674534.jpeg?auto=compress&cs=tinysrgb&w=900",
  "wm-hakka": "https://images.pexels.com/photos/34170982/pexels-photo-34170982.jpeg?auto=compress&cs=tinysrgb&w=900",
  // Dadi Ki Rasoi
  "dr-dal": "https://images.pexels.com/photos/28674708/pexels-photo-28674708.jpeg?auto=compress&cs=tinysrgb&w=900",
  "dr-rajma": "https://images.pexels.com/photos/12737912/pexels-photo-12737912.jpeg?auto=compress&cs=tinysrgb&w=900",
  "dr-chole": LOCAL("chole_chawal"), // replaced (was wrong)
  "dr-paneer": LOCAL("paneer_curry_rice"), // replaced (was wrong)
  "dr-pulao": LOCAL("veg_pulao"), // replaced (was wrong)
  // Anna's Tiffin House
  "at-dosa": "https://images.pexels.com/photos/20422138/pexels-photo-20422138.jpeg?auto=compress&cs=tinysrgb&w=900",
  "at-idli": "https://images.pexels.com/photos/35514447/pexels-photo-35514447.jpeg?auto=compress&cs=tinysrgb&w=900",
  "at-vada": "https://images.unsplash.com/photo-1756757077703-26dc3ba7e853?auto=format&fit=crop&w=900&q=80",
  "at-coffee": "https://images.unsplash.com/photo-1758387941825-a6ecaec9c14d?auto=format&fit=crop&w=900&q=80",
  "at-upma": LOCAL("at-upma"),
  // Burger & Co.
  "bc-potato": "https://images.pexels.com/photos/29268293/pexels-photo-29268293.jpeg?auto=compress&cs=tinysrgb&w=900",
  "bc-chicken": "https://images.pexels.com/photos/8130750/pexels-photo-8130750.jpeg?auto=compress&cs=tinysrgb&w=900",
  "bc-fries": "https://images.pexels.com/photos/27758758/pexels-photo-27758758.jpeg?auto=compress&cs=tinysrgb&w=900",
  "bc-wings": LOCAL("bc-wings"),
  "bc-wrap": "https://images.pexels.com/photos/34644336/pexels-photo-34644336.jpeg?auto=compress&cs=tinysrgb&w=900",
  // The Sweet Tooth
  "st-brownie": "https://images.pexels.com/photos/23826283/pexels-photo-23826283.jpeg?auto=compress&cs=tinysrgb&w=900",
  "st-gulab": LOCAL("st-gulab"),
  "st-mousse": LOCAL("st-mousse"),
  "st-sundae": "https://images.pexels.com/photos/12941956/pexels-photo-12941956.jpeg?auto=compress&cs=tinysrgb&w=900",
  "st-cheesecake": "https://images.unsplash.com/photo-1702925614886-50ad13c88d3f?auto=format&fit=crop&w=900&q=80",
  // The Chai Tapri
  "ct-kulcha": LOCAL("ct-kulcha"),
  "ct-bun": LOCAL("ct-bun"),
  "ct-chai": "https://images.pexels.com/photos/37186989/pexels-photo-37186989.jpeg?auto=compress&cs=tinysrgb&w=900",
  "ct-maggi": "https://images.pexels.com/photos/10913411/pexels-photo-10913411.jpeg?auto=compress&cs=tinysrgb&w=900",
  "ct-sandwich": "https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=900&q=80",
  // The Green Bowl
  "gb-salad": "https://images.pexels.com/photos/19938473/pexels-photo-19938473.jpeg?auto=compress&cs=tinysrgb&w=900",
  "gb-quinoa": "https://images.pexels.com/photos/9258710/pexels-photo-9258710.jpeg?auto=compress&cs=tinysrgb&w=900",
  "gb-breast": "https://images.pexels.com/photos/37575745/pexels-photo-37575745.jpeg?auto=compress&cs=tinysrgb&w=900",
  "gb-egg": "https://images.pexels.com/photos/36583482/pexels-photo-36583482.jpeg?auto=compress&cs=tinysrgb&w=900",
  "gb-oats": LOCAL("gb-oats"),
};
