const mongoose = require("mongoose");
const Service = require("./models/Service.js");
const Stylist = require("./models/Stylist.js");

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://deepumelkani123_db_user:bhumi77@cluster0.ghgjitk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

const services = [
  // Men's Hair Services
  { name: 'Men\'s Haircut & Styling', price: '₹100', duration: 30, category: 'Men\'s Hair' },
  { name: 'Men\'s Shampoo & Conditioning', price: '₹80', duration: 20, category: 'Men\'s Hair' },
  { name: 'Men\'s Head Massage', price: '₹150', duration: 30, category: 'Men\'s Hair' },
  { name: 'Men\'s Hair Color', price: '₹800', duration: 90, category: 'Men\'s Hair' },
  { name: 'Men\'s Hi-Lites', price: '₹1200', duration: 120, category: 'Men\'s Hair' },
  
  // Men's Beard Services
  { name: 'Beard Trim & Styling', price: '₹50', duration: 15, category: 'Men\'s Grooming' },
  { name: 'Beard Color', price: '₹300', duration: 45, category: 'Men\'s Grooming' },
  { name: 'Traditional Shave', price: '₹80', duration: 30, category: 'Men\'s Grooming' },
  { name: 'Luxury Shave & Beard Spa', price: '₹500', duration: 60, category: 'Men\'s Grooming' },
  
  // Men's Hair Treatments
  { name: 'Men\'s Hair Spa', price: '₹800', duration: 90, category: 'Men\'s Treatments' },
  { name: 'Men\'s Hair Straightening', price: '₹1500', duration: 180, category: 'Men\'s Treatments' },
  { name: 'Men\'s Hair Smoothening', price: '₹1200', duration: 150, category: 'Men\'s Treatments' },
  { name: 'Men\'s Scalp Treatment', price: '₹600', duration: 60, category: 'Men\'s Treatments' },
  
  // Men's Skin Care
  { name: 'Men\'s Clean Up', price: '₹400', duration: 45, category: 'Men\'s Skincare' },
  { name: 'Men\'s Facial', price: '₹800', duration: 60, category: 'Men\'s Skincare' },
  { name: 'Men\'s Manicure', price: '₹300', duration: 45, category: 'Men\'s Skincare' },
  { name: 'Men\'s Pedicure', price: '₹400', duration: 60, category: 'Men\'s Skincare' },
  
  // Women's Hair Services
  { name: 'Women\'s Haircut', price: '₹500', duration: 60, category: 'Women\'s Hair' },
  { name: 'Hair Ironing', price: '₹300', duration: 45, category: 'Women\'s Hair' },
  { name: 'Blow Dry', price: '₹400', duration: 45, category: 'Women\'s Hair' },
  { name: 'Women\'s Shampoo & Conditioning', price: '₹200', duration: 30, category: 'Women\'s Hair' },
  { name: 'Women\'s Head Massage', price: '₹250', duration: 30, category: 'Women\'s Hair' },
  { name: 'Roller Setting', price: '₹350', duration: 60, category: 'Women\'s Hair' },
  { name: 'Hair Oiling', price: '₹150', duration: 20, category: 'Women\'s Hair' },
  
  // Women's Hair Color
  { name: 'Global Hair Coloring', price: '₹1500', duration: 120, category: 'Women\'s Color' },
  { name: 'Root Touch Up', price: '₹800', duration: 90, category: 'Women\'s Color' },
  
  // Women's Hair Treatments
  { name: 'Hair Rebonding', price: '₹3000', duration: 240, category: 'Women\'s Treatments' },
  { name: 'Hair Perming', price: '₹2000', duration: 180, category: 'Women\'s Treatments' },
  { name: 'Keratin Treatment', price: '₹2500', duration: 200, category: 'Women\'s Treatments' },
  { name: 'Hair Smoothening', price: '₹1800', duration: 180, category: 'Women\'s Treatments' },
  { name: 'Hair Spa Treatment', price: '₹1000', duration: 90, category: 'Women\'s Treatments' },
  { name: 'Hair Volumizing', price: '₹1200', duration: 120, category: 'Women\'s Treatments' },
  { name: 'Color Protection Treatment', price: '₹800', duration: 60, category: 'Women\'s Treatments' },
  
  // Women's Makeup
  { name: 'Party Make Up', price: '₹1500', duration: 90, category: 'Women\'s Makeup' },
  { name: 'Engagement Make Up', price: '₹2500', duration: 120, category: 'Women\'s Makeup' },
  { name: 'Bridal & Reception Make Up', price: '₹5000', duration: 180, category: 'Women\'s Makeup' },
  { name: 'Base Make Up', price: '₹800', duration: 60, category: 'Women\'s Makeup' },
  { name: 'Eye Make Up', price: '₹600', duration: 45, category: 'Women\'s Makeup' },
  
  // Women's Facials & Skin Care
  { name: 'Bleach', price: '₹300', duration: 30, category: 'Women\'s Skincare' },
  { name: 'Luxury Facials/Rituals', price: '₹1200', duration: 75, category: 'Women\'s Skincare' },
  { name: 'Women\'s Clean Up', price: '₹500', duration: 45, category: 'Women\'s Skincare' },
  { name: 'Body Polishing/Rejuvenation', price: '₹1500', duration: 120, category: 'Women\'s Skincare' },
  { name: 'Threading', price: '₹100', duration: 15, category: 'Women\'s Skincare' },
  
  // Women's Hand & Feet Care
  { name: 'Women\'s Manicure', price: '₹600', duration: 45, category: 'Women\'s Nails' },
  { name: 'Spa Manicure', price: '₹800', duration: 60, category: 'Women\'s Nails' },
  { name: 'Women\'s Pedicure', price: '₹800', duration: 60, category: 'Women\'s Nails' },
  { name: 'Spa Pedicure', price: '₹1000', duration: 75, category: 'Women\'s Nails' },
  { name: 'Waxing', price: '₹400', duration: 45, category: 'Women\'s Skincare' },
  
  // Women's Nail Care
  { name: 'Nail Paint', price: '₹200', duration: 30, category: 'Women\'s Nails' },
  { name: 'Nail Art', price: '₹500', duration: 60, category: 'Women\'s Nails' },
  { name: 'Nail Filing', price: '₹150', duration: 20, category: 'Women\'s Nails' }
];

