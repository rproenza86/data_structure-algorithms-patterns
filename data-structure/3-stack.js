/**
 * The stack is known as a last-in, first-out (LIFO) data structure.
 */
function Stack() {
    this.dataStore = [];
    this.top = 0; // To keep track of where the top element is
    this.push = push;
    this.pop = pop;
    this.peek = peek; // The peek operation returns the value stored at the top of a stack without removing it from the stack.
    this.clear = clear || null;
    this.length = length || null;
    this.empty = empty || null;
}

function push(element) {
    this.dataStore[this.top++] = element;
}

function pop() {
    const stackElement = this.dataStore[this.top - 1];
    this.dataStore.splice(--this.top, 1);
    return stackElement;
}

function peek() {
    return this.dataStore[this.top - 1];
}

function length() {
    return this.top;
}

function clear() {
    this.top = 0;
    this.dataStore.splice(0);
}

function empty() {
    return this.top ? true : false;
}

// Testing the Stack class implementation
var s = new Stack();

s.push("David");
s.push("Raymond");
s.push("Bryan");

console.log("length: " + s.length());
console.log(s.peek());

var popped = s.pop();
console.log("The popped element is: " + popped);
console.log(s.peek());

s.push("Cynthia");
console.log(s.peek());

s.clear();
console.log("length: " + s.length());
console.log(s.peek());

s.push("Clayton");
console.log(s.peek());

/**
 * Using the Stack Class
 * 
 *  There are several problems for which a stack is the perfect data structure needed for the solution.
 * 
 *  Algorithms: 
 */
    /**
     * Multiple Base Conversions
        A stack can be used to convert a number from one base to another base. Given a number,
        n, which we want to convert to a base, b, here is the algorithm for performing the
        conversion:
            1. The rightmost digit of n is n % b. Push this digit onto the stack.
            2. Replace n with n / b.
            3. Repeat steps 1 and 2 until n = 0 and there are no significant digits remaining.
            4. Build the converted number string by popping the stack until the stack is empty.
     */
    // NOTE: This algorithm will work only with bases 2 through 9.
    
        //function for converting a number to any of the bases 2 through 9:
        function mulBase(num, base) {
            var s = new Stack();
            do {
                s.push(num % base);
                num = Math.floor((num /= base));
            } while (num > 0);
            var converted = "";
            while (s.length() > 0) {
                converted += s.pop();
            }
            return converted;
        }
        // Converting numbers to base 2 and base 8
        var num = 32;
        var base = 2;
        var newNum = mulBase(num, base);
        console.log(num + " converted to base " + base + " is " + newNum); // 32 converted to base 2 is 100000
        num = 125;
        base = 8;
        var newNum = mulBase(num, base);
        console.log(num + " converted to base " + base + " is " + newNum); // 125 converted to base 8 is 175
    /**
     * Palindromes
     * 
     * A palindrome is a word, phrase, or number that is spelled the same forward and backward.
     * 
     * For example: 
     *      “dad” is a palindrome; 
     *      “racecar” is a palindrome; 
     *      “A man, a plan, a canal: Panama” is a palindrome if you take out the spaces and ignore the punctuation;
     *      and 1,001 is a numeric palindrome.
     */
        function isPalindrome(word) {
          var s = new Stack();
          for (var i = 0; i < word.length; ++i) {
            s.push(word[i]);
          }

          var rword = "";
          while (s.length() > 0) {
            rword += s.pop();
          }

          if (word == rword) {
            return true;
          } else {
            return false;
          }
        }
        
        var word = "hello";
        if (isPalindrome(word)) {
          console.log(word + " is a palindrome.");
        } else {
          console.log(word + " is not a palindrome.");
        }// hello is not a palindrome.

        word = "racecar";
        if (isPalindrome(word)) {
          console.log(word + " is a palindrome.");
        } else {
          console.log(word + " is not a palindrome.");
        } // racecar is a palindrome.
    /**
     * Demonstrating Recursion
     * 
     * Factorial function for the number 5:
     *      5! = 5 * 4 * 3 * 2 * 1 = 120
     */
        function factorial(n) {
          if (n === 0) {
            return 1;
          } else {
            return n * factorial(n - 1);
          }
        }
        // Simulating recursive processes using a stack
        function fact(n) {
          var s = new Stack();
          while (n > 1) {
            s.push(n--);
          }

          var product = 1;
          while (s.length() > 0) {
            product *= s.pop();
          }
          return product;
        }
        // Test: 
        console.log(factorial(5)); // displays 120
        console.log(fact(5)); // displays 120
