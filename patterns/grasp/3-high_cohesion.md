# Design Principle: High Cohesion

## Cohesion

A module should have a small set of related responsibilities.

## Benefits

* Enhances understandability 
  - A small set of responsibilities is easier to understand

* Enhances reuse
  - A cohesive ser of responsibilities is more likely to recur in another application

## Foundations  

> How strongly related an focused the responsibilities of a class/module/package are.

> Low cohesion implies:

* Hard to reuse. 

* Hard to maintain. 

* Constantly changing.

## Discussion

* Very Low Cohesion: A Class is solely responsible for many things in very different functional areas

* Low Cohesion: A class has sole responsibility for a complex task in one functional area

* High Cohesion: A class has moderate responsibilities in one functional area and collaborates with other classes to fulfill tasks

* Advantages of high cohesion
  - Classes are easier to maintain

  - Easier to understand

  - Supports reuse because of fine grained responsibility

* Rule of thumb: a class with high cohesion has relatively few methods of highly related functionality; does not do too much work
