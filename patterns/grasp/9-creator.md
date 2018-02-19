# Design Principle: Creator

> Assign the responsibility to the class that knows/has the necessary information to fulfill the responsibility.

## Problem: 
> Who creates an A? 

## Solution: 
> Assign class responsibility of creating instances of a class A to B if: 

  - B aggregates A objects

  - B contains A objects

  - B records instances of A objects

  - B closely uses A objects

  - B has the initializing data for creating A objects

> The more the better: where there is a choice, prefer : B aggregates or contain A objects

* **Key idea**: Creator needs to keep reference anyway and will frequently use the created object

## Discussion

* Promotes low coupling, high cohesion

    - class responsible for creating objects it needs to reference

    - creating the objects themselves avoids depending on another class to create the object

* Promotes __evolvability__ (design for change)

    - Object creation is hidden, can be replaced locally

* Contra: sometimes objects must be created in special ways 
    - complex initialization

    - instantiate different classes in different circumstances

    - then __cohesion__ suggests putting creation in a different object 
        
        * see _design patterns_ such as builder, factory method