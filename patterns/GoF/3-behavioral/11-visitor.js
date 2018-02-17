/**
 * Visitor: separates an algorithm from an object structure by moving the hierarchy of methods into one object.
 * 
 * Visitor provides for a method of decoupling an algorithm from the object structure on which it operates. 
 * 
 * If we wanted to perform some action over a collection of objects that differ in type and we want to perform 
 * a different action depending on the object type, we would typically need to make use of a large if statement.
 */
    // Ex. 1
        function bonusVisitor(employee) {
            if (employee instanceof Manager)
                employee.bonus = employee.salary * 2;
            if (employee instanceof Developer)
                employee.bonus = employee.salary;
        }
        
        class Employee {
            constructor(salary) {
                this.bonus = 0;
                this.salary = salary;
            }
        
            accept(visitor) {
                visitor(this);
            }
        }
        
        class Manager extends Employee {
            constructor(salary) {
                super(salary);
            }
        }
        
        class Developer extends Employee {
            constructor(salary) {
                super(salary);
            }
        }
        
        export { Developer, Manager, bonusVisitor };

    // Ex. 2
        var Knight = (function () {
            function Knight() {}

            Knight.prototype.printName = function () {
                console.log("Knight");
            };

            return Knight;
        })();

        var collection = [];

        collection.push(new Knight());
        collection.push(new FootSoldier());
        collection.push(new Lord());
        collection.push(new Archer());

        for (var i = 0; i < collection.length; i++) {
            if (typeof (collection[i]) == 'Knight')
                collection[i].printName();
            else
                console.log("Not a knight");
        }

    // Ex. 3
        var Knight = (function () {
            function Knight() {
                this._type = "Knight";
            }

            Knight.prototype.printName = function () {
                console.log("Knight");
            };

            Knight.prototype.visit = function (visitor) {
                visitor.visit(this);
            };

            return Knight;
        })();

        var SelectiveNamePrinterVisitor = (function () {
            function SelectiveNamePrinterVisitor() {}

            SelectiveNamePrinterVisitor.prototype.Visit = function(memberOfArmy) {
                if (memberOfArmy._type == "Knight") {
                    this.VisitKnight(memberOfArmy);
                } else {
                    console.log("Not a knight");
                }
            };

            SelectiveNamePrinterVisitor.prototype.VisitKnight = function(memberOfArmy) {
                memberOfArmy.printName();
            };

            return SelectiveNamePrinterVisitor;
        })();


        var collection = [];

        collection.push(new Knight());
        collection.push(new FootSoldier());
        collection.push(new Lord());
        collection.push(new Archer());

        var visitor = new SelectiveNamePrinterVisitor();

        for (var i = 0; i < collection.length; i++) {
            collection[i].visit(visitor);
        }