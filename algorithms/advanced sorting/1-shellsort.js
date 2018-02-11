/**
 * The Shellsort Algorithm
 * 
    Shellsort is named after its inventor, Donald Shell. This algorithm is based on the insertion sort
    but is a big improvement over that basic sorting algorithm. Shellsort’s key concept is
    that it compares distant elements first, rather than adjacent elements, as is done in the
    insertion sort. Elements that are far out of place can be put into place more efficiently
    using this scheme than by simply comparing neighboring elements. As the algorithm
    loops through the data set, the distance between each element decreases until, when at
    the end of the data set, the algorithm is comparing elements that are adjacent.

    Shellsort works by defining a gap sequence that indicates how far apart compared elements
    are when starting the sorting process. The gap sequence can be defined dynamically,
    but for most practical applications, you can predefine the gap sequence the algorithm
    will use. There are several published gap sequences that produce different results.
    We are going to use the sequence defined by Marcin Ciura in his paper on best increments
    for average case of Shellsort (“Best Increments for the Average Case of Shell
    Sort”, 2001). The gap sequence is: 701, 301, 132, 57, 23, 10, 4, 1.
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
}

const nums = new CArray(10);

nums.setData();

console.log("Before Shellsort: \n");
console.log(nums.toString());
console.log("\nDuring Shellsort: \n");
nums.shellsort();
console.log("\nAfter Shellsort: \n");
console.log(nums.toString());