/**
 * Hashing
 * Hashing is a common technique for storing data in such a way that the data can be
    inserted and retrieved very quickly.

    Hashing uses a data structure called a hash table.
    Although hash tables provide fast insertion, deletion, and retrieval, they perform poorly
    for operations that involve searching, such as finding the minimum and maximum
    values in a data set. 
    
    For these operations, other data structures such as the binary search
    tree are more appropriate. We’ll implement a hash table and it’s appropriate use as 
    a data storage and its retrieval technique.
 */
    /**
     * An Overview of Hashing
     * 
        The hash table data structure is designed around an array. The array consists of elements
        0 through some predetermined size, though we can increase the size when necessary.
        Each data element is stored in the array based on an associated data element called the
        key, which is similar to the concept of the key we examined with the dictionary data
        structure. To store a piece of data in a hash table, the key is mapped into a number in
        the range of 0 through the hash table size, using a hash function.

        Ideally, the hash function stores each key in its own array element. However, because
        there are an unlimited number of possible keys and a limited number of array elements
        (theoretical in JavaScript), a more realistic goal of the hash function is to attempt to
        distribute the keys as evenly as possible among the elements of the array.

        Even with an efficient hash function, it is possible for two keys to hash (the result of the
        hash function) to the same value. This is called a collision, and we need a strategy for
        handling collisions when they occur. We’ll discuss how to deal with collisions in detail
        later in the chapter.

        The last thing we have to determine when creating a hash function is how large an array
        to create for the hash table. One constraint usually placed on the array size is that it
        should be a prime number. We will explain why this number should be prime when we
        examine the different hash functions. After that, there are several different strategies for
        determining the correct array size, all of them based on the technique used to handle
        collisions, so we will examine this issue when we discuss handling collisions.

/**
 * A Hash Table Class
 * 
 * simpleHash   :     computing hash values
 * showDistro   :     displaying the distribution of data in the hash table
 * put          :     inserting data into the hash table
 * get          :     retrieving data from the hash table
 * 
 */
function HashTable() {
    this.table = new Array(137);
    this.simpleHash = simpleHash; 
    this.betterHash = betterHash;
    this.showDistro = showDistro; 
    this.put = put; 
    this.get = get;
}

// sum the ASCII value of the letters in the key. The hash value is then that sum modulo the array size. Here is the definition for this simple hash function:
/**
 * Compute hash value
 * 
 * @param {string} [data=''] 
 * @returns {number} hash
 */
function simpleHash(data = '') {
    let total = 0;
    const dataTotal = data.length;
  
    for (var i = 0; i < dataTotal; ++i) {
      total += data.charCodeAt(i);
    }
  
    return total % this.table.length;
}
/**
 * Compute hash value
 * 
 * Avoid collisions(key repetitions issues):
 *  1- The hash table is sized to a prime number >= 137
 *  2- Using the algorithm known as Horner’s.
 * 
 * @param {string} [data=''] 
 * @returns {number} hash
 */
function betterHash(data = '') {
    const H             = 37,
          dataTotal     = data.length,
          tableTotal    = this.table.length;
    let   total         = 0;

    for (var i = 0; i < dataTotal; ++i) {
        total += (H * total + data.charCodeAt(i));
    }

    total = total % tableTotal;

    if (total < 0) {
        total += tableTotal - 1;
    }

    return parseInt(total);
}
/**
 * Display the distribution of data in the hash table
 * 
 * @param {string} [label='Distro of hash table:'] 
 */
function showDistro(label= 'Distro of hash table:') {
    let n = 0;
    const hashTotal = this.table.length;

    console.group(label);
        for (let i = 0; i < hashTotal; ++i) {
            if (this.table[i] != undefined) {
                console.log(i + ": " + this.table[i]);
            }
        }
    console.groupEnd();
}
/**
 * Inserting data into the hash table
 * 
 * @param {string} [key='default'] 
 * @param {string} [data=key] 
 */
function put(key = 'default', data = key) {
  const pos = this.betterHash(key);

  this.table[pos] = data;
}
/**
 * Retrieve data from the hash table
 * 
 * @param {string} [key='default'] 
 * @returns {any}
 */
