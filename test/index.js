var tape = require("tape"),
    Set = require("..");


function createArray(size) {
    var array = new Array(size);

    while (size--) {
        array[size] = size;
    }

    return array;
}

tape("Set() should create new Set from passed arguments", function(assert) {
    assert.deepEqual(new Set(0, 1, 2).toArray(), [0, 1, 2]);
    assert.deepEqual(new Set([0, 1, 2]).toArray(), [0, 1, 2]);
    assert.deepEqual(new Set(createArray(1057)).size(), 1057);
    assert.deepEqual(new Set(createArray(31)).size(), 31);

    assert.end();
});

tape("Set.isSet(value) should return true if the object is a Set", function(assert) {
    var set = new Set(0, 1, 2),
        notSet = [];

    assert.equal(Set.isSet(set), true);
    assert.equal(Set.isSet(notSet), false);

    assert.end();
});

tape("Set size() should return size of the Set", function(assert) {
    assert.equal(new Set().size(), 0);
    assert.equal(new Set([1, 2]).size(), 2);
    assert.equal(new Set([1, 2], 3).size(), 2);
    assert.equal(new Set(1).size(), 1);
    assert.end();
});

tape("Set set(value : Any) should return a new Set with the new element if element is not in Set", function(assert) {
    var a = new Set(),
        b = a.set(0),
        c = b.set(1),
        d = c.set(2),
        e = d.set(3);

    assert.equal(b.get(0), 0);
    assert.equal(c.get(1), 1);
    assert.equal(d.get(2), 2);
    assert.equal(e.get(3), 3);

    assert.end();
});

tape("Set remove(value : Any) should return new Set without value", function(assert) {
    var a = new Set(0, 1, 2),
        b = a.remove(0),
        c = a.remove(1),
        d = a.remove(2);

    assert.deepEqual(b.toArray(), [1, 2]);
    assert.deepEqual(c.toArray(), [0, 2]);
    assert.deepEqual(d.toArray(), [0, 1]);

    assert.end();
});

tape("Set static equal(a : Set, b : Set) should return a deep equals of Set a and b", function(assert) {
    assert.equal(Set.equal(new Set(0, 1, 2), new Set(0, 1, 2)), true);
    assert.equal(Set.equal(new Set(0, 1, 2), new Set(1, 2, 3)), false);
    assert.equal(Set.equal(new Set(0, 1, 2), new Set(1, 2)), false);
    assert.equal(Set.equal(new Set(0, 1, 2), new Set()), false);
    assert.equal(Set.equal(new Set(0, 1, 2), new Set(0, 1, 3)), false);
    assert.equal(Set.equal(new Set(0, 1, 2), new Set(0, 1, 2, 3)), false);

    assert.end();
});

tape("Set iterator([reverse = false : Boolean]) (reverse = false) should return Iterator starting from the beginning", function(assert) {
    var a = new Set(0, 1, 2),
        it = a.iterator();

    assert.equal(it.next().value, 0);
    assert.equal(it.next().value, 1);
    assert.equal(it.next().value, 2);
    assert.equal(it.next().done, true);

    assert.end();
});

tape("Set iterator([reverse = false : Boolean]) (reverse = true) should return Iterator starting from the end", function(assert) {
    var a = new Set(0, 1, 2),
        it = a.iterator(true);

    assert.equal(it.next().value, 2);
    assert.equal(it.next().value, 1);
    assert.equal(it.next().value, 0);
    assert.equal(it.next().done, true);

    assert.end();
});

tape("Set every(callback[, thisArg])", function(assert) {
    assert.equals(
        Set.of([0, 1, 2, 3, 4, 5]).every(function(value) {
            return value !== -1;
        }),
        true
    );
    assert.equals(
        Set.of([0, 1, 2, 3, 4, 5]).every(function(value) {
            return value === 1;
        }),
        false
    );
    assert.end();
});

tape("Set filter(callback[, thisArg])", function(assert) {
    assert.deepEquals(
        Set.of([0, 1, 2, 3, 4]).filter(function(value) {
            return value % 2 === 0;
        }).toArray(), [0, 2, 4]
    );
    assert.end();
});

tape("Set forEach(callback[, thisArg])", function(assert) {
    var count = 0;

    Set.of([0, 1, 2, 3, 4]).forEach(function() {
        count += 1;
    });
    assert.equals(count, 5);

    count = 0;
    Set.of([0, 1, 2, 3, 4]).forEach(function(value) {
        count += 1;
        if (value === 2) {
            return false;
        }
    });
    assert.equals(count, 3);

    assert.end();
});

tape("Set forEachRight(callback[, thisArg])", function(assert) {
    var count = 0;

    Set.of([0, 1, 2, 3, 4]).forEachRight(function() {
        count += 1;
    });
    assert.equals(count, 5);

    count = 0;
    Set.of([0, 1, 2, 3, 4]).forEachRight(function(value) {
        count += 1;
        if (value === 2) {
            return false;
        }
    });
    assert.equals(count, 3);

    assert.end();
});

tape("Set map(callback[, thisArg])", function(assert) {
    assert.deepEquals(
        Set.of([0, 1]).map(function(value) {
            return value % 2;
        }).toArray(), [0, 1]
    );
    assert.end();
});

tape("Set reduce(callback[, thisArg])", function(assert) {
    assert.deepEquals(
        Set.of([0, 1, 2, 3, 4]).reduce(function(currentValue, value) {
            return currentValue + value;
        }),
        10
    );
    assert.end();
});

tape("Set reduceRight(callback[, thisArg])", function(assert) {
    assert.deepEquals(
        Set.of([0, 1, 2, 3, 4]).reduceRight(function(currentValue, value) {
            return currentValue + value;
        }),
        10
    );
    assert.end();
});

tape("Set some(callback[, thisArg])", function(assert) {
    assert.equals(
        Set.of([0, 1, 2, 3, 4, 5]).some(function(value) {
            return value === 3;
        }),
        true
    );
    assert.equals(
        Set.of([0, 1, 2, 3, 4, 5]).some(function(value) {
            return value === 6;
        }),
        false
    );
    assert.end();
});

tape("Set join([separator = \" \"]) should join all elements of an Set into a String", function(assert) {
    var set = new Set(0, 1, 2);

    assert.equal(set.join(), "0 1 2");
    assert.equal(set.join(","), "0,1,2");
    assert.equal(set.join(", "), "0, 1, 2");
    assert.end();
});

tape("Set toString() should return toString representation of Set", function(assert) {
    var set = new Set(0, 1, 2);
    assert.equal(set.toString(), "#{0 1 2}");
    assert.end();
});