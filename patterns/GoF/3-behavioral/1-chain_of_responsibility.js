/**
 * Chain of responsibility: delegates commands to a chain of processing objects.
 * 
 * Avoid coupling the sender of a request to its receiver by giving more than one object 
 * a chance to handle the request. Chain the receiving objects and pass the request along 
 * the chain until an object handles it.
 * 
 * 
 * The Chain of Responsibility pattern provides a chain of loosely coupled objects one of which 
 * can satisfy a request. This pattern is essentially a linear search for an object that can handle a particular request.
 * 
 * An example of a chain-of-responsibility is event-bubbling in which an event propagates through a 
 * series of nested controls one of which may choose to handle the event.
 */
    // Ex. 1
        function ShoppingCart() {
            this.products = [];
        
            this.addProduct = function(p) {
                this.products.push(p);
            };
        }
        
        function Discount() {
            this.calc = function(products) {
                var ndiscount = new NumberDiscount();
                var pdiscount = new PriceDiscount();
                var none = new NoneDiscount();
        
                ndiscount.setNext(pdiscount);
                pdiscount.setNext(none);
        
                return ndiscount.exec(products);
            };
        }
        
        function NumberDiscount() {
            this.next = null;
            this.setNext = function(fn) {
                this.next = fn;
            };
        
            this.exec = function(products) {
                var result = 0;
                if (products.length > 3)
                    result = 0.05;
        
                return result + this.next.exec(products);
            };
        }
        
        function PriceDiscount() {
            this.next = null;
            this.setNext = function(fn) {
                this.next = fn;
            };

            this.exec = function(products) {
                var result = 0;
                var total = products.reduce(function(a, b) {
                    return a + b;
                });
        
                if (total >= 500)
                    result = 0.1;
        
                return result + this.next.exec(products);
            };
        }
        
        function NoneDiscount() {
            this.exec = function() {
                return 0;
            };
        }
        
        module.exports = [ShoppingCart, Discount];
    
    // Ex. 2
        /*
            This example differs slightly from the classic Chain of Responsibility pattern in that not one, 
            but all handlers participate in handling the request.

            The code demonstrates an elegant solution to a money dispensing machine problem. Say, a customer 
            requires $247 from an ATM machine. What is the combination of bank notes ($100, $50, $20, $10, $5, $1) 
            that satisfies that request?
        */
        var Request = function(amount) {
            this.amount = amount;
            log.add("Requested: $" + amount + "\n");
        }
        
        Request.prototype = {
            get: function(bill) {
                var count = Math.floor(this.amount / bill);
                this.amount -= count * bill;
                log.add("Dispense " + count + " $" + bill + " bills");
                return this;
            }
        }
        
        // log helper 
        
        var log = (function() {
            var log = "";
        
            return {
                add: function(msg) { log += msg + "\n"; },
                show: function() { alert(log); log = ""; }
            }
        })();
        
        function run() {
            var request = new Request(378);
        
            request.get(100).get(50).get(20).get(10).get(5).get(1);
        
            log.show();
        }

    // Ex. 3
        /*
            There is very little in the way of a legal system in Westeros. Certainly, there are laws and even city 
            guards who enforce them but the judicial system is scant. The law of the land is really decided by the 
            king and his advisors. Those with the time and money can petition for an audience with the king who will 
            listen to their complaint and pass a ruling. This ruling is law. Of course, any king who spent his entire 
            day listening to the complaints of peasants would go mad. For this reason, many of the cases are caught 
            and solved by his advisors before they reach his ears.
        */
       export interface ComplaintListener {
                IsAbleToResolveComplaint(complaint: Complaint): boolean;
                ListenToComplaint(complaint: Complaint): string;
        }

        var Complaint = (function () {
            function Complaint() {
                this.ComplainingParty = "";
                this.ComplaintAbout = "";
                this.Complaint = "";
            }

            return Complaint;
        })();

        var JudicialSystem = {};

        var ClerkOfTheCourt = (function () {
            function ClerkOfTheCourt() {}

            ClerkOfTheCourt.prototype.IsAbleToResolveComplaint = function(complaint) {
                //decide if this is a complaint that can be solved by the clerk
                return false;
            };

            ClerkOfTheCourt.prototype.ListenToComplaint = function(complaint) {
                //perform some operation
                //return solution to the complaint
                return "";
            };

            return ClerkOfTheCourt;
        })();
        JudicialSystem.ClerkOfTheCourt = ClerkOfTheCourt;

        var King = (function () {
            function King() {}

            King.prototype.IsAbleToResolveComplaint = function (complaint) {
                return true;
            };

            King.prototype.ListenToComplaint = function (complaint) {
                //perform some operation
                //return solution to the complaint
                return "";
            };

            return King;
        })();
        JudicialSystem.King = King;

        // Now we need to chain them together making sure that the King class is in the default position. 
        var ComplaintResolver = (function () {
            function ComplaintResolver() {
                this.complaintListeners = new Array();
                this.complaintListeners.push(new ClerkOfTheCourt());
                this.complaintListeners.push(new King());
            }

            ComplaintResolver.prototype.ResolveComplaint = function(complaint) {
                for (var i = 0, complaintListenersLength = this.complaintListeners.length; i < complaintListenersLength; i++) {
                    if (this.complaintListeners[i].IsAbleToResolveComplaint(complaint)) {
                        return this.complaintListeners[i].ListenToComplaint(complaint);
                    }
                }
            };

            return ComplaintResolver;
        })();
       