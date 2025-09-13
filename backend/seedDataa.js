





const products = [
  // ================== HAIR ==================
  // Shampoo
  { name: "L’Oreal Men Shampoo ", image: "https://via.placeholder.com/300?text=L'Oreal+Men+Shampoo+1", size: 200, price: 299, category: "Hair", subCategory: "Shampoo", for: "Male", brand: "L’Oreal", count: 0 },
  { name: "Dove Women Shampoo ", image: "https://via.placeholder.com/300?text=Dove+Women+Shampoo+2", size: 250, price: 349, category: "Hair", subCategory: "Shampoo", for: "Female", brand: "Dove", count: 0 },
  { name: "Pantene Women Shampoo 3", image: "https://via.placeholder.com/300?text=Pantene+Women+Shampoo+3", size: 300, price: 399, category: "Hair", subCategory: "Shampoo", for: "Female", brand: "Pantene", count: 0 },
  { name: "Head & Shoulders Men Shampoo 4", image: "https://via.placeholder.com/300?text=Head+Shoulders+Men+Shampoo+4", size: 200, price: 299, category: "Hair", subCategory: "Shampoo", for: "Male", brand: "Head & Shoulders", count: 0 },
  { name: "Tresemme Women Shampoo 5", image: "https://via.placeholder.com/300?text=Tresemme+Women+Shampoo+5", size: 250, price: 499, category: "Hair", subCategory: "Shampoo", for: "Female", brand: "Tresemme", count: 0 },

  // Conditioner
  { name: "L’Oreal Women Conditioner 1", image: "https://via.placeholder.com/300?text=L'Oreal+Women+Conditioner+1", size: 200, price: 399, category: "Hair", subCategory: "Conditioner", for: "Female", brand: "L’Oreal", count: 0 },
  { name: "Dove Men Conditioner 2", image: "https://via.placeholder.com/300?text=Dove+Men+Conditioner+2", size: 180, price: 299, category: "Hair", subCategory: "Conditioner", for: "Male", brand: "Dove", count: 0 },
  { name: "Tresemme Women Conditioner 3", image: "https://via.placeholder.com/300?text=Tresemme+Women+Conditioner+3", size: 220, price: 449, category: "Hair", subCategory: "Conditioner", for: "Female", brand: "Tresemme", count: 0 },
  { name: "Pantene Women Conditioner 4", image: "https://via.placeholder.com/300?text=Pantene+Women+Conditioner+4", size: 250, price: 349, category: "Hair", subCategory: "Conditioner", for: "Female", brand: "Pantene", count: 0 },
  { name: "Herbal Essences Women Conditioner 5", image: "https://via.placeholder.com/300?text=Herbal+Essences+Women+Conditioner+5", size: 200, price: 399, category: "Hair", subCategory: "Conditioner", for: "Female", brand: "Herbal Essences", count: 0 },

  // Hair Oil
  { name: "Parachute Men Hair Oil 1", image: "https://via.placeholder.com/300?text=Parachute+Men+Hair+Oil+1", size: 150, price: 199, category: "Hair", subCategory: "Hair Oil", for: "Male", brand: "Parachute", count: 0 },
  { name: "Bajaj Almond Women Hair Oil 2", image: "https://via.placeholder.com/300?text=Bajaj+Almond+Women+Hair+Oil+2", size: 200, price: 249, category: "Hair", subCategory: "Hair Oil", for: "Female", brand: "Bajaj", count: 0 },
  { name: "Indulekha Women Hair Oil 3", image: "https://via.placeholder.com/300?text=Indulekha+Women+Hair+Oil+3", size: 100, price: 499, category: "Hair", subCategory: "Hair Oil", for: "Female", brand: "Indulekha", count: 0 },
  { name: "Kesh King Men Hair Oil 4", image: "https://via.placeholder.com/300?text=Kesh+King+Men+Hair+Oil+4", size: 150, price: 299, category: "Hair", subCategory: "Hair Oil", for: "Male", brand: "Kesh King", count: 0 },
  { name: "L’Oreal Women Hair Oil 5", image: "https://via.placeholder.com/300?text=L'Oreal+Women+Hair+Oil+5", size: 200, price: 399, category: "Hair", subCategory: "Hair Oil", for: "Female", brand: "L’Oreal", count: 0 },

  // Treatments & Serums
  { name: "L’Oreal Women Hair Serum 1", image: "https://via.placeholder.com/300?text=L'Oreal+Women+Hair+Serum+1", size: 100, price: 699, category: "Hair", subCategory: "Treatments & Serums", for: "Female", brand: "L’Oreal", count: 0 },
  { name: "Matrix Men Hair Serum 2", image: "https://via.placeholder.com/300?text=Matrix+Men+Hair+Serum+2", size: 80, price: 599, category: "Hair", subCategory: "Treatments & Serums", for: "Male", brand: "Matrix", count: 0 },
  { name: "Tresemme Women Hair Serum 3", image: "https://via.placeholder.com/300?text=Tresemme+Women+Hair+Serum+3", size: 120, price: 799, category: "Hair", subCategory: "Treatments & Serums", for: "Female", brand: "Tresemme", count: 0 },
  { name: "Schwarzkopf Men Hair Serum 4", image: "https://via.placeholder.com/300?text=Schwarzkopf+Men+Hair+Serum+4", size: 100, price: 999, category: "Hair", subCategory: "Treatments & Serums", for: "Male", brand: "Schwarzkopf", count: 0 },
  { name: "L’Oreal Women Hair Serum 5", image: "https://via.placeholder.com/300?text=L'Oreal+Women+Hair+Serum+5", size: 150, price: 899, category: "Hair", subCategory: "Treatments & Serums", for: "Female", brand: "L’Oreal", count: 0 },

  // Hair Masks
  { name: "Tresemme Women Hair Mask 1", image: "https://via.placeholder.com/300?text=Tresemme+Women+Hair+Mask+1", size: 200, price: 799, category: "Hair", subCategory: "Hair Masks", for: "Female", brand: "Tresemme", count: 0 },
  { name: "L’Oreal Men Hair Mask 2", image: "https://via.placeholder.com/300?text=L'Oreal+Men+Hair+Mask+2", size: 180, price: 699, category: "Hair", subCategory: "Hair Masks", for: "Male", brand: "L’Oreal", count: 0 },
  { name: "Matrix Women Hair Mask 3", image: "https://via.placeholder.com/300?text=Matrix+Women+Hair+Mask+3", size: 250, price: 899, category: "Hair", subCategory: "Hair Masks", for: "Female", brand: "Matrix", count: 0 },
  { name: "Schwarzkopf Men Hair Mask 4", image: "https://via.placeholder.com/300?text=Schwarzkopf+Men+Hair+Mask+4", size: 220, price: 999, category: "Hair", subCategory: "Hair Masks", for: "Male", brand: "Schwarzkopf", count: 0 },
  { name: "Dove Women Hair Mask 5", image: "https://via.placeholder.com/300?text=Dove+Women+Hair+Mask+5", size: 200, price: 799, category: "Hair", subCategory: "Hair Masks", for: "Female", brand: "Dove", count: 0 },

  // Dry Shampoo
  { name: "Batiste Women Dry Shampoo 1", image: "https://via.placeholder.com/300?text=Batiste+Women+Dry+Shampoo+1", size: 150, price: 699, category: "Hair", subCategory: "Dry Shampoo", for: "Female", brand: "Batiste", count: 0 },
  { name: "Tresemme Men Dry Shampoo 2", image: "https://via.placeholder.com/300?text=Tresemme+Men+Dry+Shampoo+2", size: 200, price: 599, category: "Hair", subCategory: "Dry Shampoo", for: "Male", brand: "Tresemme", count: 0 },
  { name: "L’Oreal Women Dry Shampoo 3", image: "https://via.placeholder.com/300?text=L'Oreal+Women+Dry+Shampoo+3", size: 180, price: 799, category: "Hair", subCategory: "Dry Shampoo", for: "Female", brand: "L’Oreal", count: 0 },
  { name: "Schwarzkopf Men Dry Shampoo 4", image: "https://via.placeholder.com/300?text=Schwarzkopf+Men+Dry+Shampoo+4", size: 200, price: 899, category: "Hair", subCategory: "Dry Shampoo", for: "Male", brand: "Schwarzkopf", count: 0 },
  { name: "Matrix Women Dry Shampoo 5", image: "https://via.placeholder.com/300?text=Matrix+Women+Dry+Shampoo+5", size: 220, price: 999, category: "Hair", subCategory: "Dry Shampoo", for: "Female", brand: "Matrix", count: 0 },

  // Travel Size
  { name: "L’Oreal Travel Shampoo 1", image: "https://via.placeholder.com/300?text=L'Oreal+Travel+Shampoo+1", size: 50, price: 199, category: "Hair", subCategory: "Travel Size", for: "Male", brand: "L’Oreal", count: 0 },
  { name: "Dove Travel Conditioner 2", image: "https://via.placeholder.com/300?text=Dove+Travel+Conditioner+2", size: 60, price: 249, category: "Hair", subCategory: "Travel Size", for: "Female", brand: "Dove", count: 0 },
  { name: "Pantene Travel Hair Oil 3", image: "https://via.placeholder.com/300?text=Pantene+Travel+Hair+Oil+3", size: 40, price: 149, category: "Hair", subCategory: "Travel Size", for: "Female", brand: "Pantene", count: 0 },
  { name: "Tresemme Travel Hair Mask 4", image: "https://via.placeholder.com/300?text=Tresemme+Travel+Hair+Mask+4", size: 70, price: 199, category: "Hair", subCategory: "Travel Size", for: "Male", brand: "Tresemme", count: 0 },
  { name: "Matrix Travel Hair Serum 5", image: "https://via.placeholder.com/300?text=Matrix+Travel+Hair+Serum+5", size: 60, price: 299, category: "Hair", subCategory: "Travel Size", for: "Female", brand: "Matrix", count: 0 },

  // Gifts & Bundles
  { name: "L’Oreal Hair Care Gift Set 1", image: "https://via.placeholder.com/300?text=L'Oreal+Hair+Care+Gift+Set+1", size: 500, price: 1299, category: "Hair", subCategory: "Gifts & Bundles", for: "Female", brand: "L’Oreal", count: 0 },
  { name: "Dove Hair Care Bundle 2", image: "https://via.placeholder.com/300?text=Dove+Hair+Care+Bundle+2", size: 600, price: 1399, category: "Hair", subCategory: "Gifts & Bundles", for: "Male", brand: "Dove", count: 0 },
  { name: "Tresemme Styling Pack 3", image: "https://via.placeholder.com/300?text=Tresemme+Styling+Pack+3", size: 550, price: 1499, category: "Hair", subCategory: "Gifts & Bundles", for: "Female", brand: "Tresemme", count: 0 },
  { name: "Pantene Combo Pack 4", image: "https://via.placeholder.com/300?text=Pantene+Combo+Pack+4", size: 580, price: 1599, category: "Hair", subCategory: "Gifts & Bundles", for: "Male", brand: "Pantene", count: 0 },
  { name: "Matrix Professional Bundle 5", image: "https://via.placeholder.com/300?text=Matrix+Professional+Bundle+5", size: 600, price: 1699, category: "Hair", subCategory: "Gifts & Bundles", for: "Female", brand: "Matrix", count: 0 },

  // ================== SKIN ==================
  // Moisturisers
  { name: "Nivea Men Moisturiser 1", image: "https://via.placeholder.com/300?text=Nivea+Men+Moisturiser+1", size: 50, price: 299, category: "Skin", subCategory: "Moisturisers", for: "Male", brand: "Nivea", count: 0 },
  { name: "Pond’s Women Moisturiser 2", image: "https://via.placeholder.com/300?text=Pond's+Women+Moisturiser+2", size: 60, price: 349, category: "Skin", subCategory: "Moisturisers", for: "Female", brand: "Pond’s", count: 0 },
  { name: "Olay Women Moisturiser 3", image: "https://via.placeholder.com/300?text=Olay+Women+Moisturiser+3", size: 70, price: 399, category: "Skin", subCategory: "Moisturisers", for: "Female", brand: "Olay", count: 0 },
  { name: "Garnier Men Moisturiser 4", image: "https://via.placeholder.com/300?text=Garnier+Men+Moisturiser+4", size: 80, price: 449, category: "Skin", subCategory: "Moisturisers", for: "Male", brand: "Garnier", count: 0 },
  { name: "Lakme Women Moisturiser 5", image: "https://via.placeholder.com/300?text=Lakme+Women+Moisturiser+5", size: 90, price: 499, category: "Skin", subCategory: "Moisturisers", for: "Female", brand: "Lakme", count: 0 },

  // Cleansers
  { name: "Nivea Men Cleanser 1", image: "https://via.placeholder.com/300?text=Nivea+Men+Cleanser+1", size: 100, price: 299, category: "Skin", subCategory: "Cleansers", for: "Male", brand: "Nivea", count: 0 },
  { name: "Pond’s Women Cleanser 2", image: "https://via.placeholder.com/300?text=Pond's+Women+Cleanser+2", size: 120, price: 349, category: "Skin", subCategory: "Cleansers", for: "Female", brand: "Pond’s", count: 0 },
  { name: "Olay Women Cleanser 3", image: "https://via.placeholder.com/300?text=Olay+Women+Cleanser+3", size: 150, price: 399, category: "Skin", subCategory: "Cleansers", for: "Female", brand: "Olay", count: 0 },
  { name: "Garnier Men Cleanser 4", image: "https://via.placeholder.com/300?text=Garnier+Men+Cleanser+4", size: 130, price: 349, category: "Skin", subCategory: "Cleansers", for: "Male", brand: "Garnier", count: 0 },
  { name: "Lakme Women Cleanser 5", image: "https://via.placeholder.com/300?text=Lakme+Women+Cleanser+5", size: 140, price: 449, category: "Skin", subCategory: "Cleansers", for: "Female", brand: "Lakme", count: 0 },

  // Suncare & Spf
  { name: "Nivea Men SPF 30 Sunscreen 1", image: "https://via.placeholder.com/300?text=Nivea+Men+SPF+30+Sunscreen+1", size: 100, price: 399, category: "Skin", subCategory: "Suncare & Spf", for: "Male", brand: "Nivea", count: 0 },
  { name: "Lakme Women SPF 40 Sunscreen 2", image: "https://via.placeholder.com/300?text=Lakme+Women+SPF+40+Sunscreen+2", size: 80, price: 449, category: "Skin", subCategory: "Suncare & Spf", for: "Female", brand: "Lakme", count: 0 },
  { name: "Lotus Women SPF 50 Sunscreen 3", image: "https://via.placeholder.com/300?text=Lotus+Women+SPF+50+Sunscreen+3", size: 90, price: 499, category: "Skin", subCategory: "Suncare & Spf", for: "Female", brand: "Lotus", count: 0 },
  { name: "Garnier Men SPF 20 Sunscreen 4", image: "https://via.placeholder.com/300?text=Garnier+Men+SPF+20+Sunscreen+4", size: 110, price: 349, category: "Skin", subCategory: "Suncare & Spf", for: "Male", brand: "Garnier", count: 0 },
  { name: "Pond’s Women SPF 30 Sunscreen 5", image: "https://via.placeholder.com/300?text=Pond's+Women+SPF+30+Sunscreen+5", size: 100, price: 399, category: "Skin", subCategory: "Suncare & Spf", for: "Female", brand: "Pond’s", count: 0 },

  // Eyecare & Creams
  { name: "Olay Women Eye Cream 1", image: "https://via.placeholder.com/300?text=Olay+Women+Eye+Cream+1", size: 30, price: 599, category: "Skin", subCategory: "Eyecare & Creams", for: "Female", brand: "Olay", count: 0 },
  { name: "Nivea Men Eye Cream 2", image: "https://via.placeholder.com/300?text=Nivea+Men+Eye+Cream+2", size: 25, price: 499, category: "Skin", subCategory: "Eyecare & Creams", for: "Male", brand: "Nivea", count: 0 },
  { name: "Lakme Women Eye Gel 3", image: "https://via.placeholder.com/300?text=Lakme+Women+Eye+Gel+3", size: 20, price: 449, category: "Skin", subCategory: "Eyecare & Creams", for: "Female", brand: "Lakme", count: 0 },
  { name: "Garnier Men Eye Roll-On 4", image: "https://via.placeholder.com/300?text=Garnier+Men+Eye+Roll-On+4", size: 15, price: 399, category: "Skin", subCategory: "Eyecare & Creams", for: "Male", brand: "Garnier", count: 0 },
  { name: "Pond’s Women Eye Cream 5", image: "https://via.placeholder.com/300?text=Pond's+Women+Eye+Cream+5", size: 25, price: 499, category: "Skin", subCategory: "Eyecare & Creams", for: "Female", brand: "Pond’s", count: 0 },

  // Face Serums
  { name: "L’Oreal Women Face Serum 1", image: "https://via.placeholder.com/300?text=L'Oreal+Women+Face+Serum+1", size: 30, price: 799, category: "Skin", subCategory: "Face Serums", for: "Female", brand: "L’Oreal", count: 0 },
  { name: "Nivea Men Face Serum 2", image: "https://via.placeholder.com/300?text=Nivea+Men+Face+Serum+2", size: 40, price: 699, category: "Skin", subCategory: "Face Serums", for: "Male", brand: "Nivea", count: 0 },
  { name: "Olay Women Face Serum 3", image: "https://via.placeholder.com/300?text=Olay+Women+Face+Serum+3", size: 35, price: 899, category: "Skin", subCategory: "Face Serums", for: "Female", brand: "Olay", count: 0 },
  { name: "Garnier Men Face Serum 4", image: "https://via.placeholder.com/300?text=Garnier+Men+Face+Serum+4", size: 30, price: 749, category: "Skin", subCategory: "Face Serums", for: "Male", brand: "Garnier", count: 0 },
  { name: "Lakme Women Face Serum 5", image: "https://via.placeholder.com/300?text=Lakme+Women+Face+Serum+5", size: 25, price: 799, category: "Skin", subCategory: "Face Serums", for: "Female", brand: "Lakme", count: 0 },

  // Face & Sheet Masks
  { name: "The Face Shop Women Sheet Mask 1", image: "https://via.placeholder.com/300?text=FaceShop+Women+Sheet+Mask+1", size: 20, price: 199, category: "Skin", subCategory: "Face & Sheet Masks", for: "Female", brand: "The Face Shop", count: 0 },
  { name: "Innisfree Women Sheet Mask 2", image: "https://via.placeholder.com/300?text=Innisfree+Women+Sheet+Mask+2", size: 20, price: 249, category: "Skin", subCategory: "Face & Sheet Masks", for: "Female", brand: "Innisfree", count: 0 },
  { name: "Garnier Men Face Mask 3", image: "https://via.placeholder.com/300?text=Garnier+Men+Face+Mask+3", size: 30, price: 199, category: "Skin", subCategory: "Face & Sheet Masks", for: "Male", brand: "Garnier", count: 0 },
  { name: "Olay Women Face Mask 4", image: "https://via.placeholder.com/300?text=Olay+Women+Face+Mask+4", size: 25, price: 299, category: "Skin", subCategory: "Face & Sheet Masks", for: "Female", brand: "Olay", count: 0 },
  { name: "Pond’s Women Face Mask 5", image: "https://via.placeholder.com/300?text=Pond's+Women+Face+Mask+5", size: 25, price: 249, category: "Skin", subCategory: "Face & Sheet Masks", for: "Female", brand: "Pond’s", count: 0 },

  // Toner
  { name: "L’Oreal Women Toner 1", image: "https://via.placeholder.com/300?text=L'Oreal+Women+Toner+1", size: 100, price: 499, category: "Skin", subCategory: "Toner", for: "Female", brand: "L’Oreal", count: 0 },
  { name: "Nivea Men Toner 2", image: "https://via.placeholder.com/300?text=Nivea+Men+Toner+2", size: 120, price: 399, category: "Skin", subCategory: "Toner", for: "Male", brand: "Nivea", count: 0 },
  { name: "Lakme Women Toner 3", image: "https://via.placeholder.com/300?text=Lakme+Women+Toner+3", size: 110, price: 449, category: "Skin", subCategory: "Toner", for: "Female", brand: "Lakme", count: 0 },
  { name: "Olay Women Toner 4", image: "https://via.placeholder.com/300?text=Olay+Women+Toner+4", size: 130, price: 499, category: "Skin", subCategory: "Toner", for: "Female", brand: "Olay", count: 0 },
  { name: "Garnier Men Toner 5", image: "https://via.placeholder.com/300?text=Garnier+Men+Toner+5", size: 140, price: 399, category: "Skin", subCategory: "Toner", for: "Male", brand: "Garnier", count: 0 },

  // Face Oils
  { name: "Bio-Oil Women Face Oil 1", image: "https://via.placeholder.com/300?text=Bio-Oil+Women+Face+Oil+1", size: 50, price: 699, category: "Skin", subCategory: "Face Oils", for: "Female", brand: "Bio-Oil", count: 0 },
  { name: "Kama Ayurveda Women Face Oil 2", image: "https://via.placeholder.com/300?text=Kama+Ayurveda+Women+Face+Oil+2", size: 30, price: 799, category: "Skin", subCategory: "Face Oils", for: "Female", brand: "Kama Ayurveda", count: 0 },
  { name: "Forest Essentials Women Face Oil 3", image: "https://via.placeholder.com/300?text=Forest+Essentials+Women+Face+Oil+3", size: 25, price: 899, category: "Skin", subCategory: "Face Oils", for: "Female", brand: "Forest Essentials", count: 0 },
  { name: "Nivea Men Face Oil 4", image: "https://via.placeholder.com/300?text=Nivea+Men+Face+Oil+4", size: 40, price: 599, category: "Skin", subCategory: "Face Oils", for: "Male", brand: "Nivea", count: 0 },
  { name: "Garnier Men Face Oil 5", image: "https://via.placeholder.com/300?text=Garnier+Men+Face+Oil+5", size: 35, price: 649, category: "Skin", subCategory: "Face Oils", for: "Male", brand: "Garnier", count: 0 },

  // ================== ACCESSORIES ==================
  // Hair Dryers
  { name: "Philips Hair Dryer 1", image: "https://via.placeholder.com/300?text=Philips+Hair+Dryer+1", size: 500, price: 1499, category: "Accessories", subCategory: "Hair Dryers", for: "Female", brand: "Philips", count: 0 },
  { name: "Nova Hair Dryer 2", image: "https://via.placeholder.com/300?text=Nova+Hair+Dryer+2", size: 550, price: 1299, category: "Accessories", subCategory: "Hair Dryers", for: "Male", brand: "Nova", count: 0 },
  { name: "Havells Hair Dryer 3", image: "https://via.placeholder.com/300?text=Havells+Hair+Dryer+3", size: 600, price: 1399, category: "Accessories", subCategory: "Hair Dryers", for: "Female", brand: "Havells", count: 0 },
  { name: "Syska Hair Dryer 4", image: "https://via.placeholder.com/300?text=Syska+Hair+Dryer+4", size: 650, price: 1599, category: "Accessories", subCategory: "Hair Dryers", for: "Male", brand: "Syska", count: 0 },
  { name: "Panasonic Hair Dryer 5", image: "https://via.placeholder.com/300?text=Panasonic+Hair+Dryer+5", size: 700, price: 1699, category: "Accessories", subCategory: "Hair Dryers", for: "Female", brand: "Panasonic", count: 0 },

  // Hair Straighteners
  { name: "Philips Hair Straightener 1", image: "https://via.placeholder.com/300?text=Philips+Hair+Straightener+1", size: 500, price: 1999, category: "Accessories", subCategory: "Hair Straighteners", for: "Female", brand: "Philips", count: 0 },
  { name: "Nova Hair Straightener 2", image: "https://via.placeholder.com/300?text=Nova+Hair+Straightener+2", size: 550, price: 1799, category: "Accessories", subCategory: "Hair Straighteners", for: "Female", brand: "Nova", count: 0 },
  { name: "Havells Hair Straightener 3", image: "https://via.placeholder.com/300?text=Havells+Hair+Straightener+3", size: 600, price: 1899, category: "Accessories", subCategory: "Hair Straighteners", for: "Female", brand: "Havells", count: 0 },
  { name: "Syska Hair Straightener 4", image: "https://via.placeholder.com/300?text=Syska+Hair+Straightener+4", size: 650, price: 1599, category: "Accessories", subCategory: "Hair Straighteners", for: "Female", brand: "Syska", count: 0 },
  { name: "Panasonic Hair Straightener 5", image: "https://via.placeholder.com/300?text=Panasonic+Hair+Straightener+5", size: 700, price: 1699, category: "Accessories", subCategory: "Hair Straighteners", for: "Female", brand: "Panasonic", count: 0 },

  // Hair Curler
  { name: "Philips Hair Curler 1", image: "https://via.placeholder.com/300?text=Philips+Hair+Curler+1", size: 500, price: 1999, category: "Accessories", subCategory: "Hair Curler", for: "Female", brand: "Philips", count: 0 },
  { name: "Nova Hair Curler 2", image: "https://via.placeholder.com/300?text=Nova+Hair+Curler+2", size: 550, price: 1799, category: "Accessories", subCategory: "Hair Curler", for: "Female", brand: "Nova", count: 0 },
  { name: "Havells Hair Curler 3", image: "https://via.placeholder.com/300?text=Havells+Hair+Curler+3", size: 600, price: 1899, category: "Accessories", subCategory: "Hair Curler", for: "Female", brand: "Havells", count: 0 },
  { name: "Syska Hair Curler 4", image: "https://via.placeholder.com/300?text=Syska+Hair+Curler+4", size: 650, price: 1599, category: "Accessories", subCategory: "Hair Curler", for: "Female", brand: "Syska", count: 0 },
  { name: "Panasonic Hair Curler 5", image: "https://via.placeholder.com/300?text=Panasonic+Hair+Curler+5", size: 700, price: 1699, category: "Accessories", subCategory: "Hair Curler", for: "Female", brand: "Panasonic", count: 0 },

  // Hair Brush
  { name: "Vega Hair Brush 1", image: "https://via.placeholder.com/300?text=Vega+Hair+Brush+1", size: 100, price: 299, category: "Accessories", subCategory: "Hair Brush", for: "Female", brand: "Vega", count: 0 },
  { name: "Roots Hair Brush 2", image: "https://via.placeholder.com/300?text=Roots+Hair+Brush+2", size: 120, price: 349, category: "Accessories", subCategory: "Hair Brush", for: "Female", brand: "Roots", count: 0 },
  { name: "Denman Hair Brush 3", image: "https://via.placeholder.com/300?text=Denman+Hair+Brush+3", size: 90, price: 249, category: "Accessories", subCategory: "Hair Brush", for: "Female", brand: "Denman", count: 0 },
  { name: "Tangle Teezer Hair Brush 4", image: "https://via.placeholder.com/300?text=Tangle+Teezer+Hair+Brush+4", size: 110, price: 399, category: "Accessories", subCategory: "Hair Brush", for: "Female", brand: "Tangle Teezer", count: 0 },
  { name: "Gubb Hair Brush 5", image: "https://via.placeholder.com/300?text=Gubb+Hair+Brush+5", size: 130, price: 349, category: "Accessories", subCategory: "Hair Brush", for: "Female", brand: "Gubb", count: 0 },

  // Trimmers & Clippers
  { name: "Philips Trimmer 1", image: "https://via.placeholder.com/300?text=Philips+Trimmer+1", size: 200, price: 1999, category: "Accessories", subCategory: "Trimmers & Clippers", for: "Male", brand: "Philips", count: 0 },
  { name: "Nova Trimmer 2", image: "https://via.placeholder.com/300?text=Nova+Trimmer+2", size: 220, price: 1799, category: "Accessories", subCategory: "Trimmers & Clippers", for: "Male", brand: "Nova", count: 0 },
  { name: "Havells Trimmer 3", image: "https://via.placeholder.com/300?text=Havells+Trimmer+3", size: 250, price: 1899, category: "Accessories", subCategory: "Trimmers & Clippers", for: "Male", brand: "Havells", count: 0 },
  { name: "Syska Trimmer 4", image: "https://via.placeholder.com/300?text=Syska+Trimmer+4", size: 230, price: 1599, category: "Accessories", subCategory: "Trimmers & Clippers", for: "Male", brand: "Syska", count: 0 },
  { name: "Panasonic Trimmer 5", image: "https://via.placeholder.com/300?text=Panasonic+Trimmer+5", size: 240, price: 1699, category: "Accessories", subCategory: "Trimmers & Clippers", for: "Male", brand: "Panasonic", count: 0 },

  // Cosmetic Lenses
  { name: "Bausch & Lomb Lenses 1", image: "https://via.placeholder.com/300?text=Bausch+%26+Lomb+Lenses+1", size: 2, price: 999, category: "Accessories", subCategory: "Cosmetic Lenses", for: "Female", brand: "Bausch & Lomb", count: 0 },
  { name: "Freshlook Lenses 2", image: "https://via.placeholder.com/300?text=Freshlook+Lenses+2", size: 2, price: 1099, category: "Accessories", subCategory: "Cosmetic Lenses", for: "Female", brand: "Freshlook", count: 0 },
  { name: "Acuvue Lenses 3", image: "https://via.placeholder.com/300?text=Acuvue+Lenses+3", size: 2, price: 1199, category: "Accessories", subCategory: "Cosmetic Lenses", for: "Female", brand: "Acuvue", count: 0 },
  { name: "Bella Lenses 4", image: "https://via.placeholder.com/300?text=Bella+Lenses+4", size: 2, price: 1299, category: "Accessories", subCategory: "Cosmetic Lenses", for: "Female", brand: "Bella", count: 0 },
  { name: "ColourVUE Lenses 5", image: "https://via.placeholder.com/300?text=ColourVUE+Lenses+5", size: 2, price: 1399, category: "Accessories", subCategory: "Cosmetic Lenses", for: "Female", brand: "ColourVUE", count: 0 },
];