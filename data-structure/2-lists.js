/**
 * Lists are especially useful if we don’t have to perform searches on the
 * items in the list or put them into some type of sorted order.
 * 
 * When we need to perform long searches or complex sorts, lists become less useful, especially 
 * with more complex data structures.
 */

/**
 * A List ADT( list abstract data type )
 * Functions:
    listSize (property) Number of elements in list
    pos (property) Current position in list
    length (property) Returns the number of elements in list
    clear (function) Clears all elements from list
    toString (function) Returns string representation of list
    getElement (function) Returns element at current position
    insert (function) Inserts new element after existing element
    append (function) Adds new element to end of list
    remove (function) Removes element from list
    front (function) Sets current position to first element of list
    end (function) Sets current position to last element of list
    prev (function) Moves current position back one element
    next (function) Moves current position forward one element
    currPos (function) Returns the current position in list
    moveTo (function) Moves the current position to specified position
 */

/**
 * A List Class Implementation
 */
    function List() {
        this.listSize = 0;
        this.pos = 0;
        this.dataStore = []; // initializes an empty array to store list elements
        this.clear = clear;
        this.find = find;
        this.toString = toString;
        this.insert = insert;
        this.append = append;
        this.remove = remove;
        this.front = front;
        this.end = end;
        this.prev = prev;
        this.next = next;
        this.length = length;
        this.currPos = currPos;
        this.moveTo = moveTo;
        this.getElement = getElement;
        this.length = length;
        this.contains = contains;
    }
    // Append: Adding an Element to a List
    function append(element) {
        this.dataStore[this.listSize++] = element;
    }
    // Find: Finding an Element in a List
    function find(element) {
      for (var i = 0; i < this.dataStore.length; ++i) {
        if (this.dataStore[i] == element) {
          return i;
        }
      }
      return -1;
    }
    // Remove: Removing an Element from a List
    function remove(element) {
      var foundAt = this.find(element);
      if (foundAt > -1) {
        this.dataStore.splice(foundAt, 1);
        --this.listSize;
        return true;
      }
      return false;
    }
    // Length: Determining the Number of Elements in a List
    function length() {
        return this.listSize;
    }
    // toString: Retrieving a List’s Elements
    function toString() {
        return this.dataStore.toString();
    }
    // Insert: Inserting an Element into a List
    function insert(element, after) { // after is an specified element already in the list
      var insertPos = this.find(after);
      if (insertPos > -1) {
        this.dataStore.splice(insertPos + 1, 0, element);
        ++this.listSize;
        return true;
      }
      return false;
    }
    // Clear: Removing All Elements from a List
    function clear() {
        delete this.dataStore;
        this.dataStore = [];
        this.listSize = this.pos = 0;
    }
    // Contains: Determining if a Given Value Is in a List
    function contains(element) {
      for (var i = 0; i < this.dataStore.length; ++i) {
        if (this.dataStore[i] == element) {
          return true;
        }
      }
      return false;
    }
    // Traversing a List: movement through a list, and the last function
    function front() {
      this.pos = 0;
    }
    function end() {
      this.pos = this.listSize - 1;
    }
    function prev() {
      if (this.pos > 0) {
        --this.pos;
      }
    }
    function next() {
      if (this.pos < this.listSize - 1) {
        ++this.pos;
      }
    }
    function currPos() {
      return this.pos;
    }
    function moveTo(position) {
      this.pos = position;
    }
    function getElement() { // displays the current element
      return this.dataStore[this.pos];
    }



/**
 * Iterating Through a List
 * 
 * Some advantages to using iterators over using array indexing include:
    • Not having to worry about the underlying data storage structure when accessing
    list elements

    • Being able to update the list and not having to update the iterator, where an index
    becomes invalid when a new element is added to the list

    • Providing a uniform means of accessing elements for different types of data stores
    used in the implemenation of a List class
 */
    var names = new List();

    names.append("Clayton");
    names.append("Raymond");
    names.append("Cynthia");
    names.append("Jennifer");
    names.append("Bryan");
    names.append("Danny");

    for(names.front(); names.currPos() < names.length(); names.next()) {
        console.log(names.getElement());
    }

    // We can also traverse a list backward using an iterator. Here is the code:
    for(names.end(); names.currPos() >= 0; names.prev()) {
        console.log(names.getElement());
    }


/**
 * A List-Based Application
    To demonstrate how to use lists, we are going to build a system that can be used in the
    simulation of a video-rental kiosk system such as Redbox.
 */
    // Init:
    var movies = ["The Shawshank Redemption","The Godfather","The Godfather: Part II","Pulp Fiction","The Good, the Bad and the Ugly","12 Angry Men","Schindler’s List","The Dark Knight","The Lord of the Rings: The Return of the King"," Fight Club"," Star Wars: Episode V - The Empire Strikes Back"," One Flew Over the Cuckoo’s Nest"]

    /*
        Using Lists to Manage a Kiosk
    */
        // take the movies array and store its contents in a list
        var movieList = new List();
        for (var i = 0; i < movies.length; ++i) {
            movieList.append(movies[i]);
        }
        // display the movie list available at the kiosk:
        function displayList(list) {
          for (list.front(); list.currPos() < list.length(); list.next()) {
            const customer = list.getElement();
            if (customer instanceof Customer) {
                console.log(customer["name"] + ", " + customer["movie"]);
            } else {
                console.log(customer);
            }
          }
        }
        // create a list to store the customers who check out movies at the kiosk
        var customers = new List();

        function Customer(name, movie) {
            this.name = name;
            this.movie = movie;
        }
        // Customer check out a movie: If the movie is available, the function removes the movie from the kiosk’s list of movies and adds it to the customer’s list
        function checkOut(customerName, movie, filmList, customerList) {
          if (movieList.contains(movie)) {
            const customer = new Customer(customerName, movie);
            customerList.append(customer);
            filmList.remove(movie);
          } else {
            console.log(movie + " is not available.");
          }
        }
        // We can test the checkOut() function with a short program:
        console.log("Available movies: \n");
        displayList(movieList);
        checkOut("Jane Doe", "The Godfather", movieList, customers);
        console.log("\nCustomer Rentals: \n");
        displayList(customers);