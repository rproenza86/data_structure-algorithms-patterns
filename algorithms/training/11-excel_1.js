/**
 * 
 * EXCEL1
    Given a column title as appears in an Excel sheet, return its corresponding column number.

    Example:

        A -> 1
        
        B -> 2
        
        C -> 3
        
        ...
        
        Z -> 26
        
        AA -> 27
        
        AB -> 28
 */

/*
    Access Hint
    Simple math.

    This is just like base 26 number conversion.

    number = 26^0 * (S[n - 1] - ‘A’ + 1) + 26^1 * (S[n - 2] - ‘A’ + 1) + ….

    We recommend you to check out the piece on base number conversion in articles again. Please also attempt the sample problem associated with it.
*/

function titleToNumber(A){
    function charToNumber (char, pos) {
         return parseInt(char.charAt(pos), 36) - 9;
     
    }

    var result = 0;
    for (var i = 0; i < A.length; i++) {
            result = result * 26 + charToNumber (A, i);
    }
    return result;
 }



titleToNumber('AA'); // 27

titleToNumber('AAA'); // 703

titleToNumber('AZA'); // 703