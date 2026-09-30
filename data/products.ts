export type Gender = "men" | "women" | "kids";

export type Condition = "Новое с биркой" | "Отличное" | "Хорошее";

export type Product = {
  id: number;
  name: string;
  brand: string;
  gender: Gender;
  category: string;
  size: string;
  price: number;
  oldPrice?: number;
  condition: Condition;
  color: string;
  image: string;
  description: string;
  isNew?: boolean;
};

export const genders: { id: Gender; label: string }[] = [
  { id: "men", label: "Мужское" },
  { id: "women", label: "Женское" },
  { id: "kids", label: "Детское" },
];

export const categories: Record<string, string> = {
  tshirts: "Футболки",
  jeans: "Джинсы",
  trousers: "Брюки",
  shorts: "Шорты",
  hoodies: "Худи и свитшоты",
  vests: "Жилетки",
  fleece: "Флиски",
  windbreakers: "Ветровки",
  jackets: "Куртки",
  workwear: "Спецодежда",
  robes: "Халаты",
  hats: "Головные уборы",
  accessories: "Аксессуары",
};

export const categoriesByGender: Record<Gender, string[]> = {
  men: [
    "tshirts",
    "jeans",
    "trousers",
    "shorts",
    "hoodies",
    "vests",
    "fleece",
    "windbreakers",
    "jackets",
    "workwear",
    "hats",
    "accessories",
  ],
  women: [
    "tshirts",
    "jeans",
    "trousers",
    "shorts",
    "hoodies",
    "vests",
    "fleece",
    "windbreakers",
    "jackets",
    "robes",
    "hats",
    "accessories",
  ],
  kids: ["tshirts", "jeans", "hoodies", "jackets", "accessories"],
};

export const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;

