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
  Users can change the quantity or remove items.
  
- Total Calculation:
  The cart calculates the total cost of items.
  
- Checkout:
  Users can easily proceed to the checkout process.


Implementation Considerations: 
- I would like to create a command-line application that simulates the shopping cart functionality,
  allowing users to add, remove, and view items. This can serve as a demonstration of my project's functionality and how it would work on a website.



Added extensions: 
- Node.js
- readline or Inquirer.js

readline:
  `readline` is a built-in module in Node.js that provides an interface for reading data from a Readable stream (like a file or the terminal) line by line. 
  It's often used to interact with users in a command-line interface.
  The `readline` module allows you to create an interface for reading lines of text from an input source (such as the standard input) and interact with the user by asking questions and reading their responses. 
  It's especially useful for building command-line applications that require user input.

Inquirer.js:
  `Inquirer` is a Node.js library that simplifies the process of prompting users for input in a command-line interface. 
  It provides an easy way to create interactive command-line applications by asking questions, validating responses, and handling user interactions.
  `Inquirer` is commonly used for creating text-based menus, forms, and various prompts in Node.js applications. 
  It's particularly useful for building applications like command-line tools, chatbots, or interactive scripts where user input is required.

  In a shopping cart application, we can use `Inquirer` to ask users to add items to the cart, view the cart, and perform other interactions with the shopping cart. 
  It simplifies the process of collecting and processing user input in the command-line interface.