const stylists = [
  { name: 'Ansar Salmani', specialty: 'Owner & Master Stylist', experience: '10+ years' },
  { name: 'Rahul Kumar', specialty: 'Hair Specialist', experience: '7 years' },
  { name: 'Priya Sharma', specialty: 'Ladies Specialist', experience: '5 years' },
  { name: 'Amit Singh', specialty: 'Beard & Grooming Expert', experience: '6 years' }
];

const seedData = async () => {
  try {
    console.log("Starting data seeding...");
    
    // Clear existing data
    console.log("Clearing existing data...");
    await Service.deleteMany({});
    await Stylist.deleteMany({});
    console.log("Existing data cleared");
    
    // Insert services
    console.log("Inserting services...");
    const insertedServices = await Service.insertMany(services);
    console.log(`${insertedServices.length} services seeded successfully`);
    
    // Insert stylists one by one to catch any errors
    console.log("Inserting stylists...");
    for (const stylist of stylists) {
      try {
        const insertedStylist = await Stylist.create(stylist);
        console.log(`Stylist inserted: ${insertedStylist.name}`);
      } catch (stylistError) {
        console.error(`Error inserting stylist ${stylist.name}:`, stylistError.message);
      }
    }
    
    // Verify final count
    const serviceCount = await Service.countDocuments();
    const stylistCount = await Stylist.countDocuments();
    
    console.log(`Final count - Services: ${serviceCount}, Stylists: ${stylistCount}`);
    console.log("Data seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

// Run seeding
connectDB().then(() => {
  seedData();
});
