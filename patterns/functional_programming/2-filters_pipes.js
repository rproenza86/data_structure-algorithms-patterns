/**
 * Filters and pipes
 * 
 * A pipe is short hand for "take the output of program A and put it into program B."
 * 
 * Everything in JavaScript is an object, which means that we can have some real fun adding functionality to 
 * the existing objects to improve their look. Operating on collections of objects is a space in which functional 
 * programming provides some powerful features. 
 * 
 * Let's start by adding a simple filtering method to the array object. 
 * You can think of these queries as being like SQL database queries written in a functional fashion.
 */

/**
 * Fluent Interface
 * This method of returning a modified version of the original object without changing the original.
 * 
 * By not changing the original items array, we've introduced a small degree of immutability into our variables.
 */     
    // Ex. 1
        // We would like to provide a function that performs a match against each member of the array and returns a set of results:
        Array.prototype.where = function (inclusionTest) {
            const results = [];

            for (let i = 0, arrLength = this.length; i<arrLength; i++) {
                if (inclusionTest(this[i]))
                    results.push(this[i]);
            }

            return results;
        };

        // The rather simple looking function allows us to quickly filter an array:
        const items = [1,2,3,4,5,6,7,8,9,10];
        const inclusionTestEvenNumbers = thing => thing % 2 ==0;
        const inclusionTestMultipleThree = thing => thing % 3 ==0;

        items
        .where(inclusionTestEvenNumbers)// [ 2, 4, 6, 8, 10 ]
        .where(inclusionTestMultipleThree);// [ 6 ]

    // Ex. 2 If we add another function to our library of Array extensions, we can start to see how useful these pipes can be:
        Array.prototype.select = function(projection) {
            const results = [];

            for (let i = 0, arrLength = this.length; i<arrLength; i++) {
                results.push(projection(this[i]));
            }

            return results;
        };// This extension allows for projections of the original items based on an arbitrary projection function.

        // Given a set of objects that contain IDs and names, we can use our fluent extensions to arrays to perform complex operations:
        const children = [
            { id: 1, Name: "Rob" },
            { id: 2, Name: "Sansa" },
            { id: 3, Name: "Arya" },
            { id: 4, Name: "Brandon" },
            { id: 5, Name: "Rickon" }
        ];

        const inclusionEvenIds = person => person.id % 2 == 0;
        const projectionName = person => person.Name;

        const filteredChildren = children.where(inclusionEvenIds).select(projectionName); // ["Sansa", "Brandon"]
   