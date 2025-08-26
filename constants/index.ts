export const inventories = [
    {
        id: 1,
        name: "2009 Toyota Camry",
        brand: "Toyota",
        model: "Camry",
        year: 2009,
        price: 6990,
        discountPrice: null, // No discount mentioned in the post
        isOffer: false,
        featured:true,
        mileage: 240000,
        fuelType: "Hybrid",
        transmission: "Automatic",
        hstRequired: true,
        licensing: true,
        safetyCertified: true, // ✅ Safety Certified from the post
        tradeInsWelcome: true, // ♻️ Trade-Ins Welcome! from the post
        location: "751 Danforth Rd, Toronto", // 📍 from the post
        phone: "647-622-2202", // 📞 from the post
        carfax: "https://www.carfax.com/VehicleHistory/p/Report.cfx?vin=1234567890",
        images: [
            "/inventories/toyota_camry_2009_1.jpg",
            "/inventories/toyota_camry_2009_2.jpg",
            "/inventories/toyota_camry_2009_3.jpg",
            "/inventories/toyota_camry_2009_4.jpg",
            "/inventories/toyota_camry_2009_5.jpg"
        ],
        description: `
<div>
  <ul>
    <li>✨ Smooth Drive &amp; Comfortable Ride</li>
    <li>✨ Reliable Toyota Quality</li>
    <li>✨ Clean Inside &amp; Out</li>
  </ul>

  <p><strong>🔥 Affordable hybrid sedan with comfort, reliability, and efficiency!</strong></p>

  <p>📞 Call/Text: <a href="tel:+16476222202">647-622-2202</a></p>
  <p>👉 Come see it in person — you'll love the drive!</p>
</div>
`,

    },
    {
        id: 2,
        name: "2017 Toyota RAV4",
        brand: "Toyota",
        model: "RAV4",
        year: 2017,
        price: 22990,
        discountPrice: null,
        isOffer: false,
        featured: true,
        mileage: 112000,
        fuelType: "Hybrid",
        transmission: "Automatic",
        hstRequired: true,
        licensing: true,
        safetyCertified: true, // ✅ Safety Certified
        tradeInsWelcome: true, // ♻️ Trade-Ins Welcome!
        location: "751 Danforth Rd, Toronto", // 📍
        phone: "647-622-2202", // 📞
        carfax: "https://www.carfax.com/VehicleHistory/p/Report.cfx?vin=1234567890",
        images: ["/inventories/toyota_rav4_2017_1.jpg", "/inventories/toyota_rav4_2017_2.jpg", "/inventories/toyota_rav4_2017_3.jpg", "/inventories/toyota_rav4_2017_4.jpg", "/inventories/toyota_rav4_2017_5.jpg"], // Placeholder for now
        description: `
<div>
  <ul>
    <li>✨ 112,000 kms</li>
    <li>✨ Hybrid – Great Fuel Efficiency</li>
    <li>✨ Limited Trim – Fully Loaded Features</li>
    <li>✨ All-Wheel Drive – Ready for Any Season</li>
    <li>✨ Toyota Reliability &amp; Comfort</li>
  </ul>

  <p><strong>🔥 Stylish, efficient, and dependable SUV — the perfect all-rounder!</strong></p>

  <p>📞 Call/Text: <a href="tel:+16476222202">647-622-2202</a></p>
  <p>👉 Come see it in person — you'll love the drive!</p>
  <p>📌 Buy with confidence — We are OMVIC &amp; UCDA Registered Dealer</p>
</div>
`,
    },
    {
        id: 3,
        name: "2015 Chevy Cruze",
        brand: "Chevrolet",
        model: "Cruze",
        year: 2015,
        price: 6900,
        discountPrice: null,
        isOffer: false,
        mileage: 162000,
        fuelType: "Gasoline",
        transmission: "Automatic",
        hstRequired: true,
        licensing: true,
        safetyCertified: true, // ✅ Safety Certified
        tradeInsWelcome: true, // ♻️ Trade-Ins Welcome!
        location: "751 Danforth Rd, Toronto", // 📍
        phone: "647-622-2202", // 📞
        carfax: "https://www.carfax.com/VehicleHistory/p/Report.cfx?vin=1234567890",
        images: ["/inventories/chevy_cruze_lt_2015_1.jpg", "/inventories/chevy_cruze_lt_2015_2.jpg"], // Placeholder for now
        description: `
<div>
  <ul>
    <li>✨ 162,000 kms</li>
    <li>✨ LT Trim – Great Features &amp; Comfort</li>
    <li>✨ Fuel Efficient &amp; Reliable</li>
    <li>✨ Smooth Drive &amp; Well Maintained</li>
    <li>✨ Clean Inside &amp; Out</li>
  </ul>

  <p><strong>🔥 Affordable sedan with style, comfort, and dependability!</strong></p>

  <p>📞 Call/Text: <a href="tel:+16476222202">647-622-2202</a></p>
  <p>👉 Come see it in person — you'll love the drive!</p>
</div>
`,
    },
    {
        id: 4,
        name: "2013 Honda Civic",
        brand: "Honda",
        model: "Civic",
        year: 2013,
        price: 7499,
        discountPrice: null,
        isOffer: false,
        mileage: 251000,
        fuelType: "Gasoline",
        transmission: "Automatic",
        hstRequired: true,
        licensing: true,
        safetyCertified: true, // ✅ Safety Certified
        tradeInsWelcome: true, // ♻️ Trade-Ins Welcome!
        location: "751 Danforth Rd, Toronto", // 📍
        phone: "647-622-2202", // 📞
        carfax: "https://www.carfax.com/VehicleHistory/p/Report.cfx?vin=1234567890",
        images: ["/inventories/honda_civic_2013_1.jpg", "/inventories/honda_civic_2013_2.jpg"], // Placeholder for now
        description: `
<div>
  <ul>
    <li>✨ 251,000 kms</li>
    <li>✨ 1.8L – Reliable &amp; Fuel Efficient</li>
    <li>✨ Back-Up Camera</li>
    <li>✨ No Claims – Clean History</li>
    <li>✨ Smooth Drive &amp; Clean Inside Out</li>
  </ul>

  <p><strong>🔥 Perfect daily driver with Honda reliability!</strong></p>

  <p>📞 Call/Text: <a href="tel:+16476222202">647-622-2202</a></p>
  <p>👉 Come see it in person — you'll love the drive!</p>
</div>
`,
    },
    {
        id: 5,
        name: "2006 Toyota Highlander",
        brand: "Toyota",
        model: "Highlander",
        year: 2006,
        price: 3400,
        discountPrice: null,
        isOffer: false,
        mileage: 295000,
        fuelType: "Hybrid",
        transmission: "Automatic",
        hstRequired: true,
        licensing: true,
        safetyCertified: false, // As-Is condition
        tradeInsWelcome: true, // ♻️ Trade-Ins Welcome!
        location: "751 Danforth Rd, Toronto", // 📍
        phone: "647-622-2202", // 📞
        carfax: "https://www.carfax.com/VehicleHistory/p/Report.cfx?vin=1234567890",
        images: ["/inventories/higlander.jpg", "/inventories/higlander_1.jpg"], // Placeholder for now
        description: `
<div>
  <ul>
    <li>✨ 295,000 kms</li>
    <li>✨ Everything Works Perfectly</li>
    <li>✨ No Dash Lights On</li>
    <li>✨ Mechanically Strong &amp; Drives Smooth</li>
    <li>✨ Hybrid Efficiency + Toyota Reliability</li>
  </ul>

  <p><strong>🔥 Affordable SUV with plenty of life left!</strong></p>
  <p><em>As-Is condition</em></p>

  <p>📞 Call/Text: <a href="tel:+16476222202">647-622-2202</a></p>
  <p>👉 Come see it in person — great value SUV</p>
</div>
`,
    },
    {
        id: 6,
        name: "2014 Mazda 3",
        brand: "Mazda",
        model: "3",
        year: 2014,
        price: 7900,
        discountPrice: null,
        isOffer: false,
        mileage: 250000,
        fuelType: "Gasoline",
        transmission: "Automatic",
        hstRequired: true,
        licensing: true,
        safetyCertified: true, // ✅ Safety Certified
        tradeInsWelcome: true, // ♻️ Trade-Ins Welcome!
        location: "751 Danforth Rd, Toronto", // 📍
        phone: "647-622-2202", // 📞
        carfax: "https://www.carfax.com/VehicleHistory/p/Report.cfx?vin=1234567890",
        images: ["/inventories/mazda_1.jpg", "/inventories/mazda_2.jpg"], // Placeholder for now
        description: `
<div>
  <ul>
    <li>✨ 250,000 kms</li>
    <li>✨ 2.0L SKYACTIV – Reliable &amp; Fuel Efficient</li>
    <li>✨ GS Trim – Comfort + Features</li>
    <li>✨ Safety Certified ✅</li>
    <li>✨ Rust Proofed &amp; Well Maintained</li>
  </ul>

  <p><strong>🔥 Clean inside &amp; out — sporty, reliable, and budget-friendly!</strong></p>

  <p>📞 Call/Text: <a href="tel:+16476222202">647-622-2202</a></p>
  <p>👉 Come see it in person — you'll love the drive!</p>
</div>
`,
    },
    {
        id: 7,
        name: "2021 Acura RDX",
        brand: "Acura",
        model: "RDX",
        year: 2021,
        price: 39900,
        discountPrice: null,
        isOffer: false,
        featured: true,
        mileage: 41000,
        fuelType: "Gasoline",
        transmission: "Automatic",
        hstRequired: true,
        licensing: true,
        safetyCertified: true, // Safety Certified – Included
        tradeInsWelcome: true,
        location: "751 Danforth Rd, Toronto",
        phone: "647-622-2202",
        carfax: "https://www.carfax.com/VehicleHistory/p/Report.cfx?vin=1234567890",
        images: ["/inventories/acura_1.jpg", "/inventories/acura_2.jpg"], // Placeholder for now
        description: `
<div>
  <ul>
    <li>🛣️ Mileage: 41,000 km</li>
    <li>🧾 Condition: Clean Carfax – No Accidents</li>
    <li>⚙️ Trim: A-Spec – Fully Loaded</li>
    <li>🛡️ Safety Certified – Included</li>
    <li>📄 OMVIC Registered Dealer – Buy with Confidence</li>
  </ul>

  <p>This 2021 Acura RDX A-Spec is in excellent condition inside and out. Enjoy luxury, performance, and style with this fully loaded SUV featuring A-Spec styling, advanced tech, and premium comfort.</p>

  <p>📞 Call/Text: <a href="tel:+16476222202">647-622-2202</a></p>
  <p>👉 Come see it in person — you'll love the drive!</p>
</div>
`,
    },
    {
        id: 8,
        name: "2017 Jeep Cherokee",
        brand: "Jeep",
        model: "Cherokee",
        year: 2017,
        price: 22900,
        discountPrice: null,
        isOffer: false,
        featured: true,
        mileage: 99400,
        fuelType: "Gasoline",
        transmission: "Automatic",
        hstRequired: true,
        licensing: true,
        safetyCertified: true, // ✅ Safety Certified Included
        tradeInsWelcome: true, // ✅ Trade-Ins Accepted
        location: "751 Danforth Rd, Toronto", // 📍
        phone: "647-622-2202", // 📞
        carfax: "https://www.carfax.com/VehicleHistory/p/Report.cfx?vin=1234567890",
        images: ["/inventories/jeep_1.jpg"], // Placeholder for now
        description: `
<div>
  <ul>
    <li>✅ Only 99,400 kms</li>
    <li>✅ 3.6L V6 – Powerful &amp; Smooth</li>
    <li>✅ 4x4 – Great for All Seasons</li>
    <li>✅ Altitude Package – Blacked Out Styling</li>
    <li>✅ Safety Certified Included</li>
    <li>✅ Trade-Ins Accepted</li>
  </ul>

  <p>🧰 Well maintained, clean inside &amp; out. Perfect balance of power, comfort, and rugged style.</p>

  <p>📞 Call/Text: <a href="tel:+16476222202">647-622-2202</a></p>
  <p>👉 Come see it in person — you'll love how it drives!</p>
</div>
`,
    },
    {
        id: 9,
        name: "2015 Mazda 3 Touring",
        brand: "Mazda",
        model: "3",
        year: 2015,
        price: 7900,
        discountPrice: null,
        isOffer: false,
        mileage: 233000,
        fuelType: "Gasoline",
        transmission: "Automatic",
        hstRequired: true,
        licensing: true,
        safetyCertified: true, // ✅ Certified with Safety Included
        tradeInsWelcome: true,
        location: "751 Danforth Rd, Toronto", // 📍
        phone: "647-622-2202", // 📞
        carfax: "https://www.carfax.com/VehicleHistory/p/Report.cfx?vin=1234567890",
        images: ["/inventories/mazda_3.jpg"], // Placeholder for now
        description: `
<div>
  <ul>
    <li>📏 Km: 233,000</li>
    <li>✅ Certified with Safety Included</li>
    <li>✅ Excellent Mechanical &amp; Cosmetic Condition</li>
    <li>✅ Dealership Service Records Available</li>
    <li>✅ Fuel Efficient and Reliable</li>
    <li>📄 Clean Carfax – No Accidents or Claims</li>
  </ul>

  <p>Carfax report can be provided to serious buyers upon request.</p>
  <p>You're welcome to come test drive the vehicle and experience how well it has been maintained.</p>

  <p>📞 Contact: <a href="tel:+16476222202">647-622-2202</a></p>
</div>
`,
    },
    {
        id: 10,
        name: "2012 Toyota Prius C",
        brand: "Toyota",
        model: "Prius C",
        year: 2012,
        price: 4999,
        discountPrice: null,
        isOffer: false,
        mileage: null, // No mileage specified in the listing
        fuelType: "Hybrid",
        transmission: "Automatic",
        hstRequired: true,
        licensing: true,
        safetyCertified: false, // Not mentioned in the listing
        tradeInsWelcome: false, // Not mentioned in the listing
        location: "751 Danforth Rd, Toronto", // 📍
        phone: "647-622-2202", // ☎️
        carfax: "https://www.carfax.com/VehicleHistory/p/Report.cfx?vin=1234567890",
        images: ["/inventories/prius.jpg"], // Placeholder for now
        description: `
<div>
  <p>Fuel-efficient and reliable hybrid!</p>
  <ul>
    <li>✅ Smooth drive</li>
    <li>✅ Well maintained</li>
    <li>✅ Great on gas</li>
    <li>✅ Clean inside and out</li>
  </ul>

  <p>☎️ Call/Text: <a href="tel:+16476222202">647-622-2202</a></p>
</div>
`,
    },
    {
        id: 11,
        name: "2010 Toyota Prius",
        brand: "Toyota",
        model: "Prius",
        year: 2010,
        price: 6999,
        discountPrice: null,
        isOffer: false,
        mileage: 250000,
        fuelType: "Hybrid",
        transmission: "Automatic",
        hstRequired: true,
        licensing: true,
        safetyCertified: false, // Not mentioned in the listing
        tradeInsWelcome: false, // Not mentioned in the listing
        location: "751 Danforth Rd, Toronto",
        phone: "647-622-2202",
        carfax: "https://www.carfax.com/VehicleHistory/p/Report.cfx?vin=1234567890",
        images: ["/inventories/prius_2010.jpg"], // Placeholder for now
        description: `
<div>
  <ul>
    <li>📍 250,000 km</li>
    <li>✅ Clean Carfax – No Accidents</li>
    <li>✅ Fuel-efficient, reliable hybrid</li>
    <li>✅ Perfect for daily commutes</li>
    <li>✅ Drives smooth, eco-friendly, and budget-friendly!</li>
  </ul>

  <p>📞 DM or text <a href="tel:+16476222202">647-622-2202</a> for more info!</p>
</div>
`,
    },
    {
        id: 12,
        name: "2014 Dodge Journey",
        brand: "Dodge",
        model: "Journey",
        year: 2014,
        price: 6900,
        discountPrice: null,
        isOffer: false,
        mileage: 106000,
        fuelType: "Gasoline",
        transmission: "Automatic",
        hstRequired: true,
        licensing: true,
        safetyCertified: false, // Not mentioned in the listing
        tradeInsWelcome: false, // Not mentioned in the listing
        location: "751 Danforth Rd, Toronto",
        phone: "647-622-2202",
        carfax: "https://www.carfax.com/VehicleHistory/p/Report.cfx?vin=1234567890",
        images: ["/inventories/dodge.jpg"], // Placeholder for now
        description: `
<div>
  <ul>
    <li>📍 106,000 km</li>
    <li>✅ Clean Carfax – No Accidents</li>
    <li>✅ Dealer Maintained</li>
    <li>✅ SE Trim</li>
    <li>✅ Well-kept, reliable SUV</li>
    <li>✅ Perfect for everyday driving or family use</li>
  </ul>

  <p>📞 DM or text <a href="tel:+16476222202">647-622-2202</a> for details!</p>
</div>
`,
    },
    {
        id: 13,
        name: "2018 Volkswagen Golf SportWagen",
        brand: "Volkswagen",
        model: "Golf SportWagen",
        year: 2018,
        price: null, // Price not specified in the listing
        discountPrice: null,
        isOffer: false,
        mileage: null, // Mileage not specified in the listing
        fuelType: "Gasoline",
        transmission: "Automatic",
        hstRequired: true,
        licensing: true,
        safetyCertified: true, // ✅ Safety certification included
        tradeInsWelcome: false, // Not mentioned in the listing
        location: "751 Danforth Rd, Toronto",
        phone: "647-622-2202",
        carfax: "https://www.carfax.com/VehicleHistory/p/Report.cfx?vin=1234567890",
        images: ["/inventories/vw_golf.jpg"], // Placeholder for now
        description: `
<div>
  <ul>
    <li>✅ Safety certification included</li>
    <li>✅ Clean Carfax – No Accidents</li>
    <li>✅ Single Owner – Dealer Maintained</li>
    <li>✅ 2 Keys + Books</li>
    <li>✅ Winter Tires (Continental)</li>
    <li>✅ Roof Rack Included</li>
    <li>✅ TSI Engine</li>
  </ul>

  <p>📞 Call/Text: <a href="tel:+16476222202">647-622-2202</a> for pricing and details!</p>
</div>
`,
    },
];

