/**
 * Iterator: accesses the elements of an object sequentially without exposing its underlying representation.
 * 
 * An iterator is a pattern that provides a simple method to select, sequentially, the next item in a collection.
 */
    // Ex. 1
        class Iterator {
            constructor(el) {
                this.index = 0;
                this.elements = el;
            }
        
            next() {
                return this.elements[this.index++];
            }
        
            hasNext() {
                return this.index < this.elements.length;
            }
        }
        
        export default Iterator;

    // Ex. 2
        /*
            * Each call to iterator.next should log out an object with the following info:
            *   - key: the key from the `james` object
            *   - value: the value of the key from the `james` object
            *   - done: true or false if there are more keys/values
        */
       const james = {
            name: 'James',
            height: `5'10"`,
            weight: 185,
            
            [Symbol.iterator]: function() {
                const keys = Object.keys(this);
                let pointer = 0;
                const next = () => {
                    return {
                        key: keys[pointer],
                        value: this[keys[pointer]],
                        done: ++pointer >= keys.length
                    }
                }
        
                return { next }
            }
        };
        
        const iterator = james[Symbol.iterator]();
        
        console.log(iterator.next().value); // 'James'
        console.log(iterator.next().value); // `5'10`
        console.log(iterator.next().value); // 185