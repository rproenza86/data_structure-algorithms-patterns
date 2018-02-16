/**
 * Facade: provides a simplified interface to a large body of code.
 * 
 * The façade pattern is a special case of the adapter pattern that provides a simplified interface over a collection of classes.
 * 
 * I mentioned such a scenario in the Adapter section but only within the context of a single class, SimpleShip. 
 * This same idea can be expanded to provide an abstraction around a group of classes or an entire subsystem.
 * 
 * This pattern provides a convenient higher-level interface to a larger body of code, hiding its true underlying complexity. 
 * 
 * Think of it as simplifying the API being presented to other developers, something which almost always improves usability.
 * 
 */
    // Ex. 1
        // A Facade is then used to supply a much simpler API to accessing these methods of a Module
        var module = (function() {
        
            var _private = {
                i: 5,
                get: function() {
                    console.log( "current value:" + this.i);
                },
                set: function( val ) {
                    this.i = val;
                },
                run: function() {
                    console.log( "running" );
                },
                jump: function(){
                    console.log( "jumping" );
                }
            };
        
            return {
        
                facade: function( args ) {
                    _private.set(args.val);
                    _private.get();
                    if ( args.run ) {
                        _private.run();
                    }
                }
            };
        }());
        
        
        // Outputs: "current value: 10" and "running"
        module.facade( {run: true, val: 10} );
    
    // Ex. 2 
        // Utilizing a Facade to simplify an interface for listening to events cross-browser.
        var addMyEvent = function( el,ev,fn ){
        
            if( el.addEventListener ){
                    el.addEventListener( ev,fn, false );
            }else if(el.attachEvent){
                    el.attachEvent( "on" + ev, fn );
            } else{
                    el["on" + ev] = fn;
            }

        };

    // Ex. 3
        class ShopFacade {
            constructor() {
                this.discount = new Discount();
                this.shipping = new Shipping();
                this.fees = new Fees();
            }
        
            calc(price) {
                price = this.discount.calc(price);
                price = this.fees.calc(price);
                price += this.shipping.calc();
                return price;
            }
        }
        
        class Discount {
        
            calc(value) {
                return value * 0.9;
            }
        }
        
        class Shipping {

            calc() {
                return 5;
            }
        }
        
        class Fees {
        
            calc(value) {
                return value * 1.05;
            }
        }
        
        export default ShopFacade;