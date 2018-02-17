
/**
 * Interpreter: implements a specialized language.
 * 
 * There are situations where it is quite useful to create a language that is specific to one requirement. 
 * For instance, Structured Query Language (SQL) is very good at describing the querying of relational databases. 
 * Equally, regular expressions have proven themselves to be highly effective for the parsing and manipulation 
 * of text.
 * 
 *  There are many scenarios in which being able to create a simple language is useful. That's really the key: 
 * a simple language. Once the language gets more complicated, the advantages are quickly lost to the difficulty 
 * of creating what is, in effect, a compiler.
 * 
 * This pattern is different from those we've seen to this point as there is no real class structure that is 
 * defined by the pattern. You can design your language interpreter as you wish.
 */
    // Ex. 1
        class Sum {
            constructor(left, right) {
                this.left = left;
                this.right = right;
            }

            interpret() {
                return this.left.interpret() + this.right.interpret();
            }
        }

        class Min {
            constructor(left, right) {
                this.left = left;
                this.right = right;
            }

            interpret() {
                return this.left.interpret() - this.right.interpret();
            }
        }


        class Num {
            constructor(val) {
                this.val = val;
            }

            interpret() {
                return this.val;
            }
        }


        export { Num, Min, Sum };

    // Ex. 2
        var Context = function (input) {
            this.input = input;
            this.output = 0;
        }
        
        Context.prototype = {
            startsWith : function (str) {
                return this.input.substr(0, str.length) === str;
            }
        }
        
        var Expression = function (name, one, four, five, nine, multiplier) {
            this.name = name;
            this.one = one;
            this.four = four;
            this.five = five;
            this.nine = nine;
            this.multiplier = multiplier;
        }
        
        Expression.prototype = {
            interpret: function (context) {
                if (context.input.length == 0) {
                    return;
                }
                else if (context.startsWith(this.nine)) {
                    context.output += (9 * this.multiplier);
                    context.input = context.input.substr(2);
                }
                else if (context.startsWith(this.four)) {
                    context.output += (4 * this.multiplier);
                    context.input = context.input.substr(2);
                }
                else if (context.startsWith(this.five)) {
                    context.output += (5 * this.multiplier);
                    context.input = context.input.substr(1);
                }
                while (context.startsWith(this.one)) {
                    context.output += (1 * this.multiplier);
                    context.input = context.input.substr(1);
                }
            }
        }
        
        function run() {
            var roman = "MCMXXVIII"
            var context = new Context(roman);
            var tree = [];
        
            tree.push(new Expression("thousand", "M", " " , " ", " " , 1000));
            tree.push(new Expression("hundred",  "C", "CD", "D", "CM", 100));
            tree.push(new Expression("ten",      "X", "XL", "L", "XC", 10));
            tree.push(new Expression("one",      "I", "IV", "V", "IX", 1));
        
            for (var i = 0, len = tree.length; i < len; i++) {
                tree[i].interpret(context);
            }
        
            alert(roman + " = " + context.output);
        }

        // Ex. 3
            var Battle = (function () {
                function Battle(battleGround, agressor, defender, victor) {
                    this.battleGround = battleGround;
                    this.agressor = agressor;
                    this.defender = defender;
                    this.victor = victor;
                }

                return Battle;
            })();

            var Parser = (function () {
                function Parser(battleText) {
                    this.battleText = battleText;
                    this.currentIndex = 0;
                    this.battleList = battleText.split("\n");
                }

                Parser.prototype.nextBattle = function () {
                    if (!this.battleList[0])
                        return null;

                    var segments = this.battleList[0].match(/\((.+?)\s?->\s?(.+?)\s?<-\s?(.+?)\s?->\s?(.+)/);

                    return new Battle(segments[2], segments[1], segments[3],segments[4]);
                };

                return Parser;
            })();

            var text = "(Robert Baratheon -> River Trident <- RhaegarTargaryen) -> Robert Baratheon";
            var p = new Parser(text);
            p.nextBattle()