/**
 * Declaration
 */
var numbers = [];
var numbers = new Array();

var numbers = [1,2,3,4,5];
var numbers = new Array(1,2,3,4,5);

// types multiplicity
var objects = [1, "Joe", true, null];



/**
 * Array check
 */
var number = 3;
var arr = [7,4,1776];
console.log(Array.isArray(number)); // displays false
console.log(Array.isArray(arr)); // displays true



/**
 * Accessing and Writing Array Elements
 */
var nums = [];

for (var i = 0; i < 100; ++i) {
    nums[i] = i+1; //writing
}

var numbers = [1,2,3,4,5];
var sum = numbers[0] + numbers[1] + numbers[2] + numbers[3] + numbers[4]; // accessing
console.log(sum); // displays 15

var sum = 0;
for (var i = 0; i < numbers.length; ++i) {
    sum += numbers[i];// accessing
}



/**
 * Creating Arrays from Strings
 */
var sentence = "the quick brown fox jumped over the lazy dog";
var words = sentence.split(" ");
for (var i = 0; i < words.length; ++i) {
    console.log("word " + i + ": " + words[i]);
}



/**
 * Aggregate Array Operations
 * 
 * Assign one array to another array
 */

// NOTE: when you assign one array to another array, you are assigning a reference(a shallow copy) to the assigned array
var nums = [];
for (var i = 0; i < 100; ++i) {
nums[i] = i+1;
}
var samenums = nums;
nums[0] = 400;
console.log(samenums[0]); // displays 40

// Solution: deep copy
function copy(arr1, arr2) {
    for (var i = 0; i < arr1.length; ++i) {
        arr2[i] = arr1[i];
    }
}

var nums = [];
for (var i = 0; i < 100; ++i) {
nums[i] = i+1;
}
var samenums = [];

copy(nums, samenums);
nums[0] = 400;
console.log(samenums[0]); // displays 1

// displaying the contents:
var nums = [1,2,3,4,5];
console.log(nums); // console.log "1,2,3,4,5"


/**
 * Accessor Functions
 */

 // Searching for a Value:
 var names = ["David","Mike", "Cynthia", "Raymond", "Clayton", "Mike"];
 var name = prompt("Enter a name to search for: ");
 var firstPos = names.indexOf(name); // position of first occurrence 

 if (firstPos >= 0) {
    console.log("Found " + name + " at position " + firstPos);
    var lastPos = names.lastIndexOf(name); // position of last occurrence 
    if (lastPos >= 0) {
        console.log("Found " + name + " at position " + lastPos);
    }
 }
 else {
    console.log(name + " not found in array.");
 }
 /*
    using name = Mike
    output:
        First found Mike at position 1
        Last found Mike at position 5
 */

// String Representations of Arrays( array: join() and toString() ):
var names = ["David", "Cynthia", "Raymond", "Clayton", "Mike", "Jennifer"];

var namestr = names.join();
console.log(namestr); // David,Cynthia,Raymond,Clayton,Mike,Jennifer

namestr = names.toString();
console.log(namestr); // David,Cynthia,Raymond,Clayton,Mike,Jennifer

// Creating New Arrays from Existing Arrays( concat() and splice() ):
var cisDept = ["Mike", "Clayton", "Terrill", "Danny", "Jennifer"];
var dmpDept = ["Raymond", "Cynthia", "Bryan"];

var itDiv = cisDept.concat(dmpDept); // The concat() function allows you to put together two or more arrays to create a new array
console.log(itDiv); // ["Mike", "Clayton", "Terrill", "Danny", "Jennifer", "Raymond", "Cynthia", "Bryan"]

var itDiv = dmpDept.concat(cisDept);
console.log(itDiv); // ["Raymond", "Cynthia", "Bryan", "Mike", "Clayton", "Terrill", "Danny", "Jennifer"]

var itDiv = ["Mike","Clayton","Terrill","Raymond","Cynthia","Danny","Jennifer"];
var dmpDept = itDiv.splice(3,3); // arguments to the function are the starting position for taking the splice and the number of elements to take from the existing array
var cisDept = itDiv;

console.log(dmpDept); // Raymond,Cynthia,Danny
console.log(cisDept); // Mike,Clayton,Terrill,Jennifer



