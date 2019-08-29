/**
 * The Quicksort Algorithm
 *
 * The Quicksort algorithm is one of the fastest sorting algorithms for large data sets.
 *
 * Quicksort is a divide-and-conquer algorithm that recursively breaks a list of data into
 * successively smaller sublists consisting of the smaller elements and the larger elements.
 * The algorithm continues this process until all the data in the list is sorted.
 *
 * The algorithm divides the list into sublists by selecting one element of the list as a pivot.
 * Data is sorted around the pivot by moving elements less than the pivot to the bottom
 * of the list and elements that are greater than the pivot to the top of the list.
 *
 */
class CArray {
    constructor(numElements) {
      this.dataStore = [];
      this.pos = 0;
      this.numElements = numElements;

      for (var i = 0; i < numElements; ++i) {
        this.dataStore[i] = i;
      }
      this.gaps = [5,3,1];
    }

    setData() {
      for (let i = 0; i < this.numElements; ++i) {
        this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
      }
    }

    toString() {
      const dsLength = this.dataStore.length;
      let retstr = "";

      for (let i = 0; i < dsLength; ++i) {
        retstr += this.dataStore[i] + " ";
        if (i > 0 && i % 10 == 0) {
          retstr += "\n";
        }
      }

      return retstr;
    }

    clear() {
      const dsLength = this.dataStore.length;

      for (let i = 0; i < tdsLength; ++i) {
        this.dataStore[i] = 0;
      }
    }

    insert(element) {
      this.dataStore[this.pos++] = element;
    }

    swapBasic(arr, index1, index2) {
      const temp = arr[index1];

      arr[index1] = arr[index2];
      arr[index2] = temp;
    }

    swap(array, index1, index2) {
        // trick of es6  : (destructing)   [ [source --> target] ] =  [ [target <-- source] ])   (assignations)
        [ array[index1], array[index2] ] = [ array[index2], array[index1] ];
        // now because the array position( array[indexX] ) still linked the values are updated
    }
    // be careful: this is a very basic implementation which is nice to understand the deep principle of bubble sort (going through all comparisons) but it can be greatly improved for performances
    bubbleSortBasic() {
        for (let i = 0; i < this.numElements; i++) {
            for (let j = 1; j < this.numElements; j++) {
                if (this.dataStore[j-1] > this.dataStore[j]) {
                    this.swap(this.dataStore, j-1, j);
                }
            }
        }
    }
    // correct implementation: this is the usual implementation of the bubble sort algorithm. Some loops execution are avoided if not they are not needed
    bubbleSort(array = this.dataStore) {
        let swapped;
        do {
          swapped = false;
          for(let i = 0; i < array.length; i++) {
            if(array[i] && array[i + 1] && array[i] > array[i + 1]) {
              this.swap(this.dataStore, i, i + 1);
              swapped = true;
            }
          }
        } while(swapped);
        return array;
    }

    selectionSort() {
        let min;
        for (let outer = 0; outer < this.numElements; outer++) {
            min = outer;
            for (let inner = outer + 1; inner < this.numElements; inner++) {
                if (this.dataStore[inner] < this.dataStore[min]) {
                    min = inner;
                }
            }
            if(outer != min)
                this.swap(this.dataStore, outer, min);
        }
    }

    insertionSort() {
        let temp, inner;

        for (let outer = 1; outer < this.numElements; outer++) {
            temp = this.dataStore[outer];
            inner = outer;
            while (inner > 0 && (this.dataStore[inner-1] >= temp)) {
                this.dataStore[inner] = this.dataStore[inner-1];
                --inner;
            }
            this.dataStore[inner] = temp;
        }
    }

