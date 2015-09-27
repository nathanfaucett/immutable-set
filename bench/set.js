var Benchmark = require("benchmark"),
    mori = require("mori"),
    Immutable = require("immutable"),
    Set = require("..");


var suite = new Benchmark.Suite();


suite.add("immutable-set", function() {
    var a = new Set(0, 1, 2, 3);

    return function() {
        a.set(4);
    };
}());

suite.add("Immutable", function() {
    var a = Immutable.Set.of([0, 1, 2, 3]);

    return function() {
        a.add(4);
    };
}());

suite.add("mori set", function() {
    var a = mori.hashMap(0, 0, 1, 1, 2, 2, 3, 3);

    return function() {
        mori.set(a, 4, 4);
    };
}());

suite.on("cycle", function(event) {
    console.log(String(event.target));
});

suite.on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").pluck("name"));
    console.log("=========================================\n");
});

console.log("\n= set ===================================");
suite.run();
