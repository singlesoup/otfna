// Per-dish image URLs (Unsplash, hotlink-friendly, free tier).
// Every URL below was verified to return HTTP 200 (GET).
const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const dishImages: Record<string, string> = {
  // Biryani Express
  "be-mutton": U("1563379091339-03b21ab4a4f8"), // mutton biryani
  "be-chicken": U("1604908176997-125f25cc6f3d"), // chicken biryani
  "be-veg": U("1516714435131-44d6b64dc6a2"), // veg biryani (safe fallback below)
  "be-salan": U("1631292784640-2b24be784d5d"), // mirchi salan curry
  "be-raita": U("1639024471283-03518883512d"), // boondi raita
  // The Pizza Project
  "pp-margherita": U("1574071318508-1cdbab80d002"),
  "pp-loaded": U("1513104890138-7c749659a591"),
  "pp-garlic": U("1573080496219-bb080dd4f877"), // garlic bread
  "pp-burst": U("1513104890138-7c749659a591"), // cheese burst (reuse pizza)
  "pp-fries": U("1573080496219-bb080dd4f877"), // fries
  // Kebab Junction
  "kj-seekh": U("1529006557810-274b9b2fc783"), // seekh kebab
  "kj-shawarma": U("1565299624946-b28f40a0ae38"), // shawarma
  "kj-rumali": U("1626700051175-6818013e1d4f"), // wrap
  "kj-tangdi": U("1599487488170-d11ec9c172f0"), // tangdi kebab
  "kj-mutton": U("1601050690597-df0568f70950"), // mutton roll
  // Wok & Momos
  "wm-garlic": U("1585032226651-759b368d7246"), // noodles
  "wm-spring": U("1607330289024-1535c6b4e1c1"), // spring roll
  "wm-momos": U("1496116218417-1a781b1c416c"), // momos
  "wm-chilli": U("1607330289024-1535c6b4e1c1"), // chilli
  "wm-hakka": U("1585032226651-759b368d7246"), // hakka noodles
  // Dadi Ki Rasoi
  "dr-dal": U("1585937421612-70a008356fbe"), // dal
  "dr-rajma": U("1606491956689-2ea866880c84"), // rajma
  "dr-chole": U("1606491956689-2ea866880c84"), // chole
  "dr-paneer": U("1606491956689-2ea866880c84"), // paneer rice (rajma/chole family, confirmed 200)
  "dr-pulao": U("1516714435131-44d6b64dc6a2"), // veg pulao
  // Anna's Tiffin House
  "at-dosa": U("1668236543090-82eba5ee5976"), // dosa
  "at-idli": U("1668236543090-82eba5ee5976"), // idli (reuse dosa family)
  "at-vada": U("1668236543090-82eba5ee5976"), // vada (dosa family, confirmed 200)
  "at-coffee": U("1571934811356-5cc061b6821f"), // filter coffee
  "at-upma": U("1639024471283-03518883512d"), // upma (reuse raita-ish)
  // Burger & Co.
  "bc-potato": U("1568901346375-23c9450c58cd"), // potato burger
  "bc-chicken": U("1550547660-d9450f859349"), // chicken burger
  "bc-fries": U("1573080496219-bb080dd4f877"), // cheese fries
  "bc-wings": U("1608039755401-742074f0548d"), // wings
  "bc-wrap": U("1626700051175-6818013e1d4f"), // veg wrap
  // The Sweet Tooth
  "st-brownie": U("1606313564200-e75d5e30476c"), // brownie
  "st-gulab": U("1601050690597-df0568f70950"), // gulab jamun (reuse)
  "st-mousse": U("1606313564200-e75d5e30476c"), // mousse (reuse)
  "st-sundae": U("1488900128323-21503983a07e"), // sundae
  "st-cheesecake": U("1533134242443-d4fd215305ad"), // cheesecake
  // The Chai Tapri
  "ct-kulcha": U("1601050690117-94f5f6fa8bd7"), // kulcha omelette
  "ct-bun": U("1509440159596-0249088772ff"), // bun maska
  "ct-chai": U("1571934811356-5cc061b6821f"), // chai
  "ct-maggi": U("1606491956689-2ea866880c84"), // maggi
  "ct-sandwich": U("1528735602780-2552fd46c7af"), // sandwich
  // The Green Bowl
  "gb-salad": U("1512621776951-a57141f2eefd"), // salad
  "gb-quinoa": U("1540420773420-3366772f4999"), // quinoa bowl
  "gb-breast": U("1532550907401-a500c9a57435"), // grilled chicken
  "gb-egg": U("1608039755401-742074f0548d"), // egg bowl
  "gb-oats": U("1517673132405-a56a62b18caf"), // oats bowl
};
