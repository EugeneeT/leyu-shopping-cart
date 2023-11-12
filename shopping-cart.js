// Block No. 1 Importing modules and defining styling function

// Readline (node.js extension)
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Function to clear the current line in the terminal
const clearLine = () => {
    readline.moveCursor(process.stdout, 0, -1)
    // Moves up one line
    readline.clearLine(process.stdout, 1)
    // Clears from cursor to end
};// code from https://stackoverflow.com/questions/32938213/is-there-a-way-to-erase-the-last-line-of-output


// idea from cli-boxes module to style the Menu
const width = 40;
// Width of the box
const spaceInBox = `│ ${''.padEnd(width - 4)}│`;
// Creating space in the box
// from https://github.com/sindresorhus/cli-boxes


// My product samples 
const products = require('./products');
// Importing product samples

// Loading time animation
const loadingTime = require('./loadingTime');
// Importing loading time animation

// ******************************************


// Block No. 2: Main Function Definitions

const cart = [];
// This array will be used to store items that the user adds to their shopping cart

function startShopping() {
    // Function to start the shopping app
    console.clear();
    displayProductMenu();
    questionEnterId();
}

function reloadShopping() {
    // Function to reload the shopping menu
    console.clear();
    displayProductMenu();
}

// Questions 
const enterId = 'Enter the product ID to add to your cart: ';

function questionEnterId() {
    // Function to prompt the first question
    rl.question(enterId, productId => {
        handleUserInput(productId);
        // rl.question() is a method provided by the readline module. It's used to display a message to the user and receive their input.
    });
}

