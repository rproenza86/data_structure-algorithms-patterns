/**
 * Memento: provides the ability to restore an object to its previous state (undo).
 * 
 * Creating reversible commands is not always possible. For many operations, there is 
 * no apparent reversing operation that can restore the original state.
 * 
 * The memento pattern provides an approach to restore the state of objects to a previous state. 
 * The memento keeps a record of the previous values of a variable and provides the functionality 
 * to restore them. Keeping a memento around for each command allows for easy restoration of 
 * irreversible commands.
 */
    // Ex. 1
        class Memento {
            constructor(value) {
                this.value = value;
            }
        }
        
        const originator = {
            store: function(val) {
                return new Memento(val);
            },
            restore: function(memento) {
                return memento.value;
            }
        };
        
        class Caretaker {
            constructor() {
                this.values = [];
            }
        
            addMemento(memento) {
                this.values.push(memento);
            }
        
            getMemento(index) {
                return this.values[index];
            }
        }
        
        export { originator, Caretaker };
    

    // Ex. 2
        var Person = function(name, street, city, state) {
            this.name = name;
            this.street = street;
            this.city = city;
            this.state = state;
        }
        
        Person.prototype = {
        
            hydrate: function() {
                var memento = JSON.stringify(this);
                return memento;
            },
        
            dehydrate: function(memento) {
                var m = JSON.parse(memento);
                this.name = m.name;
                this.street = m.street;
                this.city = m.city;
                this.state = m.state;
            }
        }
        
        var CareTaker = function() {
            this.mementos = {};
        
            this.add = function(key, memento) {
                this.mementos[key] = memento;
            },
        
            this.get = function(key) {
                return this.mementos[key];
            }
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
            var mike = new Person("Mike Foley", "1112 Main", "Dallas", "TX");
            var john = new Person("John Wang", "48th Street", "San Jose", "CA");
            var caretaker = new CareTaker();
        
            // save state
        
            caretaker.add(1, mike.hydrate());
            caretaker.add(2, john.hydrate());
        
            // mess up their names
        
            mike.name = "King Kong";
            john.name = "Superman";
        
            // restore original state
        
            mike.dehydrate(caretaker.get(1));
            john.dehydrate(caretaker.get(2));
        
            log.add(mike.name);
            log.add(john.name);
        
            log.show();
        }