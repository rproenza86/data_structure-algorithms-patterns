/**
 * Big O Notation
 * 
 * Mathematical expression of much TIME an algorithm takes to finish depending on how long is the input.
 * Focused on the worst case scenario.
 * 
 * Why is important to know this? 
 * Knowing Big O helps and facilitates developers being aware of the efficiency of an algorithm so they can 
 * create applications with good performance.
 * 
 * The letter O is used because the rate of growth of a function is also called order of the function.
 * 
 * Check:
 *  https://www.interviewcake.com/article/java/big-o-notation-time-and-space-complexity
 *  http://www.bradoncode.com/blog/2012/04/big-o-algorithm-examples-in-javascript.html
 */

    /**
     * Constant-Time Algorithm
        O(1) — “Order 1”

        On this order, regardless of the complexity (number of items), the time (iterations) is constant.
     */
        const getLast = items => items[items.length-1]; // that returns an element in an already known position of an array, regardless kind or length.

        getLast(["a","b","c","d"]); 
        // => d (1 iteration)

        getLast(["a","b","c","d","e","f","g"]);
        // => g (1 iteration)


    /**
     * Linear-Time Algorithm
        O(N) — “Order N”

        In this order, the worst case time (iterations) grows on par with the number of items.
     */
        const findIndex = (items, match) => {
            for (let i=0, total=items.length; i < total; i++)
            if (items[i] == match)
                return i;
            return -1;
        }; // for N elements we will require N iterations.

        const array= ["a","b","c","d"];
        findIndex(array,"a");
        // => 0  (1 iteration - best case)

        findIndex(array,"d");
        // => 3  (4 iterations - worst case)

        findIndex(array,"e");
        // => -1 (4 iterations - worst case)


    /**
     * Quadratic-Time Algorithm
        O(N^2 ) — “Order N squared”

        The worst case time (iterations) is the square of the number of inputs. 
        The time grows exponentially related to the number of inputs.
     */
        const buildSquareMatrix = items => {
            let matrix= [];

            for (let i=0, total=items.length; i < total; i++){ 
                matrix[i] = [];
                
                for (let j=0, total=items.length; j < total; j++)
                    matrix[i].push(items[j]);
            }
            return matrix;
        };

        buildSquareMatrix(["a","b","c"]);
        /* => [
                ["a","b","c"],
                ["a","b","c"],
                ["a","b","c"]
              ] (9 iterations for 3 elements)*/

    /**
     * Logarithmic-Time Algorithm
        O(log n) — “Order log N”

        Usually the most efficient approach when dealing with large collections on search/sort algorithms.

        Instead of looking through the components one by one, they split the data in chunks and discard a 
        large amount on every iteration, usually the half, or log base 2.

        Assuming we are using a log base 2, we could -ideally- find a specific element in a collection of one 
        million elements using less than 20 iterations, if we scale the size of the collection to a billion we 
        would require only less than 30 iterations.
     */

        /**
        *  @method      quickSort
        *  @param       list {json} ['','']
        *  @description orders an array using quicksort
        */ 
        const quickSort = list => {
            if ( list.length < 2) return list;

            let pivot   = list[0];
            let left    = []; 
            let right   = [];

            for ( let i=1, total=list.length; i<total; i++ ){
                switch ( true ){
                    case ( list[i] < pivot ):
                        left.push( list[i] );
                        break;
                    case ( list[i] >= pivot ):
                        if( list[i] )
                            right.push( list[i] );
                        break;
                }
            }

            return [].concat( quickSort( left ), pivot, quickSort( right ));
        };

        quickSort( ['q','a','z','w','s','x','e','d','c','r']);
        // => ["a", "c", "d", "e", "q", "r", "s", "w", "x", "z"]