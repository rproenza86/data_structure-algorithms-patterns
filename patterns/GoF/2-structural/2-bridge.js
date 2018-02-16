/**
 * Bridge: decouples an abstraction from its implementation so that the two can vary independently.
 * 
 * The bridge pattern takes the adapter pattern to a new level. Given an interface, we can build 
 * multiple adapters, each one of which acts as an intermediary to a different implementation.
 * 
 * An excellent example across which I've run, is dealing with two different services that provide 
 * more or less the same functionality and are used in a failover configuration. Neither service provides 
 * exactly the interface required by the application and both services provide different APIs. In order 
 * to simplify the code, adapters are written to provide a consistent interface. The adapters implement a 
 * consistent interface and provide  lls so that each API can be called consistently. To expand on the shape 
 * sorter metaphor a bit more, we can imagine that we have a variety of different pegs we would like to use 
 * to fill the square hole.
 */

    // Ex. 1
        var Religion = {};

        class Sacrifice {
            constructor(offering = 'goat'){
                this._offering = `We offering a ${offering} to the gods!`;
            }

            getOffering() {
                console.log(this._offering);
            }
        }
        var OldGods = (function () {
            function OldGods() {}

            OldGods.prototype.prayTo = function (sacrifice) {
                if(sacrifice)
                    sacrifice.getOffering();
                console.log("We Old Gods hear your prayer");
            };
            
            return OldGods;
        })();
        Religion.OldGods = OldGods;

        class HumanSacrifice {
            constructor(offering = 'girl'){
                this._offering = `We offering a ${offering} to the gods!`;
            }

            getOffering() {
                console.log(this._offering);
            }
        }
        var DrownedGod = (function () {
            function DrownedGod() {}

            DrownedGod.prototype.prayTo = function (humanSacrifice) {            
                if(humanSacrifice)
                    humanSacrifice.getOffering();
                console.log("*BUBBLE* GURGLE");
            };

            return DrownedGod;
        })();
        Religion.DrownedGod = DrownedGod;

        class PrayerPurposeProvider {
            constructor(prayerPurpose = 'world peace'){
                this._prayerPurpose = `We pray for ${prayerPurpose}!`;
            }

            GetPurpose() {
                return this._prayerPurpose;
            }
        }
        var SevenGods = (function () {
            function SevenGods() {}

            SevenGods.prototype.prayTo = function (prayerPurpose) {          
                if(prayerPurpose)
                    console.log(prayerPurpose);
                else
                    console.log("Sorry there are a lot of us, it gets confusing here.  Did you pray for something?");
            };

            return SevenGods;
        })();
        Religion.SevenGods = SevenGods;


        // Adapters to act as a bridge between the classes we have and the signature we would like : interface God{ prayTo() {} }
        var OldGodsAdapter = (function () {
            function OldGodsAdapter() {
                this._oldGods = new OldGods();
            }

            OldGodsAdapter.prototype.prayTo = function () {
                var sacrifice = new Sacrifice();
                this._oldGods.prayTo(sacrifice);
            };

            return OldGodsAdapter;
        })();
        Religion.OldGodsAdapter = OldGodsAdapter;

        var DrownedGodAdapter = (function () {
            function DrownedGodAdapter() {
                this._drownedGod = new DrownedGod();
            }

            DrownedGodAdapter.prototype.prayTo = function () {
                var sacrifice = new HumanSacrifice();
                this._drownedGod.prayTo(sacrifice);
            };

            return DrownedGodAdapter;
        })();
        Religion.DrownedGodAdapter = DrownedGodAdapter;

        var SevenGodsAdapter = (function () {
            function SevenGodsAdapter() {
                this.prayerPurposeProvider = new PrayerPurposeProvider();
                this._sevenGods = new SevenGods();
            }

            SevenGodsAdapter.prototype.prayTo = function () {
                this._sevenGods.prayTo(this.prayerPurposeProvider.GetPurpose());
            };

            return SevenGodsAdapter;
        })();
        Religion.SevenGodsAdapter = SevenGodsAdapter;
        /**
         * Each one of these adapters implements the God interface we wanted and abstracts
         * away the complexity of dealing with three different interfaces: one for each God.
         */

        // To use the bridge pattern, we could write the following code:
        var god1 = new Religion.SevenGodsAdapter();
        var god2 = new Religion.DrownedGodAdapter();
        var god3 = new Religion.OldGodsAdapter();

        var gods = [god1, god2, god3];

        for(var i =0; i<gods.length; i++){
            gods[i].prayTo();
        }