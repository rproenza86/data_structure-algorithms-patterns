/**
 * Greedy Algorithms
 * A greedy algorithm is one that always chooses the best solution at the time, with no regard to how 
 * that choice will affect future choices. Using a greedy algorithm generally indicates that the 
 * implementer hopes that the series of “best” local choices made will lead to a final “best” choice. 
 * 
 * If so, then the algorithm has produced an optimal solution; if not, a suboptimal solution has been found. 
 * However, for many problems, it is just not worth the trouble to find an optimal solution, so using a 
 * greedy algorithm works just fine.
 * 
 */
    /**
     * The Coin-Changing Problem
        A classic example of following a greedy algorithm is making change. Let’s say you buy
        some items at the store and the change from your purchase is 63 cents. How does the
        clerk determine the change to give you? If the clerk follows a greedy algorithm, he or
        she gives you two quarters, a dime, and three pennies. That is the smallest number of
        coins that will equal 63 cents without using half-dollars.
     * 
     */
        function makeChange(originalAmount, coins) {
            let remainAmt = 0;

            if (originalAmount % .25 < originalAmount) {
                coins[3] = parseInt(originalAmount / .25);
                remainAmt = originalAmount % .25;
                originalAmount = remainAmt;
            }

            if (originalAmount % .1 < originalAmount) {
                coins[2] = parseInt(originalAmount / .1);
                remainAmt = originalAmount % .1;
                originalAmount = remainAmt;
            }

            if (originalAmount % .05 < originalAmount) {
                coins[1] = parseInt(originalAmount / .05);
                remainAmt = originalAmount % .05;
                originalAmount = remainAmt;
            }

            coins[0] = parseInt(originalAmount / .01);
        }

        function showChange(coins) {
            if (coins[3] > 0) {
                console.log("Number of quarters - " + coins[3] + " - " + coins[3] * .25);
            }
            if (coins[2] > 0) {
                console.log("Number of dimes - " + coins[2] + " - " + coins[2] * .10);
            }
            if (coins[1] > 0) {
                console.log("Number of nickels - " + coins[1] + " - " + coins[1] * .05);
            }
            if (coins[0] > 0) {
                console.log("Number of pennies - " + coins[0] + " - " + coins[0] * .01);
            }
        }
        let originalAmount = .63;
        let coins = [];
        makeChange(originalAmount, coins);
        showChange(coins);
    /**
     * A Greedy Algorithm Solution to the Knapsack Problem
     * 
     */
        function ksack(values, weights, capacity) {
            let load = 0;
            let i = 0;
            let w = 0;

            while (load < capacity && i < 4) {
                if (weights[i] <= (capacity - load)) {
                    w += values[i];
                    load += weights[i];
                }
                else {
                    let r = (capacity - load) / weights[i];
                    w += r * values[i];
                    load += weights[i];
                }
                ++i;
            }

            return w;
        }

        let items = ["A", "B", "C", "D"];
        let values = [50, 140, 60, 60];
        let weights = [5, 20, 10, 12];
        let capacity = 30;

        console.log(ksack(values, weights, capacity)); // displays 220