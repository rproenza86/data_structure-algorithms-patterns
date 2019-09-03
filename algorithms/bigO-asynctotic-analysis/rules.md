# Rules of Big-O Notation

Let’s represent an algorithm’s complexity as f(n). n represents the number of inputs, f(n)time represents the time needed, and f(n)space represents the space (additional memory) needed for the algorithm. The goal of algorithm analysis is to understand the algorithm’s efficiency by calculating f(n). However, it can be challenging to calculate f(n). Big-O notation provides some fundamental rules that help developers compute for f(n).

    • **Coefficient rule**: If f(n) is O(g(n)), then kf(n) is O(g(n)), for any constant k > 0. The first rule is the coefficient rule, which eliminates coefficients not related to the input size, n. This is because as n approaches infinity, the other coefficient becomes negligible.

    • **Sum rule**: If f(n) is O(h(n)) and g(n) is O(p(n)), then f(n)+g(n) is O(h(n)+p(n)). The sum rule simply states that if a resultant time complexity is a sum of two different time complexities, the resultant Big-O notation is also the sum of two different Big-O notations.

    • **Product rule**: If f(n) is O(h(n)) and g(n) is O(p(n)), then f(n)g(n) is O(h(n)p(n)). Similarly, the product rule states that Big-O is multiplied when the time complexities are multiplied.

    • **Transitive rule**: If f(n) is O(g(n)) and g(n) is O(h(n)), then f(n) is O(h(n)). The transitive rule is a simple way to state that the same time complexity has the same Big-O.

    • **Polynomial rule**: If f(n) is a polynomial of degree k, then f(n) is O(nk). Intuitively, the polynomial rule states that polynomial time complexities have Big-O of the same polynomial degree.

    • **Log of a power rule**: log(nk) is O(log(n)) for any constant k > 0. With the log of a power rule, constants within a log function are also ignored in Big-O notation.

> Special attention should be paid to the first three rules and the polynomial rule because they are the most commonly used.
