/**
 * Composite: composes zero-or-more similar objects so that they can be manipulated as one object.
 * 
 * The composite pattern is a special case of this in which the composite is treated as interchangeable with the components.
 * 
 * The key feature of the composite pattern is the interchangeability of a component with its children. 
 * So if we have a composite which implements IComponent, then all of the components of the composite will also implement IComponent.
 */

    // Ex. 1
        //Equipment
        class Equipment {

            getPrice() {
                return this.price || 0;
            }

            getName() {
                return this.name;
            }

            setName(name) {
                this.name = name;
            }
        }

        // --- composite ---
        class Composite extends Equipment {

            constructor() {
                super();
                this.equipments = [];
            }

            add(equipment) {
                this.equipments.push(equipment);
            }

            getPrice() {
                return this.equipments.map(equipment => {
                    return equipment.getPrice();
                }).reduce((a, b)  => {
                    return  a + b;
                });
            }
        }

        class Cabbinet extends Composite {
            constructor() {
                super();
                this.setName('cabbinet');
            }
        }

        // --- leafs ---
        class FloppyDisk extends Equipment {
            constructor() {
                super();
                this.setName('Floppy Disk');
                this.price = 70;
            }
        }

        class HardDrive extends Equipment {
            constructor() {
                super();
                this.setName('Hard Drive');
                this.price = 250;
            }
        }

        class Memory extends Equipment {
            constructor() {
                super();
                this.setName('Memory');
                this.price = 280;
            }
        }

        export { Cabbinet, FloppyDisk, HardDrive, Memory };

    // Ex. 2
        // A simple ingredient, one which would be a leaf node, is shown in the following code:
        var SimpleIngredient = (function () {
            function SimpleIngredient(name, calories, ironContent, vitaminCContent) {
                this.name = name;
                this.calories = calories;
                this.ironContent = ironContent;
                this.vitaminCContent = vitaminCContent;
            };

            SimpleIngredient.prototype.GetName = function () {
                return this.name;
            };

            SimpleIngredient.prototype.GetCalories = function () {
                return this.calories;
            };

            SimpleIngredient.prototype.GetIronContent = function () {
                return this.ironContent;
            };

            SimpleIngredient.prototype.GetVitaminCContent = function () {
                return this.vitaminCContent;
            };

            return SimpleIngredient;
        })();

        // It can be used interchangeably with a compound ingredient which has a list of ingredients, as shown in the following code:
        var CompoundIngredient = (function () {
            function CompoundIngredient(name) {
                this.name = name;
                this.ingredients = new Array();
            };

            CompoundIngredient.prototype.AddIngredient = function (ingredient) {
                    this.ingredients.push(ingredient);
            };
                
            CompoundIngredient.prototype.GetName = function () {
                return this.name;
            };

            CompoundIngredient.prototype.GetCalories = function () {
                var total = 0;

                for (var i = 0, ingTotal = this.ingredients.length; i < ingTotal; i++) {
                    total += this.ingredients[i].GetCalories();
                }

                return total;
            };

            CompoundIngredient.prototype.GetIronContent = function () {
                var total = 0;

                for (var i = 0, ingTotal = this.ingredients.length; i < ingTotal; i++) {
                    total += this.ingredients[i].GetIronContent();
                }
                
                return total;
            };

            CompoundIngredient.prototype.GetVitaminCContent = function () {
                var total = 0;

                for (var i = 0, ingTotal = this.ingredients.length; i < ingTotal; i++) {
                    total += this.ingredients[i].GetVitaminCContent();
                }

                return total;
            };

            return CompoundIngredient;
        })();
        /**
         * The composite ingredient loops over its internal ingredients and performs the same
         * operation on each of them. There is, of course, no need to de ne an interface due to
         * the prototype model.
         */

         // To make use of this compound ingredient, we might use the following code:
        var egg = new SimpleIngredient("Egg", 155, 6, 0);
        var milk = new SimpleIngredient("Milk", 42, 0, 0);
        var sugar = new SimpleIngredient("Sugar", 387, 0,0);
        var rice = new SimpleIngredient("Rice", 370, 8, 0);
        
        var ricePudding = new CompoundIngredient("Rice Pudding");

        ricePudding.AddIngredient(egg);
        ricePudding.AddIngredient(rice);
        ricePudding.AddIngredient(milk);
        ricePudding.AddIngredient(sugar);

        console.log("A serving of rice pudding contains:");
        console.log(ricePudding.GetCalories() + " calories");

