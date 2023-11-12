# leyu-shopping-cart

DCI Javascript project (shopping cart)

Description:

- Shopping cart functionality is essential for eCommerce websites.
  It allows users to add items to their cart, view the contents, and manage them before proceeding to checkout.


Shopping Cart Functionality:

- Add to Cart:
  Users can add products to their cart while browsing.
- View Cart:
  A dedicated cart page displays the added items with details.
- Quantity Adjustment:
  Users can remove items.
- Total Calculation:
  The cart calculates the total cost of items.
- Checkout:
  In theory, users can easily proceed to the checkout process.
  In practice, this simply resets the cart.


Implementation Considerations:

- I would like to create a command-line application that simulates the shopping cart functionality,
  allowing users to add, remove, and view items. This can serve as a demonstration of my project's functionality and how it would work on a website.


Code Structure:

Block No. 1: Importing modules and defining styling function

- This block includes module imports and defines styling-related functions and constants.

Block No. 2: Main Function Definitions

- This block contains the primary functions responsible for managing the main flow of the shopping application, including user input handling and the display of the product menu.

Block No. 3: Menu functions

- These functions are responsible for displaying and managing the shopping cart, including viewing and removing items.

Block No. 4: Checkout function

- This block contains the function related to the checkout process, clearing the cart after a successful checkout.

Block No. 5: Exit function

- The exitApp function handles the application exit, prompting the user for confirmation before closing.

Block No. 6: Start the application

- This block initiates the shopping application by calling the startShopping function.

Products:

- This function defines a factory function createProduct that is used to create product objects with specified properties. The created products are organized into an array and exported for use in other parts of the application.

loadingTime:

- This function implements a loading animation using asynchronous JavaScript and promises. It displays "Loading" followed by a series of dots, simulating a loading process. The function returns a promise that resolves when the loading animation is complete. The function is exported for use in other parts of the application.



Imported functions:

- loadingTime.js
- Products factory function

loadingTime.js:
The code defines two functions, `loadingTime` and `shortLoadingTime`, which are used to create a visual loading effect in the console.
These functions return Promises and resolve when the loading animation is completed.



Added extensions:

- Node.js
- readline
- cli-boxes

Node.js:
is an open-source, server-side runtime environment that allows you to execute JavaScript code on the server.
It's built on Chrome's V8 JavaScript engine and provides a runtime environment for executing JavaScript outside of a web browser.
`Node.js` is designed to be lightweight and efficient, making it well-suited for building scalable and high-performance network applications.
It's commonly used for web servers, real-time applications, microservices, and various other backend tasks.
`Node.js` has a vast ecosystem of libraries and packages available through npm (Node Package Manager), making it a popular choice for developers to build server-side applications using JavaScript.

readline:
`readline` is a built-in module in Node.js that provides an interface for reading data from a Readable stream (like a file or the terminal) line by line.
It's often used to interact with users in a command-line interface.
The `readline` module allows you to create an interface for reading lines of text from an input source (such as the standard input) and interact with the user by asking questions and reading their responses.
It's especially useful for building command-line applications that require user input.

cli-boxes:
is a JavaScript library that provides a simple way to create customizable text-based boxes and frames in the command-line interface (CLI).
It allows developers to add visual structure and formatting to text-based console applications. With `cli-boxes` you can easily create boxes, frames, and tables using custom characters and styling.
