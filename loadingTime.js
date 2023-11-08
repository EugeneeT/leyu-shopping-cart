function loadingTime() {
    return new Promise((resolve) => {
        let starVisible = true;
        let count = 0;

        function toggleStar() {
            if (count < 10) {
                if (starVisible) {
                    process.stdout.write('*');
                } else {
                    process.stdout.write(' ');
                }
                starVisible = !starVisible;
                process.stdout.write('\r');

                setTimeout(toggleStar, 500);
                count++;
            } else {
                resolve(); // Resolve the Promise when the loading is done
            }
        }

        toggleStar();
    });
}

function shortLoadingTime() {
    return new Promise((resolve) => {
        let starVisible = true;
        let count = 0;

        function toggleStar() {
            if (count < 5) {
                if (starVisible) {
                    process.stdout.write('*');
                } else {
                    process.stdout.write(' ');
                }
                starVisible = !starVisible;
                process.stdout.write('\r');

                setTimeout(toggleStar, 500);
                count++;
            } else {
                resolve(); // Resolve the Promise when the loading is done
            }
        }

        toggleStar();
    });
}


module.exports = loadingTime;
module.exports = shortLoadingTime;