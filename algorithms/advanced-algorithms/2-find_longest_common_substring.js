/**
 * Another problem that lends itself to a dynamic programming solution is finding the
 * longest common substring in two strings. For example, in the words “raven” and “havoc,”
 * the longest common substring is “av.”
 */
    /*
        Brute force solution:
        Given two strings, A and B,
        we can find the longest common substring by starting at the first character of A and
        comparing each character to the corresponding character of B. When a nonmatch is
        found, move to the second character of A and start over with the first character of B,
        and so on.
    */
    /*
        Dynamic programming: 
        The algorithm uses a two-dimensional
        array to store the results of comparisons of the characters in the same
        position in the two strings. Initially, each element of the array is set to 0. Each time a
        match is found in the same position of the two arrays, the element at the corresponding
        row and column of the array is incremented by 1; otherwise the element stays set to 0.
        Along the way, a variable is keeping track of how many matches are found. This variable,
        along with an indexing variable, are used to retrieve the longest common substring once
        the algorithm is finished.
    */
    function lcs(word1, word2) {
      let max = 0,
        index = 0;
      const word1Length = word1.length,
        word2Length = word2.length,
        lcsarr = new Array(word1Length + 1); // lcsarr -> longest common substring(lcs)

      for (let i = 0; i <= word1Length + 1; ++i) {
        lcsarr[i] = new Array(word2Length + 1);
        for (let j = 0; j <= word2Length + 1; ++j) {
          lcsarr[i][j] = 0;
        }
      }

      for (let i = 0; i <= word1Length; ++i) {
        for (let j = 0; j <= word2Length; ++j) {
          if (i == 0 || j == 0) {
            lcsarr[i][j] = 0;
          } else {
            if (word1[i - 1] == word2[j - 1]) {
              lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1;
            } else {
              lcsarr[i][j] = 0;
            }
          }

          if (max < lcsarr[i][j]) {
            max = lcsarr[i][j];
            index = i;
          }
        }
      }

      let str = "";
      if (max == 0) {
        return "";
      } else {
        for (var i = index - max; i <= max; ++i) {
          str += word2[i];
        }
        return str;
      }
    }

    console.log(lcs("abbcc", "dbbcc"));