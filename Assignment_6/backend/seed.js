import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';

dotenv.config();

const seedProducts = [
  {
    name: 'Nike Dunk Low',
    subtitle: '1 Colour',
    price: 9127,
    colours: [{ name: 'White/Black', code: '#FFFFFF' }],
    category: 'Men',
    imageUrl: '/images/nike-dunk-low.png',
    description: 'Classic Nike Dunk Low sneaker',
    isFeatured: true,
    isNew: false,
    stock: 50,
  },
  {
    name: 'Air Jordan 1 Low',
    subtitle: '1 Colour',
    price: 5807,
    colours: [{ name: 'Black/Red', code: '#000000' }],
    category: 'Men',
    imageUrl: '/images/aj1-low.png',
    description: 'Air Jordan 1 Low',
    isFeatured: true,
    isNew: false,
    stock: 45,
  },
  {
    name: 'Nike Air Max Plus 3',
    subtitle: '1 Colour',
    price: 15351,
    colours: [{ name: 'Black', code: '#000000' }],
    category: 'Men',
    imageUrl: '/images/airmax-plus-3.png',
    description: 'Nike Air Max Plus 3',
    isFeatured: true,
    isNew: false,
    stock: 30,
  },
  {
    name: 'Nike SB Dunk',
    subtitle: '1 Colour',
    price: 10787,
    colours: [{ name: 'White/Black', code: '#FFFFFF' }],
    category: 'Men',
    imageUrl: '/images/nike-sb-dunk.png',
    description: 'Nike SB Dunk',
    isFeatured: true,
    isNew: false,
    stock: 40,
  },
  {
    name: 'Jordan 1 Mid Kids',
    subtitle: '1 Colour',
    price: 5392,
    colours: [{ name: 'Red/Black/White', code: '#FF0000' }],
    category: 'Kids',
    imageUrl: '/images/jordan1-mid-kids.png',
    description: 'Jordan 1 Mid for Kids',
    isFeatured: false,
    isNew: true,
    stock: 60,
  },
  {
    name: 'Nike Dunk Low Retro',
    subtitle: '1 Colour',
    price: 9127,
    colours: [{ name: 'White/Black', code: '#FFFFFF' }],
    category: 'Men',
    imageUrl: '/images/dunk-low-retro.png',
    description: 'Nike Dunk Low Retro',
    isFeatured: false,
    isNew: true,
    stock: 55,
  },
  {
    name: 'Jordan 1 Mid SE Kids',
    subtitle: '1 Colour',
    price: 5392,
    colours: [{ name: 'Navy/White', code: '#000080' }],
    category: 'Kids',
    imageUrl: '/images/jordan1-mid-se-kids.png',
    description: 'Jordan 1 Mid SE for Kids',
    isFeatured: false,
    isNew: true,
    stock: 65,
  },
  {
    name: 'Nike Air Max 1 SC',
    subtitle: '1 Colour',
    price: 7467,
    colours: [{ name: 'White/Black', code: '#FFFFFF' }],
    category: 'Men',
    imageUrl: '/images/airmax1-sc.png',
    description: 'Nike Air Max 1 SC',
    isFeatured: false,
    isNew: true,
    stock: 50,
  },
  {
    name: 'Nike Air Max',
    subtitle: '1 Colour',
    price: 11617,
    colours: [{ name: 'Black', code: '#000000' }],
    category: 'Women',
    imageUrl: '/images/nike-airmax.png',
    description: 'Nike Air Max',
    isFeatured: false,
    isNew: true,
    stock: 40,
  },
  {
    name: 'Nike InfinityRN 4',
    subtitle: '1 Colour',
    price: 9127,
    colours: [{ name: 'White/Black', code: '#FFFFFF' }],
    category: 'Women',
    imageUrl: '/images/infinityrn-4.png',
    description: 'Nike InfinityRN 4',
    isFeatured: false,
    isNew: true,
    stock: 45,
  },
  {
    name: "Sabrina 1 'Ionic'",
    subtitle: '1 Colour',
    price: 9957,
    colours: [{ name: 'Black/Yellow', code: '#000000' }],
    category: 'Women',
    imageUrl: '/images/sabrina1-ionic.png',
    description: "Sabrina 1 'Ionic'",
    isFeatured: false,
    isNew: true,
    stock: 35,
  },
  {
    name: 'Nike Metcon 9 AMP',
    subtitle: '1 Colour',
    price: 11617,
    colours: [{ name: 'Black/Orange', code: '#000000' }],
    category: 'Women',
    imageUrl: '/images/metcon9-amp.png',
    description: 'Nike Metcon 9 AMP',
    isFeatured: false,
    isNew: true,
    stock: 50,
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert seed data
    await Product.insertMany(seedProducts);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
