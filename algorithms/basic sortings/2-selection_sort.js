/**
 * Selection Sort
    This sort works by starting at the beginning of the array and comparing the first element with the remaining elements.

    After examining all the elements, the smallest element is placed in the first position
    of the array, and the algorithm moves to the second position. 
    
    This process continues until the algorithm arrives at the next to last position in the array, at which point
    all the data is sorted.

    Nested loops are used in the selection sort algorithm. The outer loop moves from the
    first element in the array to the next to last element; the inner loop moves from the
    second array element to the last element, looking for values that are smaller than the
    element currently being pointed to by the outer loop. After each iteration of the inner
    loop, the smallest value in the array is assigned its proper place in the array.

    Here is a simple example of how selection sort works on a list of five items. The original
    list is:
    E A D H B
    The first pass looks for the minimal value and swaps it with the value at the front of the
    list:
    A E D H B
    The next pass finds the minimal value after the first element (which is now in place)
    and swaps it:
    A B D H E
    The D is in place so the next step swaps the E and the H, leading to the list being in
    order:
    A B D E H
*/
class CArray {
    constructor(numElements) {
      this.dataStore = [];
      this.pos = 0;
      this.numElements = numElements;
  
      for (var i = 0; i < numElements; ++i) {
        this.dataStore[i] = i;
      }
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
}
  
const numElements = 10;
const myNums = new CArray(numElements);

myNums.setData();

console.group('Unordered array');
    console.log(myNums.toString());
console.groupEnd();
  
myNums.bubbleSort();

console.group('bubbleSort Ordered array');
    console.log(myNums.toString());
console.groupEnd();



myNums.setData();
console.group('Unordered array');
    console.log(myNums.toString());
console.groupEnd();
  
myNums.selectionSort();

console.group('selectionSort Ordered array');
    console.log(myNums.toString());
console.groupEnd();