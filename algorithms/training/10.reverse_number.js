/**
 * REVINT
    Reverse digits of an integer.

    Example1:

    x = 123,

    return 321
    Example2:

    x = -123,

    return -321

    Return 0 if the result overflows and does not fit in a 32 bit signed integer
 */


/*
    HINT: Here are some good questions to ask before coding.

    If the integer’s last digit is 0, what should the output be? ie, cases such as 10, 100.

    Did you notice that the reversed integer might overflow? Assume the input is a 32-bit integer, then the reverse of 1000000003 overflows. How should you handle such cases?

    Tips:

    1) num % 10 gives you the last digit of a number.

    2) num / 10 gives you the number after removing the last digit.

    3) num * 10 + digit appends the digit at the end of the number.
*/

function reverseNumber(A){
    var isPossitive = (A > 0) ? true : false;
    
    if(!isPossitive){
       A *= -1;
    }

    var reverseNumber = A%10;
    
    A = Math.floor(A/10);
    
    while(A){
        var nextNumber = A%10;
        reverseNumber = (reverseNumber * 10) + nextNumber;
        A = Math.floor(A/10);
    }
    
    if(reverseNumber > Number.MAX_VALUE || reverseNumber < Number.MIN_VALUE){
        return 0;
    } else {
        return isPossitive ? reverseNumber : reverseNumber * -1;
    }
}

reverseNumber(-123); // -321
reverseNumber(-1234567891);// -1987654321