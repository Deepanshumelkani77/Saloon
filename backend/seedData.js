const mongoose = require("mongoose");
const Service = require("./models/Service");
const Stylist = require("./models/Stylist");

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
  { serviceId: 'mens-haircut', name: 'Men\'s Haircut & Styling', price: '₹100', duration: 30, category: 'Men\'s Hair' },
  { serviceId: 'mens-shampoo', name: 'Men\'s Shampoo & Conditioning', price: '₹80', duration: 20, category: 'Men\'s Hair' },
  { serviceId: 'mens-head-massage', name: 'Men\'s Head Massage', price: '₹150', duration: 30, category: 'Men\'s Hair' },
  { serviceId: 'mens-hair-color', name: 'Men\'s Hair Color', price: '₹800', duration: 90, category: 'Men\'s Hair' },
  { serviceId: 'mens-highlights', name: 'Men\'s Hi-Lites', price: '₹1200', duration: 120, category: 'Men\'s Hair' },
  
  // Men's Beard Services
  { serviceId: 'beard-trim', name: 'Beard Trim & Styling', price: '₹50', duration: 15, category: 'Men\'s Grooming' },
  { serviceId: 'beard-color', name: 'Beard Color', price: '₹300', duration: 45, category: 'Men\'s Grooming' },
  { serviceId: 'shave', name: 'Traditional Shave', price: '₹80', duration: 30, category: 'Men\'s Grooming' },
  { serviceId: 'luxury-shave', name: 'Luxury Shave & Beard Spa', price: '₹500', duration: 60, category: 'Men\'s Grooming' },
  
  // Men's Hair Treatments
  { serviceId: 'mens-hair-spa', name: 'Men\'s Hair Spa', price: '₹800', duration: 90, category: 'Men\'s Treatments' },
  { serviceId: 'mens-straightening', name: 'Men\'s Hair Straightening', price: '₹1500', duration: 180, category: 'Men\'s Treatments' },
  { serviceId: 'mens-smoothening', name: 'Men\'s Hair Smoothening', price: '₹1200', duration: 150, category: 'Men\'s Treatments' },
  { serviceId: 'mens-scalp-treatment', name: 'Men\'s Scalp Treatment', price: '₹600', duration: 60, category: 'Men\'s Treatments' },
  
  // Men's Skin Care
  { serviceId: 'mens-cleanup', name: 'Men\'s Clean Up', price: '₹400', duration: 45, category: 'Men\'s Skincare' },
  { serviceId: 'mens-facial', name: 'Men\'s Facial', price: '₹800', duration: 60, category: 'Men\'s Skincare' },
  { serviceId: 'mens-manicure', name: 'Men\'s Manicure', price: '₹300', duration: 45, category: 'Men\'s Skincare' },
  { serviceId: 'mens-pedicure', name: 'Men\'s Pedicure', price: '₹400', duration: 60, category: 'Men\'s Skincare' },
  
  // Women's Hair Services
  { serviceId: 'womens-haircut', name: 'Women\'s Haircut', price: '₹500', duration: 60, category: 'Women\'s Hair' },
  { serviceId: 'womens-ironing', name: 'Hair Ironing', price: '₹300', duration: 45, category: 'Women\'s Hair' },
  { serviceId: 'womens-blow-dry', name: 'Blow Dry', price: '₹400', duration: 45, category: 'Women\'s Hair' },
  { serviceId: 'womens-shampoo', name: 'Women\'s Shampoo & Conditioning', price: '₹200', duration: 30, category: 'Women\'s Hair' },
  { serviceId: 'womens-head-massage', name: 'Women\'s Head Massage', price: '₹250', duration: 30, category: 'Women\'s Hair' },
  { serviceId: 'roller-setting', name: 'Roller Setting', price: '₹350', duration: 60, category: 'Women\'s Hair' },
  { serviceId: 'hair-oiling', name: 'Hair Oiling', price: '₹150', duration: 20, category: 'Women\'s Hair' },
  
  // Women's Hair Color
  { serviceId: 'global-coloring', name: 'Global Hair Coloring', price: '₹1500', duration: 120, category: 'Women\'s Color' },
  { serviceId: 'root-touch-up', name: 'Root Touch Up', price: '₹800', duration: 90, category: 'Women\'s Color' },
  
  // Women's Hair Treatments
  { serviceId: 'womens-rebonding', name: 'Hair Rebonding', price: '₹3000', duration: 240, category: 'Women\'s Treatments' },
  { serviceId: 'womens-perming', name: 'Hair Perming', price: '₹2000', duration: 180, category: 'Women\'s Treatments' },
  { serviceId: 'keratin-treatment', name: 'Keratin Treatment', price: '₹2500', duration: 200, category: 'Women\'s Treatments' },
  { serviceId: 'womens-smoothening', name: 'Hair Smoothening', price: '₹1800', duration: 180, category: 'Women\'s Treatments' },
  { serviceId: 'womens-spa-treatment', name: 'Hair Spa Treatment', price: '₹1000', duration: 90, category: 'Women\'s Treatments' },
  { serviceId: 'volumizing', name: 'Hair Volumizing', price: '₹1200', duration: 120, category: 'Women\'s Treatments' },
  { serviceId: 'color-protection', name: 'Color Protection Treatment', price: '₹800', duration: 60, category: 'Women\'s Treatments' },
  
  // Women's Makeup
  { serviceId: 'party-makeup', name: 'Party Make Up', price: '₹1500', duration: 90, category: 'Women\'s Makeup' },
  { serviceId: 'engagement-makeup', name: 'Engagement Make Up', price: '₹2500', duration: 120, category: 'Women\'s Makeup' },
  { serviceId: 'bridal-makeup', name: 'Bridal & Reception Make Up', price: '₹5000', duration: 180, category: 'Women\'s Makeup' },
  { serviceId: 'base-makeup', name: 'Base Make Up', price: '₹800', duration: 60, category: 'Women\'s Makeup' },
  { serviceId: 'eye-makeup', name: 'Eye Make Up', price: '₹600', duration: 45, category: 'Women\'s Makeup' },
  
  // Women's Facials & Skin Care
  { serviceId: 'womens-bleach', name: 'Bleach', price: '₹300', duration: 30, category: 'Women\'s Skincare' },
  { serviceId: 'luxury-facials', name: 'Luxury Facials/Rituals', price: '₹1200', duration: 75, category: 'Women\'s Skincare' },
  { serviceId: 'womens-cleanup', name: 'Women\'s Clean Up', price: '₹500', duration: 45, category: 'Women\'s Skincare' },
  { serviceId: 'body-polishing', name: 'Body Polishing/Rejuvenation', price: '₹1500', duration: 120, category: 'Women\'s Skincare' },
  { serviceId: 'threading', name: 'Threading', price: '₹100', duration: 15, category: 'Women\'s Skincare' },
  
  // Women's Hand & Feet Care
  { serviceId: 'womens-manicure', name: 'Women\'s Manicure', price: '₹600', duration: 45, category: 'Women\'s Nails' },
  { serviceId: 'spa-manicure', name: 'Spa Manicure', price: '₹800', duration: 60, category: 'Women\'s Nails' },
  { serviceId: 'womens-pedicure', name: 'Women\'s Pedicure', price: '₹800', duration: 60, category: 'Women\'s Nails' },
  { serviceId: 'spa-pedicure', name: 'Spa Pedicure', price: '₹1000', duration: 75, category: 'Women\'s Nails' },
  { serviceId: 'waxing', name: 'Waxing', price: '₹400', duration: 45, category: 'Women\'s Skincare' },
  
  // Women's Nail Care
  { serviceId: 'nail-paint', name: 'Nail Paint', price: '₹200', duration: 30, category: 'Women\'s Nails' },
  { serviceId: 'nail-art', name: 'Nail Art', price: '₹500', duration: 60, category: 'Women\'s Nails' },
  { serviceId: 'nail-filling', name: 'Nail Filing', price: '₹150', duration: 20, category: 'Women\'s Nails' }
];

const stylists = [
  { stylistId: 'ansar', name: 'Ansar Salmani', specialty: 'Owner & Master Stylist', experience: '10+ years' },
  { stylistId: 'rahul', name: 'Rahul Kumar', specialty: 'Hair Specialist', experience: '7 years' },
  { stylistId: 'priya', name: 'Priya Sharma', specialty: 'Ladies Specialist', experience: '5 years' },
  { stylistId: 'amit', name: 'Amit Singh', specialty: 'Beard & Grooming Expert', experience: '6 years' }
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
