/**
 * Function passing
 * 
 * Functions can be assigned to variables and passed around just like you would with any other variable.
 * 
 * JavaScript allows for functions to be treated as variables and even as objects and strings. 
 * In this way, JavaScript is functional in nature.
 */
    // Ex. 1
        setTimeout(function(){console.log("Hello from the past")}, 5 * 1000);

    // Ex. 2
        $.ajax('http://some.external.resource',
            { success: function(json){
            //process returned data
            },
            error: function(){
            //process failure
            },
            dataType: "json"
        });

    // Ex. 3 Implementation
        var HamiltonianTour = (function () {
            function HamiltonianTour(options) {
                this.options = options;
            }

            HamiltonianTour.prototype.StartTour = function () {
                if (this.options.onTourStart && typeof (this.options.onTourStart) === "function")
                    this.options.onTourStart();

                this.VisitAttraction("King's Landing"); 
                this.VisitAttraction("Winterfell"); 
                this.VisitAttraction("Mountains of Dorne"); 
                this.VisitAttraction("Eyrie");

                if (this.options.onTourCompletion && typeof(this.options.onTourCompletion) === "function")
                    this.options.onTourCompletion();
            };

            HamiltonianTour.prototype.VisitAttraction = function(AttractionName) {
                if (this.options.onEntryToAttraction && typeof(this.options.onEntryToAttraction) === "function")
                    this.options.onEntryToAttraction(AttractionName);
                //do whatever one does in a Attraction
                if (this.options.onExitFromAttraction && typeof(this.options.onExitFromAttraction) === "function")
                    this.options.onExitFromAttraction(AttractionName);
            };

            return HamiltonianTour;
        })();

        var tour = new HamiltonianTour({ onEntryToAttraction: cityName => console.log(`I'm delighted to be in ${cityName}`) });

        tour.StartTour();/*
          Output:
            I'm delighted to be in King's Landing
            I'm delighted to be in Winterfell
            I'm delighted to be in Mountains of Dorne
            I'm delighted to be in Eyrie
        */