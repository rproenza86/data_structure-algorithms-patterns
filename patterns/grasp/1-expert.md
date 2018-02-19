# Design Principle: Expert

> Assign the responsibility to the class that knows/has the necessary information to fulfill the responsibility.

## Example: 
> Who must to instantiate A objects? 

Class B must have that responsibility if:
* B is composed by A(composition)
* B knows the necessary information in order to instantiate A objects
* B depends *heavily* on A

Design Patters:
* Factory
* Abstract Factory