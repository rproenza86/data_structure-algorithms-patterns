/**
 * Dictionaries
 * A dictionary is a data structure that stores data as key-value pairs, such as the way a
    phone book stores its data as names and phone numbers. When you look for a phone
    number, you first search for the name, and when you find the name, the phone number
    is found right next to the name. The key is the element you use to perform a search, and
    the value is the result of the search.
 */
function Dictionary() {
    this.datastore = new Array();
    this.add = add;
    this.find = find;
    this.remove = remove;
    this.showAll = showAll;
    this.count = count;
    this.clear = clear;
}

function add(key, value) {
    this.datastore[key] = value;
}

function find(key) {
    return this.datastore[key];
}

function remove(key) {
    delete this.datastore[key];
}

function showAll(label = 'Full Dictionary list:') {
    console.group(label);
        for(let key of Object.keys(this.datastore).sort()) {
            console.log(key + " -> " + this.datastore[key]);
        }
    console.groupEnd();
}

function count() {
    let n = 0;
    for(let key in Object.keys(this.datastore)) {
        ++n;
    }
    return n;
}

function clear() {
    for(var key of Object.keys(this.datastore)) {
        delete this.datastore[key];
    }
}

// Using the Dictionary class
var pbook = new Dictionary();

pbook.add("Mike","123");
pbook.add("David", "345");
pbook.add("Cynthia", "456");

console.log("Number of entries: " + pbook.count());// Number of entries: 3
console.log("David's extension: " + pbook.find("David"));// David's extension: 345

pbook.remove("David");

pbook.showAll();/*
    Mike -> 123
    Cynthia -> 456
*/

pbook.clear();
console.log("Number of entries: " + pbook.count());// Number of entries: 0