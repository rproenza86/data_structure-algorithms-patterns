/**
 * Using Self-Organizing Data
    The fastest successful sequential searches on unordered data occur when the data being
    searched for is located at the beginning of the data set. 
    
    You can ensure that a successfully found data item will be found quickly in the future by moving it 
    to the beginning of a data set after it has been found in a search.

    The concept behind this strategy is that we can minimize search times by locating items
    that are frequently searched for at the beginning of a data set.    

    This is an example of self-organized data: data that is organized not by the programmer 
    before the program is executed, but by the program itself while the program is running.

    It makes sense to allow your data to self-organize since the data being searched most likely 
    follow the “80-20 rule,” meaning that 80% of the searches made on a data set are searching for 
    just 20% of the data in the set. Self-organization will eventually put that 20% at the beginning 
    of the data set, where a simple sequential search will find them quickly.

    We can modify our seqSearch() function to include self-organization fairly easily.
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

                this.dataStore[j] = temp;
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
                    swap(this.dataStore, j, j-h);
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
    /**
     * Algorithm and pseudocode for the seqSearch algorithm
        The algorithm for seqSearch is:
            1. Simply start a loop at the beginning of the list and compare each element to 
            the data you are searching for.

            2. If you find a match, the search is over.

            3. If you get to the end of the list without generating a match, then the data 
            searched for is not in the list.
     * 
     * @static
     * @param {array} [arr=[]] 
     * @param {number || string} [data=null] 
     * @returns {boolean}
     * @memberof CArray
     */
    static seqSearch(arr = [], data = null) {
        if(arr.length == 0 || !data) return -1;

        const arrLength = arr.length;

        for (let i = 0; i < arrLength; ++i) {
            if (arr[i] == data) {
                if(i > 0){
                    [ arr[i], arr[i - 1] ] = [ arr[i - 1], arr[i] ]; // step to auto organize the info
                }
                return i;
            }
        }

        return -1;
    }
    /**
     * 
     * 
     * @param {array} [arr=this.dataStore] 
     * @returns {number} minimum number in the array
     * @memberof CArray
     */
    findMin(arr = this.dataStore) {
        let min = arr[0];
        const arrLength = arr.length;

        for (let i = 1; i < arrLength; ++i) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }

        return min;
    }
    /**
     * 
     * 
     * @param {array} [arr=this.dataStore] 
     * @returns {number} maximum number in the array
     * @memberof CArray
     */
    findMax(arr = this.dataStore) {
        let max = arr[0];
        const arrLength = arr.length;

        for (let i = 1; i < arrLength; ++i) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }

        return max;
    }
}

// Test the self-organized info implementation:
var numbers = [5,1,7,4,2,10,9,3,6,8];

console.group('Tested array for the self-organized info implementation:');
    console.log(numbers);
console.groupEnd();

for(let i=1;i<=3;i++){
    CArray.seqSearch(numbers, 4);
    console.group(`Searching "${i}" time number 4:`);
        console.log(numbers, '\n');
    console.groupEnd();
}