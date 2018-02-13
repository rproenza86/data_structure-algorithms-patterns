/**
 * The Knapsack Problem: A Recursive Solution
 * 
 * The problem:
    A classic problem in the study of algorithms is the knapsack problem. Imagine you are
    a safecracker and you break open a safe filled with all sorts of treasure, but all you have
    to carry the loot is a small backpack. The items in the safe differ in both size and value.
    You want to maximize your take by filling the backpack with those items that are worth
    the most.

    Solution:
    The key idea to solving the knapsack problem with a
    dynamic programming solution is to calculate the maximum value for every item up
    to the total capacity of the knapsack.

    Example:
    If the safe in our example has five items, the items have a size of 3, 4, 7, 8, and 9,
    respectively, and values of 4, 5, 10, 11, and 13, respectively, and the knapsack has a
    capacity of 16, then the proper solution is to pick items 3 and 5 with a total size of 16
    and a total value of 23.
 */
function max(a, b) {
    return (a > b) ? a : b;
}

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

const value = [4,5,10,11,13],
      size = [3,4,7,8,9],
      capacity = 16,
      n = 5;

console.log(knapsack(capacity, size, value, n)); // 23

/**
 * Detected problem:
    The problem with this recursive solution to the knapsack problem is that, because it is
    recursive, many subproblems are revisited during the course of the recursion. A better
    solution to the knapsack problem is to use a dynamic programming technique to solve
    the problem, as shown below.
 */