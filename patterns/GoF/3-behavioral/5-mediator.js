/**
 * Mediator: allows loose coupling between classes by being the only class that has detailed knowledge of their methods.
 * 
 * Managing many-to-many relationships in classes can be a complicated prospect. Let's consider a form that 
 * contains a number of controls, each of which wants to know if other controls on the page are valid before 
 * performing their action. Unfortunately, having each control know about every other control creates a maintenance 
 * nightmare. Each time a new control is added every other control needs to be modified. 
 * 
 * A mediator will sit between the various components and act as a single place in which message routing changes 
 * can be made. By doing so, the mediator simplifies the otherwise complex work needed to maintain the code. In the 
 * case of controls on a form, the mediator is likely to be the form itself. The mediator acts much like a real-life 
 * mediator would, clarifying and routing information exchange between a number of parties.
 */
    // Ex.1
        class TrafficTower {
            constructor() {
                this.airplanes = [];
            }
        
            requestPositions() {
                return this.airplanes.map(airplane => {
                    return airplane.position;
                });
            }
        }
        
        class Airplane{
            constructor(position, trafficTower) {
                this.position = position;
                this.trafficTower = trafficTower;
                this.trafficTower.airplanes.push(this);
            }
        
            requestPositions() {
                return this.trafficTower.requestPositions();
            }
        }
        
        export { TrafficTower, Airplane };

    // Ex. 2
        var Participant = function(name) {
            this.name = name;
            this.chatroom = null;
        };
        
        Participant.prototype = {
            send: function(message, to) {
                this.chatroom.send(message, this, to);
            },
            receive: function(message, from) {
                log.add(from.name + " to " + this.name + ": " + message);
            }
        };
        
        var Chatroom = function() {
            var participants = {};
        
            return {
        
                register: function(participant) {
                    participants[participant.name] = participant;
                    participant.chatroom = this;
                },
        
                send: function(message, from, to) {
                    if (to) {                      // single message
                        to.receive(message, from);    
                    } else {                       // broadcast message
                        for (key in participants) {   
                            if (participants[key] !== from) {
                                participants[key].receive(message, from);
                            }
                        }
                    }
                }
            };
        };
        
        // log helper
        
        var log = (function() {
            var log = "";
        
            return {
                add: function(msg) { log += msg + "\n"; },
                show: function() { alert(log); log = ""; }
            }
        })();
        
        function run() {
            var yoko = new Participant("Yoko");
            var john = new Participant("John");
            var paul = new Participant("Paul");
            var ringo = new Participant("Ringo");
        
            var chatroom = new Chatroom();
            chatroom.register(yoko);
            chatroom.register(john);
            chatroom.register(paul);
            chatroom.register(ringo);
        
            yoko.send("All you need is love.");
            yoko.send("I love you John.");
            john.send("Hey, no need to broadcast", yoko);
            paul.send("Ha, I heard that!");
            ringo.send("Paul, what do you think?", paul);
        
            log.show();
        }


    // Ex. 3
        var Karstark = (function () {
            function Karstark(greatLord) {
                this.greatLord = greatLord;
            }

            Karstark.prototype.receiveMessage = function (message) {};

            Karstark.prototype.sendMessage = function (message) {
                this.greatLord.routeMessage(message);
            };

            return Karstark;
        })();

        var HouseStark = (function () {
            function HouseStark() {
                this.karstark = new Karstark(this);
                this.bolton = new Bolton(this);
                this.frey = new Frey(this);
                this.umber = new Umber(this);
            }

            HouseStark.prototype.routeMessage = function (message) {};
            
            return HouseStark;
        })();