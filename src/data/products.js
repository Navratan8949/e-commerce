// LUMÉRA Curated Product Catalog — 28 Luxury Fashion & Lifestyle Essentials

const products = [
  // --- WOMEN (6 Products) ---
  {
    id: 'w-1',
    slug: 'oversized-linen-shirt',
    name: 'Oversized Linen Shirt',
    category: 'women',
    subcategory: 'Shirts & Tops',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    description: 'Cut from 100% breathable French flax linen, this relaxed-fit shirt features a dropped shoulder silhouette, mother-of-pearl buttons, and a clean curved hem designed for effortless day-to-evening dressing.',
    details: [
      '100% Normandy flax linen',
      'Relaxed, slightly dropped shoulder fit',
      'Concealed placket with natural shell buttons',
      'Pre-washed for signature soft hand-feel'
    ],
    care: ['Gentle machine wash cold', 'Line dry in shade', 'Warm iron if desired'],
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Oatmeal Taupe', hex: '#D6C7B2' },
      { name: 'Midnight Charcoal', hex: '#262626' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewCount: 142,
    tags: ['linen', 'bestseller', 'summer'],
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    stock: 24
  },
  {
    id: 'w-2',
    slug: 'satin-slip-dress',
    name: 'Satin Slip Dress',
    category: 'women',
    subcategory: 'Dresses',
    price: 5499,
    originalPrice: 7499,
    discount: 27,
    description: 'An architectural 90s-inspired slip dress crafted from heavyweight silk-blend satin. Cut on the bias to skim the contours of the body with refined minimalist spaghetti straps.',
    details: [
      'Heavyweight silk-viscose satin',
      'Bias cut for fluid drape',
      'Delicate adjustable shoulder straps',
      'Deep V-neckline and subtle side slit'
    ],
    care: ['Dry clean only', 'Steam lightly from distance'],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Champagne Ivory', hex: '#EFE8DC' },
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Olive Bronze', hex: '#5E5742' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewCount: 98,
    tags: ['evening', 'silk', 'featured'],
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    stock: 16
  },
  {
    id: 'w-3',
    slug: 'tailored-blazer',
    name: 'Tailored Blazer',
    category: 'women',
    subcategory: 'Outerwear',
    price: 8999,
    originalPrice: 11999,
    discount: 25,
    description: 'A sharp, double-breasted silhouette made from premium virgin wool and recycled fibers. Featuring defined shoulders, horn buttons, and a viscose lining for smooth layering.',
    details: [
      'Italian virgin wool blend',
      'Lightly padded structured shoulders',
      'Notched lapels and dual back vents',
      'Full cupro lining'
    ],
    care: ['Specialist dry clean only'],
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Warm Ecru', hex: '#EAE5D9' },
      { name: 'Classic Black', hex: '#1C1C1C' },
      { name: 'Muted Camel', hex: '#B89772' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 5.0,
    reviewCount: 86,
    tags: ['tailoring', 'outerwear', 'luxury'],
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    stock: 12
  },
  {
    id: 'w-4',
    slug: 'relaxed-wide-leg-pants',
    name: 'Relaxed Wide-Leg Pants',
    category: 'women',
    subcategory: 'Trousers',
    price: 4499,
    originalPrice: 5999,
    discount: 25,
    description: 'Fluid drape with tailored waist pleats. These wide-leg trousers bridge relaxed elegance and boardroom sophistication with high-rise structure and deep slant pockets.',
    details: [
      'Lyocell and organic cotton blend',
      'High-waisted tailored waistband',
      'Deep double front pleats',
      'Wide floor-length hems'
    ],
    care: ['Machine wash cold, delicate cycle', 'Do not tumble dry'],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Ivory Sand', hex: '#F0ECE1' },
      { name: 'Smoked Ash', hex: '#4A4846' },
      { name: 'Soft Olive', hex: '#7D7A68' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviewCount: 74,
    tags: ['trousers', 'minimal', 'everyday'],
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    stock: 30
  },
  {
    id: 'w-5',
    slug: 'ribbed-knit-top',
    name: 'Ribbed Knit Top',
    category: 'women',
    subcategory: 'Knitwear',
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    description: 'Spun from extra-fine Merino wool and organic cotton yarns. A sculpted silhouette with a subtle boat neckline and elongated slim sleeves that graze the knuckle.',
    details: [
      '70% Extra-fine Merino wool, 30% organic cotton',
      'Micro-rib texture with natural stretch',
      'Clean finished boat neckline',
      'Seamless body construction'
    ],
    care: ['Hand wash cold with wool detergent', 'Dry flat in shade'],
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Ecru Heather', hex: '#EDE8DF' },
      { name: 'Espresso', hex: '#3B2F2F' },
      { name: 'Soft Black', hex: '#222222' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewCount: 110,
    tags: ['knitwear', 'essentials'],
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    stock: 45
  },
  {
    id: 'w-6',
    slug: 'minimal-midi-dress',
    name: 'Minimal Midi Dress',
    category: 'women',
    subcategory: 'Dresses',
    price: 6499,
    originalPrice: 8499,
    discount: 24,
    description: 'Architectural column dress tailored from matte crepe. Defined by a square neckline, clean side seams, and a discreet back walking slit for effortless stride.',
    details: [
      'Heavyweight crepe jersey',
      'Square neckline front and back',
      'Concealed invisible zip closure',
      'Ankle-grazing column silhouette'
    ],
    care: ['Gentle dry clean or cold hand wash'],
    images: [
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Black', hex: '#141414' },
      { name: 'Bone Taupe', hex: '#DED6C9' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.9,
    reviewCount: 63,
    tags: ['dress', 'editorial', 'modern'],
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    stock: 18
  },

  // --- MEN (6 Products) ---
  {
    id: 'm-1',
    slug: 'premium-oxford-shirt',
    name: 'Premium Oxford Shirt',
    category: 'men',
    subcategory: 'Shirts',
    price: 3999,
    originalPrice: 5299,
    discount: 25,
    description: 'Woven with dense 2-ply pinpoint cotton yarns for superior structure and longevity. Features an unfused button-down collar with an immaculate natural roll and mother-of-pearl buttons.',
    details: [
      '100% Supima long-staple cotton',
      'Soft unfused button-down collar',
      'Single rounded cuff with dual button positions',
      'Curved tail hem for tucked or untucked wear'
    ],
    care: ['Machine wash warm', 'Hang dry or medium iron'],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sky White', hex: '#FFFFFF' },
      { name: 'Pale Chambray', hex: '#BAC9DB' },
      { name: 'French Blue', hex: '#4B6B94' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewCount: 168,
    tags: ['oxford', 'shirting', 'bestseller'],
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    stock: 35
  },
  {
    id: 'm-2',
    slug: 'relaxed-linen-shirt',
    name: 'Relaxed Linen Shirt',
    category: 'men',
    subcategory: 'Shirts',
    price: 3799,
    originalPrice: 4999,
    discount: 24,
    description: 'An easy-going summer essential woven from certified European flax. Crafted with a casual camp collar, chest pocket, and garment-dyed for subtle tonal depth.',
    details: [
      '100% Certified European linen',
      'Modern camp collar',
      'Relaxed straight hem with side vents',
      'Pre-shrunk finish'
    ],
    care: ['Machine wash cold', 'Line dry in shade'],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Natural Sand', hex: '#DCD4C4' },
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Deep Olive', hex: '#4D5342' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 92,
    tags: ['linen', 'summer', 'casual'],
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    stock: 28
  },
  {
    id: 'm-3',
    slug: 'tailored-trousers',
    name: 'Tailored Trousers',
    category: 'men',
    subcategory: 'Pants',
    price: 5499,
    originalPrice: 6999,
    discount: 21,
    description: 'Precision cut from high-twist wool-cotton twill with wrinkle-resistant properties. Features tailored side-adjusters, clean single pleats, and a tapered hem.',
    details: [
      'Wool and cotton high-twist twill',
      'Side waist adjusters (belt-free clean finish)',
      'Single front pleat with pressed creases',
      'Interior curtain waistband'
    ],
    care: ['Dry clean recommended'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Charcoal Grey', hex: '#343639' },
      { name: 'Navy Stone', hex: '#1C2536' },
      { name: 'Taupe Khaki', hex: '#8C8275' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewCount: 114,
    tags: ['trousers', 'tailoring', 'menswear'],
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    stock: 22
  },
  {
    id: 'm-4',
    slug: 'essential-overshirt',
    name: 'Essential Overshirt',
    category: 'men',
    subcategory: 'Outerwear',
    price: 4999,
    originalPrice: 6499,
    discount: 23,
    description: 'A heavyweight cotton twill layer designed to transition effortlessly across seasons. Equipped with dual chest patch pockets and custom matte metal snaps.',
    details: [
      '380 GSM Heavyweight cotton moleskin twill',
      'Reinforced twin-needle stitching',
      'Dual chest flap pockets with concealed snaps',
      'Straight cut hem with subtle side slits'
    ],
    care: ['Machine wash cold inside out', 'Hang dry'],
    images: [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Fossil Taupe', hex: '#A39988' },
      { name: 'Forest Night', hex: '#2E352C' },
      { name: 'Washed Black', hex: '#2B2B2B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviewCount: 78,
    tags: ['overshirt', 'layering', 'outerwear'],
    isNew: false,
    isFeatured: false,
    isBestSeller: false,
    stock: 19
  },
  {
    id: 'm-5',
    slug: 'classic-polo',
    name: 'Classic Polo',
    category: 'men',
    subcategory: 'Polos',
    price: 2799,
    originalPrice: 3599,
    discount: 22,
    description: 'Crafted from breathable double-mercerized Pima cotton jersey for a subtle natural sheen. Finished with a flat-knit ribbed collar and a tailored two-button placket.',
    details: [
      '100% Peruvian Pima cotton',
      'Double mercerized for lustrous finish and colour retention',
      'Mother-of-pearl buttons',
      'Vented side hems'
    ],
    care: ['Machine wash cold', 'Dry flat', 'Cool iron'],
    images: [
      'https://images.unsplash.com/photo-1625910513413-5fc4b18dfa73?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Vintage Cream', hex: '#F3EFE6' },
      { name: 'Deep Navy', hex: '#162238' },
      { name: 'Sage Green', hex: '#586756' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 95,
    tags: ['polo', 'essentials', 'cotton'],
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    stock: 40
  },
  {
    id: 'm-6',
    slug: 'structured-blazer',
    name: 'Structured Blazer',
    category: 'men',
    subcategory: 'Blazers',
    price: 9999,
    originalPrice: 13999,
    discount: 29,
    description: 'An unstructured tailored jacket crafted in Italy from hopsack wool. Lightweight, breathable, and designed with patch pockets for effortless Mediterranean elegance.',
    details: [
      'Italian breathable hopsack wool',
      'Half-canvas interior construction',
      'Barchetta chest pocket and patch hip pockets',
      'Unpadded natural shoulders'
    ],
    care: ['Professional dry clean only'],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Midnight Navy', hex: '#131B2A' },
      { name: 'Espresso Melange', hex: '#392F29' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 5.0,
    reviewCount: 61,
    tags: ['blazer', 'tailoring', 'luxury'],
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    stock: 14
  },

  // --- ACCESSORIES (6 Products) ---
  {
    id: 'a-1',
    slug: 'leather-tote',
    name: 'Leather Tote',
    category: 'accessories',
    subcategory: 'Bags',
    price: 7999,
    originalPrice: 10499,
    discount: 24,
    description: 'Sculpted from vegetable-tanned full-grain Italian calf leather that develops a rich, personal patina over years of use. Fits up to a 16-inch laptop with ease.',
    details: [
      'Full-grain Tuscan vegetable-tanned leather',
      'Solid brass hardware with matte brushed finish',
      'Interior zippered safety pocket and key leash',
      'Structured reinforced base with protective feet'
    ],
    care: ['Treat with natural leather balm twice yearly', 'Store in cotton dust bag'],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Cognac Saddle', hex: '#9E5B32' },
      { name: 'Deep Black', hex: '#171717' },
      { name: 'Sand Taupe', hex: '#B8A898' }
    ],
    sizes: ['One Size'],
    rating: 4.9,
    reviewCount: 154,
    tags: ['leather', 'tote', 'bestseller', 'work'],
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    stock: 25
  },
  {
    id: 'a-2',
    slug: 'minimal-shoulder-bag',
    name: 'Minimal Shoulder Bag',
    category: 'accessories',
    subcategory: 'Bags',
    price: 5999,
    originalPrice: 7999,
    discount: 25,
    description: 'A sculptural curved silhouette featuring a magnetic closure, ultra-smooth nappa calf leather, and a wide adjustable shoulder strap that sits flush under the arm.',
    details: [
      'Semi-matte Italian nappa leather',
      'Concealed magnetic frame closure',
      'Cotton canvas interior lining with card slip',
      'Adjustable strap drop from 20cm to 35cm'
    ],
    care: ['Wipe clean with a damp soft microfiber cloth'],
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Warm Cream', hex: '#F0ECE3' },
      { name: 'Noir', hex: '#111111' },
      { name: 'Olive Leaf', hex: '#4B4E3E' }
    ],
    sizes: ['One Size'],
    rating: 4.8,
    reviewCount: 88,
    tags: ['shoulder bag', 'minimal', 'leather'],
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    stock: 20
  },
  {
    id: 'a-3',
    slug: 'classic-watch',
    name: 'Classic Watch',
    category: 'accessories',
    subcategory: 'Watches',
    price: 11999,
    originalPrice: 15999,
    discount: 25,
    description: 'A 38mm surgical grade 316L stainless steel timepiece with Japanese Miyota quartz movement, sapphire crystal glass, and a handcrafted Horween leather strap.',
    details: [
      '38mm diameter, 7.2mm ultra-slim case profile',
      'Anti-reflective coated sapphire crystal glass',
      '5 ATM water resistance (50 meters)',
      'Quick-release Horween leather band'
    ],
    care: ['Rinse with fresh water after saltwater exposure'],
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Brushed Silver / Black', hex: '#CCCCCC' },
      { name: 'Rose Gold / Caramel', hex: '#B87A65' }
    ],
    sizes: ['38mm'],
    rating: 5.0,
    reviewCount: 72,
    tags: ['watch', 'timepiece', 'luxury'],
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    stock: 15
  },
  {
    id: 'a-4',
    slug: 'leather-belt',
    name: 'Leather Belt',
    category: 'accessories',
    subcategory: 'Belts',
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    description: 'Hand-burnished bridle leather with a minimalist bevelled buckle finished in brushed gunmetal. The 30mm width seamlessly fits tailored trousers and denim.',
    details: [
      'Full-grain English bridle leather (3.5mm thick)',
      'Solid zinc alloy buckle with satin finish',
      'Hand-painted and burnished edges',
      'Stamped with discreet LUMÉRA monogram'
    ],
    care: ['Condition with leather wax once a year'],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Vintage Tan', hex: '#874D23' },
      { name: 'Matte Black', hex: '#1C1C1C' },
      { name: 'Dark Mahogany', hex: '#48261E' }
    ],
    sizes: ['S (30-32)', 'M (34-36)', 'L (38-40)'],
    rating: 4.8,
    reviewCount: 124,
    tags: ['belt', 'essentials', 'leather'],
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    stock: 50
  },
  {
    id: 'a-5',
    slug: 'premium-sunglasses',
    name: 'Premium Sunglasses',
    category: 'accessories',
    subcategory: 'Eyewear',
    price: 4999,
    originalPrice: 6999,
    discount: 29,
    description: 'Hand-polished Italian Mazzucchelli acetate frames with polarized category 3 lenses. Offers 100% UVA/UVB protection with durable seven-barrel barrel hinges.',
    details: [
      'Plant-based Italian cellulose acetate',
      'CR-39 polarized lenses with anti-scratch coating',
      'Custom wire core visible through temples',
      'Includes hard case and microfibre pouch'
    ],
    care: ['Wash with warm water and mild soap, dry with lens cloth'],
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Amber Havana', hex: '#633B18' },
      { name: 'Crystal Slate', hex: '#949CA6' },
      { name: 'Piano Black', hex: '#101010' }
    ],
    sizes: ['Standard Fit'],
    rating: 4.9,
    reviewCount: 89,
    tags: ['sunglasses', 'eyewear', 'acetate'],
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    stock: 30
  },
  {
    id: 'a-6',
    slug: 'everyday-backpack',
    name: 'Everyday Backpack',
    category: 'accessories',
    subcategory: 'Bags',
    price: 6999,
    originalPrice: 8999,
    discount: 22,
    description: 'Constructed from weatherproof waxed cotton canvas and trimmed with full-grain leather. Thoughtfully engineered with a padded 16-inch laptop pocket and luggage pass-through.',
    details: [
      'Heavyweight water-resistant waxed canvas',
      'Padded neoprene compartment for 16" MacBook Pro',
      'Hidden quick-access passport pocket on rear panel',
      'Ergonomic contoured shoulder straps'
    ],
    care: ['Spot clean with cold water; do not machine wash'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Washed Olive', hex: '#3E4433' },
      { name: 'Graphite Grey', hex: '#333538' },
      { name: 'Desert Sand', hex: '#B5A691' }
    ],
    sizes: ['20L'],
    rating: 4.8,
    reviewCount: 97,
    tags: ['backpack', 'commute', 'travel'],
    isNew: false,
    isFeatured: false,
    isBestSeller: false,
    stock: 22
  },

  // --- NEW ARRIVALS (6 Products) ---
  {
    id: 'na-1',
    slug: 'sculpted-wool-coat',
    name: 'Sculpted Wool Coat',
    category: 'new-arrivals',
    subcategory: 'Outerwear',
    price: 13999,
    originalPrice: 17999,
    discount: 22,
    description: 'An architectural double-faced wool trench coat with raglan sleeves, a removable belted waist tie, and a statement high lapel for dramatic presence and insulation.',
    details: [
      '90% Australian merino wool, 10% Cashmere',
      'Double-face hand-stitched seam construction',
      'Removable sash belt with self-fabric loops',
      'Deep welt storm pockets'
    ],
    care: ['Specialist dry clean only'],
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Camel Oatmeal', hex: '#B89772' },
      { name: 'Midnight Charcoal', hex: '#242426' }
    ],
    sizes: ['S', 'M', 'L'],
    rating: 5.0,
    reviewCount: 29,
    tags: ['new', 'coat', 'winter', 'wool'],
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    stock: 12
  },
  {
    id: 'na-2',
    slug: 'cashmere-mock-neck-sweater',
    name: 'Cashmere Mock-Neck Sweater',
    category: 'new-arrivals',
    subcategory: 'Knitwear',
    price: 8499,
    originalPrice: 10999,
    discount: 23,
    description: 'Spun from Grade-A Mongolian cashmere with a cloud-like feel. Features a softly structured mock neckline, seamless tubular hem, and ribbed cuffs.',
    details: [
      '100% Grade-A Mongolian cashmere (2-ply 12-gauge)',
      'Subtle mock neck standing collar',
      'Featherweight warmth with zero itch',
      'Sustainably sourced yarn'
    ],
    care: ['Hand wash in lukewarm water with cashmere shampoo', 'Dry flat on towel'],
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Cloud Cream', hex: '#F5EFE6' },
      { name: 'Soft Taupe', hex: '#9E9282' },
      { name: 'Slate Blue', hex: '#586A7A' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewCount: 42,
    tags: ['new', 'cashmere', 'knitwear'],
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    stock: 18
  },
  {
    id: 'na-3',
    slug: 'pleated-palazzo-trousers',
    name: 'Pleated Palazzo Trousers',
    category: 'new-arrivals',
    subcategory: 'Trousers',
    price: 5299,
    originalPrice: 6999,
    discount: 24,
    description: 'Dramatic wide-leg silhouette that flows like a maxi skirt while moving. Cut from fluid tencel-wool with an internal elasticated back for supreme day-long comfort.',
    details: [
      'Tencel lyocell with trace elastane',
      'High-rise waist with tailored front waistband',
      'Deep architectural origami pleating',
      'Dual concealed side pockets'
    ],
    care: ['Delicate cold cycle', 'Hang to dry'],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Bone Ivory', hex: '#EDE7DC' },
      { name: 'Pitch Black', hex: '#111111' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewCount: 38,
    tags: ['new', 'palazzo', 'statement'],
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    stock: 20
  },
  {
    id: 'na-4',
    slug: 'merino-knit-cardigan',
    name: 'Merino Knit Cardigan',
    category: 'new-arrivals',
    subcategory: 'Knitwear',
    price: 6999,
    originalPrice: 8999,
    discount: 22,
    description: 'A relaxed boxy cardigan crafted from heavyweight ribbed Australian merino wool. Finished with chunky horn-effect buttons and deep front patch pockets.',
    details: [
      '100% Extrafine Australian merino wool',
      'Chunky 5-gauge cardigan stitch',
      'Genuine corozo nut buttons',
      'Slightly cropped modern proportion'
    ],
    care: ['Hand wash cold or gentle wool cycle'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sandstone', hex: '#C2B6A3' },
      { name: 'Charcoal', hex: '#2F3033' },
      { name: 'Forest Green', hex: '#29352A' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewCount: 31,
    tags: ['new', 'cardigan', 'merino'],
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    stock: 24
  },
  {
    id: 'na-5',
    slug: 'handcrafted-leather-mules',
    name: 'Handcrafted Leather Mules',
    category: 'new-arrivals',
    subcategory: 'Footwear',
    price: 7499,
    originalPrice: 9999,
    discount: 25,
    description: 'Sculptural backless mules crafted in Spain with supple butter-soft calfskin leather, a square toe, and a comfortable 40mm stacked block heel.',
    details: [
      'Full-grain Spanish calfskin leather upper',
      'Cushioned memory foam insole',
      '40mm natural leather stacked heel',
      'Durable non-slip rubber insert on leather sole'
    ],
    care: ['Store with shoe trees, polish with neutral cream'],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Butter Nappa', hex: '#F0EAD6' },
      { name: 'Ebony', hex: '#191919' }
    ],
    sizes: ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40'],
    rating: 5.0,
    reviewCount: 19,
    tags: ['new', 'shoes', 'footwear', 'leather'],
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    stock: 14
  },
  {
    id: 'na-6',
    slug: 'linen-blend-safari-jacket',
    name: 'Linen-Blend Safari Jacket',
    category: 'new-arrivals',
    subcategory: 'Outerwear',
    price: 7999,
    originalPrice: 10499,
    discount: 24,
    description: 'A contemporary take on timeless utility wear. Cut from a textured linen-cotton herringbone with four bellows pockets and an internal drawstring waist cinch.',
    details: [
      '55% French linen, 45% Organic cotton',
      'Four gusseted military patch pockets',
      'Internal waist drawstring for adjustable silhouette',
      'Unlined body for optimum warm-weather breathability'
    ],
    care: ['Gentle cycle cold', 'Warm iron'],
    images: [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sahara Khaki', hex: '#B59E7E' },
      { name: 'Dark Navy', hex: '#1B2433' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 22,
    tags: ['new', 'jacket', 'safari', 'outerwear'],
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    stock: 16
  },

  // --- ADDITIONAL CURATED PIECES (2 Extra to total 26 products) ---
  {
    id: 'w-7',
    slug: 'cashmere-blend-wrap-coat',
    name: 'Cashmere-Blend Wrap Coat',
    category: 'women',
    subcategory: 'Outerwear',
    price: 14999,
    originalPrice: 19999,
    discount: 25,
    description: 'An unstructured wrap coat with an oversized shawl collar and sweeping ankle hem. Spun from double-faced cashmere and virgin wool for weightless warmth.',
    details: [
      '70% Virgin wool, 30% Mongolian cashmere',
      'Hand-finished split seams',
      'Oversized shawl lapel',
      'Self-tie belt with belt loops'
    ],
    care: ['Specialist dry clean only'],
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Warm Taupe', hex: '#A89988' },
      { name: 'Onyx', hex: '#141414' }
    ],
    sizes: ['S', 'M', 'L'],
    rating: 5.0,
    reviewCount: 47,
    tags: ['luxury', 'coat', 'winter'],
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    stock: 10
  },
  {
    id: 'm-7',
    slug: 'heavyweight-waffle-knit-crewneck',
    name: 'Heavyweight Waffle Knit Crewneck',
    category: 'men',
    subcategory: 'Knitwear',
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    description: 'Densely knitted thermal cotton with a textured waffle grid weave. Perfect as a standalone statement or layered under tailored blazers and overshirts.',
    details: [
      '100% Ring-spun heavyweight combed cotton (420 GSM)',
      'Thermal thermal honeycomb weave',
      'Reinforced stretch rib collar and cuffs',
      'Flatlock comfort seam construction'
    ],
    care: ['Machine wash cold with like colors', 'Lay flat to dry'],
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Ecru Chalk', hex: '#EBE5D8' },
      { name: 'Washed Charcoal', hex: '#37383B' },
      { name: 'Moss Green', hex: '#434A3E' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 83,
    tags: ['knitwear', 'thermal', 'casual'],
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    stock: 35
  }
];

export default products;
