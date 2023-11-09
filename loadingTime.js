// The `loadingTime` function is an asynchronous function that simulates a loading animation.
function loadingTime() {
    return new Promise((resolve) => {
        let dots = '';
        // Initialize an empty string to store the loading dots.
        let count = 0;
        // Initialize a count to keep track of the number of dots.

        function displayLoading() {
            // This `displayLoading` function handles the animation of loading dots.

            process.stdout.write(`Loading${dots}`);
            // Display "Loading" followed by the loading dots.
            process.stdout.write('\r');
            // Move the cursor back to the beginning of the line.

            if (count < 4) {
                // If less than 4 dots have been displayed (adjust as needed):
                dots += '.';
                // Add a dot to the loading animation.
                count++;
                // Increment the count.
                setTimeout(displayLoading, 500);
                // Schedule the next call to `displayLoading` after 500 milliseconds (adjust the interval as needed).
            } else {
                resolve();
                // When the loading animation is complete (4 dots displayed), resolve the Promise.
            }
        }

        displayLoading();
        // Start the loading animation by invoking the `displayLoading` function.

    });
}

module.exports = loadingTime;
// Export the `loadingTime` function to make it accessible to other parts of the application.

