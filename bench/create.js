var Benchmark = require("benchmark"),
    mori = require("mori"),
    Immutable = require("immutable"),
    Set = require("..");


var suite = new Benchmark.Suite();


suite.add("immutable-set", function() {
    new Set(0, 1, 2, 3);
});

suite.add("Immutable", function() {
    Immutable.Set.of([0, 1, 2, 3]);
});

suite.add("mori set", function() {
    mori.hashMap(0, 0, 1, 1, 2, 2, 3, 3);
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
