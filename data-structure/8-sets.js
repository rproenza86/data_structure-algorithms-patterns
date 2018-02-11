/**
 * SETS
 * 
 * A set is a collection of unique elements. The elements of a set are called members.
 * 
 * The two most important properties of sets are that the members of a set are unordered and
    that no member can occur in a set more than once.

    Sets can be useful when you want to create a data structure that consists only of unique
    elements, such as a list of each unique word in a text.

    Here are some definitions you need to know to work with sets:
        • A set containing no members is called the empty set. The universe is the set of all
        possible members.
        • Two sets are considered equal if they contain exactly the same members.
        • A set is considered a subset of another set if all the members of the first set are
        contained in the second set.

    Set Operations
        The fundamental operations performed on sets are:
        Union
            A new set is obtained by combining the members of one set with the members of
            another set.
        Intersection
            A new set is obtained by adding all the members of one set that also exist in a second
            set.
        Difference
            A new set is obtained by adding all the members of one set except those that also
            exist in a second set
 */
class Set {
  constructor() {
    this.dataStore = [];
  }

  add(data) {
    if (this.dataStore.indexOf(data) < 0) {
      this.dataStore.push(data);
      return true;
    } else {
      return false;
    }
  }

  remove(data) {
    const pos = this.dataStore.indexOf(data);

    if (pos > -1) {
      this.dataStore.splice(pos, 1);
      return true;
    } else {
      return false;
    }
  }

  show() {
    return this.dataStore;
  }

  size() {
    return this.dataStore.length;
  }

  contains(data) {
    if (this.dataStore.indexOf(data) > -1) {
      return true;
    } else {
      return false;
    }
  }

  union(set = new Set()) {
    const tempSet = new Set();
    const dsLength = this.dataStore.length;
    const setLength = set.dataStore.length;

    for (let i = 0; i < dsLength; ++i) {
      tempSet.add(this.dataStore[i]);
    }

    for (let i = 0; i < setLength; ++i) {
      if (!tempSet.contains(set.dataStore[i])) {
        // tempSet.dataStore.push(set.dataStore[i]);
        tempSet.add(set.dataStore[i]);
      }
    }

    return tempSet;
  }

  intersect(set = new Set()) {
    const tempSet = new Set();
    const dsLength = this.dataStore.length;

    for (let i = 0; i < dsLength; ++i) {
      if (set.contains(this.dataStore[i])) {
        tempSet.add(this.dataStore[i]);
      }
    }

    return tempSet;
  }

  subset(set = new Set()) {
    if (this.size() > set.size()) {
      return false;
    } else {
      for (let member of this.dataStore) {
        if (!set.contains(member)) {
          return false;
        }
      }
    }

    return true;
  }

  difference(set = new Set()) {
    const tempSet = new Set();
    const dsLength = this.dataStore.length;

    for (let i = 0; i < dsLength; ++i) {
      if (!set.contains(this.dataStore[i])) {
        tempSet.add(this.dataStore[i]);
      }
    }

    return tempSet;
  }
}

// Test Using the Set class
const names = new Set();

names.add("David");
names.add("Jennifer");
names.add("Cynthia");
names.add("Mike");
names.add("Raymond");

if (names.add("Mike")) {
    console.log("Mike added");
} else {
    console.log("Can't add Mike, must already be in set");
}// Can't add Mike, must already be in set

console.log(names.show()); // (5) ["David", "Jennifer", "Cynthia", "Mike", "Raymond"]

let removed = "Mike";
if (names.remove(removed)) {
    console.log(removed + " removed.");
}
else {
    console.log(removed + " not removed.");
}// Mike removed.

names.add("Clayton");
console.log(names.show());// (5) ["David", "Jennifer", "Cynthia", "Raymond", "Clayton"]

removed = "Alisa";
if (names.remove("Alisa")) {
    console.log(removed + " removed.");
} else {
    console.log(removed + " not removed.");
}// Alisa not removed.

// Test Computing the union of two sets
const cis = new Set();
cis.add("Mike");
cis.add("Clayton");
cis.add("Jennifer");
cis.add("Raymond");

const dmp = new Set();
dmp.add("Raymond");
dmp.add("Cynthia");
dmp.add("Jonathan");

let it = new Set();
it = cis.union(dmp);

console.log(it.show()); // (6) ["Mike", "Clayton", "Jennifer", "Raymond", "Cynthia", "Jonathan"]


// Test Computing the intersection of two sets
const inter = cis.intersect(dmp);

console.log(inter.show()); // displays Raymond

// Test Computing the subset of two sets
it.add("Cynthia");
it.add("Clayton");
it.add("Jennifer");
it.add("Danny");
it.add("Jonathan");
it.add("Terrill");
it.add("Raymond");
it.add("Mike");

if (dmp.subset(it)) {
    console.log("DMP is a subset of IT.");
}
else {
    console.log("DMP is not a subset of IT.");
}// DMP is a subset of IT.

// Test Computing the difference of two sets
const cis2 = new Set();
const it2 = new Set();

cis2.add("Clayton");
cis2.add("Jennifer");
cis2.add("Danny");

it2.add("Bryan");
it2.add("Clayton");
it2.add("Jennifer");

let diff = new Set();
diff = cis2.difference(it2);

console.log(`[${cis2.show()}] difference [${it2.show()}] -> [${diff.show()}]`);
// [Clayton,Jennifer,Danny] difference [Bryan,Clayton,Jennifer] -> [Danny]