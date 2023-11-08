const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const shoppingCart = [];
const products = [
    { name: 'Product 1', price: 10 },
    { name: 'Product 2', price: 20 },
    { name: 'Product 3', price: 30 },
];

function addToCart() {
    console.log('Available products:');
    products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - $${product.price}`);
    });

    rl.question('Select a product number to add to the cart: ', productNumber => {
        const selectedProduct = products[productNumber - 1];
        if (!selectedProduct) {
            console.log('Invalid product number. Please try again.');
            addToCart();
            return;
        }

        rl.question('Enter the quantity: ', quantity => {
            const parsedQuantity = parseInt(quantity);
            if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
                console.log('Invalid quantity. Please try again.');
                addToCart();
                return;
            }

            const totalPrice = selectedProduct.price * parsedQuantity;
            shoppingCart.push({ product: selectedProduct.name, quantity: parsedQuantity, total: totalPrice });
            console.log(`${parsedQuantity} ${selectedProduct.name}(s) added to the cart.`);
            rl.close();
        });
    });
}

rl.on('close', () => {
    // Implement cart display and checkout logic here
    console.log('Shopping cart contents:', shoppingCart);
    // You can proceed with displaying the cart, removing items, or checking out
});

// Start the shopping experience
addToCart(); 