export const carTypes = [
    {
        id: 1,
        name: "Sedan",
        image: "/types/sedan.webp",
    },
    {
        id: 2,
        name: "SUV",
        image: "/types/suv.webp",
    },
    {
        id: 3,
        name: "Truck",
        image: "/types/truck.webp",
    },
    {
        id: 4,
        name: "Coupe",
        image: "/types/coupe.webp",
    },
    {
        id: 5,
        name: "Hatchback",
        image: "/types/hatchback.webp",
    },
    {
        id: 6,
        name: "Convertible",
        image: "/types/convertible.webp",
    },
    {
        id: 7,
        name: "Wagon",
        image: "/types/wagon.webp",
    },
];

export const brands = [
    {id: 1, name: "Acura", logo: "/brand-images/acura.png"},
    {id: 2, name: "Audi", logo: "/brand-images/audi.webp"},
    {id: 3, name: "BMW", logo: "/brand-images/bmw.webp"},
    {id: 4, name: "Chevrolet", logo: "/brand-images/chevrolet.webp"},
    {id: 5, name: "Dodge", logo: "/brand-images/dodge.webp"},
    {id: 6, name: "Ford", logo: "/brand-images/ford.webp"},
    {id: 7, name: "GMC", logo: "/brand-images/gmc.webp"},
    {id: 8, name: "Honda", logo: "/brand-images/honda.webp"},
    {id: 9, name: "Hyundai", logo: "/brand-images/hyundai.webp"},
    {id: 10, name: "Infiniti", logo: "/brand-images/infiniti.webp"},
    {id: 11, name: "Jeep", logo: "/brand-images/jeep.webp"},
    {id: 12, name: "Lexus", logo: "/brand-images/lexus.webp"},
    {id: 13, name: "Mazda", logo: "/brand-images/mazda.webp"},
    {id: 14, name: "Mercedes", logo: "/brand-images/mercedes.webp"},
    {id: 15, name: "MG", logo: "/brand-images/mg.webp"},
    {id: 16, name: "Mitsubishi", logo: "/brand-images/mitsubishi.webp"},
    {id: 17, name: "Nissan", logo: "/brand-images/nissan.webp"},
    {id: 18, name: "Porsche", logo: "/brand-images/porsche.webp"},
    {id: 19, name: "Range Rover", logo: "/brand-images/range-rover.webp"},
    {id: 20, name: "Renault", logo: "/brand-images/renault.webp"},
    {id: 21, name: "Suzuki", logo: "/brand-images/suzuki.webp"},
    {id: 22, name: "Tesla", logo: "/brand-images/tesla.webp"},
    {id: 23, name: "Toyota", logo: "/brand-images/toyota.webp"},
    {id: 24, name: "Volkswagen", logo: "/brand-images/volkswagen.webp"},
];