export const products: Product[] = [
  {
    id: 1,
    name: "Nike Sportswear Club Hoodie",
    brand: "Nike",
    gender: "men",
    category: "hoodies",
    size: "M",
    price: 900,
    oldPrice: 1400,
    condition: "Отличное",
    color: "Серый меланж",
    image: unsplash("1556821840-3a63f95609a7"),
    description:
      "Классическое худи из плотного футера с начёсом. Капюшон на кулиске, карман-кенгуру. Без катышков и потёртостей.",
    isNew: true,
  },
  {
    id: 2,
    name: "Adidas Originals Graphic Tee",
    brand: "Adidas",
    gender: "men",
    category: "tshirts",
    size: "L",
    price: 700,
    condition: "Отличное",
    color: "Бежевый",
    image: unsplash("1576566588028-4147f3842f27"),
    description:
      "Хлопковая футболка свободного кроя с крупным принтом. Принт не потрескался, цвет не выцвел.",
    isNew: true,
  },
  {
    id: 3,
    name: "Carhartt Detroit Jacket",
    brand: "Carhartt",
    gender: "women",
    category: "jackets",
    size: "M",
    price: 1800,
    oldPrice: 2400,
    condition: "Хорошее",
    color: "Оливковый",
    image: unsplash("1544022613-e87ca75a784a"),
    description:
      "Рабочая куртка из плотного канваса с вельветовым воротником. Лёгкие следы носки придают характер.",
  },
  {
    id: 4,
    name: "Levi's 501 Original",
    brand: "Levi's",
    gender: "men",
    category: "jeans",
    size: "32/32",
    price: 1200,
    condition: "Отличное",
    color: "Индиго",
    image: unsplash("1542272604-787c3835535d"),
    description:
      "Легендарные прямые джинсы на болтах. Плотный деним, без дыр и заломов.",
    isNew: true,
  },
  {
    id: 5,
    name: "Кожаная куртка Perfecto",
    brand: "Schott",
    gender: "men",
    category: "jackets",
    size: "L",
    price: 3400,
    condition: "Отличное",
    color: "Чёрный",
    image: unsplash("1551028719-00167b16eac5"),
    description:
      "Косуха из натуральной кожи с асимметричной молнией. Фурнитура в идеальном состоянии.",
  },
  {
    id: 6,
    name: "Alpha Industries MA-1",
    brand: "Alpha Industries",
    gender: "men",
    category: "windbreakers",
    size: "L",
    price: 1600,
    condition: "Новое с биркой",
    color: "Терракотовый",
    image: unsplash("1591047139829-d91aecb6caea"),
    description:
      "Бомбер из нейлона с трикотажными манжетами. Новый, с оригинальной биркой.",
    isNew: true,
  },
  {
    id: 7,
    name: "New Era 9FORTY",
    brand: "New Era",
    gender: "men",
    category: "hats",
    size: "One size",
    price: 450,
    condition: "Отличное",
    color: "Белый",
    image: unsplash("1588850561407-ed78c282e89b"),
    description: "Бейсболка с регулируемым ремешком. Козырёк не деформирован.",
  },
  {
    id: 8,
    name: "Herschel Classic Backpack",
    brand: "Herschel",
    gender: "men",
    category: "accessories",
    size: "One size",
    price: 950,
    condition: "Отличное",
    color: "Тёмно-синий",
    image: unsplash("1553062407-98eeb64c6a62"),
    description:
      "Городской рюкзак на 22 литра с отделением для ноутбука. Все молнии работают.",
  },
  {
    id: 9,
    name: "Carhartt WIP Pocket Tee",
    brand: "Carhartt",
    gender: "men",
    category: "tshirts",
    size: "L",
    price: 600,
    condition: "Отличное",
    color: "Чёрный",
    image: unsplash("1618354691373-d851c5c3a990"),
    description: "Плотная футболка с нагрудным карманом и фирменной нашивкой.",
  },
  {
    id: 10,
    name: "Dickies 874 Work Pant",
    brand: "Dickies",
    gender: "men",
    category: "workwear",
    size: "32",
    price: 850,
    condition: "Хорошее",
    color: "Хаки",
    image: unsplash("1473966968600-fa801b869a1a"),
    description:
      "Износостойкие рабочие брюки прямого кроя. Идеальны на каждый день.",
  },
  {
    id: 11,
    name: "The North Face M65 Parka",
    brand: "The North Face",
    gender: "men",
    category: "jackets",
    size: "L",
    price: 2600,
    oldPrice: 3200,
    condition: "Отличное",
    color: "Хаки",
    image: unsplash("1548883354-94bcfe321cbb"),
    description:
      "Утеплённая парка с капюшоном и множеством карманов. Тепло до −15°C.",
  },
  {
    id: 12,
    name: "Adidas Firebird Tracksuit",
    brand: "Adidas",
    gender: "women",
    category: "trousers",
    size: "S",
    price: 1500,
    condition: "Отличное",
    color: "Жёлтый",
    image: unsplash("1515886657613-9f3515b0c78f"),
    description:
      "Спортивный костюм из блестящего трикотажа: олимпийка и брюки с лампасами.",
    isNew: true,
  },
  {
    id: 13,
    name: "Stüssy Peace Tee",
    brand: "Stüssy",
    gender: "women",
    category: "tshirts",
    size: "M",
    price: 650,
    condition: "Отличное",
    color: "Чёрный",
    image: unsplash("1503342217505-b0a15ec3261c"),
    description: "Свободная футболка с графичным принтом на груди.",
  },
  {
    id: 14,
    name: "Champion Reverse Weave Crew",
    brand: "Champion",
    gender: "women",
    category: "hoodies",
    size: "S",
    price: 850,
    condition: "Новое с биркой",
    color: "Белый",
    image: unsplash("1620799140408-edc6dcb6d633"),
    description:
      "Свитшот из плотного хлопка с фирменной технологией Reverse Weave — не садится после стирки.",
    isNew: true,
  },
  {
    id: 15,
    name: "Uniqlo Merino Sweater",
    brand: "Uniqlo",
    gender: "women",
    category: "hoodies",
    size: "M",
    price: 600,
    condition: "Отличное",
    color: "Оранжевый",
    image: unsplash("1578587018452-892bacefd3f2"),
    description: "Тонкий свитер из мериносовой шерсти. Мягкий и не колется.",
  },
  {
    id: 16,
    name: "Nike Phoenix Fleece Joggers",
    brand: "Nike",
    gender: "women",
    category: "trousers",
    size: "S",
    price: 750,
    condition: "Отличное",
    color: "Пудровый",
    image: unsplash("1594633312681-425c7b97ccd1"),
    description: "Флисовые джоггеры с высокой посадкой и манжетами.",
  },
  {
    id: 17,
    name: "Шерстяное пальто оверсайз",
    brand: "Max Mara",
    gender: "women",
    category: "jackets",
    size: "M",
    price: 4200,
    oldPrice: 5600,
    condition: "Отличное",
    color: "Голубой",
    image: unsplash("1539109136881-3be0616acf4b"),
    description:
      "Пальто из шерсти и кашемира свободного силуэта. Сухая чистка после покупки.",
  },
  {
    id: 18,
    name: "Кардиган и шорты",
    brand: "Ralph Lauren",
    gender: "kids",
    category: "hoodies",
    size: "110 см",
    price: 550,
    condition: "Отличное",
    color: "Тёмно-синий",
    image: unsplash("1519238263530-99bdd11df2ea"),
    description: "Комплект: хлопковый кардиган на пуговицах и шорты.",
  },
  {
    id: 19,
    name: "Футболка с мишкой",
    brand: "H&M",
    gender: "kids",
    category: "tshirts",
    size: "98 см",
    price: 250,
    condition: "Новое с биркой",
    color: "Белый",
    image: unsplash("1622290291468-a28f7a7dc6a8"),
    description: "Мягкая футболка из органического хлопка.",
    isNew: true,
  },
];

export const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

export const getProduct = (id: number) => products.find((p) => p.id === id);

export const formatPrice = (value: number) =>
  `${value.toLocaleString("ru-RU")} ₴`;
