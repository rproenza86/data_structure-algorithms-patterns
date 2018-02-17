/**
 * Lazy instantiation
 * 
 * If you go into a high-end coffee shop and place an order for some overly complex beverage (Grande Chai Tea Latte, Three Pump, 
 * Skim Milk, Lite Water, No Foam, Extra Hot anybody?), then that beverage is going to be made on the fly and not 
 * in advance. Even if the coffee shop knew what all the orders that were going to come in that day would be, they 
 * would still not make all the beverages up front. Firstly, because it would result in a large number of ruined, 
 * cold beverages, and secondly, it would be a very long time for the first customer to get their order if they had 
 * to wait for all the orders of the day to be completed.
 * 
 * Instead coffee shops, follow a just-in-time approach to craft beverages. They make them when they're ordered. 
 * We can apply a similar approach to our code through the use of a technique known as lazy instantiation or lazy 
 * initialization.
 * 
 * Consider an object that is expensive to create, that is to say that it takes a great deal of time to create the 
 * object. If we are unsure if the object's value will be needed, we can defer its full creation until later.
 */

class Bread {
    constructor(breadType) {
        this.breadType = breadType;
        //some complex, time consuming operation
        console.log("Bread " + breadType + " created.");
    }
};

class Bakery {
    constructor() {
        this.requiredBreads = [];
    }
    
    orderBreadType(breadType) {
        this.requiredBreads.push(breadType);
    }

    pickUpBread(breadType) {
        console.log("Pickup of bread " + breadType + " requested");
        if (!this.breads) {
            this.createBreads();
        }
        for (let i = 0, breadsLength = this.breads.length; i < breadsLength; i++) {
            if (this.breads[i].breadType == breadType)
                return this.breads[i];
        }
    }

    createBreads() {
        this.breads = [];
        for (let i = 0, requiredBreadsLength = this.requiredBreads.length; i < requiredBreadsLength; i++) {
            this.breads.push(new Bread(this.requiredBreads[i]));
        }
    }
};

const bakery = new Bakery();

bakery.orderBreadType("Brioche");
bakery.orderBreadType("Anadama bread");
bakery.orderBreadType("Chapati");
bakery.orderBreadType("Focaccia");

console.log(bakery.pickUpBread("Brioche").breadType + "pickedup");/*
    Pickup of bread Brioche requested.
    Bread Brioche created.
    Bread Anadama bread created.
    Bread Chapati created.
    Bread Focaccia created.
    Brioche picked up
*/