function get(key = 'default') {
    return this.table[this.betterHash(key)];
}

// Test Hashing using a simple hash function
var someNames = [ "David", "Jennifer", "Donnie", "Raymond",
                  "Cynthia", "Mike", "Clayton", "Danny", 
                  "Jonathan" ];

var hTable = new HashTable();

for (let i = 0, namesTotal = someNames.length; i < namesTotal; ++i) {
    hTable.put(someNames[i]);
}

hTable.showDistro();/*
    Distro of hash table:
        17: Cynthia
        25: Donnie
        30: Mike
        33: Jennifer
        37: Jonathan
        57: Clayton
        65: David
        66: Danny
        99: Raymond
*/
    /**
     * Hashing Integer Keys
        In the last section we worked with string keys. In this section, we introduce how to hash
        integer keys. The data set we’re working with is student grades. The key is a nine-digit
        student identification number, which we will generate randomly, along with the student’s
        grade. Here are the functions we use to generate the student data (ID and grade):
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function genStuData(arr) {
        for (let i = 0; i < arr.length; ++i) {
            let num = "";

            for (let j = 1; j <= 9; ++j) {
                num += Math.floor(Math.random() * 10);
            }

            num += getRandomInt(50, 100);

            arr[i] = num;
        }
    }
    // program that uses the preceding functions to store a set of students and their grades.
    var numStudents = 10;
    var arrSize = 97;
    var idLen = 9;

    var students = new Array(numStudents);

    genStuData(students);

    console.log ("Student data: \n");
    for (var i = 0; i < students.length; ++i) {
        console.log( `${students[i].substring(0,8)} ${students[i].substring(9)}`);
    }/*
    Student data: 
         34956220 84
         17757512 91
         65563757 93
         54470925 67
         38904090 98
         21399088 63
         31946458 53
         54738910 73
         19497681 92
         84025128 100
    */

    var hTable = new HashTable();

    for (var i = 0; i < students.length; ++i) {
        hTable.put(students[i]);
    }

    console.log("\n\nData distribution: \n");
    hTable.showDistro();/*
    Distro of hash table:
        13: 54738910473
        28: 21399088363
        49: 17757512691
        54: 840251287100
        69: 34956220684
        118: 65563757493
        121: 54470925367
        130: 19497681592
        135: 38904090998
    */
    // Once again, our hash function creates a collision, and not all of the data is stored in the array


// Here is a program to test the put() and get() functions:
var pnumbers = new HashTable();
var name, number;

for (var i = 0; i < 3; i++) {
    name = window.prompt("Enter a name (Esc to quit): ");
    number = window.prompt("Enter a number: ");
    pnumbers.put(name,number);
}

