/*
	Adapter: 
		Allows classes with incompatible interfaces to work together by wrapping its own interface around that 
		of an already existing class.

		We may need to make use of a class that does not perfectly  t the required interface. The class may be missing methods 
		or may have additional methods we would like to hide. This occurs frequently when dealing with third-party code. In order 
		to make it comply with the interface needed in your code, an adapter may be required.

		The Adapter Pattern converts the interface of a class into another interface the clients expect. 
		Adapter lets classes work together that couldn't otherwise because of incompatible interfaces. 
*/
	// Ex. 1 
		class Soldier {
		    constructor(level) {
		        this.level = level;
		    }

		    attack() {
		        return this.level * 1;
		    }
		}

		class Jedi {
		    constructor(level) {
		        this.level = level;
		    }

		    attackWithSaber() {
		        return this.level * 100;
		    }
		}

		class JediAdapter {
		    constructor(jedi) {
		        this.jedi = jedi;
		    }

		    attack() {
		        return this.jedi.attackWithSaber();
		    }
		}

		export { Soldier, Jedi, JediAdapter };

	// Ex. 2
		// old interface
		 
		function Shipping() {
		    this.request = function(zipStart, zipEnd, weight) {
		        // ...
		        return "$49.75";
		    }
		}
		 
		// new interface
		 
		function AdvancedShipping() {
		    this.login = function(credentials) { /* ... */ };
		    this.setStart = function(start) { /* ... */ };
		    this.setDestination = function(destination) { /* ... */ };
		    this.calculate = function(weight) { return "$39.50"; };
		}
		 
		// adapter interface
		 
		function ShippingAdapter(credentials) {
		    var shipping = new AdvancedShipping();
		 
		    shipping.login(credentials);
		 
		    return {
		        request: function(zipStart, zipEnd, weight) {
		            shipping.setStart(zipStart);
		            shipping.setDestination(zipEnd);
		            return shipping.calculate(weight);
		        }
		    };
		}
		 
		// log helper
		 
		var log = (function () {
		    var log = "";
		 
		    return {
		        add: function (msg) { log += msg + "\n"; },
		        show: function () { alert(log); log = ""; }
		    }
		})();
		 
		function run() {
		    var shipping = new Shipping();
		    var credentials = {token: "30a8-6ee1"};
		    var adapter = new ShippingAdapter(credentials);
		 
		    // original shipping object and interface
		 
		    var cost = shipping.request("78701", "10010", "2 lbs");
		    log.add("Old cost: " + cost);
		 
		    // new shipping object with adapted interface
		 
		    cost = adapter.request("78701", "10010", "2 lbs");
		 
		    log.add("New cost: " + cost);
		    log.show();
		}

	// Ex. 3
