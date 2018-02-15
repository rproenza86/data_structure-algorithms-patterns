/**
 * Dynamic Programming
 * 
 * Dynamic programming is a technique that is sometimes considered the opposite of recursion.
 * Problems that have recursive solutions can be rewritten using the techniques of dynamic programming.
 * 
 * Where a recursive solution starts at the top and breaks the problem
 * down, solving all small problems until the complete problem is solved, a dynamic
 * programming solution starts at the bottom, solving small problems and combining
 * them to form an overall solution to the big problem.
 * 
 * A dynamic programming solution builds a table,
 * usually using an array, that holds the results of the many subsolutions as the problem
 * is broken down. When the algorithm is complete, the solution is found in a distinct spot
 * in the table, as we’ll see in the Fibonacci example next.
 */
    //Ex. 1 : Computing Fibonacci Numbers
        /*
            The Fibonacci numbers can be defined by the following sequence:
                0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, …

            As you can tell, the sequence is generated by adding the previous two numbers in the
            sequence together.
        */

        // Recursive Fibonacci function:
        function recurFib(n) {
            if (n < 2) {
              return n;
            } else {
              return recurFib(n - 1) + recurFib(n - 2);
            }
        }
        console.log(recurFib(10)); // displays 55
        // Problem: Inefficient. Its repeat the same calculation unnecessary.

        /* Solution : Dynamic programming. 
            1- starts by solving the simplest subproblem it can solve, 
            2- then using that solution to solve more complex subproblems until the entire problem is solved.

          The solutions to each subproblem are typically stored in an array for easy access.
        */  
        function dynFib(n) {
          const val = [];

          for (var i = 0; i <= n; ++i) {
            val[i] = 0;
          }

          if (n == 1 || n == 2) {
            return 1;
          } else {
            val[1] = 1;
            val[2] = 2;

            for (var i = 3; i <= n; ++i) {
              val[i] = val[i - 1] + val[i - 2];
            }

            return val[n - 1];
          }
        }
        console.log(dynFib(10)); // displays 55  

        /*
            Conclusion the recursive solution took O(2^n)[89] steps to solve the problem while the dynamic one took O(n)[10] steps.
        */
        // Final test:
        let start = new Date().getTime();
            console.log(recurFib(20));// 6765
        let stop = new Date().getTime();
        console.log("recursive time - " + (stop-start) + "milliseconds.\n");
        // recursive time - 4milliseconds.

        start = new Date().getTime();
            console.log(dynFib(20));// 6765
        stop = new Date().getTime();
        console.log("dynamic programming time - " + (stop-start) + " milliseconds.\n");
        // dynamic programming time - 1 milliseconds.


        /**
         * The array was used because dynamic programming algorithms usually store intermediate 
         * results in an array.
         * 
         * For the specific example which its been used, we don't need to store nothing so the 
         * algorithm could improved:
         */
        function dynamicFib(n) {
          let last     = 1,
              nextLast = 1,
              result   = 1;

          for (let i = 2; i < n; ++i) {
            result = last + nextLast;
            nextLast = last;
            last = result;
          }
          
          return result;
        }