/**
 * Your previous Plain Text content is preserved below:

-  Find a sub sequence of a list of positive integers that add up to a target number: 

o  [2,5,3,123], 8 => True
o  [2,2,1,2,3,123], 8 => True
o  [2,5,3,123], 7=> True
o  [2,5,3,123], 125 => False
 */

// O(N^2)
function checkSumOccurrence1(number, array) {
    var total = 0;
    
    for(var i = 0 , n= array.length; i < n; i++){
      total = array[i];
      
      if(total === number){
        return true;
      }
      
      for(var j = i+1; j < n; j++){
        
        if(total += array[j] === number){
          return true;
        }
        
        if(total > number){
          break;
        }
      }
      
    }
    
    return false;
  }
  
var test1 = [
        [2,5,3,123],
        [9,2,5,3,123],
        [8, 5],
        [2,2,1,8,1,3,123]
    ].map(array => checkSumOccurrence1(8, array));



// O(N)
function checkSumOccurrence2(number, array) {
    var total = array[0],
        start = 0;
    
    for(var i = 1 , n= array.length; i < n; i++){

        while(total > number && start < (i-1)){
            total -= array[start];
            start++;
        }

        if(total == number){
            return true;
        }

        if(i < n){
            total += array[i];
        }
    }

    return false;
  }
  
var test1 = [
        [2,5,3,123],
        [9,2,5,3,123],
        [8, 5],
        [2,2,1,2,3,123]
    ].map(array => checkSumOccurrence2(8, array)); // [false, false, true, true]

console.log(test1);

checkSumOccurrence2(200, [2,2,1,2,3,123])// false