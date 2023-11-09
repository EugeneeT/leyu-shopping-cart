// Define a factory function for creating products
function createProduct(id, name, price, description, color, brand) {
    return {
        id,
        name,
        price,
        description,
        color,
        brand,
    };
}

// Use the factory function to create product objects
const products = [
    createProduct(11, 'Action Figure', 19.99, 'A highly detailed action figure of a famous superhero.', 'Red and Blue', 'SuperHero Toys'),
    createProduct(12, 'Plush Teddy Bear', 14.99, 'A soft and cuddly teddy bear plush toy.', 'Brown', 'CuddleCo'),
    createProduct(13, 'Trading Card Set', 29.99, 'A set of rare trading cards featuring characters from a popular card game.', 'Various', 'CardMaster'),
    createProduct(14, 'Building Blocks Set', 24.99, 'A set of colorful building blocks for creative play.', 'Multiple', 'BuildIt'),
    createProduct(15, 'Painting Kit', 59.99, 'A set of rare colorful pencils featuring unique materials.', 'Various', 'ThePainter'),
    createProduct(16, 'Candy', 4.99, 'A bag of marble candies.', 'Multiple', 'Haribro'),
    // Add more products here
];

module.exports = products;
