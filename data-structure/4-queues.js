/**
 * A queue is an example of a first-in, first-out (FIFO) data structure.
 */
function Queue() {
  this.dataStore = [];
  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.front = front;
  this.back = back;
  this.toString = toString;
  this.empty = empty;
  this.count = count;
}

function enqueue(element) {
  this.dataStore.push(element);
}

function dequeue() {
    return this.dataStore.shift();
}

function front() {
  return this.dataStore[0];
}

function back() {
  return this.dataStore[this.dataStore.length - 1];
}

function toString() {
  var retStr = "";
  for (var i = 0; i < this.dataStore.length; ++i) {
    retStr += this.dataStore[i] + "\n";
  }
  return retStr;
}

function empty() {
  if (this.dataStore.length == 0) {
    return true;
  } else {
    return false;
  }
}

function count() {
    return this.dataStore.length;
}

// test program
var q = new Queue();

q.enqueue("Meredith");
q.enqueue("Cynthia");
q.enqueue("Jennifer");

console.log(q.toString());
/*
    Meredith
    Cynthia
    Jennifer
*/

q.dequeue();

console.log(q.toString());
/*
    Cynthia
    Jennifer
*/

console.log("Front of queue: " + q.front()); // Front of queue: Cynthia
console.log("Back of queue: " + q.back()); // Back of queue: Jennifer


    /**
     * Algorithms:
     */
        /**
         * Using the Queue Class: Assigning Partners at a Square Dance
            As we mentioned earlier, queues are often used to simulate situations when people have
            to wait in line. Once scenario we can simulate with a queue is a square dance for singles.
            When men and women arrive at this square dance, they enter the dance hall and stand
            in the line for their gender. As room becomes available on the dance floor, dance partners
            are chosen by taking the first man and woman in line. The next man and woman move
            to the front of their respective lines. As dance partners move onto the dance floor, their
            names are announced. If a couple leaves the floor and there is not both a man and a
            woman at the front of each line, this fact is announced.
         */
        var dancers = [["F", "Allison McMillan"],["M", "Frank Opitz"],["M", "Mason McMillan"],["M", "Clayton Ruff"],["F", "Cheryl Ferenback"],["M", "Raymond Williams"],["F", "Jennifer Ingram"],["M", "Bryan Frazer"],["M", "David Durr"],["M", "Danny Martin"],["F", "Aurora Adney"]];
        // Each dancer is stored in a Dancer object:
        function Dancer(name, sex) {
            this.name = name;
            this.sex = sex;
        }
        // load the dancers from the file into the program:
        function getDancers(males, females) {
            const dancersTotal = dancers.length;
            
            for (let i = 0; i < dancersTotal; ++i) {
                const dancer = dancers[i];
                const [sex, name] = dancer;

                if (sex == "F") {
                    females.enqueue(new Dancer(name, sex));
                } else {
                    males.enqueue(new Dancer(name, sex));
                }
            }
        }
        // The next function pairs up the male and female dancers and announces the pairings:
        function dance(males, females) {
            console.log("The dance partners are: \n");

            while (!females.empty() && !males.empty()) {
                person = females.dequeue();
                console.log("Female dancer is: " + person.name);
                
                person = males.dequeue();
                console.log(" and the male dancer is: " + person.name);
            }
            console.log();
        }
        // // test program
        var maleDancers = new Queue();
        var femaleDancers = new Queue();

        getDancers(maleDancers, femaleDancers);
        dance(maleDancers, femaleDancers);

        if (!femaleDancers.empty()) {
          console.log(femaleDancers.front().name + " is waiting to dance first.");
        }
        if (!maleDancers.empty()) {
          console.log(maleDancers.front().name + " is waiting to dance first.");
        }
        
        if (maleDancers.count() > 0) {
            console.log("There are " + maleDancers.count() +
            " male dancers waiting to dance.");
        } else{
            console.log("The female queue is empty");
        }
        if (femaleDancers.count() > 0) {
            console.log("There are " + femaleDancers.count() +
            " female dancers waiting to dance.");
        }else{
            console.log("The male queue is empty ");
        }/*
        The dance partners are:

        Female dancer is: Allison and the male dancer is: Frank
        Female dancer is: Cheryl and the male dancer is: Mason
        Female dancer is: Jennifer and the male dancer is: Clayton
        Female dancer is: Aurora and the male dancer is: Raymond

        Bryan is waiting to dance first.

        The female queue is empty
        There are 3 male dancers waiting to dance.
        */
    /**
     * Sorting Data with Queues
        The radix sort works by making two passes over a data set, in this case the set of integers
        from 0 to 99. The first pass sorts the numbers based on the 1s digit, and the second pass
        sorts the numbers based on the 10s digit. Each number is placed in a bin based on the
        digit in each of these two places. Given these numbers:
            91, 46, 85, 15, 92, 35, 31, 22
        the first pass of the radix sort results in the following bin configuration:
            Bin 0:
            Bin 1: 91, 31
            Bin 2: 92, 22
            Bin 3:
            Bin 4:
            Bin 5: 85, 15, 35
            Bin 6: 46
            Bin 7:
            Bin 8:
            Bin 9:
        Now the numbers are sorted based on which bin they are in:
            91, 31, 92, 22, 85, 15, 35, 46
        Next, the numbers are sorted by the 10s digit into the appropriate bins:
            Bin 0:
            Bin 1: 15
            Bin 2: 22
            Bin 3: 31, 35
            Bin 4: 46
            Bin 5:
            Bin 6:
            Bin 7:
            Bin 8: 85
            Bin 9: 91, 92
        Finally, take the numbers out of the bins and put them back into a list, and you get the
        following sorted list of integers:
            15, 22, 31, 35, 46, 85, 91, 92
     */
        /*
            We can implement this algorithm by using queues to represent the bins. We need nine
            queues, one for each digit. We will store the queues in an array. We uses the modulus
            and integer division operations for determining the 1s and 10s digits. The remainder
            of the algorithm entails adding numbers to their appropriate queues, taking the numbers
            out of the queues to re-sort them based on the 1s digit, and the repeating the process
            for the 10s digit. The result is a sorted set of integers.
        */
        // First, here is the function that distributes numbers by the place (1s or 10s) digit:
        function distribute(nums, queues, n, digit) {
          // digit represents either the 1s
          // or 10s place
          for (var i = 0; i < n; ++i) {
            if (digit == 1) {
              queues[nums[i] % 10].enqueue(nums[i]);
            } else {
              queues[Math.floor(nums[i] / digit)].enqueue(nums[i]);
            }
          }
        }
        // Here is the function for collecting numbers from the queues:
        function collect(queues, nums) {
          var i = 0;
          for (var digit = 0; digit < 10; ++digit) {
            while (!queues[digit].empty()) {
              nums[i++] = queues[digit].dequeue();
            }
          }
        }
        function dispArray(arr) {
          for (var i = 0; i < arr.length; ++i) {
            console.log(arr[i] + " ");
          }
        }

        // test main program
        var queues = [];
        for (var i = 0; i < 10; ++i) {
          queues[i] = new Queue();
        }

        var nums = [];
        for (var i = 0; i < 10; ++i) {
          nums[i] = Math.floor(Math.floor(Math.random() * 101));
        }

        console.log("Before radix sort: ");
        dispArray(nums);

        distribute(nums, queues, 10, 1);
        collect(queues, nums);

        distribute(nums, queues, 10, 10);
        collect(queues, nums);

        console.log("\n\nAfter radix sort: ");
        dispArray(nums);
    /**
     * Priority Queues
     *  A priority queue is one where elements are removed from the queue based on a priority
        constraint. For example, the waiting room at a hospital’s emergency department (ED)
        operates using a priority queue.

        When a patient enters the ED, the nurse assign the patient a priorty code. Patients with a high priority code are seen before patients
        with a lower priority code, and patients that have the same priority code are seen on a
        first-come, first-served, or first-in, first-out, basis.
     */
        // Let’s begin building a priority queue system by first defining an object that will store the elements of the queue:
        function Patient(name, code) {
            this.name = name;
            this.code = code;
        }
        // de-queue update: find the element with the highest priority code (the lowest number; 1 has a higher priority than 5)
        function dequeue() {
          var code = this.dataStore[0].code,
              priority = 0;
          for (var i = 1; i < this.dataStore.length; ++i) {
            if (this.dataStore[i].code < code) {
              priority = i;
              code = this.dataStore[i].code;
            }
          }
          return this.dataStore.splice(priority, 1);
        }
        // Finally, we add a toString() function modified to handle Patient objects:
        function toString() {
          var retStr = "";
          for (var i = 0; i < this.dataStore.length; ++i) {
            retStr += this.dataStore[i].name + " code: " + this.dataStore[i].code + "\n";
          }
          return retStr;
        }

        // Test a priority queue implementation:
        var p = new Patient("Smith",5);

        var ed = new Queue();

        ed.enqueue(p);

        p = new Patient("Jones", 4);
        ed.enqueue(p);

        p = new Patient("Fehrenbach", 6);
        ed.enqueue(p);

        p = new Patient("Brown", 1);
        ed.enqueue(p);

        p = new Patient("Ingram", 1);
        ed.enqueue(p);

        console.log(ed.toString());

        var seen = ed.dequeue();
        console.log("Patient being treated: " + seen[0].name);

        console.log("Patients waiting to be seen: ")
        console.log(ed.toString());

        // another round
        var seen = ed.dequeue();
        console.log("Patient being treated: " + seen[0].name);

        console.log("Patients waiting to be seen: ")
        console.log(ed.toString());

        var seen = ed.dequeue();
        console.log("Patient being treated: " + seen[0].name);

        console.log("Patients waiting to be seen: ")
        console.log(ed.toString());/*   generates the following output:
            Smith code: 5
            Jones code: 4
            Fehrenbach code: 6
            Brown code: 1
            Ingram code: 1

            Patient being treated: Jones
            Patients waiting to be seen:
            Smith code: 5
            Fehrenbach code: 6
            Brown code: 1
            Ingram code: 1

            Patient being treated: Ingram
            Patients waiting to be seen:
            Smith code: 5
            Fehrenbach code: 6
            Brown code: 1
            
            Patient being treated: Brown
            Patients waiting to be seen:
            Smith code: 5
            Fehrenbach code: 6
        
        */