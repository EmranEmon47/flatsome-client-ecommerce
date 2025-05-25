// src/data/products.js
import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";
import product4 from "../assets/product4.jpg";

const products = [
    {
        id: 1,
        image: product1,
        span: "Tops",
        name: "Lenox Star Knit Hunkydory",
        rating: 4,
        price: 49.99,
        description:
            "A soft and stylish top made from premium knit materials, perfect for casual wear or layering. It offers comfort and fashion in one piece.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Beige", "Navy Blue"],
        availability: "In Stock",
    },
    {
        id: 2,
        image: product2,
        span: "Jackets",
        name: "Sunny Tank Selected Femme",
        rating: 5,
        price: 89.00,
        description:
            "This lightweight jacket is perfect for spring and fall. Designed with minimal seams for a clean look and high comfort.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Olive", "Black", "Mustard"],
        availability: "In Stock",
    },
    {
        id: 3,
        image: product3,
        span: "Sweaters",
        name: "Print Ls College Sweat",
        rating: 3,
        price: 25.50,
        description:
            "A retro college-style sweatshirt with bold print and durable stitching. Stay warm and trendy all season long.",
        sizes: ["M", "L", "XL"],
        colors: ["Red", "Gray"],
        availability: "Limited Stock",
    },
    {
        id: 4,
        image: product4,
        span: "Mens",
        name: "Raglan Tee Denim",
        rating: 5,
        price: 55.50,
        description:
            "This rugged raglan tee styled with denim wash gives both comfort and bold character for everyday wear.",
        sizes: ["S", "M", "L"],
        colors: ["Denim Blue", "Charcoal"],
        availability: "Out of Stock",
    },

];

export default products;
