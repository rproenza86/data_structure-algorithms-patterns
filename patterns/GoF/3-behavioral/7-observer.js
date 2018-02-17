/**
 * Observer: is a publish/subscribe pattern which allows a number of observer objects to see an event.
 * 
 * The observer pattern is perhaps the most used pattern in the JavaScript world. 
 * 
 * The pattern is used especially with modern single page applications; it is a big part of the various 
 * libraries that provide the Model-View-ViewModel (MVVM) functionality.
 * 
 * The Observer is a design pattern where an object (known as a subject) maintains a list of objects depending 
 * on it (observers), automatically notifying them of any changes to state.
 * 
 * 
 *  Other definition:
    "One or more observers are interested in the state of a subject and register their interest with the subject by attaching themselves. 
    When something changes in our subject that the observer may be interested in, a notify message is sent which calls the update method in each observer. 
    When the observer is no longer interested in the subject's state, they can simply detach themselves."

    Subject: maintains a list of observers, facilitates adding or removing observers
    Observer: provides a update interface for objects that need to be notified of a Subject's changes of state
    ConcreteSubject: broadcasts notifications to observers on changes of state, stores the state of ConcreteObservers
    ConcreteObserver: stores a reference to the ConcreteSubject, implements an update interface for the Observer to ensure state is consistent 
                      with the Subject's
 * 
 * 
 * Conclusion: the Observer pattern is where we need to maintain consistency between related objects without 
 * making classes tightly coupled. For example, when an object needs to be able to notify other objects without 
 * making assumptions regarding those objects.
 * 
 */
    // Ex. 1
        class Product {
            constructor() {
                this.price = 0;
                this.actions = [];
            }
        
            setBasePrice(val) {
                this.price = val;
                this.notifyAll();
            }
        
            register(observer) {
                this.actions.push(observer);
            }
        
            unregister(observer) {
                this.actions.remove.filter(function(el) {
                    return el !== observer;
                });
            }
        
            notifyAll() {
                return this.actions.forEach(function(el) {
                    el.update(this);
                }.bind(this));
            }
        }
        
        class fees {
            update(product) {
                product.price = product.price * 1.2;
            }
        }
        
        class proft {
            update(product) {
                product.price = product.price * 2;
            }
        }
        
        export { Product, fees, proft };


    // Ex. 2
        var pubsub = {};
 
        (function(myObject) {
        
            // Storage for topics that can be broadcast
            // or listened to
            var topics = {};
        
            // An topic identifier
            var subUid = -1;
        
            // Publish or broadcast events of interest
            // with a specific topic name and arguments
            // such as the data to pass along
            myObject.publish = function( topic, args ) {
        
                if ( !topics[topic] ) {
                    return false;
                }
        
                var subscribers = topics[topic],
                    len = subscribers ? subscribers.length : 0;
        
                while (len--) {
                    subscribers[len].func( topic, args );
                }
        
                return this;
            };
        
            // Subscribe to events of interest
            // with a specific topic name and a
            // callback function, to be executed
            // when the topic/event is observed
            myObject.subscribe = function( topic, func ) {
        
                if (!topics[topic]) {
                    topics[topic] = [];
                }
        
                var token = ( ++subUid ).toString();
                topics[topic].push({
                    token: token,
                    func: func
                });
                return token;
            };
        
            // Unsubscribe from a specific
            // topic, based on a tokenized reference
            // to the subscription
            myObject.unsubscribe = function( token ) {
                for ( var m in topics ) {
                    if ( topics[m] ) {
                        for ( var i = 0, j = topics[m].length; i < j; i++ ) {
                            if ( topics[m][i].token === token ) {
                                topics[m].splice( i, 1 );
                                return token;
                            }
                        }
                    }
                }
                return this;
            };
        }( pubsub ));

        //Example: Using Our Implementation

        // Another simple message handler
        
        // A simple message logger that logs any topics and data received through our
        // subscriber
        var messageLogger = function ( topics, data ) {
            console.log( "Logging: " + topics + ": " + data );
        };
        
        // Subscribers listen for topics they have subscribed to and
        // invoke a callback function (e.g messageLogger) once a new
        // notification is broadcast on that topic
        var subscription = pubsub.subscribe( "inbox/newMessage", messageLogger );
        
        // Publishers are in charge of publishing topics or notifications of
        // interest to the application. e.g:
        
        pubsub.publish( "inbox/newMessage", "hello world!" );
        
        // or
        pubsub.publish( "inbox/newMessage", ["test", "a", "b", "c"] );
        
        // or
        pubsub.publish( "inbox/newMessage", {
            sender: "hello@google.com",
            body: "Hey again!"
        });
        
        // We can also unsubscribe if we no longer wish for our subscribers
        // to be notified
        pubsub.unsubscribe( subscription );
        
        // Once unsubscribed, this for example won't result in our
        // messageLogger being executed as the subscriber is
        // no longer listening
        pubsub.publish( "inbox/newMessage", "Hello! are you still there?" );

    // Ex. 3 EmberJs implementation of an observer service
        import Ember from 'ember';

        export default Ember.Service.extend({
            // Storage for topics that can be broadcast
            // or listened to
            topics : {},
        
            // An topic identifier
            subUid : -1,
        
            // Publish or broadcast events of interest
            // with a specific topic name and arguments
            // such as the data to pass along
            publish : function( topic, args ) {

                let topics = this.get('topics');

                if ( !topics[topic] ) {
                    return false;
                }
        
                let subscribers = topics[topic],
                    len = subscribers ? subscribers.length : 0;
        
                while (len--) {
                    subscribers[len].func( topic, args );
                }
                return true;
            },

            // Subscribe to events of interest
            // with a specific topic name and a
            // callback function, to be executed
            // when the topic/event is observed
            subscribe : function( topic, func , scope ) {
                
                let topics = this.get('topics');
        
                if (!topics[topic]) {
                    topics[topic] = [];
                }
                
                if(topics[topic].length){
                    var funcRegistered = false;
                    topics[topic].map((handlerObj)=>{
                        if(handlerObj.func == func){
                            funcRegistered = true;
                            handlerObj.scope = scope;
                        }
                    });
                    if(funcRegistered) return false;
                }

                let subUid = this.get('subUid');
                let token = ( ++subUid ).toString();
                this.set('subUid', subUid);

                topics[topic].push({
                    token: token,
                    func: func,
                    scope : scope
                });
                this.set('topics', topics);

                return token;
            },
        
            // Unsubscribe from a specific
            // topic, based on a tokenized reference
            // to the subscription
            unsubscribe : function( token ) {
                
                let topics = this.get('topics');

                for ( var m in topics ) {
                    if ( topics[m] ) {
                        for ( var i = 0, j = topics[m].length; i < j; i++ ) {
                            if ( topics[m][i].token === token ) {
                                topics[m].splice( i, 1 );
                                return token;
                            }
                        }
                    }
                }
                return true;
            }
        });