function displayProductMenu() {
    // Function to display the product menu
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

async function handleUserInput(productId) {
    // Function to handle user input
    switch (productId) {
        // The switch statement handles different cases based on the user's input (productId) and executes the corresponding code block for each case
        // I am using switch statement to improve readability of my code
        case 'q':
            // If the user wants to quit the application
            await loadingTime();
            clearLine();
            exitApp();
            break;

        case 'O':
            // If the user wants to view the cart
            clearLine();
            viewCart();
            break;

        case 'C':
            // If the user wants to checkout (clear the cart)
            checkout();
            // In a real application, I'd handle payment and order processing here
            // For simplicity, I'll clear the cart after checkout
            break;

        default:
            const product = products.find(p => p.id === parseInt(productId));
            // This line of code searches for a product in the 'products' array based on the provided 'productId'
            // It does this by using the 'Array.prototype.find()' method, which takes a callback function
            // The callback function compares the 'id' property of each product (p.id) to the 'productId' that was parsed to an integer.


            if (product) {
                // If product ID valid
                const existingCartItemIndex = cart.findIndex(item => item.product.id === product.id);
                // Find the index of an existing cart item with the same product
                const enterQuantity = `Enter the quantity of ${product.name} to add to your cart: `;
                // question for the following functions 

                if (existingCartItemIndex !== -1) {
                    // If the product is already in the cart
                    clearLine();
                    rl.question(enterQuantity, async newQuantity => {
                        // The code uses rl.question to prompt the user to enter the quantity for a specific product in their cart
                        // The user's response is captured in the 'newQuantity' variable, which represents the input from the user
                        const quantity = parseInt(newQuantity);
                        // The code attempts to convert 'newQuantity' to an integer (whole number) using parseInt
                        // This is done to ensure that the user's input is treated as a number, making it suitable for calculations
                        // The result of the parseInt conversion is stored in the 'quantity' variable for further processing
                        // 'quantity' now holds the numeric value entered by the user, or NaN (Not-a-Number) if the input is not a valid number
                        if (!isNaN(quantity) && quantity >= 0) {
                            // If the entered quantity is a positive number
                            cart[existingCartItemIndex].quantity += quantity;
                            // Add the new quantity to the existing cart item
                            console.log(`${quantity} more of ${product.name} added to the cart.`);
                            // and display a message confirming the addition
                        } else {
                            // If invalid quantity
                            console.log('Invalid quantity. Please enter a positive amount.');
                        }
                        await loadingTime();
                        clearLine();
                        clearLine();
                        questionEnterId();
                    })
                } else {
                    // Product not in cart yet
                    clearLine();
                    rl.question(enterQuantity, async quantity => {
                        // The code uses rl.question to prompt the user to enter the quantity for a specific product in their cart
                        // The user's response is captured in the 'quantity' variable, which represents the input from the user
                        const cartItem = { product, quantity: parseInt(quantity) };
                        // The code attempts to convert 'quantity' to an integer (whole number) using parseInt
                        // This is done to ensure that the user's input is treated as a number, making it suitable for calculations
                        // The result of the parseInt conversion is stored in the 'cartItem' variable for further processing
                        // 'cartItem' now holds the numeric value entered by the user, or NaN (Not-a-Number) if the input is not a valid number
                        if (!isNaN(quantity) && quantity >= 0) {
                            cart.push(cartItem);
                            // Add cartItem to the cart
                            console.log(`Added ${quantity} ${product.name} to your cart.`);
                            await loadingTime();
                            clearLine();
                            clearLine();
                            questionEnterId();
                        } else {
                            // If invalid quantity
                            console.log('Invalid quantity. Please enter a positive amount.');
                            await loadingTime();
                            clearLine();
                            clearLine();
                            questionEnterId();
                        }

                    });

                }

            } else {
                // If invalid product ID
                console.log('Invalid product ID. Please try again.');
                await loadingTime();
                clearLine();
                clearLine();
                questionEnterId();
            }
            break;
    }
}
// ******************************************


// Block No. 3 Menu functions

// View cart functions

function viewCart() {
    // Function to view the cart
    if (cart.length === 0) {
        // If the cart is empty (no items in it)
        emptyCart();
    } else {
        // If there are items in the cart
        displayCart(cart);
    }
}

async function emptyCart() {
    // Function to display an empty cart
    console.log('Your cart is empty.');
    await loadingTime();
    console.clear();
    startShopping();
}

async function displayCart(cart) {
    // Function to display the items in the cart
    const itemRemove = '\nEnter the number of the item you want to remove \n(or press Enter to go back to the main menu): ';

    console.log('Your Cart:');
    await loadingTime();

    let totalItems = 0;
    let totalPrice = 0;
    // Initialize variables to track total items and total price
    // I am using let since these variables are being updated in a loop,

    cart.forEach((item, index) => {
        // Loop through each item in the cart and display its details

        totalItems += item.quantity;
        // Increment totalItems by the quantity of the current item
        totalPrice += item.product.price * item.quantity;
        // Increment totalPrice by the price of the current item multiplied by its quantity

        console.log(`${index + 1}. ${item.product.name} - Quantity: ${item.quantity} - Price: $${(item.product.price * item.quantity).toFixed(2)}`);
        // Display the total items and total amount to pay after the loop
    });

    console.log(`\nTotal Items in Cart: ${totalItems}`);
    console.log(`Total Amount to Pay: $${totalPrice.toFixed(2)}`);

    rl.question(itemRemove, async itemIndex => {
        // Ask the user to enter the number of the item they want to remove or go back to the main menu
        if (itemIndex === '') {
            // If the user presses Enter, go back to the main menu
            await loadingTime();
            console.clear();
            startShopping();
        } else {
            const index = parseInt(itemIndex) - 1;
            // Converts the user's input to an array index (subtracting 1) for item removal.
            if (!isNaN(index) && index >= 0 && index < cart.length) {
                // Check if the input is a valid item number in the cart
                removeItem(index);
                // Remove the selected item from the cart
                console.log('Item will be removed from the cart.');
                await loadingTime();
                reloadShopping()
                viewCart();
            } else {
                console.log('Invalid item number. Please try again.');
                await loadingTime();
                reloadShopping()
                viewCart();
            }
        }
    });
}

function removeItem(itemIndex) {
    // Function to remove items from the cart
    cart.splice(itemIndex, 1);
    // Use the splice method to remove an item from the cart array
}
// ******************************************


// Block No. 4: Checkout function 

async function checkout() {
    // Function to checkout
    clearLine();
    console.log("Checkout process initiated...");
    await loadingTime();
    clearLine();
    cart.length = 0;
    // Clear the cart by setting its length to 0, effectively emptying it
    console.log("Cart has been cleared.");
    await loadingTime();
    startShopping();
}
// ******************************************


// Block No. 5: Exit function
function exitApp() {
    // exit with confirmation question
    const exitQuestion = 'Are you sure you want to exit? (Y/N): ';

    rl.question(exitQuestion, async answer => {
        if (answer.toLowerCase() === 'y') {
            // If the answer is 'y' (yes)
            rl.close();
            // Close the readline interface, exiting the application
        } else {
            // If the answer is 'n' (no)
            await loadingTime();
            reloadShopping();
            questionEnterId();
        }
    });
}
// ******************************************


// Block No. 6: Start the application
startShopping();
// the shopping application
