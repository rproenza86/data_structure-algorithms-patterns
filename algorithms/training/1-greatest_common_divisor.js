/**
 * Greatest common divisor of two integers m and n

    Given 2 non negative integers m and n, find gcd(m, n)

    GCD of 2 integers m and n is defined as the greatest integer g such that g is a divisor of both m and n.
    Both m and n fit in a 32 bit signed integer.
 */

// Solutions 1. Theory: The lower number is equal or less than the gcd when both numbers modules result of division by gcd equal 0
/**
 * Greatest common divisor of two integers m and n

    Given 2 non negative integers m and n, find gcd(m, n)

    GCD of 2 integers m and n is defined as the greatest integer g such that g is a divisor of both m and n.
    Both m and n fit in a 32 bit signed integer.
 */

    // Solutions 1. Theory: The lower number is equal or less than the gcd when both numbers modules result of division by gcd equal 0
        function gcd(A, B){
            let counter = A <= B ? A : B;
            let gcdResult = 1;
            
            if(counter === gcdResult) return gcdResult;
            if(A === 0) return B;
            if(B === 0) return A;
            
            while (counter > 1){
                if(A%counter === 0 && B%counter === 0){
                    if(gcdResult < counter) {
                        gcdResult = counter;
                        
                    } else break;
                }
                counter--;
            }
            console.log(gcdResult);
            return gcdResult;
        }


gcd(4, 6)// 2

gcd(9, 6)// 3

gcd(216,126)// 18

gcd(350, 136)// 2

gcd(382, 941)// 1

gcd(2, 0)// 2

gcd(1, 0)// 1

gcd(2, 2)// 2

// Solutions 2. 
    /*
        Theory:
        Greatest common divisor of two integers m and n is the largest integer d such that m = dq1 and n = dq2.

        One way of finding the greatest common divisor uses the prime factorizations: 
            Example: 84 = 22A3A7 and 60 = 22A3A5. Clearly the gcd(84, 60) = 22A3 = 12
        For large numbers this approach may be difficult.

        The Euclidean Algorithm uses the fact that the greatest common divisor of two integers must be a factor of the difference of the integers. If m = nq + r, then the gcd must also divide the remainder r.
            Example We will see by the Euclidean Algorithm that gcd(84, 60) = 12:
            84 – 60×(1) = 24
            60 – 24×(2) = 12
            24 – 12×(2) = 0, so gcd(84, 60) = gcd(60, 24) = gcd(24, 12) = gcd(12, 0) = 12
    */
    function gcd2(A, B){
        if(A === 0 || A === B) return B;
        if(B === 0) return A;

        let mayor;
        let minor;
        let floatingVar;
        let gcdResult = 1;

        if(A <= B){
            mayor = B;
            minor = A;
        } else {
            mayor = A;
            minor = B;
        }
        
        while (true){
            if(mayor - minor <= 0) break;

            if(mayor > minor*2){
                floatingVar = minor;
                minor = mayor - minor*2;
                mayor = floatingVar;
            }
            else {
                floatingVar = minor;
                minor = mayor - minor;
                mayor = floatingVar;
            }

            if(minor > mayor) {
                floatingVar = mayor;
                mayor = minor;
                minor = floatingVar;
            }
            
            if(minor >= 1){
                gcdResult = minor;
            } else break;
                
        }
        console.log(gcdResult);
        return gcdResult;
    }

// Test : 

gcd2(4, 6)// 2

gcd2(9, 6)// 3

gcd2(216,126)// 18

gcd2(350, 136)// 2

gcd2(382, 941)// 1

gcd2(2, 0)// 2

gcd2(1, 0)// 1

gcd2(2, 2)// 2

