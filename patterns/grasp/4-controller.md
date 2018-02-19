# Design Principle: Controller

## Problem :

Given an event layer(UI) and a business layer, who has
the responsibility of receive the request from the UI layer?

What object receives and coordinates a system operation(event)?

## Solution :

* A class that represents the whole system.
    - Facade Controller Pattern

* A class that represents use case.
    - Use Case Controller Pattern

## Discussion : 

> A Controller is a coordinator
* does not to much work itself
* delegates to others objects

> Facade controllers suitable when not "too many" systems events
* one overall controller for the system

> Use case controller suitable when facade controller "bloated" with excessive responsibilities(low cohesion, high coupling)
* several smaller controllers for specific tasks

> Closely related to Facade design pattern

## Discussion of design goals/strategies : 

> Decrease coupling
* UI and domain/business logic are decoupled from each other
  - Understandability: can understand this isolation, leading to:
  - Evolvability: both the UI and domain logic are easier to change

* Both are coupled to the controller, which serves as a mediator, but this coupling is less harmful
  - The controller is a smaller and more stable interface
  - Changes to the domain logic affect the controller, not the UI
  - The UI can be changed without knowing the domain logic design

> Support reuse
* Controller serves as an interface to the domain logic
* Smaller, explicit interfaces support evolvability

> But, bloated controllers increase coupling and decrease cohesion; split if applicable