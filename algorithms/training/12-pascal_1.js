
/**
 * PASCAL1
    Given numRows, generate the first numRows of Pascal’s triangle.

    Pascal’s triangle : To generate A[C] in row R, sum up A’[C] and A’[C-1] from previous row R - 1.

    Example:

    Given numRows = 5,

    Return

    [
        [1],
        [1,1],
        [1,2,1],
        [1,3,3,1],
        [1,4,6,4,1]
    ]
 */

//param A : integer
//return a array of array of integers
function generatePascalTriangle(A){
    if(A == 0){
        return [];
    }
    
    var pascalTriangle = [ [1] ];
    
    if(A == 1){
        return pascalTriangle;
    }
    
    function getNextPascalTriangleRow(prevRow) {
        var nextPascalTriangleElm = [ prevRow[0] ];
        
        if(prevRow.length == 1) {
            nextPascalTriangleElm.push(prevRow[0]);
            return nextPascalTriangleElm;
        }
        
        for(var i = 1, n = prevRow.length; i <= n; i++) {
            if(i == n){
                nextPascalTriangleElm.push(1);
            } else {
                nextPascalTriangleElm.push(prevRow[i] + prevRow[i-1]);
            }
        }
        
        return nextPascalTriangleElm;
    }
    
    var counter = 0;
    A--;
    
    while(counter < A) {
        var nextRow = getNextPascalTriangleRow( pascalTriangle[counter] );
        pascalTriangle.push(nextRow);
        counter++;
    }
    
    return pascalTriangle;
};

generatePascalTriangle(5); // [1 ] [1 1 ] [1 2 1 ] [1 3 3 1 ] [1 4 6 4 1 ] 

