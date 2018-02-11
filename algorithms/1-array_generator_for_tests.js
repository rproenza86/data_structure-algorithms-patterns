/**
 * We start this chapter by developing an array test bed to use in support of our study of
 * basic sorting algorithms. 
 * 
 * We’ll build a class for array data and functions that encapsulates
 * some of the normal array operations: inserting new data, displaying array data, and
 * calling the different sorting algorithms. Included in the class is a swap() function we
 * will use to exchange elements in the array.
 * 
 * @class CArray
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

  swap(arr, index1, index2) {
    const temp = arr[index1];

    arr[index1] = arr[index2];
    arr[index2] = temp;
  }
}

var numElements = 100;
var myNums = new CArray(numElements);
myNums.setData();
console.log(myNums.toString());
