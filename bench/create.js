var Benchmark = require("@nathanfaucett/benchmark"),
    mori = require("@nathanfaucett/mori"),
    Immutable = require("@nathanfaucett/immutable"),
    Set = require("..");


var suite = new Benchmark.Suite();


suite.add("immutable-set", function() {
    new Set(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
});

suite.add("Immutable", function() {
    Immutable.Set.of([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

suite.add("mori set", function() {
    mori.set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

suite.on("cycle", function(event) {
    console.log(String(event.target));
});

suite.on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").pluck("name"));
    console.log("==========================================\n");
});

console.log("\n= create =================================");
suite.run();
