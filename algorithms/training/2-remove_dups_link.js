/**
 * Given a sorted linked list, delete all duplicates such that each element appear only once.

    For example,
    Given 1->1->2, return 1->2.
    Given 1->1->2->3->3, return 1->2->3.
 */

// Definition for singly-linked list.
//			function Node(data){
//				this.data = data
//				this.next = null
//			}

//param A : head node of linked list
//return the head node in the linked list

// Solution 1. 
function deleteDuplicates(A) {
    if(A.next == null || !A) return A;
    
    var nextNode = A.next;
    var prevNode = A;
    var preVal = A.data;
    
    while(nextNode != null){
        if (nextNode.data == preVal ){
            prevNode.next = nextNode.next;
        } else {
            prevNode = nextNode;
            preVal = nextNode.data;
        }
        nextNode = nextNode.next;
    }
    
    return A;
}


// Solution 2. Assumption: A.data === 'head'
function deleteDuplicates(A) {
    if (A.next === null) return A;

    var currentNode = A.next,
        nextNode = currentNode.next;

    while (nextNode) {
        if(currentNode.data === nextNode.data) {
            currentNode.next = nextNode.next;
            nextNode = currentNode.next;
        } else {
            currentNode = nextNode;
            nextNode = currentNode.next;
        }
    }

    return A;
}