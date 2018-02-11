
/**
 * Binary Trees and Binary Search Trees
 * 
 * A tree is a nonlinear data structure that is used to store data in a hierarchical manner. 
 * 
 * Tree data structures are used to store hierarchical data, such as the files in a file system, and for storing sorted
    lists of data. 
    
    We examine one particular tree structure in this chapter: the binary tree.

    A tree is made up of a set of nodes connected by edges.An example of a tree is a company’s
    organizational char.

    Binary trees are chosen over other more primary data structures because you can search
    a binary tree very quickly (as opposed to a linked list, for example) and you can quickly
    insert and delete data from a binary tree (as opposed to an array).

    Definitions:
        The top node of a tree is called the root node. If a node is connected to other nodes
        below it, the preceding node is called the parent node, and the nodes following it are
        called child nodes. A node can have zero, one, or more child nodes connected to it. A
        node without any child nodes is called a leaf node.

        The series of edges you follow to get from one node to another node is called a path.
        Visiting all the nodes in a tree in some particular order is known as a tree traversal.

        A tree can be broken down into levels. We can define the depth of a tree as the number of layers in the tree.

        The binary tree in JavaScript adds two terms: The child nodes of a parent node are referred to as the left node and the
        right node.

    Special types of trees, called binary trees, restrict the number of child nodes to no more
    than two. Binary trees have certain computational properties that make them very efficient
    for many operations.

    By limiting the number of children to two, we can write efficient programs for
    inserting data, searching for data, and deleting data in a tree.

    A binary search tree is a binary tree in which data with lesser
    values are stored in left nodes and data with greater values are stored in right nodes.
    This property provides for very efficient searches and holds for both numeric data and
    non-numeric data, such as words and strings.
 * 
 */
    /**
     * Building a Binary Search Tree(BST) Implementation
     */

    /**
     * 
     * 
     * @class Node
     * 
     * @property {string || number} data    basic object property
     * @property {@class Node} left         basic object property
     * @property {@class Node} right        basic object property
     * @property {integer} count            added object property for Example of "Counting Occurrences"
     */
    class Node {
        constructor(data, left, right) {
            this.data = data;
            this.left = left;
            this.right = right;
            this.count = 1;
        }

        show() {
            return this.data;
        }
    }
    /**
     * Binary Search Tree
     * 
     * @class BST
     */
    class BST {
        /**
         * Creates an instance of BST.
         * 
         * @memberof BST
         */
        constructor() {
            this.root = null;
        }
        /**
         * insert(data)
         * 
         * Algorithm for determining the correct insertion point for a node:
         *      1. Set the root node to be the current node.
         * 
         *      2. If the data value in the inserted node is less than the data value in the current node,
         *      set the new current node to be the left child of the current node. If the data value
         *      in the inserted node is greater than the data value in the current node, skip to step
         *      4.
         * 
         *      3. If the value of the left child of the current node is null, insert the new node here
         *      and exit the loop. Otherwise, skip to the next iteration of the loop.
         * 
         *      4. Set the current node to be the right child of the current node.
         * 
         *      5. If the value of the right child of the current node is null, insert the new node here
         *      and exit the loop. Otherwise, skip to the next iteration of the loop.
         * 
         * @param {string || number} [data=''] data to create a tree's new node 
         * @memberof BST
         */
        insert(data = '') {
            const newNode = new Node(data, null, null);

            if (this.root == null) {
                this.root = newNode;
            } else {
                let current = this.root,
                    parent;

                while (true) {
                    parent = current;

                    if (data < current.data) { // move to the left
                        current = current.left;

                        if (current == null) {
                            parent.left = newNode;
                            break;
                        }
                    } else { // move to the right
                        current = current.right;

                        if (current == null) {
                            parent.right = newNode;
                            break;
                        }
                    }
                }
            }
        }
        /**
         * The inorder traversal method visits each node in ascending order, the function must visit 
         * both the left node and the right node of each subtree, following the subtrees under the 
         * left child of the root node before following the subtrees under the right child of the root.
         * 
         * @param {any} [node=null] 
         * @memberof BST
         */
        inOrder(node = null) {
            if (node) {
                this.inOrder(node.left);
                console.log(`${node.show()}  `);
                this.inOrder(node.right);
            }
        }
        /**
         * A preorder traversal visits the root node first, followed by the nodes in the subtrees
         * under the left child of the root node, followed by the nodes in the subtrees under
         * the right child of the root node.
         * 
         * @param {any} [node=null] 
         * @memberof BST
         */
        preOrder(node = null) {
            if (node) {
                console.log(`${node.show()}  `);
                this.preOrder(node.left);
                this.preOrder(node.right);
            }
        }
        /**
         * A postorder traversal visits all of the child nodes of the
         * left subtree up to the root node, and then visits all of the child nodes of the right subtree
         * up to the root node.
         * 
         * @param {any} [node=null] 
         * @memberof BST
         */
        postOrder(node = null) {
            if (node) {
                this.postOrder(node.left);
                this.postOrder(node.right);
                console.log(`${node.show()}  `);
            }
        }
        /**
         * Given the BST algorithm the lower node will be on the extreme left side 
         * 
         * @returns 
         * @memberof BST
         */
        getMin(subtreeRoot = this.root) {
            let current = subtreeRoot;

            while (current.left) {
                current = current.left;
            }

            return current.data;
        }
        /**
         * Given the BST algorithm the bigger node will be on the extreme right side 
         * 
         * @returns 
         * @memberof BST
         */
        getMax(subtreeRoot = this.root) {
            let current = subtreeRoot;

            while (current.right) {
                current = current.right;
            }
            
            return current.data;
        }
        /**
         * Searching for a specific value in a BST requires that a comparison be made between the
         * data stored in the current node and the value being searched for. 
         * 
         * The comparison will determine if the search travels to the left child node, or to the right child node if the
         * current node doesn’t store the searched-for value.
         * 
         * @param {any} [data=null] 
         * @returns 
         * @memberof BST
         */
        find(data = null) {
            let current = this.root;

            while (current.data != data) {
                if (data < current.data) {
                    current = current.left;
                }
                else {
                    current = current.right;
                }

                if (current == null) {
                    return null;
                }
            }

            return current;
        }
        /**
         * 
         * 
         * @param {string} [data='']
         * @memberof BST
         */
        remove(data = '') {
            this.root = this.removeNode(this.root, data);
        }
        /**
         * 
         * 
         * @param {any} [node=null] 
         * @param {string} [data=''] 
         * @returns 
         * @memberof BST
         */
        removeNode(node = null, data = '') {
            if (!node) {
                return null;
            }

            if (data == node.data) {
                // node has no children
                if (node.left == null && node.right == null) {
                    return null;
                }

                // node has no left child
                if (node.left == null) {
                    return node.right;
                }

                // node has no right child
                if (node.right == null) {
                    return node.left;
                }

                // node has two children
                const tempNode = getMin(node.right);

                node.data = tempNode.data;
                node.right = this.removeNode(node.right, tempNode.data);

                return node;
            } else if (data < node.data) {
                node.left = this.removeNode(node.left, data);
                return node;
            } else {
                node.right = this.removeNode(node.right, data);
                return node;
            }
        }
        /**
         * Method to update node data occurrences. 
         * Example of "Counting Occurrences"
         * 
         * @param {string} [data=''] 
         * @returns 
         * @memberof BST
         */
        update(data = '') {
            const grade = this.find(data);

            if (grade) {
                grade.count++;
                return grade;
            }

            return null;
        }
    }

    // Test Inorder traversal of a BST
    const nums = new BST();

    nums.insert(23);
    nums.insert(45);
    nums.insert(16);
    nums.insert(37);
    nums.insert(3);
    nums.insert(99);
    nums.insert(22);

    console.group("Inorder traversal: ");
        nums.inOrder(nums.root);
    console.groupEnd();/*
        Inorder traversal:
            3 16 22 23 37 45 99 
    */

    console.group("PreOrder traversal: ");
    nums.preOrder(nums.root);
    console.groupEnd();/*
        PreOrder traversal:
            23 16 3 22 45 37 99
    */

    console.group("PostOrder traversal: ");
        nums.postOrder(nums.root);
    console.groupEnd();/*
        PostOrder traversal:
            3 22 16 37 99 45 23
    */
        /**
         * BST Searches - Practical examples.
         *  1. Searching for a specific value
         *  2. Searching for the minimum value
         *  3. Searching for the maximum value
         */
            /**
             * 2,3. Searching for the minimum/maximum value
             */
                const min = nums.getMin();
                console.log("The minimum value of the BST is: " + min);
                // The minimum value of the BST is: 3

                console.log("\n");

                const max = nums.getMax();
                console.log("The maximum value of the BST is: " + max);
                // The maximum value of the BST is: 99
            /**
             * 1. Searching for a Specific Value
             */
                // Using find() to search for a value
                function showSearchResult(value = -1, result = null) {
                    if (result) {
                        console.log("Found " + value + " in the BST.");
                    }
                    else {
                        console.log(value + " was not found in the BST.");
                    }
                }

                showSearchResult(99 ,nums.find(99) );// Found 99 in the BST.

                showSearchResult(88, nums.find(88) );// 88 was not found in the BST.
        /**
         * Removing Nodes from a BST
         * 
         * The two functions we will define are remove() and removeNode()
         */
            console.log("\n");

            console.log('Removing # 99')    
            nums.remove(99); 

            console.log("\n");

            console.group("Inorder traversal: ");
                nums.inOrder(nums.root);
            console.groupEnd();/*
                Inorder traversal:
                    3 16 22 23 37 45 
            */

            console.log("\n");

            showSearchResult(99 ,nums.find(99) );// 99 was not found in the BST.

            console.log("\n");
        /**
         * Counting Occurrences
         * 
         * One use of a BST is to keep track of the occurrences of data in a data set. For example,
            we can use a BST to record the distribution of grades on an exam. Given a set of exam
            grades, we can write a program that checks to see if the grade is in the BST, adding the
            grade to the BST if it is not found, and incrementing the number of occurrrences of it
            if the grade is found in the BST.

            To solve this problem, we need to modify the Node object to include a field for keeping
            track of the number of occurrences of a grade in the BST, and we need a function for
            updating a node so that if we find a grade in the BST, we can increment the occurrences
            field.
         */
                // Functions to generate a set of grades and to display the grades:
                function prArray(arr) {
                    console.log(arr[0].toString() + ' ');
                    for (var i = 1; i < arr.length; ++i) {
                        console.log(arr[i].toString() + ' ');
                        if (i % 10 == 0) {
                            console.log("\n");
                        }
                    }
                }

                function genArray(length) {
                    var arr = [];
                    for (var i = 0; i < length; ++i) {
                        arr[i] = Math.floor(Math.random() * 101);
                    }
                    return arr;
                }

                // Test Counting occurrences of grades in a data set:
                const grades = genArray(100);

                prArray(grades);
                
                const  gradedistro = new BST();

                for (var i = 0; i < grades.length; ++i) {
                    const g = grades[i];
                    const grade = gradedistro.find(g);

                    if (grade == null) {
                        gradedistro.insert(g);
                    } else {
                        gradedistro.update(g);
                    }
                }

                let cont = "y";

                while (cont == "y") {
                    const g = window.prompt('Enter a grade please :');
                    const aGrade = gradedistro.find(parseInt(g));

                    console.log(`\n\nEntered grade: ${g}`);

                    if (!aGrade) {
                        console.log("No occurrences of " + g);
                    } else {
                        console.log("Occurrences of " + g + ": " + aGrade.count);
                    }

                    cont = window.prompt("Look at another grade (y/n)? ");
                }