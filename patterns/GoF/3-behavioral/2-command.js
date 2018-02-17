/**
 * Command: creates objects which encapsulate actions and parameters.
 * 
 * The command pattern is a method of encapsulating both the parameters to a method 
 * and the current object state, and the method to be called. 
 * 
 * In effect, the command pattern packs up everything needed to call a method at a later date 
 * into a nice little package.
 * 
 * Using this approach, one can issue a command and wait until a later date to decide which piece 
 * of code will execute the command. This package can then be queued or even serialized for later execution. 
 * 
 * Having a single point of command execution also allows us to easily add functionality such as undo or 
 * command logging.
 * 
 * In addition, it enables us to decouple objects invoking the action from the objects which implement them, 
 * giving us a greater degree of overall flexibility in swapping out concrete classes (objects).
 */
    // Ex. 1
        class Cockpit {
            constructor(command) {
                this.command = command;
            }
            execute() {
                this.command.execute();
            }
        }
        
        class Turbine {
            constructor() {
                this.state = false;
            }
            on() {
                this.state = true;
            }
            off() {
                this.state = false;
            }
        }
        
        class OnCommand {
            constructor(turbine) {
                this.turbine = turbine;
            }
            execute() {
                this.turbine.on();
            }
        }
        
        class OffCommand {
            constructor(turbine) {
                this.turbine = turbine;
            }
            execute() {
                this.turbine.off();
            }
        }
        
        export { Cockpit, Turbine, OnCommand, OffCommand };

    // Ex. 2
        var carManager = {
    
            // request information
            requestInfo: function( model, id ){
                return "The information for " + model + " with ID " + id + " is foobar";
            },
        
            // purchase the car
            buyVehicle: function( model, id ){
                return "You have successfully purchased Item " + id + ", a " + model;
            },
        
            // arrange a viewing
            arrangeViewing: function( model, id ){
                return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
            },
        
        };
        
        carManager.execute = function ( name ) {
            return carManager[name] && carManager[name].apply( carManager, [].slice.call(arguments, 1) );
        };
        
        console.log(carManager.execute( "arrangeViewing", "Ferrari", "14523" ));
        console.log(carManager.execute( "requestInfo", "Ford Mondeo", "54323" ));
        console.log(carManager.execute( "requestInfo", "Ford Escort", "34232" ));
        console.log(carManager.execute( "buyVehicle", "Ford Escort", "34232" ));