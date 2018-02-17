/**
 * Immutability
 * 
 * One of the cornerstones of functional programming is that the so-called variables can be assigned only once. 
 * This is known as immutability. Currently, there is no real support for immutability in JavaScript. 
 * However, ECMAScript 6 will support a new keyword: const. The const keyword can be used in the same way as 
 * var except that variables assigned with const will be immutable. 
 * 
 */
    // Variables 
        var numberOfQueens = 1;
        const numberOfKings = 1;

        numberOfQueens++;
        numberOfKings++;

        console.log(numberOfQueens);// 2
        console.log(numberOfKings);// 1

    // Object.freeze functionality
        var consts = Object.freeze({ pi : 3.141});
        consts.pi = 7;
        console.log(consts.pi);//outputs 3.141
        /*
            As you can see, the syntax here is not very user friendly. Also, an issue is that attempting to assign 
            to an already assigned const keyword simply fails silently instead of throwing an error. Failing silently 
            in this fashion is not at all a desirable behavior; a full exception should be thrown. If you enable the 
            strict mode, a more rigorous parsing mode added in ECMAScript 5, then an exception is actually thrown:
        */
       "use strict";
        var consts = Object.freeze({ pi : 3.141});
        consts.pi = 7; // TypeError: Cannot assign to read only property 'pi' of #<Object>

    // Alternative : Object.create syntax. When creating properties on the object, one can specify writable: false to make the property immutable:
        var t = Object.create( Object.prototype,
                                { 
                                    value: { 
                                        writable: false,
                                        value: 10
                                    }
                                }
                            );
        t.value = 7;
        console.log(t.value);//prints 10
        /*
            NOTE: However, even in strict mode, no exception is thrown when attempting to write to a nonwritable 
            property. Thus, I would claim that the const keyword is not perfect to implement immutable objects. 
            
            You're better off using freeze.
        */
    // Better alternative for Object.create syntax.
        var o = Object.create(Object.prototype, {
            // value is a regular 'value property'
            value: {
            writable: true,
            configurable: true,
            value: 'hello'
            },
            // betterValue is a getter-and-setter (accessor) property
            betterValue: {
            configurable: false,
            get: function() { return 10; },
            set: function(value) {
                throw new Error('The property "betterValue" is immutable.')
            }
            }
        });
        
        o.value = 7;
        console.log(o.value);//prints 10  
                
        o.betterValue = 7; // Uncaught Error: The property "betterValue" is immutable.
        console.log(o.betterValue);//prints 10
     