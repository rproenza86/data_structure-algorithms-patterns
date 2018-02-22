/**
 * MATH_BUG01
    Following code tries to figure out if a number is prime ( Wiki )
    However, it has a bug in it.
    Please correct the bug and then submit the code.


    A prime number (or a prime) is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers. A natural number greater 
    than 1 that is not prime is called a composite number. For example, 5 is prime because the only ways of writing it as a product, 1 × 5 or 5 × 1, involve 5 
    itself. However, 6 is composite because it is the product of two numbers (2 × 3) that are both smaller than 6. Primes are central in number theory because 
    of the fundamental theorem of arithmetic: every natural number greater than 1 is either a prime itself or can be factorized as a product of primes that is 
    unique up to their order.
 */
 // Return 1 if A is prime, else 0. C++ code:

 // Wrong solution
 int Solution::isPrime(int A) {
	int upperLimit = (int)(sqrt(A));
	for (int i = 2; i <= upperLimit; i++) {
		if (i > A && A % i == 0) return 0;
	}
	return 1;
}
 // Correct solution:
int Solution::isPrime(int A) {
    if(A < 2) return 0;
	int upperLimit = (int)(sqrt(A));
	for (int i = 2; i <= upperLimit; i++) {
		if ( A % i == 0) return 0;
	}
	return 1;
}


module.exports = { 
	//param A : array of integers
	//return an integer
	bulbs : function(A){
        var counter = 0;
        
        if(A.length === 0) return counter;
        
        var n = 0;
        
        while(n < A.length){
            if(A[n] === 0) {
                A[n] = 1;
                counter++;
            }
        }
        
        return counter;
	}
};





/**
 * REACH - Min Steps in Infinite Grid
	You are in an infinite 2D grid where you can move in any of the 8 directions :

	(x,y) to 
		(x+1, y), 
		(x - 1, y), 
		(x, y+1), 
		(x, y-1), 
		(x-1, y-1), 
		(x+1,y+1), 
		(x-1,y+1), 
		(x+1,y-1) 
	You are given a sequence of points and the order in which you need to cover the points. Give the minimum number of steps in which you can achieve it. You start from the first point.

	Example :

	Input : [(0, 0), (1, 1), (1, 2)]
	Output : 2
	It takes 1 step to move from (0, 0) to (1, 1). It takes one more step to move from (1, 1) to (1, 2).

	This question is intentionally left slightly vague. Clarify the question by trying out a few cases in the “See Expected Output” section.
	*/

module.exports = { 
	//param A : array of integers
	//param B : array of integers
	//return an integer
	coverPoints : function(A, B){
        var numSteps = 0;
        for(var i = 1; i < A.length; i++){
            numSteps += Math.max( Math.abs(A[i] - A[i-1]), Math.abs(B[i] - B[i-1]) ); 
        }
        return numSteps;
	}
};
/*
Solution:

As we have to cover all the given points in the specified order, if we can find the minimum number of steps required to reach from a starting point to next point, the sum of all such minimum 
steps for covering all the points would be our answer.

One way to reach form a point (x1,y1) to (x2, y2) is to move abs(x2-x1) steps in horizontal direction and abs(y2-y1) steps in vertical direction, but this is not the shortest path to reach (x2,y2). 
The best way would be to cover the maximum possible distance in diagonal direction and remaining in horizontal or vertical direction. If we look closely this just reduces to maximum of abs(x2-x1) 
and abs(y2-y1).

Example
x1 = 5, y1= 20
x2 = 15, y2 = 15

we first move diagonally to reach (10,15) this takes 5 steps and then we move 5 units in x direction, which again takes 5 steps. In total this is 10 steps which is equal to 
MAX(abs(15-5), abs(15-20))

*/