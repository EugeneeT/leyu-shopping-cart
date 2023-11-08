// Block No. 1 imported extension and styling function

// Readline (node.js extension)
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const clearLine = () => {
    readline.moveCursor(process.stdout, 0, -1) // moves up one line
    readline.clearLine(process.stdout, 1) // clears from cursor to end
} // code from https://stackoverflow.com/questions/32938213/is-there-a-way-to-erase-the-last-line-of-output

// cli-boxes module to style the Menu
const cliBoxes = require('cli-boxes');
const width = 40; // Width of the box
const spaceInBox = `│ ${''.padEnd(width - 4)}│`;
const customBox = {
    vertical: '│',
} // from https://github.com/sindresorhus/cli-boxes

// my product samples 
const products = require('./products');

// loading time application for checkout
const loadingTime = require('./loadingTime');
const shortLoadingTime = require('./loadingTime');


// ******************************************


// Block No. 2 main function
const cart = [];

function startShopping() {
    displayProductMenu();
    firstQuestion()
}

function reloadShopping() {
    displayProductMenu();
}

function displayProductMenu() {
    console.log(spaceInBox);
    console.log(`│ ${'Welcome to the shopping app!'.padEnd(width - 4)}│`);
    console.log(spaceInBox);

    console.log(`│ ${'Products:'.padEnd(width - 4)}│`);
    products.forEach(product => {
        console.log(`│ ${`[${product.id}] ${product.name} - $${product.price}`.padEnd(width - 4)}│`);
    });
    console.log(spaceInBox);
    console.log(`│ ${'Menu:'.padEnd(width - 4)}│`);
    console.log(`│ ${'[O] View Cart'.padEnd(width - 4)}│`);
    console.log(`│ ${'[C] Checkout'.padEnd(width - 4)}│`);
    console.log(`│ ${'[q] Quit'.padEnd(width - 4)}│`);
    console.log(spaceInBox);
    console.log();
}

function firstQuestion() {
    rl.question('Enter the product ID to add to your cart: ', productId => {
        handleUserInput(productId);
    });
}

async function handleUserInput(productId) {
    if (productId === 'q') {            // Quit App
        await shortLoadingTime();
        clearLine();
        exitApp();

    } else if (productId === 'O') {     // View cart
        clearLine();
        viewCart();

    } else if (productId === 'C') {     // Clear cart
        clearLine();
        console.log("Checkout process initiated...");
        // In a real application, I'd handle payment and order processing here
        // For simplicity, I'll clear the cart after checkout
        await loadingTime();
        clearLine();
        clearCart();
        await loadingTime();
        clearLine();
        rl.question('Enter the product ID to add to your cart: ', productId => {
            handleUserInput(productId);
        });


    } else {
        const product = products.find(p => p.id === parseInt(productId));

        function enterQuantity() {
            rl.question(`Enter the quantity of ${product.name} to add to your cart: `, async quantity => {
                const cartItem = { product, quantity: parseInt(quantity) };
                cart.push(cartItem);

                console.log(`Added ${quantity} ${product.name} to your cart.`);
                await shortLoadingTime();
                clearLine();
                clearLine();
                rl.question('Enter the product ID to add to your cart: ', nextProductId => {
                    handleUserInput(nextProductId);
                });
            });
        }

        if (product) {
            const existingCartItemIndex = cart.findIndex(item => item.product.id === product.id);

            if (existingCartItemIndex !== -1) {
                clearLine();
                rl.question(`Enter the quantity for ${product.name} in your cart: `, async newQuantity => {
                    const quantity = parseInt(newQuantity);
                    if (!isNaN(quantity) && quantity >= 0) {
                        cart[existingCartItemIndex].quantity += quantity;
                        console.log(`${quantity} more of ${product.name} added to the cart.`);
                    } else {
                        console.log('Invalid quantity. Please enter a positive amount.');
                    }
                    await shortLoadingTime();
                    clearLine();
                    clearLine();
                    rl.question('Enter the product ID to add to your cart: ', nextProductId => {
                        handleUserInput(nextProductId);
                    });
                })
            } else {
                clearLine();
                enterQuantity();
            }
        } else {

            console.log('Invalid product ID. Please try again.');
            await shortLoadingTime();
            clearLine();
            clearLine();
            rl.question('Enter the product ID to add to your cart: ', nextProductId => {
                handleUserInput(nextProductId);
            });
        }
    }
}
// ******************************************


// Block No. 3 secondary functions

function exitApp() {
    rl.question('Are you sure you want to exit? (Y/N): ', async answer => {
        if (answer.toLowerCase() === 'y') {
            rl.close();
        } else {
            await shortLoadingTime();
            console.clear();
            startShopping();
        }
    });
}

function viewCart() {
    if (cart.length === 0) {
        emptyCart();
    } else {
        displayCart(cart);
    }

    async function emptyCart() {
        console.log('Your cart is empty.');
        await shortLoadingTime();
        console.clear();
        startShopping();
    }

    async function displayCart(cart) {
        console.log('Your Cart:');
        await shortLoadingTime();
        cart.forEach((item, index) => {
            console.log(`${index + 1}. ${item.product.name} - Quantity: ${item.quantity} - Price: $${(item.product.price * item.quantity).toFixed(2)}`);
        });
        rl.question('Enter the number of the item you want to remove (or press Enter to go back to the main menu): ', async itemIndex => {
            if (itemIndex === '') {
                await shortLoadingTime();
                console.clear();
                startShopping();
            } else {
                const index = parseInt(itemIndex) - 1;
                if (!isNaN(index) && index >= 0 && index < cart.length) {
                    removeItem(index);
                    console.log('Item will be removed from the cart.');
                    await shortLoadingTime();
                    console.clear();
                    reloadShopping()
                    viewCart();
                } else {
                    console.log('Invalid item number. Please try again.');
                    await shortLoadingTime();
                    console.clear();
                    reloadShopping()
                    viewCart();
                }
            }
        });
    }
}



function removeItem(itemIndex) {
    cart.splice(itemIndex, 1);
}

function clearCart() {
    cart.length = 0;
    console.log("Cart has been cleared.");
}


startShopping();
