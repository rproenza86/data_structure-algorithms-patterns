/*
	Prototype: 
		Specify the kinds of objects to create using a prototypical instance, and create new objects from the 'skeleton' of 
		an existing object, thus boosting performance and keeping memory footprints to a minimum.

		Copying existing objects can be a very useful pattern. There are numerous cases when being able to duplicate a constructed 
		object is handy. For instance, maintaining a history of the state of an object is easily done by saving previous instances 
		created by leveraging some sort of cloning.

		Creates objects based on a template of an existing object through cloning.

    	Requires the use of Object.create
*/
	// Ex. 1
		class Sheep {
		    constructor(name, weight) {
		        this.name = name;
		        this.weight = weight;
		    }

		    clone() {
		        return new Sheep(this.name, this.weight);
		    }
		}

		export default Sheep;

	// Ex. 2
		var myCar = {
 
		  	name: "Ford Escort",
		 
		  	drive: function () {
		    	console.log( "Weeee. I'm driving!" );
		  	},
		 
		  	panic: function () {
		    	console.log( "Wait. How do you stop this thing?" );
		  	}	
		 
		};
		 
		// Use Object.create to instantiate a new car
		var yourCar = Object.create( myCar );
		 
		// Now we can see that one is a prototype of the other
		console.log( yourCar.name );

		/*
		    Object.create also allows us to easily implement advanced concepts such as differential inheritance where objects are able to directly inheritance
		    from other objects.
		*/

		var vehicle = {
		  getModel: function () {
		    console.log( "The model of this vehicle is.." + this.model );
		  }
		};
		 
		var car = Object.create(vehicle, {
		 
		  "id": {
		    //value: MY_GLOBAL.nextId(),
		    value: 1,
		    // writable:false, configurable:false by default
		    enumerable: true
		  },
		 
		  "model": {
		    value: "Ford",
		    enumerable: true
		  }
		 
		});

		console.log(car.getModel());

		/**
		    Implement the prototype pattern without directly using Object.create, we can simulate the pattern as per the above example as follows:
		**/

		var vehiclePrototype = {
		 
		  init: function ( carModel ) {
		    this.model = carModel;
		  },
		 
		  getModel: function () {
		    console.log( "The model of this vehicle is.." + this.model);
		  }
		};
		 
		 
		var vehicle = function ( model ) {
		 
		  function F() {};
		  F.prototype = vehiclePrototype;
		 
		  var f = new F();
		 
		  f.init( model );
		  return f;
		 
		}
		 
		var car = vehicle( "Ford Escort" );
		car.getModel();
