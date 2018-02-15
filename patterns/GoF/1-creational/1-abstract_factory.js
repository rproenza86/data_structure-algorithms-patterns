/**
 * Abstract factory:
 * Provide an interface for creating families of related or dependent objects without specifying their
 * concrete classes.
 * 
 * An Abstract Factory should be used where a system must be independent from the way the objects it creates 
 * are generated or it needs to work with multiple types of objects.
 */
    // Ex. 1
        function droidProducer(kind) {
            if (kind === 'battle') 
                return battleDroidFactory;
            else
                return pilotDroidFactory;
        }
        
        function battleDroidFactory() {
            return new B1();
        }
        
        function pilotDroidFactory() {
            return new Rx24();
        }
        
        
        class B1 {
            info() {
                return "B1, Battle Droid";
            }
        }
        
        class Rx24 {
            info() {
                return "Rx24, Pilot Droid";
            }
        }
        
        
        export default droidProducer;

    // Ex.2
        class Car {
            constructor (options) {
                this.doors = options.doors || 4;
                this.state = options.state || "brand new";
                this.color = options.color || "silver";
            }
        };

        class Truck {
            constructor (options) {
                this.state = options.state || "used";
                this.wheelSize = options.wheelSize || "large";
                this.color = options.color || "blue";
            }
        };

        // Define a skeleton vehicle factory (concrete factory)
        class VehicleFactory {
            constructor() {
                this.vehicleObj = {};
            }

            createVehicle (options) {
                switch(options.vehicleType){
                    default:
                    case "car":
                    this.vehicleObj = new Car(options);
                    break;
                    case "truck":
                    this.vehicleObj = new Truck(options);
                    break;
                }

                let  vehicle = Object.assign({}, this.setupProto(options.vehicleType));
                return vehicle;
            }

            setupProto (vehicleType, vehicle) {
                this.vehicleObj.prototype = Object.prototype;
                this.vehicleObj.prototype.drive = () => true;
                this.vehicleObj.prototype.breakDown = () => true; 
                this.vehicleObj.prototype.test = (name, lastName) => console.log('testing',name,lastName);

                this.vehicleObj.customize = (vehicleType, customizations, Vehicle) => {
                    switch(vehicleType){
                        default :
                        case "car":
                            Vehicle.state = customizations.state || "too old";
                            Vehicle.color = customizations.color || "blue sky";
                        break;
                        case "truck":
                            Vehicle.wheelSize = customizations.wheelSize || "large";
                            Vehicle.color = customizations.color || "blue sky";
                        break;
                    }
                    return Vehicle;
                }

                return this.vehicleObj;
            }
        }

        // Test for the concrete factory
            const carFactory = new VehicleFactory();

            const car = carFactory.createVehicle( {
                                vehicleType: "car",
                                color: "yellow",
                                doors: 6 
                            }); 
            console.log('car', car);

            const movingTruck = carFactory.createVehicle( {
                                    vehicleType: "truck",
                                    state: "like new",
                                    color: "red",
                                    wheelSize: "small" 
                                }); 
            console.log('movingTruck', movingTruck);

        /**
            An example which is both simple and easier to understand is a vehicle factory, which defines ways to get or register vehicles types. 
            The abstract factory can be named abstractVehicleFactory. The Abstract factory will allow the definition of types of vehicle like "car" or "truck" 
            and concrete factories will implement only classes that fulfill the vehicle contract (e.g Vehicle.prototype.drive and Vehicle.prototype.breakDown).
        **/
        const abstractVehicleFactory = (function () {
        
            // Storage for our vehicle types
            const types = {};

            return {
                getVehicle: function ( type, customizations ) {
                    const Vehicle = types[type];
                    return (Vehicle ? Vehicle.customize(type,customizations,Vehicle) : null);
                },

                registerVehicle: function ( type, Vehicle ) {
                    const proto = Vehicle.prototype;
        
                    // only register classes that fulfill the vehicle contract
                    if ( proto.drive && proto.breakDown ) {
                        types[type] = Vehicle;
                    }

                    return abstractVehicleFactory;
                }
            };
        })();

        // Test of the Abstract and Concrete factory:
 
            abstractVehicleFactory.registerVehicle( "car", car );
            abstractVehicleFactory.registerVehicle( "truck", movingTruck );
            
            // Instantiate a new car based on the abstract vehicle type
            const upgradedCar = abstractVehicleFactory.getVehicle( "car", {
                        color: "lime green",
                        state: "like new" } );
            console.log('upgradedCar', upgradedCar);
            
            // Instantiate a new truck in a similar manner
            const upgradedTruck = abstractVehicleFactory.getVehicle( "truck", {
                        wheelSize: "medium",
                        color: "neon yellow" } );
            console.log('upgradedTruck', upgradedTruck);