    setGaps(arr = []) {
        this.gaps = arr;
    }
    /**
     * The outer loop controls the movement within the gap sequence. In other words, for the
     * first pass through the data set, the algorithm is going to examine elements that are five
     * elements away from each other.
     *
     * The next pass will examine elements that are three elements away from each other.
     *
     * The last pass performs a standard insertion sort on element that are one place away,
     * which means they are adjacent.
     *
     * By the time this last pass begins, many of the elements will already be in place, and the algorithm
     * won’t have to exchange many elements. This is where the algorithm gains efficiency over insertion sort.
     *
     * @memberof CArray
     */
    shellsort() {
        for (let g = 0; g < this.gaps.length; ++g) {
            for (let i = this.gaps[g]; i < this.dataStore.length; ++i) {
                const temp = this.dataStore[i];

                for (var j = i; j >= this.gaps[g] && this.dataStore[j - this.gaps[g]] > temp; j -= this.gaps[g]) {
                    this.dataStore[j] = this.dataStore[j - this.gaps[g]];
                }

                // this.dataStore[j] = temp; // error
                this.dataStore[i] = temp;
            }
        }
    }
    /**
     * shellsort() with a dynamically computed gap sequence
     *
     * In my test this method was more 10x faster
     *
     * @memberof CArray
     */
    shellsortDynamic() {
        const N = this.dataStore.length;
        let h = 1;

        while (h < N/3) {
            h = 3 * h + 1;
        }

        while (h >= 1) {
            for (let i = h; i < N; i++) {
                for (let j = i; j >= h && this.dataStore[j] < this.dataStore[j-h]; j -= h) {
                    this.swap(this.dataStore, j, j-h);
                }
            }

            h = (h-1)/3;
        }
    }
    /**
    *  The nonrecursive, or iterative, version of Mergesort is referred to as a bottom-up process.
        The algorithm begins by breaking down the data set being sorted into a set of oneelement
        arrays. Then these arrays are slowly merged by creating a set of left and right
        subarrays, each holding the partially sorted data until all that is left is one array with the
        data perfectly sorted.

        Ex:
            6,10,1,9,4,8,2,7,3,5

            left array - 6,Infinity
            right array - 10,Infinity
            left array - 1,Infinity
            right array - 9,Infinity
            left array - 4,Infinity
            right array - 8,Infinity
            left array - 2,Infinity
            right array - 7,Infinity
            left array - 3,Infinity
            right array - 5,Infinity
            left array - 6,10,Infinity
            right array - 1,9,Infinity
            left array - 4,8,Infinity
            right array - 2,7,Infinity
            left array - 1,6,9,10,Infinity
            right array - 2,4,7,8,Infinity
            left array - 1,2,4,6,7,8,9,10,Infinity
            right array - 3,5,Infinity

            1,2,3,4,5,6,7,8,9,10

        The value Infinity is used as a sentinel value to indicate the end of either the left or
        right subarray.
     *
     * @param {array} [arr=this.dataStore]
     * @returns {void}
     * @memberof CArray
     */
    mergeSort(arr = this.dataStore) {
        if (arr.length < 2) {
            return;
        }

        const arrLength = arr.length;
        let step = 1, left, right;

        while (step < arrLength) {
            left = 0;
            right = step;

            while (right + step <= arrLength) {
                this.mergeArrays(arr, left, left+step, right, right+step);
                left = right + step;
                right = left + step;
            }

            if (right < arrLength) {
                this.mergeArrays(arr, left, left+step, right, arrLength);
            }

            step *= 2;
        }
    }
    /**
     * mergeSort's helper
     *
     * @param {any} arr
     * @param {any} startLeft
     * @param {any} stopLeft
     * @param {any} startRight
     * @param {any} stopRight
     * @memberof CArray
     */
    mergeArrays(arr, startLeft, stopLeft, startRight, stopRight) {
        const rightArr = new Array(stopRight - startRight + 1),
              leftArr  = new Array(stopLeft - startLeft + 1);

        let k = startRight;
        for (let i = 0; i < (rightArr.length-1); ++i) {
            rightArr[i] = arr[k];
            ++k;
        }

        k = startLeft;
        for (let i = 0; i < (leftArr.length-1); ++i) {
            leftArr[i] = arr[k];
            ++k;
        }

        rightArr[rightArr.length-1] = Infinity; // a sentinel value
        leftArr[leftArr.length-1] = Infinity; // a sentinel value

        let m = 0,
            n = 0;

        for (let k = startLeft; k < stopRight; ++k) {
            if (leftArr[m] <= rightArr[n]) {
                arr[k] = leftArr[m];
                m++;
            } else {
                arr[k] = rightArr[n];
                n++;
            }
        }

        // console.log("left array - ", leftArr);
        // console.log("right array - ", rightArr);
    }
    /**
     * Algorithm and pseudocode for the Quicksort algorithm
        The algorithm for Quicksort is:
            1. Pick a pivot element that divides the list into two sublists.

            2. Reorder the list so that all elements less than the pivot element are placed before
            the pivot and all elements greater than the pivot are placed after it.

            3. Repeat steps 1 and 2 on both the list with smaller elements and the list of larger
            elements.
     *
     * @param {array} [list=this.dataStore]
     * @returns {array} sortedArray
     * @memberof CArray
     */
    quickSort(list = this.dataStore) {
        if (list.length == 0) {
            return [];
        }

        if (list.length == 1) {
            return list;
        }

        const lesser  = [],
              greater = [],
              pivot   = list[0],
              lLength = list.length;

        for (let i = 1; i < lLength; i++) {
                if (list[i] < pivot) {
                lesser.push(list[i]);
            } else {
                greater.push(list[i]);
            }
        }

        return this.quickSort(lesser).concat(pivot, this.quickSort(greater));
    }
}

const ca = new CArray(10);
ca.setData();

console.log(ca.toString(), '\n');
    ca.mergeSort();
console.log(ca.toString());


let start, stop, elapsed;

const nums = new CArray(10000);

nums.setData();

console.group('Shellsort Ordered array');

    console.log("\nDoing Shellsort: \n");
    start = new Date().getTime();
        nums.shellsort();
    stop = new Date().getTime();

    elapsed = stop - start;
    console.log(` \n The Shellsort elapsed time was: ${elapsed} milliseconds.`);
console.groupEnd();//  The Shellsort elapsed time was: 0 milliseconds.


console.group('Shellsort Ordered array with a dynamically computed gap sequence');

    console.log("\nDoing Shellsort: \n");
    start = new Date().getTime();
        nums.shellsortDynamic();
    stop = new Date().getTime();

    elapsed = stop - start;
    console.log(` \n The Shellsort elapsed time was: ${elapsed} milliseconds.`);
console.groupEnd();// The Shellsort elapsed time was: 0,1 and 2 milliseconds.



console.group('mergeSort Ordered array');

    console.log("\nDoing mergeSort: \n");
    start = new Date().getTime();
        nums.mergeSort();
    stop = new Date().getTime();

    elapsed = stop - start;
    console.log(` \n The mergeSort elapsed time was: ${elapsed} milliseconds.`);
console.groupEnd();// The mergeSort elapsed time was: 2 milliseconds.



console.group('quickSort Ordered array');

    console.log("\nDoing quickSort: \n");
    start = new Date().getTime();
        nums.quickSort();
    stop = new Date().getTime();

    elapsed = stop - start;
    console.log(` \n The quickSort elapsed time was: ${elapsed} milliseconds.`);
console.groupEnd();// The quickSort elapsed time was: 15 milliseconds if printed and 13 just returning result in the browser with an  array of 10000 numbers.

// NOTE: the recursion process cause that testing in the browser inspector console throw an stack error: Uncaught RangeError: Maximum call stack size exceeded
// be aware of that and test the quickSort() method with lower sets of data or independently.