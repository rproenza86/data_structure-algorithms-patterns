/**
 * The Knapsack Problem: A Dynamic Programming Solution
 * 
 * The problem:
    A classic problem in the study of algorithms is the knapsack problem. Imagine you are
    a safecracker and you break open a safe filled with all sorts of treasure, but all you have
    to carry the loot is a small backpack. The items in the safe differ in both size and value.
    You want to maximize your take by filling the backpack with those items that are worth
    the most.

    Solution:
        1
            The key idea to solving the knapsack problem with a
            dynamic programming solution is to calculate the maximum value for every item up
            to the total capacity of the knapsack.
                * Detected problem:
                    The problem with this recursive solution to the knapsack problem is that, because it is
                    recursive, many subproblems are revisited during the course of the recursion. A better
                    solution to the knapsack problem is to use a dynamic programming technique to solve
                    the problem, as shown below.

        2
            Whenever we find a recursive solution to a problem, we can usually rewrite the solution
            using a dynamic programming technique and end up with a more efficient program.

            All we have to do is use an array to store temporary solutions until we get to the final
            solution.

    Example:
    If the safe in our example has five items, the items have a size of 3, 4, 7, 8, and 9,
    respectively, and values of 4, 5, 10, 11, and 13, respectively, and the knapsack has a
    capacity of 16, then the proper solution is to pick items 3 and 5 with a total size of 16
    and a total value of 23.
 */

function max(a, b) {
    return (a > b) ? a : b;
}
// Recursive solution
function knapsack(capacity, size, value, n) {
    if (n == 0 || capacity == 0) {
        return 0;
    }

    if (size[n - 1] > capacity) {
        return knapsack(capacity, size, value, n - 1);
    }

    else {
        return max(value[n - 1] +
            knapsack(capacity - size[n - 1], size, value, n - 1),
            knapsack(capacity, size, value, n - 1));
    }
}

// Dynamic solution
function dKnapsack(capacity, size, value, n) {
    const K = [];

    for (let i = 0; i <= capacity + 1; i++) {
        K[i] = [];
    }

    for (let i = 0; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (i == 0 || w == 0) {
                K[i][w] = 0;
            }
            else if (size[i - 1] <= w) {
                K[i][w] = max(value[i - 1] + K[i - 1][w - size[i - 1]],
                    K[i - 1][w]);
            }
            else {
                K[i][w] = K[i - 1][w];
            }
            console.log(K[i][w] + " ");
        }
        console.log('\n');
    }

    return K[n][capacity];
}

const value = [4,5,10,11,13],
      size = [3,4,7,8,9],
      capacity = 16,
      n = 5;

console.log(knapsack(capacity, size, value, n)); // 23

console.log(dKnapsack(capacity, size, value, n)); /*
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 4 4 4 4 4 4 4 4 4 4 4 4 4 4
    0 0 0 4 5 5 5 9 9 9 9 9 9 9 9 9 9
    0 0 0 4 5 5 5 10 10 10 14 15 15 15 19 19 19
    0 0 0 4 5 5 5 10 11 11 14 15 16 16 19 21 21
    0 0 0 4 5 5 5 10 11 13 14 15 17 18 19 21 23
    
    23
*/