/**
 * Mutator Functions
 * 
 * to modify the contents of an array without referencing the individual elements
 */

    /*
        Adding Elements to an Array:
    */ 

        // The push() function adds an element to the end of an array:
            var nums = [1,2,3,4,5];
            console.log(nums); // 1,2,3,4,5
            nums.push(6); // added to the array's end
            console.log(nums); // 1,2,3,4,5,6
        // The mutator function for adding array elements to the beginning of an array is unshift().
            var nums = [2,3,4,5];
            console.log(nums); // 2,3,4,5
            var newnum = 1;
            nums.unshift(newnum);
            console.log(nums); // 1,2,3,4,5
            nums = [3,4,5];
            nums.unshift(newnum,1,2);
            console.log(nums); // 1,2,3,4,5
    /*
        Removing Elements from an Array
    */

        // Removing an element from the end of an array is easy using the pop() mutator function
            var nums = [1,2,3,4,5,9];
            nums.pop();
            console.log(nums); // 1,2,3,4,5
        // The mutator function we need to remove an element from the beginning of an array is shift().
            var nums = [9,1,2,3,4,5];
            nums.shift();
            console.log(nums); // 1,2,3,4,5
        // NOTE: You’ll notice there are no extra elements left at the end of the array. Both pop() and 
        //       shift() return the values they remove, so you can collect the values in a variable:
            var nums = [6,1,2,3,4,5];
            var first = nums.shift(); // first gets the value 9
            nums.push(first);
            console.log(nums); // 1,2,3,4,5,6
    /*
        Adding and Removing Elements from the Middle of an Array

            splice( startingIndex, numberElmToRemove, elementsToAdd )
            if numberElmToRemove = 0 you are adding elements
    */
        // Adding
            var nums = [1,2,3,7,8,9];
            var newElements = [4,5,6];
            nums.splice(3,0,newElements);
            console.log(nums); // 1,2,3,4,5,6,7,8,9

            var nums = [1,2,3,7,8,9];
            nums.splice(3,0,4,5,6);
            console.log(nums); // 1,2,3,4,5,6,7,8,9
        // Removing 
            var nums = [1,2,3,100,200,300,400,4,5];
            nums.splice(3,4);
            console.log(nums); // 1,2,3,4,5
    /*
        Putting Array Elements in Order
    */
        // reverse(), reverses the order of the elements of an array
            var nums = [1,2,3,4,5];
            nums.reverse();
            console.log(nums); // 5,4,3,2,1
        // sort(),to sort the elements of an array into order.
            // with strings:
                var names = ["David","Mike","Cynthia","Clayton","Bryan","Raymond"];
                nums.sort();
                console.log(nums); // Bryan,Clayton,Cynthia,David,Mike,Raymond
            // with numbers:
                var nums = [3,1,2,100,4,200];
                nums.sort();
                console.log(nums); // 1,100,2,200,3,4
            // NOTE: The sort() function sorts data lexicographically, so its not perfect with numbers
                // fix:
                    function compare(num1, num2) {
                        return num1 - num2;
                    }
                    var nums = [3,1,2,100,4,200];
                    nums.sort(compare);
                    console.log(nums); // 1,2,3,4,100,200




/**
 * Iterator Functions
 */
    /*
        Non–Array-Generating Iterator Functions
    */
        // forEach(). This function takes a function as an argument and applies the called function to each element of an array.
            function square(num) {
                console.log(num, num * num);
            }
            var nums = [1,2,3,4,5,6,7,8,9,10];
            nums.forEach(square);
        // every(), applies a Boolean function to an array and returns true if the function can return true for every element in the array
            function isEven(num) {
                return num % 2 == 0;
            }
            var nums = [2,4,6,8,10];
            var even = nums.every(isEven);
            if (even) {
                console.log("all numbers are even");
            }
            else {
                console.log("not all numbers are even");
            }
            // all numbers are even
        // The some() function will take a Boolean function and return true if at least one of the elements in the array meets the criterion of the Boolean function
            function isEven(num) {
                return num % 2 == 0;
            }
            var nums = [1,2,3,4,5,6,7,8,9,10];
            var someEven = nums.some(isEven);
            if (someEven) {
                console.log("some numbers are even");
            }
            else {
                console.log("no numbers are even");
            }// some numbers are even

            nums = [1,3,5,7,9];
            someEven = nums.some(isEven);
            if (someEven) {
                console.log("some numbers are even");
            }
            else {
                console.log("no numbers are even");
            }// no numbers are even
        // The reduce() function applies a function to an accumulator and the successive elements of an array until the end of the array is reached, yielding a single value
            function add(runningTotal, currentValue) {
                return runningTotal + currentValue;
            }
            var nums = [1,2,3,4,5,6,7,8,9,10];
            var sum = nums.reduce(add);
            console.log(sum); // displays 55

            // reduce() with strings to perform concatenation:
            function concat(accumulatedString, item) {
                return accumulatedString + item;
            }
            var words = ["the ", "quick ","brown ", "fox "];
            var sentence = words.reduce(concat);
            console.log(sentence); // displays "the quick brown fox"

            // reduceRight() function, which works from the righthand side of the array to the left
            function concat(accumulatedString, item) {
                return accumulatedString + item;
            }
            var words = ["the ", "quick ","brown ", "fox "];
            var sentence = words.reduceRight(concat);
            console.log(sentence); // displays "fox brown quick the"
    /*
        Iterator Functions That Return a New Array

        map() and filter().
    */
        // The map() function works like the forEach() function, applying a function to each element of an array.
            function curve(grade) {
                return grade += 5;
            }
            var grades = [77, 65, 81, 92, 83];
            var newgrades = grades.map(curve);
            console.log(newgrades); // 82, 70, 86, 97, 88

            // Here is an example using strings:
            function first(word) {
                return word[0];
            }
            var words = ["for","your","information"];
            var acronym = words.map(first);
            console.log(acronym.join("")); // displays "fyi"
        // The filter() function works similarly to every()
            function isEven(num) {
                return num % 2 == 0;
            }
            function isOdd(num) {
                return num % 2 != 0;
            }
            var nums = [];
            for (var i = 0; i < 20; ++i) {
                nums[i] = i+1;
            }
            var evens = nums.filter(isEven);
            console.log("Even numbers: ");
            console.log(evens); // 2,4,6,8,10,12,14,16,18,20
            var odds = nums.filter(isOdd);
            console.log("Odd numbers: ");
            console.log(odds); // 1,3,5,7,9,11,13,15,17,19

            // filter() with strings
            function afterc(str) {
                if (str.indexOf("cie") > -1) {
                    return true;
                }
                return false;
            }
            var words = ["recieve","deceive","percieve","deceit","concieve"];
            var misspelled = words.filter(afterc);
            console.log(misspelled); // displays recieve,percieve,concieve



