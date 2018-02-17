/**
 * Template: method defines the skeleton of an algorithm as an abstract class, allowing its subclasses 
 *           to provide concrete behavior.
 * 
 * The strategy pattern allows replacing an entire algorithm with a complimentary one. Frequently replacing 
 * the entire algorithm is overkill: the vast majority of the algorithm remains the same in every strategy 
 * with only minor variations in specific sections.
 * 
 * The template method pattern is an approach that allows for some sections of an algorithm to be shared and 
 * other sections be implemented using different approaches. These farmed out sections can be implemented by 
 * any one of a family of methods.
 * 
 * The template class implements parts of the algorithm and leaves other parts as abstract to be overridden later 
 * by classes that extend it. The inheritance hierarchy can be several layers deep, with each level implementing 
 * more and more of the template class.
 *
 */
    // Ex. 1
        class TaxTemplate {
            calc(value) {
                if (value >= 1000)
                    value = this.overThousand(value);
        
                return this.complementaryFee(value);
            }
        
            complementaryFee(value) {
                return value + 10;
            }

            overThousand(value) {}
        
        }
        
        class Tax1 extends TaxTemplate {
            constructor() {
                super();
            }
            overThousand(value) {
                return value * 1.1;
            }
        }
        
        class Tax2 extends TaxTemplate {
            constructor() {
                super();
            }
            overThousand(value) {
                return value * 1.2;
            }
        }
        
        export { Tax1, Tax2 };

    // Ex. 2
        var BasicBeer = (function () {
            function BasicBeer() {}

            BasicBeer.prototype.Create = function () {
                this.AddIngredients();
                this.Stir();
                this.Ferment();
                this.Test();

                if (this.TestingPassed()) {
                    this.Distribute();
                }
            };

            BasicBeer.prototype.AddIngredients = function () {
                throw "Add ingredients needs to be implemented";
            };

            BasicBeer.prototype.Stir = function () {
                //stir 15 times with a wooden spoon
            };

            BasicBeer.prototype.Ferment = function () {
                //let stand for 30 days
            };

            BasicBeer.prototype.Test = function () {
                //draw off a cup of beer and taste it
            };

            BasicBeer.prototype.TestingPassed = function () {
                throw "Conditions to pass a test must be implemented";
            };

            BasicBeer.prototype.Distribute = function () {
                //place beer in 50L casks
            };

            return BasicBeer;
        })();

        var RaspberryBeer = (function (_super = new Object({})) {
            class RaspberryBeer extends _super {
                constructor() {
                    super(arguments);
                }

                AddIngredients() {
                    //add ingredients, probably including raspberries
                }

                TestingPassed() {
                    //beer must be reddish and taste of raspberries
                }
            };

            return new RaspberryBeer();
        })(BasicBeer);