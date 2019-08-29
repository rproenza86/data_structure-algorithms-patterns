/**
 * Linked List
 *  We’ll explain why linked lists are sometimes preferred to arrays, and
    we’ll develop an object-based, linked-list implementation.

    When you determine that the operations performed on an array are too slow for practical
    use, you can consider using the linked list as an alternative data structure.

    The linked list can be used in almost every situation where a one-dimensional array is used,
    except when you need random access to the elements of a list. When random access is
    required, an array is the better data structure to use.

    A linked list is a collection of objects called nodes. Each node is linked to a successor
    node in the list using an object reference. The reference to another node is called a link.
 */

//The Node Class
function Node(element) {
    this.element = element;
    this.next = null;
}
//The Linked List Class
function LList() {
    this.head = new Node("head");
    this.find = find;
    this.findPrevious = findPrevious;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
}

function find(item) {
  let currNode = this.head;

  while (currNode && currNode.next != null && currNode.element != item) {
    currNode = currNode.next;
  }

  return  ( currNode.element == item) ? currNode : false;
}

function findPrevious(item) {
  let currNode = this.head;

  while (currNode && currNode.next != null && currNode.next.element != item) {
    currNode = currNode.next;
  }

  return  ( currNode.next && currNode.next.element  == item ) ? currNode : false;
}

function insert(newElement, parentElement = new Node("")) {
    const newNode = new Node(newElement);
    const parentNode = this.find(parentElement);

    if(parentNode) {
      newNode.next = parentNode && parentNode.next;
      parentNode.next = newNode;
      return true;
    } else {
      return false;
    }
}

function remove(item) {
  let prevNode = this.findPrevious(item);

  if (prevNode) {
    prevNode.next = item.next;
    return true;
  }

  return false;
}

function display(label = 'Displaying Linked list nodes elements:') {
    var currNode = this.head;
  
    console.group(label);
        while ((currNode.next != null)) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    console.groupEnd();
}

// Test The LList class and a test program
var cities = new LList();

cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Alma", "Russellville");

cities.display('Displaying Linked list: Initial nodes elements:'); /*
    Conway
    Russellville
    Alma
*/

cities.insert("Cuba");

cities.display("Displaying Linked list: Added 'Cuba' node element:");/*
    Conway
    Russellville
    Alma
    Cuba
*/
cities.remove("Cuba");

cities.display("Displaying Linked list: Removed 'Cuba' node element:");/*
    Conway
    Russellville
    Alma
*/
    /**
     * Doubly Linked Lists
     * Although traversing a linked list from the first node to the last node is straightforward,
        it is not as easy to traverse a linked list backward.

        With Doubly Linked Lists When we insert a node into the list, we’ll have to perform more operations to assign 
        the proper links for the next and previous nodes, but we gain efficiency when we have to remove a node
        from the list, since we no longer have to search for the previous node.
     */
        // Updates:
        /**
         * Double linked List's(DLL) node 
         * 
         * @param {any} element 
         */
        function Node(element) {
            this.element = element;
            this.next = null;
            this.previous = null;
        }
        //The Double Linked List Class
        function LList() {
            this.head = new Node("head");
            this.find = find;
            this.findPrevious = findPrevious;
            this.insert = insert;
            this.remove = remove;
            this.display = display;
            this.findLast = findLast;
            this.dispReverse = dispReverse;
        }
        /**
         * Insert node in DLL updating links reference
         * 
         * @param {any} newElement 
         * @param {string} [parentElement='']
         * @returns void
         */
        function insert(newElement, parentElement = '') {
            const newNode = new Node(newElement);
            const parentNode = this.find(parentElement);

            if (parentNode.next) {
                newNode.next = parentNode.next;
                parentNode.next.previous = newNode;
            }
            newNode.previous = parentNode;
            parentNode.next = newNode;
        }
        /**
         * 
         * 
         * @param {any} item 
         * @returns true || false
         */
        function remove(item) {
            const parentNode = this.findPrevious(item);
          
            if (parentNode) {
                const itemNode = parentNode.next;
                const childrenNode = itemNode.next; // null || childrenNode

                parentNode.next = childrenNode; 

                if (childrenNode) {
                    childrenNode.previous = parentNode;
                }

                return true;
            }
          
            return false;
        }
        /**
         * Used to perform tasks such as displaying a linked list in reverse order
         * 
         * @returns node <Node>
         */
        function findLast() {
            let currNode = this.head;

            while (currNode.next != null) {
                currNode = currNode.next;
            }

            return currNode;
        }
        /**
         * Function to display the elements of a doubly linked list in reverse order
         * 
         */
        function dispReverse() {
            let currNode = this.findLast();

            console.group('Displaying Doubled Linked list nodes elements in reverse order:');
                while (currNode.previous != null) {
                    console.log(currNode.element);
                    currNode = currNode.previous;
                }
            console.groupEnd();
        }

        // Test The LList class as a doubly linked list
        var cities = new LList();

        cities.insert("Conway", "head");
        cities.insert("Russellville", "Conway");
        cities.insert("Carlisle", "Russellville");
        cities.insert("Alma", "Carlisle");

        cities.display('Displaying Doubled Linked list nodes elements: Initial list, in normal order:');/*
        Displaying Doubled Linked list nodes elements: Initial list, in normal order:
            Conway
            Russellville
            Carlisle
            Alma
        */

        cities.insert("Raul");

        cities.display('Displaying Doubled Linked list nodes elements: Added "Raul" node element, list in normal order:');/*
        Displaying Doubled Linked list nodes elements: Added "Raul" node element, list in normal order:
            Conway
            Russellville
            Carlisle
            Alma
            Raul
        */

        cities.remove("Carlisle");

        cities.display('Displaying Doubled Linked list nodes elements: Added "Carlisle" node element, list in normal order:');/*
        Displaying Doubled Linked list nodes elements: Added "Carlisle" node element, list in normal order:
            Conway
            Russellville
            Alma
            Raul
        */

        cities.dispReverse();/*
        Displaying Doubled Linked list nodes elements in reverse order:
            Raul
            Alma
            Russellville
            Conway
        */
    /**
     * Circularly Linked Lists
     * 
     * A circularly linked list is similar to a singly linked list and has the same type of nodes.
        The only difference is that a circularly linked list, when created, has its head node’s next
        property point back to itself.

        Every new node has its next property pointing to the head of the list. In other words, the last 
        node of the list is always pointing back to the head of the list, creating a circular list.

        The reason : if you want the ability to go backward through a list but don’t want the extra overhead 
        of creating a doubly linked. You can move backward through a circularly linked list by moving forward 
        through the end of the list to the node you are trying to reach.
     */
        // circularly linked list
        function LList() {
            this.head = new Node("head");
            this.head.next = this.head; // is the only change we have to make in order to make in the LList's object
            this.find = find
            this.insert = insert;
            this.display = display;
            this.findPrevious = findPrevious;
            this.remove = remove;
        }
        // display() function is written for a circularly linked list:
        function display(label = 'Displaying Circular Linked list nodes elements:') {
            let currNode = this.head;

            console.group(label);
                while (currNode.next != null && currNode.next.element != "head") {
                    console.log(currNode.next.element);
                    currNode = currNode.next;
                }
            console.groupEnd();
        }
    /**
     * Other Linked List Functions
        There are several other functions you might include in order to have a well-functioning
        linked list. In the upcoming exercises, you will have the opportunity to develop some
        of these functions, including:
            advance(n)
                Advances n nodes in the linked list
            back(n)
                Moves n nodes backward in a doubly linked list
            show()
                Displays the current node only
     */