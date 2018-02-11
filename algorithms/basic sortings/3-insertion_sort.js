/**
 * Insertion Sort
    The insertion sort is analogous to the way humans sort data numerically or alphabetically.

    Let’s say I have asked each student in a class to turn in an index card with his or
    her name, student ID, and a short biographical sketch. The students return the cards in
    random order, but I want them alphabetized so I can compare them to my class roster easily.

    I take the cards back to my office, clear off my desk, and pick the first card. The last
    name on the card is Smith. I place it at the top left corner of the desk and pick the second
    card. The last name on the card is Brown. I move Smith over to the right and put Brown
    in Smith’s place. The next card is Williams. It can be inserted at the far right of the desk
    without have to shift any of the other cards. The next card is Acklin. It has to go at the
    beginning of the list, so each of the other cards must be shifted one position to the right
    to make room for Acklin’s card. This is how the insertion sort works.

    The insertion sort has two loops. 
    The outer loop moves element by element through the array, while the inner loop compares the element chosen 
    in the outer loop to the element next to it in the array. If the element selected by the outer loop is less than the
    element selected by the inner loop, array elements are shifted over to the right to make
    room for the inner-loop element, just as described in the previous name card example
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
}
  
const numElements = 10;
const myNums = new CArray(numElements);

let start, stop, elapsed;

myNums.setData();

console.group('Unordered array');
    console.log(myNums.toString());
console.groupEnd();
 
start = new Date().getTime();
    myNums.bubbleSort();
stop = new Date().getTime();

console.group('bubbleSort Ordered array');
    console.log(myNums.toString());
console.groupEnd();
elapsed = stop - start;
console.log(`The bubbleSort elapsed time was: ${elapsed} milliseconds.`);



myNums.setData();
console.group('Unordered array');
    console.log(myNums.toString());
console.groupEnd();

start = new Date().getTime();
    myNums.selectionSort();
stop = new Date().getTime();

console.group('selectionSort Ordered array');
    console.log(myNums.toString());
console.groupEnd();
elapsed = stop - start;
console.log(`The selectionSort elapsed time was: ${elapsed} milliseconds.`);



myNums.setData();
console.group('Unordered array');
    console.log(myNums.toString());
console.groupEnd();
  
start = new Date().getTime();
    myNums.insertionSort();
stop = new Date().getTime();

console.group('insertionSort Ordered array');
    console.log(myNums.toString());
console.groupEnd();
elapsed = stop - start;
console.log(`The insertionSort elapsed time was: ${elapsed} milliseconds.`);

/**
 * The performance test(1000 numbers) say that the insertion sort method if faster.
 * 
 *  Test output of 1000 numbers:
        The bubbleSort elapsed time was: 34 milliseconds.
        The selectionSort elapsed time was: 7 milliseconds.
        The insertionSort elapsed time was: 5 milliseconds.
 *  Test output of 10000 numbers:
        The bubbleSort elapsed time was: 1420 milliseconds.
        The selectionSort elapsed time was: 130 milliseconds.
        The insertionSort elapsed time was: 56 milliseconds.
 */