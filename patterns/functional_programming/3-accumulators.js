/**
 * Accumulators
 * 
 * Accumulators aide in building up a single result by iterating over a collection. 
 * 
 * Many common operations such as summing up the elements of an array can be implemented using an accumulator 
 * instead of a loop.
 */
    //Ex. 1
        const peasants = [
            { name: "Jory Cassel", taxesOwed: 11, bankBalance: 50 },
            { name: "Vardis Egen", taxesOwed: 15, bankBalance: 20 }
        ];

        class TaxCollector {
            collect(items, value, projection) {
                if (items.length > 1)
                    return projection(items[0]) + this.collect(items.slice(1), value, projection);
                return projection(items[0]);
            }
        }
        
        const taxCollector = new TaxCollector();

        const projectionFunc = item => Math.min(item.taxesOwed, item.bankBalance);

        console.log(taxCollector.collect(peasants, 0, projectionFunc));