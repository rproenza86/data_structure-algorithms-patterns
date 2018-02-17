/**
 * Strategy: allows one of a family of algorithms to be selected on-the-fly at runtime.
 * 
 * Frequently, there are numerous versions of an algorithm that trade off memory usage for CPU usage. 
 * Sometimes, there are different approaches that provide different levels of  delity. 
 * 
 * For example, performing a geolocation on a smart phone typically uses one of three different sources of data:
 *  • GPS chips
 *  • Cell phone triangulation
 *  • Nearby WiFi points
 * Using the GPS chip provides the highest level of  delity; however, it is also the 
 * slowest and requires the most battery. Looking at the nearby WiFi points requires 
 * very little energy and is very quick; however, it provides poor  delity.
 * 
 * The strategy pattern provides a method of swapping these strategies out in a transparent fashion. 
 * In a traditional inheritance model, each strategy would implement the same interface, which would allow 
 * for any of the strategies to be swapped in.
 */
    // Ex. 1
        class ShoppingCart {

            constructor(discount) {
                this.discount = discount;
                this.amount = 0;
            }
        
            checkout() {
                return this.discount(this.amount);
            }
        
            setAmount(amount) {
                this.amount = amount;
            }
        }
        
        // Discounts Strategies
        function guestStrategy(amount) {
            return amount;
        }
        
        function regularStrategy(amount) {
            return amount * 0.9;
        }
        
        function premiumStrategy(amount) {
            return amount * 0.8;
        }
        
        export { ShoppingCart, guestStrategy, regularStrategy, premiumStrategy };

    // Ex. 2
        var Travel = {};

        var TravelResult = (function () {
            function TravelResult(durationInDays, probabilityOfDeath, cost) {
                this.durationInDays = durationInDays;
                this.probabilityOfDeath = probabilityOfDeath;
                this.cost = cost;
            }

            return TravelResult;
        })();
        Travel.TravelResult = TravelResult;

        // Strategies:
        var SeaGoingVessel = (function () {
            function SeaGoingVessel() {}

            SeaGoingVessel.prototype.Travel = function (source, destination) {
                return new TravelResult(15, .25, 500);
            };

            return SeaGoingVessel;
        })();

        var Horse = (function () {
            function Horse() {}

            Horse.prototype.Travel = function (source, destination) {
                return new TravelResult(30, .25, 50);
            };

            return Horse;
        })();

        var Walk = (function () {
            function Walk() {}

            Walk.prototype.Travel = function (source, destination) {
                return new TravelResult(150, .55, 0);
            };

            return Walk;
        })();

        // var currentMoney = getCurrentMoney();
        var currentMoney = 100;
        var strat;

        if (currentMoney > 500)
          strat = new SeaGoingVessel();
        else if (currentMoney > 50)
          strat = new Horse();
        else
          strat = new Walk();

        var travelResult = strat.Travel();