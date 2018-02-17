/**
 * State: allows an object to alter its behavior when its internal state changes.
 * 
 * State machines are an amazingly useful device in computer programming. Unfortunately, 
 * they are not used very frequently by most programmers. 
 * 
 * The state pattern is characterized by having a state manager that abstracts away the internal state and 
 * proxies message through to the appropriate state that is implemented as a class. All the logic within states 
 * and governing state transitions is governed by the individual state classes.
 * 
 * Splitting state into a class per state allows for much smaller blocks of code to debug and makes testing much easier.
 */

    // Ex. 1
        class OrderStatus {
            constructor(name, nextStatus) {
                this.name = name;
                this.nextStatus = nextStatus;
            }
        
            next() {
                return new this.nextStatus();
            }
        }
        
        class WaitingForPayment extends OrderStatus {
            constructor() {
                super('waitingForPayment', Shipping);
            }
        }
        
        class Shipping extends OrderStatus {
            constructor() {
                super('shipping', Delivered);
            }
        }
        
        
        class Delivered extends OrderStatus {
            constructor() {
                super('delivered', Delivered);
            }
        }
        
        class Order {
            constructor() {
                this.state = new WaitingForPayment();
            }
        
            nextState() {
                this.state = this.state.next();
            };
        }
        
        export default Order;

    // Ex. 2
        var BankAccountManager = (function () {
            function BankAccountManager() {
                this.currentState = new GoodStandingState(this);
            }

            BankAccountManager.prototype.Deposit = function (amount) {
                this.currentState.Deposit(amount);
            };

            BankAccountManager.prototype.Withdraw = function (amount) {
                this.currentState.Withdraw(amount);
            };

            BankAccountManager.prototype.addToBalance = function (amount) {
                this.balance += amount;
            };

            BankAccountManager.prototype.getBalance = function () {
                return this.balance;
            };

            BankAccountManager.prototype.moveToState = function (newState) {
                this.currentState = newState;
            };

            return BankAccountManager;
        })();

        var GoodStandingState = (function () {
            function GoodStandingState(manager = BankAccountManager) {
                this.manager = manager;
            }

            GoodStandingState.prototype.Deposit = function (amount) {
                this.manager.addToBalance(amount);
            };

            GoodStandingState.prototype.Withdraw = function (amount) {
                if (this.manager.getBalance() < amount) {
                    this.manager.moveToState(new OverdrawnState(this.manager));
                }
                this.manager.addToBalance(-1 * amount);
            };

            return GoodStandingState;
        })();

        var OverdrawnState = (function () {
            function OverdrawnState(manager) {
                this.manager = manager;
            }

            OverdrawnState.prototype.Deposit = function (amount) {
                this.manager.addToBalance(amount);

                if (this.manager.getBalance() > 0) {
                    this.manager.moveToState(new GoodStandingState(this.manager));
                }
            };

            OverdrawnState.prototype.Withdraw = function (amount) {
                this.manager.moveToState(new OnHold(this.manager));
                throw "Cannot withdraw money from an already overdrawn bank account";
            };

            return OverdrawnState;
        })();

        var OnHold = (function () {
            function OnHold(manager) {
                this.manager = manager;
            }

            OnHold.prototype.Deposit = function (amount) {
                this.manager.addToBalance(amount);
                throw "Your account is on hold and you must go to the bank to resolve the issue";
            };

            OnHold.prototype.Withdraw = function (amount) {
                throw "Your account is on hold and you must go to the bank to resolve the issue";
            };

            return OnHold;
        })();

        goodStandingState
        .on("withdraw")
        .when(function(manager){return manager.balance > 0;})
        .transitionTo("goodStanding")
        .when(function(manager){return manager.balance <=0;})
        .transitionTo("overdrawn");