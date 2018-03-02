/**
 * 
 * Given an array A of integers and another non negative integer k, find if there exists 2 indices i and j such that A[i] - A[j] = k, i != j.

    Example :

    Input :

    A : [1 5 3]
    k : 2
    Output :

    1
    as 3 - 1 = 2

    Return 0 / 1 for this problem.
 */
    
    //param A : array of integers
	//param B : integer
	//return an integer
    function diffPossible (A, B){
        if(A.length <= 1) return 0;
        
        var aElm = A.shift();
            
        while(aElm){
            for(nextElm of A){
                if(aElm - nextElm == B || nextElm - aElm == B){
                    return 1;
                }
            }
            aElm = A.shift();
        }
        
        return 0;
  }
  
  var A = '97 66 37 46 56 49 65 62 21 7 70 13 71 93 26 18 84 96 65 92 69 97 47 6 18 17 47 28 71 70 24 46 58 71 21 30 44 78 31 45 65 16 3 22 54 51 68 19 86 44 99 53 24 40 92 38 81 4 96 1 13 45 76 77 8 88 50 89 38 60 61 49 25 10 80 49 63 95 74 29 27 52 27 40 66 38 22 85 22 91 98 19 20 78 77 48 63 27 31'.split(' ');
  
  var B = 31;
  
  diffPossible (A, B);
  
  
  A = '35 91 68 0 47 80 1 27 41 55 33 2 57 79 99 74 35 56 59 45 19 96 46 83 67 28 13 67 8 55 66 67 48 53 92 86'.split(' ');
  B = 73;
  diffPossible (A, B);
  
  
function diffPossibleBetter (A, B){
    if(A.length <= 1 || B < 1) return 0;
    
    const aSet = new Set(A);

    const iterator = aSet.values();

    let aValue = iterator.next();

    while(!aValue.done){
        const normalizedVal = (aValue.value * 1);
        const i = B + normalizedVal;
        const j = normalizedVal - B;

        if(aSet.has(i+ '') || aSet.has(j+ '')) {
            return 1;
        } else {
            aValue = iterator.next();
        }

    }
    
    return 0;

}
  
A = '19 11 85 100 44 3 32 96 72 93 76 67 93 63 5 10 45 99 35 13'.split(' ');
B = 74;

diffPossibleBetter (A, B);