/**
 * Two-Dimensional and Multidimensional Arrays
 */
    /*
        Creating Two-Dimensional Arrays
    */
        var twod = [];
        var rows = 5;
        for (var i = 0; i < rows; ++i) {
            twod[i] = [];
        }
        // NOTE: The problem with this approach is that each element of the array is set to undefined
        
        // Solution: extends the JavaScript array object with a function that sets the number of rows and columns and sets each value to a value passed to the function
        Array.matrix = function(numrows, numcols, initial) {
            var arr = [];
            for (var i = 0; i < numrows; ++i) {
                var columns = [];
                for (var j = 0; j < numcols; ++j) {
                    columns[j] = initial;
                }
                arr[i] = columns;
            }
            return arr;
        }
        // Here is some code to test the definition:
        var nums = Array.matrix(5,5,0);
        console.log(nums[1][1]); // displays 0
        var names = Array.matrix(3,3,"");
        names[1][2] = "Joe";
        console.log(names[1][2]); // display "Joe"

        // We can also create a two-dimensional array and initialize it to a set of values in one line:
        var grades = [[89, 77, 78],[76, 82, 81],[91, 94, 89]];
        console.log(grades[2][2]); // displays 89
    /*
        Processing Two-Dimensional Array Elements
    */
        // student average
        var grades = [[89, 77, 78], [76, 82, 81], [91, 94, 89]];
        var total = 0;
        var average = 0.0;
        for (var row = 0; row < grades.length; ++row) {
          for (var col = 0; col < grades[row].length; ++col) {
            total += grades[row][col];// calculate class average if order is inverted: grades[row][col];
          }
          average = total / grades[row].length;
          console.log("Student " + parseInt(row + 1) + " average: " + average.toFixed(2));
          total = 0;
          average = 0.0;
        }



/**
 * Arrays of Objects
 */
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    function displayPts(arr) {
      for (var i = 0; i < arr.length; ++i) {
        console.log(arr[i].x + ", " + arr[i].y);
      }
    }

    var p1 = new Point(1, 2);
    var p2 = new Point(3, 5);
    var p3 = new Point(2, 8);
    var p4 = new Point(4, 4);

    var points = [p1, p2, p3, p4];

    for (var i = 0; i < points.length; ++i) {
      console.log("Point " + parseInt(i + 1) + ": " + points[i].x + ", " + points[i].y);
    }

    var p5 = new Point(12, -3);
    points.push(p5);
    console.log("After push: ");
    displayPts(points);
    points.shift();
    console.log("After shift: ");
    displayPts(points);



/**
 * Arrays in Objects
 */
    /*
        Example: we create an object that stores the weekly observed high
        temperature. The object has functions for adding a new temperature and computing
        the average of the temperatures stored in the object. Here is the code:
    */
    function weekTemps() {
        this.dataStore = [];
        this.add = add;
        this.average = average;
    }

    function add(temp) {
        this.dataStore.push(temp);
    }

    function average() {
        var total = 0;
        for (var i = 0; i < this.dataStore.length; ++i) {
            total += this.dataStore[i];
        }
        return total / this.dataStore.length;
    }

    var thisWeek = new weekTemps();

    thisWeek.add(52);
    thisWeek.add(55);
    thisWeek.add(61);
    thisWeek.add(65);
    thisWeek.add(55);
    thisWeek.add(50);
    thisWeek.add(52);
    thisWeek.add(49);
    
    console.log(thisWeek.average()); // displays 54.875