do {
    name = window.prompt("Name for number (Enter quit to stop): ");     

    if (name == "quit") {
        break;
    }

    console.log(name + "'s number is " + pnumbers.get(name));
} while (name != "quit");

 /**
     * Handling Collisions:
     *  separate chaining and linear probing.
     */
        /**
         * Separate Chaining
         * Technique where each array element of a hash table stores
            another data structure, such as another array, which is then used to store keys.

            If two keys generate the same hash value, each key can be stored in a
            different position of the secondary array.
         */
        // This creates a two-dimensional array
        function buildChains() {
            for (var i = 0; i < this.table.length; ++i) {
                this.table[i] = new Array();
            }
        }
        // way to recognize that the hash table is now a multidimensional array:
        function showDistro(label= 'Distro of hash table:') {
            var n = 0;
            console.group(label);
                for (var i = 0; i < this.table.length; ++i) {
                    if (this.table[i][0] != undefined) {
                    console.log(i + ": " + this.table[i]);
                    }
                }
            console.groupEnd();
        }

        function put(key, data = key) {
            var pos = this.betterHash(key);
            var index = 0;

            if (this.table[pos][index] == undefined) {
                this.table[pos][index] = data;
            } else {
                while (this.table[pos][index] != undefined) {
                    ++index;
                }
                this.table[pos][index] = data;
            }
        }

        function get(key) {
            var index = 0;
            var hash = this.betterHash(key);

            if (this.table[hash][index] == key) {
                return this.table[pos][index];
            } else {
                while (this.table[pos][index] != key) {
                    ++index;
                }
                return this.table[pos][index];
            }
            return undefined;
        }

        function betterHash(data = '') {
            const H             = 37,
                  dataTotal     = data.length,
                  tableTotal    = this.table.length;
            let   total         = 0;

            for (var i = 0; i < dataTotal; ++i) {
                total += (H * total + data.charCodeAt(i));
            }

            total = total % tableTotal;

            if (total < 0) {
                total += tableTotal - 1;
            }

            return parseInt(total);
        }

        function HashTable() {
            this.table = new Array(137);
            this.betterHash = betterHash;
            this.showDistro = showDistro; 
            this.put = put; 
            this.get = get;
            this.buildChains = buildChains;
        }

        // Test Using separate chaining to avoid collisions
        var hTable = new HashTable();

        hTable.buildChains();

        var someNames = [   
                            "David", "Jennifer", "Donnie", "Raymond",
                            "Cynthia", "Mike", "Clayton", "Danny", "Jonathan"
                        ];

        for (var i = 0; i < someNames.length; ++i) {
            hTable.put(someNames[i]);
        }

        hTable.showDistro();
    /**
     * Linear Probing
     * 
     * With linear probing, when there is a collision, the program simply looks to see if the next
        element of the hash table is empty. If so, the key is placed in that element. If the element
        is not empty, the program continues to search for an empty hash-table element until
        one is found. This technique makes use of the fact that any hash table is going to have
        many empty elements and it makes sense to use the space to store keys.

        Linear probing should be chosen over separate chaining when your array for storing
        data can be fairly large. Here’s a formula commonly used to determine which collision
        method to use: if the size of the array can be up to half the number of elements to be
        stored, you should use separate chaining; but if the size of the array can be twice the size
        of the number of elements to be stored, you should use linear probing.
     */        
        function HashTable() {
            this.table = new Array(137); 
            this.values = [];
            this.put = put; 
            this.get = get;
            this.betterHash = betterHash;
            this.showDistro = showDistro;
        }

        function betterHash(data = '') {
            const H             = 37,
                  dataTotal     = data.length,
                  tableTotal    = this.table.length;
            let   total         = 0;

            for (var i = 0; i < dataTotal; ++i) {
                total += (H * total + data.charCodeAt(i));
            }

            total = total % tableTotal;

            if (total < 0) {
                total += tableTotal - 1;
            }

            return parseInt(total);
        }

        // way to recognize that the hash table is now a multidimensional array:
        function showDistro(label= 'Distro of hash table:') {
            var n = 0;
            console.group(label);
                for (var i = 0; i < this.table.length; ++i) {
                    if (this.table[i][0] != undefined) {
                    console.log(i + ": " + this.table[i]);
                    }
                }
            console.groupEnd();
        }
        

        function put(key, data = key) {
            let pos = this.betterHash(key);
            
            const updateTabVal = () => {
                this.table[pos] = key;
                this.values[pos] = data;
            }

            if (this.table[pos] == undefined) {
                updateTabVal();
            } else {
                while (this.table[pos] != undefined) {
                        pos++;
                }
                updateTabVal();
            }
        }

        function get(key) {
          let hash = -1;
          hash = this.betterHash(key);

          if (hash > -1) {
            for (var i = hash; this.table[hash] != undefined; i++) { // TODO: check stop condition
              if (this.table[hash] == key) {
                return this.values[hash];
              }
            }
          }
          return undefined;
        }

        // Test Using Linear Probing to avoid collisions
        var hTable = new HashTable();

        var someNames = [   
                            "David", "Jennifer", "Donnie", "Raymond",
                            "Cynthia", "Mike", "Clayton", "Danny", "Jonathan"
                        ];

        for (var i = 0; i < someNames.length; ++i) {
            hTable.put(someNames[i]);
        }

        hTable.showDistro();