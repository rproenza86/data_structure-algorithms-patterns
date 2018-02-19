# Design Principle: Low Coupling

## Coupling
> When a class knows or depends on another class.

### Example: 
> How to minimize dependencies between classes?

If a class change the dependant class will be affected.

Examples:
* Inheritance
* Composition/ aggregation/ association
* A send messages to B

## How to reduce design change impacts?

1- Assign responsibilities taking care of not increasing coupling.
2- Zero coupling is almost "impossible" but should be the goal.
3- Avoid cycling coupling.

## Benefits

A module/class should depend on as few other modules as possible.

> What we will get:
* Enhances understandability(design for underst.) 

    – Limited understanding of context, easier to understand in isolation

* Reduces the cost of change(design for change)

    – Little context necessary to make changes

    – When a module interface changes, few modules are affected (reduced rippling effects)

* Enhances reuse(design for reuse)

    – Fewer dependencies, easier to adapt to a new context

## Coupling: Discussion

> Guideline: prefer composition to inheritance, to reduce coupling

> Prefer coupling to interfaces over coupling to implementations
