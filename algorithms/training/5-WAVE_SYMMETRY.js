/**
 * WAVE
    Given an array of integers, sort the array into a wave like array and return it, 
    In other words, arrange the elements into a sequence such that a1 >= a2 <= a3 >= a4 <= a5.....

    Example

    Given [1, 2, 3, 4]

    One possible answer : [2, 1, 4, 3]
    Another possible answer : [4, 1, 3, 2]
    NOTE : If there are multiple answers possible, return the one thats lexicographically smallest. 
    So, in example case, you will return [2, 1, 4, 3]
 */

// not optimums
module.exports = { 
	//param A : array of integers
	//return a array of integers
	wave : function(A){
        var temp, inner;
        
        // sorting list
        for (var outer = 1; outer < A.length; outer++) {
            temp = A[outer];
            inner = outer;
            
            while (inner > 0 && (A[inner-1] >= temp)) {
                A[inner] = A[inner-1];
                --inner;
            }
            
            A[inner] = temp;
        }
        
        //preparing array
        for(var i = 0; i < A.length; i+=4) {
            if(i+1 ===  A.length) break; //edge case just one elm left
            
            var tmp1 = A[i+1];
            
            if(i+2 ===  A.length){  //edge case just two elms left
                A[i+1] = A[i];
                A[i] = tmp1;
                break;
            }
            
            var tmp2 = A[i+3];
            
            if(!tmp2) { //edge case just three elms left
                 A[i+1] = A[i];
                 A[i] = tmp1;
                break;
            }
            
            A[i+1] = A[i];
            A[i] = tmp1;
             
            A[i+3] = A[i+2];
            A[i+2] = tmp2;
        }
        
        return A;
	}
};

// not yet, the Array.sort() i not optimus 
module.exports = { 
	//param A : array of integers
	//return a array of integers
	wave : function(A){
        A.sort();

        var hold = 0;
        for (i = 0; i < A.length-1; i=i+2){
            hold = A[i]; 
            A[i] = A[i+1]; 
            A[i+1] = hold; 
        }
        return A;
	}
};


// best solution:
module.exports = { 
	//param A : array of integers
	//return a array of integers
	wave : function(A){
        var n =  A.length;
        
        function quickSort(list) {
            if (list.length == 0) {
                return [];
            }
    
            var lesser  = [],
                  greater = [],
                  pivot   = list[0],
                  lLength = list.length;
                  
            for (var i = 1; i < lLength; i++) {
                    if (list[i] < pivot) {
                    lesser.push(list[i]);
                } else {
                    greater.push(list[i]);
                }
            }
    
            return quickSort(lesser).concat(pivot, quickSort(greater));
        }
        
        A = quickSort(A);
        
        var hold = 0;
        for (i = 0; i < n-1; i=i+2){
            hold = A[i]; 
            A[i] = A[i+1]; 
            A[i+1] = hold; 
        }
        return A;
	}
};







/**
 * SYMMETRY
 * Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

    Example :

        1
    / \
    2   2
    / \ / \
    3  4 4  3
    The above binary tree is symmetric. 
    But the following is not:

        1
    / \
    2   2
    \   \
    3    3
    Return 0 / 1 ( 0 for false, 1 for true ) for this problem
 */
// Definition for a  binary tree node
//			function TreeNode(data){
//				this.data = data
//				this.left = null
//				this.right = null
//			}

// not optimums 
module.exports = { 
	//param A : root node of tree
	//return an integer
	isSymmetric : function(A){
	    var simetry = 0;
	    
	    if(A == null) return simetry;
	    
	    var leftSubtree = [];
	    var rightSubtree = [];
	    
        function isSym(node1, node2) {
            if(node1 == null && node2 == null) return true;
            
            if(node1 && 
               node2 && 
               isSym(node1.left, node2.right) && 
               isSym(node1.right, node2.left)) {
                return true;    
            }
            
            return false;
        }
        
        simetry = isSym(A.left, A.right) ? 1 : 0;
        
        return simetry;
	}
};

// not optimums 
module.exports = { 
	//param A : root node of tree
	//return an integer
	isSymmetric : function(A){
	    var simetry = 0;
	    
	    if(A == null) return simetry;
	    
        function isSym(node1, node2) {
            
    	    if (node1 == null && node2 == null)
    	        return true;
    	        
    	    if (node1 == null || node2 == null)
    	        return false;
    	    
    	    if (node1.val != node2.val)
    	        return false;
    	    
    	    return isSym(node1.left, node2.right) && isSym(node1.right, node2.left);
        }
        
        simetry = isSym(A.left, A.right) ? 1 : 0;
        
        return simetry;
	}
};