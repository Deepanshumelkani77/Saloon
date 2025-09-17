const mongoose = require("mongoose");
const Product = require("./models/Product.js");


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



const products = [
  // ================== HAIR ==================
  // Shampoo
  { name: "L’Oreal Men Shampoo ", image: "https://i.pinimg.com/1200x/a4/ea/2f/a4ea2fac3ae146e25e324b695e9095f7.jpg", size: 200, price: 299, category: "Hair", subCategory: "Shampoo", for: "Male", brand: "L’Oreal", count: 5},
  { name: "Dove Women Shampoo ", image: "https://i.pinimg.com/736x/fb/87/5f/fb875f0e302f6d5b28b33ae13b559c78.jpg", size: 250, price: 349, category: "Hair", subCategory: "Shampoo", for: "Female", brand: "Dove", count: 0 },
  { name: "Pantene Women Shampoo ", image: "https://i.pinimg.com/1200x/ec/64/40/ec644085bdfbd6142c1a4283e64c6fc0.jpg", size: 300, price: 399, category: "Hair", subCategory: "Shampoo", for: "Female", brand: "Pantene", count: 0 },
  { name: "Head & Shoulders Men Shampoo ", image: "https://i.pinimg.com/736x/a2/2c/84/a22c84f2850a130f623663cbd3663194.jpg", size: 200, price: 299, category: "Hair", subCategory: "Shampoo", for: "Male", brand: "Head & Shoulders", count: 0 },
  { name: "Tresemme Women Shampoo ", image: "https://i.pinimg.com/1200x/07/2f/7a/072f7ac2d0f8cada6b197d8803f38013.jpg", size: 250, price: 499, category: "Hair", subCategory: "Shampoo", for: "Female", brand: "Tresemme", count: 3 },

  // Conditioner
  { name: "L’Oreal Women Conditioner ", image: "https://i.pinimg.com/1200x/30/7e/c6/307ec648f0101e93d4262623dfa79323.jpg", size: 200, price: 399, category: "Hair", subCategory: "Conditioner", for: "Female", brand: "L’Oreal", count: 0 },
  { name: "Dove Men Conditioner ", image: "https://i.pinimg.com/1200x/a7/b3/93/a7b393e12b22ec52d38593b435ed7e9f.jpg", size: 180, price: 299, category: "Hair", subCategory: "Conditioner", for: "Male", brand: "Dove", count: 0 },
  { name: "Tresemme Women Conditioner ", image: "https://i.pinimg.com/1200x/84/dc/4a/84dc4a7e88a5da9ec3885d3ce4ac3cd0.jpg", size: 220, price: 449, category: "Hair", subCategory: "Conditioner", for: "Female", brand: "Tresemme", count: 0 },
  { name: "Pantene Women Conditioner ", image: "https://i.pinimg.com/1200x/aa/33/af/aa33af06522d51e992b4300c0c50737e.jpg", size: 250, price: 349, category: "Hair", subCategory: "Conditioner", for: "Female", brand: "Pantene", count: 0 },
  { name: "Herbal Essences Women Conditioner ", image: "https://i.pinimg.com/736x/f5/69/c2/f569c2d05d2681b8b8b62cd30676301e.jpg", size: 400, price: 399, category: "Hair", subCategory: "Conditioner", for: "Female", brand: "Herbal Essences", count: 0 },

  // Hair Oil
  { name: "Parachute Men Hair Oil ", image: "https://i.pinimg.com/1200x/2f/1d/5d/2f1d5daf302deff52f0ff8db91af9b60.jpg", size: 150, price: 199, category: "Hair", subCategory: "Hair Oil", for: "Male", brand: "Parachute", count: 0 },
  { name: "Bajaj Almond Women Hair Oil ", image: "https://i.pinimg.com/1200x/55/f5/9a/55f59a390968eb8174d8bc13556242b8.jpg", size: 200, price: 249, category: "Hair", subCategory: "Hair Oil", for: "Female", brand: "Bajaj", count: 0 },
  { name: "Indulekha Women Hair Oil ", image: "https://i.pinimg.com/736x/a0/6a/77/a06a777c0367ac6c75a0792f09018649.jpg", size: 100, price: 499, category: "Hair", subCategory: "Hair Oil", for: "Female", brand: "Indulekha", count: 0 },
  { name: "Kesh King Men Hair Oil ", image: "https://i.pinimg.com/1200x/5c/9b/b2/5c9bb293ffe58cf025c1885e87099576.jpg", size: 150, price: 299, category: "Hair", subCategory: "Hair Oil", for: "Male", brand: "Kesh King", count: 0 },
  { name: "L’Oreal Women Hair Oil ", image: "https://i.pinimg.com/736x/d1/a6/d3/d1a6d336ef66371819026832b738f119.jpg", size: 200, price: 399, category: "Hair", subCategory: "Hair Oil", for: "Female", brand: "L’Oreal", count: 0 },
  // Treatments & Serums
  { name: "L’Oreal Women Hair Serum ", image: "https://i.pinimg.com/736x/09/15/0e/09150ee8d1585dc677b8cdd1d8049392.jpg", size: 100, price: 699, category: "Hair", subCategory: "Treatments & Serums", for: "Female", brand: "L’Oreal", count: 0 },
  { name: "Matrix Men Hair Serum ", image: "https://i.pinimg.com/1200x/b2/2c/a4/b22ca4b15f0a155a6d0912679aada4f6.jpg", size: 80, price: 599, category: "Hair", subCategory: "Treatments & Serums", for: "Male", brand: "Matrix", count: 1 },
  { name: "Tresemme Women Hair Serum ", image: "https://i.pinimg.com/736x/cf/3c/99/cf3c99b341f8cdd53fba8c57b829409f.jpg", size: 120, price: 799, category: "Hair", subCategory: "Treatments & Serums", for: "Female", brand: "Tresemme", count: 0 },
  { name: "Schwarzkopf Men Hair Serum ", image: "https://i.pinimg.com/474x/70/2c/1e/702c1ed8a5be53880aef0e2e481d7a9f.jpg", size: 100, price: 999, category: "Hair", subCategory: "Treatments & Serums", for: "Male", brand: "Schwarzkopf", count: 0 },
  { name: "L’Oreal Men Hair Serum ", image: "https://i.pinimg.com/1200x/95/ac/c3/95acc323fccf60bf98f873eda8eba7c5.jpg", size: 150, price: 899, category: "Hair", subCategory: "Treatments & Serums", for: "Male", brand: "L’Oreal", count: 0 },

  // Hair Masks
  { name: "Tresemme Women Hair Mask ", image: "https://i.pinimg.com/1200x/b8/f8/b9/b8f8b9e25a7e3d1776835a13fbf3e648.jpg", size: 200, price: 799, category: "Hair", subCategory: "Hair Masks", for: "Female", brand: "Tresemme", count: 0 },
  { name: "L’Oreal Men Hair Mask ", image: "https://i.pinimg.com/736x/e5/44/d7/e544d71158bf8d24cf9d4acc35b0c894.jpg", size: 180, price: 699, category: "Hair", subCategory: "Hair Masks", for: "Male", brand: "L’Oreal", count: 0 },
  { name: "Matrix Women Hair Mask ", image: "https://i.pinimg.com/1200x/33/26/1e/33261ecc82b48c7d786c65a69057c748.jpg", size: 250, price: 899, category: "Hair", subCategory: "Hair Masks", for: "Female", brand: "Matrix", count: 0 },
  { name: "Schwarzkopf Men Hair Mask ", image: "https://i.pinimg.com/1200x/73/d0/c4/73d0c4791569218e30d871c87d707e1f.jpg", size: 220, price: 999, category: "Hair", subCategory: "Hair Masks", for: "Male", brand: "Schwarzkopf", count: 0 },
  { name: "Dove Women Hair Mask ", image: "https://i.pinimg.com/1200x/23/ab/29/23ab290b2976091320a2b567e719df2c.jpg", size: 200, price: 799, category: "Hair", subCategory: "Hair Masks", for: "Female", brand: "Dove", count: 0 },

  // Dry Shampoo
  { name: "Batiste Women Dry Shampoo ", image: "https://i.pinimg.com/736x/ef/a2/98/efa298b644212186706302e611acb060.jpg", size: 150, price: 699, category: "Hair", subCategory: "Dry Shampoo", for: "Female", brand: "Batiste", count: 0 },
  { name: "Tresemme Men Dry Shampoo ", image: "https://i.pinimg.com/1200x/f8/6f/f4/f86ff49dbbccea31e7748ee16082d45b.jpg", size: 200, price: 599, category: "Hair", subCategory: "Dry Shampoo", for: "Male", brand: "Tresemme", count: 0 },
  { name: "L’Oreal Women Dry Shampoo ", image: "https://i.pinimg.com/736x/73/d4/a9/73d4a9837d6d05fc54a867e888d7661e.jpg", size: 180, price: 799, category: "Hair", subCategory: "Dry Shampoo", for: "Female", brand: "L’Oreal", count: 0 },
  { name: "Schwarzkopf Men Dry Shampoo ", image: "https://i.pinimg.com/1200x/0f/20/d5/0f20d5e3bfb621ea8ffdfd7402035851.jpg", size: 200, price: 899, category: "Hair", subCategory: "Dry Shampoo", for: "Male", brand: "Schwarzkopf", count: 0 },
  { name: "Matrix Women Dry Shampoo ", image: "https://i.pinimg.com/736x/72/49/03/72490387b3e1cc0a33fc616493aa874c.jpg", size: 220, price: 999, category: "Hair", subCategory: "Dry Shampoo", for: "Female", brand: "Matrix", count: 0 },

  // Travel Size
  { name: "L’Oreal Travel Shampoo ", image: "https://i.pinimg.com/736x/bf/31/a6/bf31a68082ac366a508c2a008a4b169c.jpg", size: 50, price: 199, category: "Hair", subCategory: "Travel Size", for: "Male", brand: "L’Oreal", count: 0 },
  { name: "Dove Travel Conditioner ", image: "https://i.pinimg.com/1200x/c0/65/95/c065958d67e9782c616d1c6f49c0f35d.jpg", size: 60, price: 249, category: "Hair", subCategory: "Travel Size", for: "Female", brand: "Dove", count: 0 },
  { name: "Pantene Travel Hair Oil ", image: "https://i.pinimg.com/736x/8c/e7/92/8ce792b5871fff8cd609885066717b2b.jpg", size: 40, price: 149, category: "Hair", subCategory: "Travel Size", for: "Female", brand: "Pantene", count: 0 },
  { name: "Tresemme Travel Hair Mask ", image: "https://i.pinimg.com/1200x/0d/28/3f/0d283f42875fef95fbc589c3ed71871f.jpg", size: 70, price: 199, category: "Hair", subCategory: "Travel Size", for: "Male", brand: "Tresemme", count: 0 },
  { name: "Matrix Travel Hair Serum ", image: "https://i.pinimg.com/1200x/b2/2c/a4/b22ca4b15f0a155a6d0912679aada4f6.jpg", size: 60, price: 299, category: "Hair", subCategory: "Travel Size", for: "Female", brand: "Matrix", count: 0 },

  // Gifts & Bundles
  { name: "L’Oreal Hair Care Gift Set ", image: "https://i.pinimg.com/1200x/5e/1a/d4/5e1ad4c0f9aa16f6989c62931afc33fd.jpg", size: 500, price: 1299, category: "Hair", subCategory: "Gifts & Bundles", for: "Female", brand: "L’Oreal", count: 0 },
  { name: "Dove Hair Care Bundle ", image: "https://i.pinimg.com/736x/35/09/37/350937a11c0913ea84ea83021a8c20e7.jpg", size: 600, price: 1399, category: "Hair", subCategory: "Gifts & Bundles", for: "Male", brand: "Dove", count: 0 },
  { name: "Tresemme Styling Pack ", image: "https://i.pinimg.com/736x/4e/c8/b5/4ec8b505b1174cc536c25b60b2ecea65.jpg", size: 550, price: 1499, category: "Hair", subCategory: "Gifts & Bundles", for: "Female", brand: "Tresemme", count: 0 },
  { name: "Pantene Combo Pack ", image: "https://i.pinimg.com/736x/a6/c7/83/a6c7836d0deb19759e1e63fcbd37ceed.jpg", size: 580, price: 1599, category: "Hair", subCategory: "Gifts & Bundles", for: "Male", brand: "Pantene", count: 0 },
  { name: "Matrix Professional Bundle ", image: "https://i.pinimg.com/736x/b0/88/1d/b0881de1dc4cbf534506911ad61eedd1.jpg", size: 600, price: 1699, category: "Hair", subCategory: "Gifts & Bundles", for: "Female", brand: "Matrix", count: 0 },

  // ================== SKIN ==================
  // Moisturisers
  { name: "Nivea Men Moisturiser ", image: "https://i.pinimg.com/1200x/3d/f2/7c/3df27c2426623d37b38da8d529aab262.jpg", size: 50, price: 299, category: "Skin", subCategory: "Moisturisers", for: "Male", brand: "Nivea", count: 0 },
  { name: "Pond’s Women Moisturiser ", image: "https://i.pinimg.com/736x/33/24/3c/33243ccde40de9a169b8cdb481c722ca.jpg", size: 60, price: 349, category: "Skin", subCategory: "Moisturisers", for: "Female", brand: "Pond’s", count: 0 },
  { name: "Olay Women Moisturiser ", image: "https://i.pinimg.com/1200x/c5/d7/f5/c5d7f5b8dcaf08d36564b17744817d27.jpg", size: 70, price: 399, category: "Skin", subCategory: "Moisturisers", for: "Female", brand: "Olay", count: 0 },
  { name: "Garnier Men Moisturiser ", image: "https://i.pinimg.com/1200x/82/8f/12/828f1212819366d588291db270c3b5bb.jpg", size: 80, price: 449, category: "Skin", subCategory: "Moisturisers", for: "Male", brand: "Garnier", count: 0 },
  { name: "Lakme Women Moisturiser ", image: "https://i.pinimg.com/736x/77/91/c9/7791c9a45a491165d78b3a6116227a7b.jpg", size: 90, price: 499, category: "Skin", subCategory: "Moisturisers", for: "Female", brand: "Lakme", count: 0 },

  // Cleansers
  { name: "Nivea Men Cleanser ", image: "https://i.pinimg.com/736x/db/50/da/db50da51bb62502015279a066cebef59.jpg", size: 100, price: 299, category: "Skin", subCategory: "Cleansers", for: "Male", brand: "Nivea", count: 0 },
  { name: "Pond’s Women Cleanser ", image: "https://i.pinimg.com/736x/2c/b1/4e/2cb14e4dc1dbfe7425c96051706a76fa.jpg", size: 120, price: 349, category: "Skin", subCategory: "Cleansers", for: "Female", brand: "Pond’s", count: 0 },
  { name: "Olay Women Cleanser ", image: "https://i.pinimg.com/1200x/72/24/e1/7224e1805a81dc40499f9b166eeb1020.jpg", size: 150, price: 399, category: "Skin", subCategory: "Cleansers", for: "Female", brand: "Olay", count: 0 },
  { name: "Garnier Men Cleanser ", image: "https://i.pinimg.com/1200x/a4/b2/1a/a4b21a65219ac0d12e984ff0f42ededc.jpg", size: 130, price: 349, category: "Skin", subCategory: "Cleansers", for: "Male", brand: "Garnier", count: 0 },
  { name: "Lakme Women Cleanser ", image: "https://i.pinimg.com/1200x/98/28/1d/98281de374df0faf8111661f275a2c6f.jpg", size: 140, price: 449, category: "Skin", subCategory: "Cleansers", for: "Female", brand: "Lakme", count: 0 },

  // Suncare & Spf
  { name: "Nivea Men SPF 30 Sunscreen ", image: "https://i.pinimg.com/1200x/37/4d/ba/374dba5e2a494ec3b26e27ab22d97031.jpg", size: 100, price: 399, category: "Skin", subCategory: "Suncare & Spf", for: "Male", brand: "Nivea", count: 0 },
  { name: "Lakme Women SPF 40 Sunscreen ", image: "https://i.pinimg.com/1200x/ff/51/02/ff5102195376a591c406bf9388bb9451.jpg", size: 80, price: 449, category: "Skin", subCategory: "Suncare & Spf", for: "Female", brand: "Lakme", count: 5 },
  { name: "Lotus Women SPF 50 Sunscreen ", image: "https://i.pinimg.com/736x/2a/77/40/2a774010063ca26d16a17771bacac526.jpg", size: 90, price: 499, category: "Skin", subCategory: "Suncare & Spf", for: "Female", brand: "Lotus", count: 0 },
  { name: "Garnier Men SPF 20 Sunscreen ", image: "https://i.pinimg.com/1200x/ec/8c/a4/ec8ca4799802480a86a817da08a642e8.jpg", size: 110, price: 349, category: "Skin", subCategory: "Suncare & Spf", for: "Male", brand: "Garnier", count: 0 },
  { name: "Pond’s Women SPF 30 Sunscreen ", image: "https://i.pinimg.com/736x/79/61/25/796125cab8a8ed2d57cd03b1e09e4c8f.jpg", size: 100, price: 399, category: "Skin", subCategory: "Suncare & Spf", for: "Female", brand: "Pond’s", count: 0 },

  // Eyecare & Creams
  { name: "Olay Women Eye Cream ", image: "https://i.pinimg.com/1200x/87/fe/8d/87fe8d3419123c5a91a14e4ad3d4e901.jpg", size: 30, price: 599, category: "Skin", subCategory: "Eyecare & Creams", for: "Female", brand: "Olay", count: 0 },
  { name: "Nivea Men Eye Cream ", image: "https://i.pinimg.com/1200x/4f/9a/bf/4f9abf7bd3ba825c83079b9a0c5db077.jpg", size: 25, price: 499, category: "Skin", subCategory: "Eyecare & Creams", for: "Male", brand: "Nivea", count: 0 },
  { name: "Lakme Women Eye Gel ", image: "https://i.pinimg.com/1200x/50/77/62/507762dabfeac5030a75493dc4e319f8.jpg", size: 20, price: 449, category: "Skin", subCategory: "Eyecare & Creams", for: "Female", brand: "Lakme", count: 0 },
  { name: "Garnier Men Eye Roll-On ", image: "https://i.pinimg.com/736x/1b/f2/05/1bf20518ee4154edb69035b2ed51c5a9.jpg", size: 15, price: 399, category: "Skin", subCategory: "Eyecare & Creams", for: "Male", brand: "Garnier", count: 0 },
  { name: "Pond’s Women Eye Cream ", image: "https://i.pinimg.com/736x/81/a5/d4/81a5d43e2fe1d1643f6bebd3fcf532b5.jpg", size: 25, price: 499, category: "Skin", subCategory: "Eyecare & Creams", for: "Female", brand: "Pond’s", count: 0 },

  // Face Serums
  { name: "L’Oreal Women Face Serum ", image: "https://i.pinimg.com/1200x/c6/c6/37/c6c637948f433ef61d7c2aa16a7f9c67.jpg", size: 30, price: 799, category: "Skin", subCategory: "Face Serums", for: "Female", brand: "L’Oreal", count: 0 },
  { name: "Nivea Men Face Serum ", image: "https://i.pinimg.com/1200x/9d/76/3d/9d763d50db4263a8d661de8b27be13f7.jpg", size: 40, price: 699, category: "Skin", subCategory: "Face Serums", for: "Male", brand: "Nivea", count: 0 },
  { name: "Olay Women Face Serum ", image: "https://i.pinimg.com/1200x/bf/33/e4/bf33e41bb045eddba45a9d4d09a6646e.jpg", size: 35, price: 899, category: "Skin", subCategory: "Face Serums", for: "Female", brand: "Olay", count: 0 },
  { name: "Garnier Men Face Serum ", image: "https://i.pinimg.com/1200x/4e/c1/f7/4ec1f7fd3cd7f92e1c1f16aeae027d6c.jpg", size: 30, price: 749, category: "Skin", subCategory: "Face Serums", for: "Male", brand: "Garnier", count: 0 },
  { name: "Lakme Women Face Serum ", image: "https://i.pinimg.com/736x/97/7a/14/977a1429626258e1ea5d637d04cde523.jpg", size: 25, price: 799, category: "Skin", subCategory: "Face Serums", for: "Female", brand: "Lakme", count: 0 },

  // Face & Sheet Masks
  { name: "The Face Shop Women Sheet Mask ", image: "https://i.pinimg.com/1200x/c2/94/f9/c294f9fd9d533892f7c385121de9db64.jpg", size: 20, price: 199, category: "Skin", subCategory: "Face & Sheet Masks", for: "Female", brand: "The Face Shop", count: 0 },
  { name: "Innisfree Women Sheet Mask ", image: "https://i.pinimg.com/736x/af/27/42/af27421506deaaa5d3e2baf3eb3e4d12.jpg", size: 20, price: 249, category: "Skin", subCategory: "Face & Sheet Masks", for: "Female", brand: "Innisfree", count: 0 },
  { name: "Garnier Men Face Mask ", image: "https://i.pinimg.com/1200x/08/02/28/080228b18c0963aca7272f36f91ee6b6.jpg", size: 30, price: 199, category: "Skin", subCategory: "Face & Sheet Masks", for: "Male", brand: "Garnier", count: 0 },
  { name: "Olay Women Face Mask ", image: "https://i.pinimg.com/1200x/88/df/c5/88dfc5cd2e7f43e939ff2311502af317.jpg", size: 25, price: 299, category: "Skin", subCategory: "Face & Sheet Masks", for: "Female", brand: "Olay", count: 0 },
  { name: "Pond’s Women Face Mask ", image: "https://i.pinimg.com/736x/12/d9/54/12d954b91683cc8d2484b1961ad6826e.jpg", size: 25, price: 249, category: "Skin", subCategory: "Face & Sheet Masks", for: "Female", brand: "Pond’s", count: 0 },

  // Toner
  { name: "L’Oreal Women Toner ", image: "https://i.pinimg.com/736x/af/6e/db/af6edbeb8fcee3a7b5bd16d8cf196451.jpg", size: 100, price: 499, category: "Skin", subCategory: "Toner", for: "Female", brand: "L’Oreal", count: 0 },
  { name: "Nivea Men Toner ", image: "https://i.pinimg.com/736x/d4/42/d1/d442d18c4ea66d7ca07615dc9fabbaba.jpg", size: 120, price: 399, category: "Skin", subCategory: "Toner", for: "Male", brand: "Nivea", count: 0 },
  { name: "Lakme Women Toner ", image: "https://i.pinimg.com/736x/2b/f7/5f/2bf75f245befc9b517a7ce601f61b240.jpg", size: 110, price: 449, category: "Skin", subCategory: "Toner", for: "Female", brand: "Lakme", count: 0 },
  { name: "Olay Women Toner ", image: "https://i.pinimg.com/1200x/ba/35/4b/ba354baeb2d5d2d3baa473acd1f27e5b.jpg", size: 130, price: 499, category: "Skin", subCategory: "Toner", for: "Female", brand: "Olay", count: 0 },
  { name: "Garnier Men Toner ", image: "https://i.pinimg.com/736x/48/bc/df/48bcdf232cbdaf4d94c9404c231d1160.jpg", size: 140, price: 399, category: "Skin", subCategory: "Toner", for: "Male", brand: "Garnier", count: 0 },

  // Face Oils
  { name: "Bio-Oil Women Face Oil ", image: "https://i.pinimg.com/736x/52/5c/5b/525c5be252d8cc50a288432ef1bde7a1.jpg", size: 50, price: 699, category: "Skin", subCategory: "Face Oils", for: "Female", brand: "Bio-Oil", count: 0 },
  { name: "Kama Ayurveda Women Face Oil ", image: "https://i.pinimg.com/736x/b6/1a/48/b61a4874437161fcc557a8302e697db2.jpg", size: 30, price: 799, category: "Skin", subCategory: "Face Oils", for: "Female", brand: "Kama Ayurveda", count: 0 },
  { name: "Forest Essentials Women Face Oil ", image: "https://i.pinimg.com/736x/61/60/81/6160814f02a972ca2916c6e3393d76ba.jpg", size: 25, price: 899, category: "Skin", subCategory: "Face Oils", for: "Female", brand: "Forest Essentials", count: 0 },
  { name: "Nivea Men Face Oil ", image: "https://i.pinimg.com/1200x/39/9d/db/399ddbdd2e69601e88ee53d7ea238517.jpg", size: 40, price: 599, category: "Skin", subCategory: "Face Oils", for: "Male", brand: "Nivea", count: 0 },
  { name: "Garnier Men Face Oil ", image: "https://i.pinimg.com/736x/94/86/ae/9486ae56b6687a22f417553ac541dc32.jpg", size: 35, price: 649, category: "Skin", subCategory: "Face Oils", for: "Male", brand: "Garnier", count: 0 },

  // ================== ACCESSORIES ==================
  // Hair Dryers
  { name: "Philips Hair Dryer ", image: "https://i.pinimg.com/1200x/9f/2d/ef/9f2def9218a169b27b1284cf924073a8.jpg", size: 500, price: 1499, category: "Accessories", subCategory: "Hair Dryers", for: "Female", brand: "Philips", count: 0 },
  { name: "Nova Hair Dryer ", image: "https://i.pinimg.com/736x/73/87/26/73872674875718b0de5aa3ca3d8fe56b.jpg", size: 550, price: 1299, category: "Accessories", subCategory: "Hair Dryers", for: "Male", brand: "Nova", count: 0 },
  { name: "Havells Hair Dryer ", image: "https://i.pinimg.com/736x/6b/29/34/6b2934bcb4d5034916a5501b23368dc4.jpg", size: 600, price: 1399, category: "Accessories", subCategory: "Hair Dryers", for: "Female", brand: "Havells", count: 0 },
  { name: "Sokany Hair Dryer ", image: "https://i.pinimg.com/736x/5b/06/8c/5b068c829d86489853f08e8ff5cc3b51.jpg", size: 650, price: 1599, category: "Accessories", subCategory: "Hair Dryers", for: "Male", brand: "Sokany", count: 0 },
  { name: "Panasonic Hair Dryer ", image: "https://i.pinimg.com/736x/6f/d2/7f/6fd27f8f5990b48a081d11c552912eb4.jpg", size: 700, price: 1699, category: "Accessories", subCategory: "Hair Dryers", for: "Female", brand: "Panasonic", count: 0 },

  // Hair Straighteners
  { name: "Philips Hair Straightener ", image: "https://i.pinimg.com/1200x/00/40/29/004029b40db901b9be5be7962e0b315a.jpg", size: 500, price: 1999, category: "Accessories", subCategory: "Hair Straighteners", for: "Female", brand: "Philips", count: 0 },
  { name: "Nova Hair Straightener ", image: "https://i.pinimg.com/736x/95/13/a4/9513a47ab9d309334f53d99b37813712.jpg", size: 550, price: 1799, category: "Accessories", subCategory: "Hair Straighteners", for: "Female", brand: "Nova", count: 0 },
  { name: "Havells Hair Straightener ", image: "https://i.pinimg.com/736x/9c/ce/de/9ccededeb623a0332c642018d185641e.jpg", size: 600, price: 1899, category: "Accessories", subCategory: "Hair Straighteners", for: "Female", brand: "Havells", count: 0 },
  { name: "Syska Hair Straightener ", image: "https://i.pinimg.com/1200x/db/2f/4b/db2f4b98db9fd021a91f5315d5abd0ae.jpg", size: 650, price: 1599, category: "Accessories", subCategory: "Hair Straighteners", for: "Female", brand: "Syska", count: 0 },
  { name: "Panasonic Hair Straightener ", image: "https://i.pinimg.com/1200x/cd/0b/75/cd0b75035f5d4292e28769c9444fe93f.jpg", size: 700, price: 1699, category: "Accessories", subCategory: "Hair Straighteners", for: "Female", brand: "Panasonic", count: 0 },

  // Hair Curler
  { name: "Philips Hair Curler ", image: "https://i.pinimg.com/736x/6b/f2/96/6bf2967f267137b132c198c224fa8a2b.jpg", size: 500, price: 1999, category: "Accessories", subCategory: "Hair Curler", for: "Female", brand: "Philips", count: 0 },
  { name: "Nova Hair Curler ", image: "https://i.pinimg.com/736x/4b/64/57/4b645703cc8c5d0476e938aacc76a323.jpg", size: 550, price: 1799, category: "Accessories", subCategory: "Hair Curler", for: "Female", brand: "Nova", count: 0 },
  { name: "Havells Hair Curler ", image: "https://i.pinimg.com/1200x/49/5b/bc/495bbc36a554e44ba2043a7e7c70c280.jpg", size: 600, price: 1899, category: "Accessories", subCategory: "Hair Curler", for: "Female", brand: "Havells", count: 0 },
  { name: "Syska Hair Curler ", image: "https://i.pinimg.com/736x/1b/a7/96/1ba796963505d9d3a1096a7388df378e.jpg", size: 650, price: 1599, category: "Accessories", subCategory: "Hair Curler", for: "Female", brand: "Syska", count: 0 },
  { name: "Panasonic Hair Curler ", image: "https://i.pinimg.com/736x/3a/ba/1c/3aba1c4b8c1f806e65d54829cf0f722e.jpg", size: 700, price: 1699, category: "Accessories", subCategory: "Hair Curler", for: "Female", brand: "Panasonic", count: 0 },

  // Hair Brush
  { name: "Vega Hair Brush ", image: "https://i.pinimg.com/1200x/a9/dd/ec/a9ddecb000c91a8ecf88bf7fde67201c.jpg", size: 100, price: 299, category: "Accessories", subCategory: "Hair Brush", for: "Female", brand: "Vega", count: 0 },
  { name: "Roots Hair Brush ", image: "https://i.pinimg.com/1200x/05/e7/42/05e7427b5a2b321f735eb5a8fbb74e1b.jpg", size: 120, price: 349, category: "Accessories", subCategory: "Hair Brush", for: "Female", brand: "Roots", count: 0 },
  { name: "Denman Hair Brush ", image: "https://i.pinimg.com/1200x/f0/41/a4/f041a4a9611146021f9923c2d1ca087e.jpg", size: 90, price: 249, category: "Accessories", subCategory: "Hair Brush", for: "Female", brand: "Denman", count: 0 },
  { name: "Tangle Teezer Hair Brush ", image: "https://i.pinimg.com/736x/b8/89/2e/b8892e4ff310870faee946fe652eeb05.jpg", size: 110, price: 399, category: "Accessories", subCategory: "Hair Brush", for: "Female", brand: "Tangle Teezer", count: 0 },
  { name: "Gubb Hair Brush ", image: "https://i.pinimg.com/1200x/fa/a6/99/faa6990dbb42c1d104b6e163b4bb3b6a.jpg", size: 130, price: 349, category: "Accessories", subCategory: "Hair Brush", for: "Female", brand: "Gubb", count: 0 },

  // Trimmers & Clippers
  { name: "Philips Trimmer ", image: "https://i.pinimg.com/1200x/f1/c8/c2/f1c8c2bdfa0cacb376eb2545b0915084.jpg", size: 200, price: 1999, category: "Accessories", subCategory: "Trimmers & Clippers", for: "Male", brand: "Philips", count: 0 },
  { name: "Nova Trimmer ", image: "https://i.pinimg.com/736x/62/cd/c3/62cdc38ce8587eab3e4e7860d4e20f48.jpg", size: 220, price: 1799, category: "Accessories", subCategory: "Trimmers & Clippers", for: "Male", brand: "Nova", count: 0 },
  { name: "Havells Trimmer ", image: "https://i.pinimg.com/736x/67/1b/80/671b80f51bbbefab832232d3c29e0644.jpg", size: 250, price: 1899, category: "Accessories", subCategory: "Trimmers & Clippers", for: "Male", brand: "Havells", count: 0 },
  { name: "Syska Trimmer ", image: "https://i.pinimg.com/1200x/b5/2b/bc/b52bbc75db481a3d34911c9e14cebb9f.jpg", size: 230, price: 1599, category: "Accessories", subCategory: "Trimmers & Clippers", for: "Male", brand: "Syska", count: 0 },
  { name: "Panasonic Trimmer ", image: "https://i.pinimg.com/1200x/21/bb/8b/21bb8bf912bb19cd102d6afc8c21e06c.jpg", size: 240, price: 1699, category: "Accessories", subCategory: "Trimmers & Clippers", for: "Male", brand: "Panasonic", count: 0 },

  // Cosmetic Lenses
  { name: "Bausch & Lomb Lenses ", image: "https://i.pinimg.com/736x/7b/ae/cb/7baecbebc5e7bb1dc028eb454ba8cb10.jpg", size: 2, price: 999, category: "Accessories", subCategory: "Cosmetic Lenses", for: "Female", brand: "Bausch & Lomb", count: 0 },
  { name: "Freshlook Lenses ", image: "https://i.pinimg.com/736x/b4/3c/aa/b43caa60c06cd71168665fa862a82203.jpg", size: 2, price: 1099, category: "Accessories", subCategory: "Cosmetic Lenses", for: "Female", brand: "Freshlook", count: 0 },
  { name: "Acuvue Lenses ", image: "https://i.pinimg.com/1200x/f5/21/ac/f521ac654fbdf69a1d2c38a35768fe06.jpg", size: 2, price: 1199, category: "Accessories", subCategory: "Cosmetic Lenses", for: "Female", brand: "Acuvue", count: 0 },
  { name: "Bella Lenses ", image: "https://i.pinimg.com/736x/e9/7e/75/e97e75da841051da8560dd848a389e2e.jpg", size: 2, price: 1299, category: "Accessories", subCategory: "Cosmetic Lenses", for: "Female", brand: "Bella", count: 0 },
  { name: "ColourVUE Lenses ", image: "https://i.pinimg.com/736x/f0/96/bb/f096bba499b294a7c86380767e49e036.jpg", size: 2, price: 1399, category: "Accessories", subCategory: "Cosmetic Lenses", for: "Female", brand: "ColourVUE", count: 0 },
];



const seedData = async () => {
  try {
    console.log("Starting data seeding...");
    
    // Clear existing data
    console.log("Clearing existing data...");
    await Product.deleteMany({});
    console.log("Existing data cleared");
    
    // Insert services
    console.log("Inserting products...");
    const insertedProduct = await Product.insertMany(products);
    console.log(`${insertedProduct.length} product seeded successfully`);
 
    
    // Verify final count
    const productCount = await Product.countDocuments();
 
    
    console.log(`Final count - Services: ${productCount}`);
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
