/**
 * Bubble Sort
    The first sorting algorithm we will examine is the bubble sort. The bubble sort is one of
    the slowest sorting algorithms, but it is also one of the easiest sorts to implement.

    The bubble sort gets its name because when data are sorted using the algorithm, values
    float like a bubble from one end of the array to the other. Assuming you are sorting a
    set of numbers into ascending order, larger values float to the right of the array and
    lower values float to the left. This behavior is the result of the algorithm moving through
    the array many times, comparing adjacent values, and swapping them if the value to the
    left is greater than the value to the right.
    Here is a simple example of the bubble sort. We start with the following list:
        E A D B H
        The first pass of the sort yields the following list:
        A E D B H
        The first and second elements are swapped. The next pass of the sort leads to:
        A D E B H
        The second and third elements are swapped. The next pass leads to the following order:
        A D B E H
        as the third and fourth elements are swapped. And finally, the second and third elements
        are swapped again, leading to the final order:
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
}
  
const numElements = 10;
const myNums = new CArray(numElements);

myNums.setData();

console.group('Unordered array');
    console.log(myNums.toString());
console.groupEnd();
  
myNums.bubbleSort();

console.group('Ordered array');
    console.log(myNums.toString());
console.groupEnd();