/**
 * Memoization
 * 
 * Not to be confused with memorization, memoization is a specific term to retain a number of previously 
 * calculated values from a function.
 * 
 * The corollary to this is that a function can also be called fewer times than needed. Consider an expensive 
 * function that does some complex or, at least, time-consuming math. We know that the result of the function 
 * is entirely predicated on the inputs to the function. So the same inputs will always produce the same outputs. 
 * 
 * Why, then, would we need to call the function multiple times for the same input? If we saved the output of 
 * the function, we could retrieve that instead of redoing the time-consuming math.
 * 
 * Trading off space for time is a classic computing science problem. By caching the result, we make the 
 * application faster but we will consume more memory. 
 * 
 * Deciding when to perform caching and when to simply recalculate the result is a difficult problem.
 * 
 * The best part of this memoization is that subsequent calls to the function with the same parameter will be 
 * lightning fast, as the result is already computed.
 */
    // A naive approach is to simply calculate every term like this:
        const Fibonacci = function () {
            return {
                NaieveFib: function (n) {
                    if (n == 0)
                        return 0;
                    if (n <= 2)
                        return 1;
                    return this.NaieveFib(n - 1) + this.NaieveFib(n - 2);
                }
            };
        };
        Fibonacci().NaieveFib(40) // took 963 milliseconds
        /*
            This solution works very quickly for small numbers such as 10. However, for larger numbers, say greater 
            than 40, there is a substantial slowdown. 

            This is because the base case is called 102,334,155 times.

            The recursion make unnecessary calculations for already obtained numbers.
        */
    // Let's see if we can improve things by memoizing some values:
        Fibonacci = function () {
            memoizedValues = [];

            return {
                MemetoFib: function (n) {
                    if (n == 0)
                        return 0;
                    if (n <= 2)
                        return 1;
                    if (!memoizedValues[n])
                        memoizedValues[n] = this.MemetoFib(n - 1) +
                            this.MemetoFib(n - 2);
                    return memoizedValues[n];
                }
            };
        };
        
        Fibonacci().MemetoFib(40) // took only 11 milliseconds
    