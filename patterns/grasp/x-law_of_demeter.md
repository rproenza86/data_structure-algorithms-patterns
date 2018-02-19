# Law of Demeter

* Each module should have only limited knowledge about other units: only units "closely" related to the current unit

* In particular: Don’t talk to strangers!

* For instance, no a.getB().getC().foo()
```javascript
    for (Item i: shipment.getBox().getItems()) {
        i.getWeight() ...
    }
```