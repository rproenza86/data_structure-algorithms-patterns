/**
 * Flyweight: reduces the cost of creating and manipulating a large number of similar objects.
 * 
 * The Flyweight pattern is a classical structural solution for optimizing code that is repetitive, slow and inefficiently shares data.
 * 
 * It aims to minimize the use of memory in an application by sharing as much data as possible with related objects (e.g application 
 * configuration, state and so on).
 * 
 */

    // Ex. 1 
        function Color(name) {
            this.name = name;
        }

        var colorFactory = {
            colors: {},

            create: function(name) {
                var color = this.colors[name];
                if(color) return color;

                this.colors[name] = new Color(name);
                return this.colors[name];
            }

        };

        module.exports = colorFactory;

/***
  We will be making use of three types of Flyweight components in this implementation, which are listed below:

  "Flyweight" corresponds to an interface through which flyweights are able to receive and act on extrinsic states

  "Concrete Flyweight" actually implements the Flyweight interface and stores intrinsic state. Concrete Flyweights
   need to be sharable and capable of manipulating state that is extrinsic

  "Flyweight Factory" manages flyweight objects and creates them too. It makes sure that our flyweights are shared
   and manages them as a group of objects which can be queried if we require individual instances. If an object 
   has been already created in the group it returns it, otherwise it adds a new object to the pool and returns it.

  These correspond to the following definitions in our implementation:

  CoffeeOrder: Flyweight
  CoffeeFlavor: Concrete Flyweight
  CoffeeOrderContext: Helper
  CoffeeFlavorFactory: Flyweight Factory
  testFlyweight: Utilization of our Flyweights
***/
    // Simulate pure virtual inheritance/"implement" keyword for JS
    Function.prototype.implementsFor = function( parentClassOrObject ){
        if ( parentClassOrObject.constructor === Function )
        {
            // Normal Inheritance
            this.prototype = new parentClassOrObject();
            this.prototype.constructor = this;
            this.prototype.parent = parentClassOrObject.prototype;
        }
        else
        {
            // Pure Virtual Inheritance
            this.prototype = parentClassOrObject;
            this.prototype.constructor = this;
            this.prototype.parent = parentClassOrObject;
        }
        return this;
    };

    // Flyweight object
    var CoffeeOrder = {
    
        // Interfaces
        serveCoffee:function(context){},

        getFlavor:function(){}
    
    };
    
    
    // ConcreteFlyweight object that creates ConcreteFlyweight
    // Implements CoffeeOrder
    function CoffeeFlavor( newFlavor ){
    
        var flavor = newFlavor;
    
        // If an interface has been defined for a feature
        // implement the feature
        if( typeof this.getFlavor === "function" ){
            this.getFlavor = function() {
                return flavor;
            };
        }
    
        if( typeof this.serveCoffee === "function" ){
            this.serveCoffee = function( context ) {
                console.log("Serving Coffee flavor "
                    + flavor
                    + " to table number "
                    + context.getTable());
            };
        }
    
    }
    
    
    // Implement interface for CoffeeOrder
    CoffeeFlavor.implementsFor( CoffeeOrder );
    
    
    // Handle table numbers for a coffee order
    function CoffeeOrderContext( tableNumber ) {
        return{
            getTable: function() {
                return tableNumber;
            }
        };
    }
    
    
    function CoffeeFlavorFactory() {
        var flavors = {},
        length = 0;
    
        return {
            getCoffeeFlavor: function (flavorName) {
                var flavor = flavors[flavorName];

                if (typeof flavor === "undefined") {
                    flavor = new CoffeeFlavor(flavorName);
                    flavors[flavorName] = flavor;
                    length++;
                }

                return flavor;
            },
    
            getTotalCoffeeFlavorsMade: function () {
                return length;
            },

            getAllFlavors:()=>{
                return flavors;
            }
        };
    }
    
    // Sample usage:
    function testFlyweight(){
    
        // The flavors ordered.
        var flavors = new CoffeeFlavor(),
        
        // The tables for the orders.
            tables = new CoffeeOrderContext(),
        
        // Number of orders made
            ordersMade = 0,
        
        // The CoffeeFlavorFactory instance
            flavorFactory;
        
        function takeOrders( flavorIn, table) {
            flavors[ordersMade] = flavorFactory.getCoffeeFlavor( flavorIn );
            tables[ordersMade++] = new CoffeeOrderContext( table );
        }
        
        flavorFactory = new CoffeeFlavorFactory();
        
        takeOrders("Cappuccino", 2);
        takeOrders("Cappuccino", 2);
        takeOrders("Frappe", 1);
        takeOrders("Frappe", 1);
        takeOrders("Xpresso", 1);
        takeOrders("Frappe", 897);
        takeOrders("Cappuccino", 97);
        takeOrders("Cappuccino", 97);
        takeOrders("Frappe", 3);
        takeOrders("Xpresso", 3);
        takeOrders("Cappuccino", 3);
        takeOrders("Xpresso", 96);
        takeOrders("Frappe", 552);
        takeOrders("Cappuccino", 121);
        takeOrders("Xpresso", 121);
        
        for (var i = 0; i < ordersMade; ++i) {
            flavors[i].serveCoffee(tables[i]);
        }
        console.log(" ");
        console.log("total CoffeeFlavor objects made: " + flavorFactory.getTotalCoffeeFlavorsMade());
        console.log(flavorFactory.getAllFlavors());
    };

    testFlyweight();