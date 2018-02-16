/**
 * Decorator: dynamically adds/overrides behavior in an existing method of an object.
 * 
 * The decorator pattern is used to wrap and augment an existing class. Using a decorator pattern is an alternative to subclassing an existing component. 
 * 
 * Subclassing is typically a compile-time operation and is a tight coupling. This means that once a subclassing is performed, 
 * there is no way to alter it at runtime. In cases where there are many possible subclassings that can act in combination, 
 * the number of combinations of subclassings explodes.
 * 
 * Ex. : The armor worn by knights in Westeros can be quite con gurable. Armor can be fabricated in a number of different 
 * styles: scale, lamellar, chain mail, and so on. In addition to the style of armor, there is also a variety of different 
 * face guards, knee and elbow joints and, of course, colors. The behavior of armor made from lamellar and a grill is different 
 * from chain mail with a face visor. You can see, however, that there are a large number of possible combinations; far too 
 * many combinations to explicitly code.
 * 
 * What we do instead is implement the different styles of armor using the decorator pattern.
 * 
 * Decorator works using a similar theory to the adapter and bridge patterns, in that it wraps another instance and proxies calls through. 
 * 
 * The decorator pattern, however, performs the redirections at runtime by having the instance to wrap passed into it. 
 * Typically, a decorator will act as a simple pass through for some methods, and for others, it will make some modifications. 
 * These modifications could be limited to performing an additional action before passing the call off to the wrapped instance, 
 * or could go so far as to change the parameters passed in.
 * 
    The Decorator pattern isn't heavily tied to how objects are created but instead focuses on the problem of extending their 
    functionality. Rather than just relying on prototypal inheritance, we work with a single base object and progressively add 
    decorator objects which provide the additional capabilities. The idea is that rather than sub-classing, we add (decorate) 
    properties or methods to a base object so it's a little more streamlined.
 */

    // Ex. 1
        class Pasta {
            constructor() {
                this.price = 0;
            }
            getPrice() {
                return this.price;
            }
        }

        class Penne extends Pasta {
            constructor() {
                super();
                this.price = 8;
            }
        }


        class PastaDecorator extends Pasta {
            constructor(pasta) {
                super();
                this.pasta = pasta;
            }

            getPrice() {
                return this.pasta.getPrice();
            }
        }


        class SauceDecorator extends PastaDecorator {
            constructor(pasta) {
                super(pasta);
            }

            getPrice() {
                return super.getPrice() + 5;
            }
        }

        class CheeseDecorator extends PastaDecorator {
            constructor(pasta) {
                super(pasta);
            }

            getPrice() {
                return super.getPrice() + 3;
            }
        }

        export { Penne, SauceDecorator, CheeseDecorator };

    //Example 2: Decorating Objects With Multiple Decorators
        // The constructor to decorate
        function MacBook() {
        
            this.cost = function () { return 997; };
            this.screenSize = function () { return 11.6; };
        
        }
        
        // Decorator 1
        function memory( macbook ) {
        
            var v = macbook.cost();
            macbook.cost = function() {
            return v + 75;
            };
        
        }
        
        // Decorator 2
        function engraving( macbook ){
        
            var v = macbook.cost();
            macbook.cost = function(){
            return v + 200;
            };
        
        }
        
        // Decorator 3
        function insurance( macbook ){
        
            var v = macbook.cost();
            macbook.cost = function(){
            return v + 250;
            };
        
        }
        
        var mb = new MacBook();
        memory( mb );
        engraving( mb );
        insurance( mb );
        
        // Outputs: 1522
        console.log( mb.cost() );
        
        // Outputs: 11.6
        console.log( mb.screenSize() );
        //In the above example, our Decorators are overriding the MacBook() super-class objects .cost() function to return the current price of the Macbook plus the cost of the upgrade being specified.

    // Ex. 3
        var BasicArmor = (function () {
            function BasicArmor() {
            }

            BasicArmor.prototype.CalculateDamageFromHit = function (hit) {
                switch(true) {
                    case (hit.Location == 'head'): {
                        return 10 * hit.Strength;
                    }
                    case (hit.Location == 'chest'): {
                        return 5 * hit.Strength;
                    }
                    default: 
                        return 1 * hit.Strength;
                }
            };

            BasicArmor.prototype.GetArmorIntegrity = function () {
                return 100;
            };
            return BasicArmor;
        })();

        var ChainMail = (function () {
            function ChainMail(decoratedArmor) {
                this.decoratedArmor = decoratedArmor;
            }

            ChainMail.prototype.CalculateDamageFromHit = function (hit) {
                hit.Strength = hit.Strength * .8;
                return this.decoratedArmor.CalculateDamageFromHit(hit);
            };

            ChainMail.prototype.GetArmorIntegrity = function () {
                return .9 * this.decoratedArmor.GetArmorIntegrity();
            };
            return ChainMail;
        })();

        // To make use of this armor, you simply use the following code:
        var armor = new ChainMail(new BasicArmor());

        console.log( armor.CalculateDamageFromHit({Location: "head", Weapon: "Sock filled with pennies", Strength: 12}) );
        

  