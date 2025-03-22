
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  details: string;
  specs: {
    [key: string]: string;
  };
  reviews: {
    rating: number;
    count: number;
  };
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds Pro",
    description: "Premium wireless earbuds with noise cancellation and crystal clear sound quality.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "audio",
    featured: true,
    details: "Experience true wireless freedom with our flagship earbuds. Featuring active noise cancellation, transparency mode, and up to 24 hours of battery life with the charging case.",
    specs: {
      "Battery Life": "6 hours (24 with case)",
      "Noise Cancellation": "Active",
      "Water Resistance": "IPX4",
      "Connectivity": "Bluetooth 5.2",
      "Weight": "5.4g per earbud"
    },
    reviews: {
      rating: 4.8,
      count: 256
    }
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    description: "Advanced smartwatch with health tracking and seamless connectivity.",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "wearables",
    featured: true,
    details: "The ultimate companion for an active lifestyle. Monitor your health metrics, stay connected, and track your fitness goals with this premium smartwatch.",
    specs: {
      "Display": "1.78\" OLED",
      "Heart Rate": "Continuous monitoring",
      "GPS": "Built-in",
      "Water Resistance": "50m",
      "Battery Life": "Up to 18 hours"
    },
    reviews: {
      rating: 4.6,
      count: 189
    }
  },
  {
    id: "3",
    name: "Ultra-Slim Laptop",
    description: "Powerful, lightweight laptop with all-day battery life.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "computers",
    featured: true,
    details: "Engineered for performance and portability. With a stunning display, powerful processor, and incredible battery life, this laptop is perfect for work and creativity on the go.",
    specs: {
      "Processor": "Intel Core i7",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Display": "13.3\" Retina",
      "Battery": "Up to 20 hours"
    },
    reviews: {
      rating: 4.9,
      count: 312
    }
  },
  {
    id: "4",
    name: "Premium Noise-Cancelling Headphones",
    description: "Over-ear headphones with studio-quality sound and comfort.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "audio",
    featured: false,
    details: "Immerse yourself in your music with these premium headphones. Advanced noise cancellation technology blocks out ambient noise, while the premium drivers deliver exceptional audio quality.",
    specs: {
      "Driver Size": "40mm",
      "Noise Cancellation": "Adaptive",
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.0, 3.5mm",
      "Weight": "254g"
    },
    reviews: {
      rating: 4.7,
      count: 178
    }
  },
  {
    id: "5",
    name: "Smart Home Hub",
    description: "Central control for your entire smart home ecosystem.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1558002038-1055e2fc93af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "smart home",
    featured: false,
    details: "Transform your living space with this intuitive smart home hub. Control lights, thermostats, security systems, and more with simple voice commands or through the companion app.",
    specs: {
      "Compatibility": "Works with 100+ brands",
      "Voice Assistants": "Multiple supported",
      "Connectivity": "Wi-Fi, Bluetooth, Zigbee",
      "Power": "AC adapter",
      "Dimensions": "4.5\" x 4.5\" x 1.5\""
    },
    reviews: {
      rating: 4.5,
      count: 142
    }
  },
  {
    id: "6",
    name: "Professional Camera Kit",
    description: "High-resolution digital camera with premium lenses.",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "photography",
    featured: true,
    details: "Capture stunning images with this professional-grade camera kit. Includes a full-frame sensor camera body and two premium lenses to cover a versatile range of shooting scenarios.",
    specs: {
      "Sensor": "Full-frame 45MP",
      "ISO Range": "100-51,200",
      "Video": "8K 30fps",
      "Included Lenses": "24-70mm f/2.8, 70-200mm f/2.8",
      "Storage": "Dual SD card slots"
    },
    reviews: {
      rating: 4.9,
      count: 87
    }
  }
];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}
