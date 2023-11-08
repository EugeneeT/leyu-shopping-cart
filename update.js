const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const products = require('./products');
const loadingTime = require('./loadingTime');
const cart = [];

function startShopping() {
    console.log('Welcome to the shopping app!');
    displayProductMenu();
}

function displayProductMenu() {
    const stars = '**********';
    const menuHeader = '*** Menu ***';
    const menuFooter = '**********';

    console.log(`${stars}`);
    console.log(`${stars}`);
    console.log(`${menuHeader}`);
    console.log(`${stars}`);
    products.forEach(product => {
        console.log(`[${product.id}] ${product.name} - $${product.price}`);
    });
    console.log(`${stars}`);
    console.log('*** Options ***');
    console.log('[O] View Cart');
    console.log('[C] Checkout');
    console.log('[A] Adjust Qty');
    console.log('[q] Quit');
    console.log(`${stars}`);
    console.log(`Enter the product ID to add to your cart: `);

    rl.question('Enter the product ID: ', productId => {
        handleUserInput(productId);
    });
}


function getUserInput() {
    rl.question('Enter your choice: ', handleUserInput);
}

async function handleUserInput(userChoice) {
    switch (userChoice) {
        case 'q':
            exitApp();
            break;
        case 'O':
            viewCart();
            break;
        case 'C':
            console.log("Checkout process initiated...");
            await loadingTime();
            process.stdout.write('\u001Bc');
            clearCart();
            displayProductMenu();
            break;
        default:
            handleProductChoice(userChoice);
    }
}

function handleProductChoice(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
        const existingCartItemIndex = cart.findIndex(item => item.product.id === product.id);
        if (existingCartItemIndex !== -1) {
            rl.question(`Enter the quantity for ${product.name} in your cart: `, newQuantity => {
                const quantity = parseInt(newQuantity);
                if (!isNaN(quantity) && quantity >= 0) {
                    cart[existingCartItemIndex].quantity += quantity;
                    console.log(`${quantity} more of ${product.name} added to the cart.`);
                    getUserInput();  // Continue to get user input
                } else {
                    console.log('Invalid quantity. Please enter a positive amount.');
                    getUserInput();  // Continue to get user input
                }
            });
        } else {
            rl.question(`Enter the quantity of ${product.name} to add to your cart: `, quantity => {
                const cartItem = { product, quantity: parseInt(quantity) };
                cart.push(cartItem);
                console.log(`Added ${quantity} ${product.name} to your cart.`);
                getUserInput();  // Continue to get user input
            });
        }
    } else {
        console.log('Invalid product ID. Please try again.');
        getUserInput();  // Continue to get user input
    }
}


function viewCart() {
    if (cart.length === 0) {
        console.log('Your cart is empty.');
        getUserInput();
    } else {
        displayCart(cart);
        rl.question('Enter the number of the item you want to remove (or press Enter to go back to the main menu): ', itemIndex => {
            if (itemIndex === '') {
                getUserInput();
            } else {
                const index = parseInt(itemIndex) - 1;
                if (!isNaN(index) && index >= 0 && index < cart.length) {

                    removeItem(index);
                } else {
                    console.log('Invalid item number. Please try again.');
                }
            }
        });
    }
}

function displayCart(cart) {
    console.log('Your Cart:');
    cart.forEach((item, index) => {
        console.log(`${index + 1}. ${item.product.name} - Quantity: ${item.quantity} - Price: $${(item.product.price * item.quantity).toFixed(2)}`);
    });
}

function removeItem(itemIndex) {
    cart.splice(itemIndex, 1);
    console.log('Item removed from the cart.')
    getUserInput();
}

function clearCart() {
    cart.length = 0;
    console.log("Cart has been cleared.");
}

function exitApp() {
    rl.question('Are you sure you want to exit? (Y/N): ', answer => {
        if (answer.toLowerCase() === 'y') {
            rl.close();
        } else {
            displayProductMenu();
        }
    });
}

startShopping();
