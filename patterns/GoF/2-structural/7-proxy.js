/**
 * Proxy: provides a placeholder for another object to control access, reduce cost, and reduce complexity.
 * 
 * The proxy pattern provides a method of controlling the creation and use of expensive objects.
 * 
 * There are a number of places where the proxy pattern can be of use:
    • Lazy instantiation of an expensive object
    • Protection of secret data
    • Stubbing for remote method invocation
    • Interposing additional actions before or after method invocation
 */
    // Ex. 1
        function Car() {
            this.drive = function() {
                return "driving";
            };
        }
        
        function CarProxy(driver) {
            this.driver = driver;
            this.drive = function() {
                if ( driver.age < 18)
                    return "too young to drive";
                return new Car().drive();
            };
        }
        
        function Driver(age) {
            this.age = age;
        }
        
        module.exports = [Car, CarProxy, Driver];
    
    // Ex. 2
        var BarrelCalculator = (function () {
            function BarrelCalculator() {}

            BarrelCalculator.prototype.calculateNumberNeeded = function (volume) {
                return Math.ceil(volume / 357);
            };

            return BarrelCalculator;
        })();

        var DragonBarrelCalculatorProxy = (function () {
            function DragonBarrelCalculator() {}

            DragonBarrelCalculator.prototype.calculateNumberNeeded = function (volume) {
              if (this._barrelCalculator == null)
                this._barrelCalculator = new BarrelCalculator();

              return this._barrelCalculator.calculateNumberNeeded(volume * .77);
            };

            return DragonBarrelCalculator;
          })();
       