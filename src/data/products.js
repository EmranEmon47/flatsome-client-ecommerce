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
        price: "$49.99",
    },
    {
        id: 2,
        image: product2,
        span: "Jackets",
        name: "Sunny Tank Selected Femme",
        rating: 5,
        price: "$89.00",
    },
    {
        id: 3,
        image: product3,
        span: "Sweaters",
        name: "Print Ls College Sweat",
        rating: 3,
        price: "$25.50",
    },
    {
        id: 4,
        image: product4,
        span: "Mens",
        name: "Raglan Tee Denim",
        rating: 5,
        price: "$55.50",
    },
];

export default products;
