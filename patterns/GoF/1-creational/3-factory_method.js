/*
	Factory method: 
	Define an interface for creating a single object, but let subclasses decide which class to instantiate. 

	Factory Method lets a class defer instantiation to subclasses.

	Factory can provide a generic interface for creating objects, where we can specify the type of factory object we wish to be created.

    Particularly useful if the object creation process is relatively complex, e.g. if it strongly depends on dynamic factors or application configuration.

    We've already looked at the Abstract Factory and Builder patterns. The Abstract Factory pattern builds a family of related classes and 
    the builder creates complicated objects using different strategies. The Factory Method pattern allows a class to request a new instance 
    of an interface without the class making decisions about which implementation of the interface to use. The factory may use some strategy
	to select which implementation to return.
*/
	// Ex. 1:
		class BmwFactory {
	    	create(type) {
		        if (type === 'X5')
		            return new Bmw(type, 108000, 300);
		        if (type === 'X6')
		            return new Bmw(type, 111000, 320);
			    }
		}

		class Bmw {
		    constructor(model, price, maxSpeed) {
		        this.model = model;
		        this.price = price;
		        this.maxSpeed = maxSpeed;
		    }
		}

		export default BmwFactory;

	// Ex. 2
		//Vehicle Factory may be implemented using the Factory pattern in this example
		// Types.js - Constructors used behind the scenes
		 
		// A constructor for defining new cars
		function Car( options ) {
		 
		  // some defaults
		  this.doors = options.doors || 4;
		  this.state = options.state || "brand new";
		  this.color = options.color || "silver";
		 
		}
		 
		// A constructor for defining new trucks
		function Truck( options){
		 
		  this.state = options.state || "used";
		  this.wheelSize = options.wheelSize || "large";
		  this.color = options.color || "blue";
		}
		 
		 
		// FactoryExample.js
		 
		// Define a skeleton vehicle factory
		function VehicleFactory() {}
		 
		// Define the prototypes and utilities for this factory
		 
		// Our default vehicleClass is Car
		VehicleFactory.prototype.vehicleClass = Car;
		 
		// Our Factory method for creating new Vehicle instances
		VehicleFactory.prototype.createVehicle = function ( options ) {
		 
		  switch(options.vehicleType){
		    case "car":
		      this.vehicleClass = Car;
		      break;
		    case "truck":
		      this.vehicleClass = Truck;
		      break;
		    //defaults to VehicleFactory.prototype.vehicleClass (Car)
		  }
		 
		  return new this.vehicleClass( options );
		 
		};
		 
		// Create an instance of our factory that makes cars
		var carFactory = new VehicleFactory();
		var car = carFactory.createVehicle( {
		            vehicleType: "car",
		            color: "yellow",
		            doors: 6 } );
		 
		// Test to confirm our car was created using the vehicleClass/prototype Car
		 
		// Outputs: true
		console.log( car instanceof Car );
		 
		// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
		console.log( car );

		var movingTruck = carFactory.createVehicle( {
		                      vehicleType: "truck",
		                      state: "like new",
		                      color: "red",
		                      wheelSize: "small" } );
		 
		// Test to confirm our truck was created with the vehicleClass/prototype Truck
		 
		// Outputs: true
		console.log( movingTruck instanceof Truck );
		 
		// Outputs: Truck object of color "red", a "like new" state
		// and a "small" wheelSize
		console.log( movingTruck );




		/* Approach #2: Subclass VehicleFactory to create a factory class that builds Trucks */
		function TruckFactory () {}
		TruckFactory.prototype = new VehicleFactory();
		TruckFactory.prototype.vehicleClass = Truck;
		 
		var truckFactory = new TruckFactory();
		var myBigTruck = truckFactory.createVehicle( {
		                    state: "omg..so bad.",
		                    color: "pink",
		                    wheelSize: "so big" } );
		 
		// Confirms that myBigTruck was created with the prototype Truck
		// Outputs: true
		console.log( myBigTruck instanceof Truck );
		 
		// Outputs: Truck object with the color "pink", wheelSize "so big"
		// and state "omg. so bad"
		console.log( myBigTruck );