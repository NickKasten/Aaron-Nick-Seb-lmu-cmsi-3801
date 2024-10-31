"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_test_1 = require("node:test");
var strict_1 = require("node:assert/strict");
var exercises_js_1 = require("./exercises.js");
function expectChange(amount, _a) {
    var q = _a[0], d = _a[1], n = _a[2], p = _a[3];
    (0, strict_1.deepEqual)((0, exercises_js_1.change)(amount), new Map([
        [25n, q],
        [10n, d],
        [5n, n],
        [1n, p],
    ]));
}
(0, node_test_1.describe)("The change function", function () {
    (0, node_test_1.it)("throws on negative", function () {
        (0, strict_1.throws)(function () { return (0, exercises_js_1.change)(-50n); }, /RangeError/);
    });
    (0, node_test_1.it)("works for 0", function () {
        expectChange(0n, [0n, 0n, 0n, 0n]);
    });
    (0, node_test_1.it)("works for the usual cases", function () {
        expectChange(1n, [0n, 0n, 0n, 1n]);
        expectChange(8n, [0n, 0n, 1n, 3n]);
        expectChange(42n, [1n, 1n, 1n, 2n]);
        expectChange(99n, [3n, 2n, 0n, 4n]);
        expectChange(144n, [5n, 1n, 1n, 4n]);
        expectChange(250n, [10n, 0n, 0n, 0n]);
    });
    (0, node_test_1.it)("can handle really big values", function () {
        expectChange(100000000037n, [4000000001n, 1n, 0n, 2n]);
        expectChange(10000000000005n, [400000000000n, 0n, 1n, 0n]);
    });
});
// Uncomment the following tests as you complete the exercises
(0, node_test_1.describe)("The firstThenApply function", function () {
    var nonEmpty = function (s) { return s !== ""; };
    var lengthGreaterThan3 = function (s) { return s.length > 3; };
    var lower = function (s) { return s.toLowerCase(); };
    var square = function (n) { return n * n; };
    (0, node_test_1.it)("works", function () {
        (0, strict_1.deepEqual)((0, exercises_js_1.firstThenApply)([], nonEmpty, lower), undefined);
        (0, strict_1.deepEqual)((0, exercises_js_1.firstThenApply)(["", "A", "B"], nonEmpty, lower), "a");
        (0, strict_1.deepEqual)((0, exercises_js_1.firstThenApply)(["", "A", "ABC"], lengthGreaterThan3, lower), undefined);
        (0, strict_1.deepEqual)((0, exercises_js_1.firstThenApply)(["ABC", "ABCD", "ABCDE"], lengthGreaterThan3, lower), "abcd");
        (0, strict_1.deepEqual)((0, exercises_js_1.firstThenApply)([1, 2, 3], function (n) { return n > 1; }, square), 4);
        (0, strict_1.deepEqual)((0, exercises_js_1.firstThenApply)([1, 2, 3], function (n) { return n > 3; }, square), undefined);
    });
});
(0, node_test_1.describe)("The powers generator", function () {
    (0, node_test_1.it)("works as expected", function () {
        var g1 = (0, exercises_js_1.powersGenerator)(2n);
        (0, strict_1.deepEqual)(g1.next(), { value: 1n, done: false });
        (0, strict_1.deepEqual)(g1.next(), { value: 2n, done: false });
        for (var i = 0; i < 98; i++)
            g1.next();
        (0, strict_1.deepEqual)(g1.next(), {
            value: 1267650600228229401496703205376n,
            done: false,
        });
        var g2 = (0, exercises_js_1.powersGenerator)(3n);
        (0, strict_1.deepEqual)(g2.next(), { value: 1n, done: false });
        (0, strict_1.deepEqual)(g2.next(), { value: 3n, done: false });
        (0, strict_1.deepEqual)(g2.next(), { value: 9n, done: false });
        (0, strict_1.deepEqual)(g2.next(), { value: 27n, done: false });
        (0, strict_1.deepEqual)(g2.next(), { value: 81n, done: false });
    });
});
// describe("The meaningfulLineCount function", async () => {
//   await it("throws if no such file", async () => {
//     rejects(async () => await meaningfulLineCount("NoSuchFile.txt"), /Error/)
//   })
//   await it("correctly counts lines for the test file", async () => {
//     const count = await meaningfulLineCount("../test-for-line-count.txt")
//     deepEqual(count, 5)
//   })
// })
(0, node_test_1.describe)("The shape functions", function () {
    var sphere = { kind: "Sphere", radius: 5 };
    var box = { kind: "Box", width: 3, length: 4, depth: 5 };
    (0, node_test_1.it)("calculates volumes correctly", function () {
        (0, strict_1.deepEqual)((0, exercises_js_1.volume)(sphere), 523.5987755982989);
        (0, strict_1.deepEqual)((0, exercises_js_1.volume)(box), 60);
    });
    (0, node_test_1.it)("calculates surface areas correctly", function () {
        (0, strict_1.deepEqual)((0, exercises_js_1.surfaceArea)(sphere), 314.1592653589793);
        (0, strict_1.deepEqual)((0, exercises_js_1.surfaceArea)(box), 94);
    });
});
// describe("The BinarySearchTree class", () => {
//   let t: BinarySearchTree<string>
//   it("starts empty", () => {
//     t = new Empty()
//     deepEqual(t.size(), 0)
//     deepEqual(t.contains("A"), false)
//     deepEqual(`${t}`, "()")
//   })
//   it("can insert elements", () => {
//     t = t.insert("G")
//     deepEqual(t.size(), 1)
//     deepEqual(t.contains("G"), true)
//     deepEqual(t.contains("A"), false)
//     deepEqual(`${t}`, "(G)")
//     t = t.insert("B")
//     deepEqual(`${t}`, "((B)G)")
//     t = t.insert("D")
//     deepEqual(`${t}`, "((B(D))G)")
//     t = t.insert("H")
//     deepEqual(`${t}`, "((B(D))G(H))")
//     t = t.insert("A")
//     deepEqual(`${t}`, "(((A)B(D))G(H))")
//     t = t.insert("C")
//     t = t.insert("J")
//     deepEqual(t.size(), 7)
//     deepEqual(t.contains("J"), true)
//     deepEqual(t.contains("Z"), false)
//     deepEqual(`${t}`, "(((A)B((C)D))G(H(J)))")
//   })
//   it("is immutable", () => {
//     let t2 = t
//     t2 = t2.insert("F")
//     deepEqual(t2.size(), 8)
//     deepEqual(t.size(), 7)
//   })
//   it("can iterate in order", () => {
//     deepEqual([...t.inorder()], ["A", "B", "C", "D", "G", "H", "J"])
//     let t2: BinarySearchTree<number> = new Empty()
//     deepEqual([...t2.inorder()], [])
//     t2 = t2.insert(5)
//     deepEqual([...t2.inorder()], [5])
//     t2 = t2.insert(3)
//     t2 = t2.insert(8)
//     deepEqual([...t2.inorder()], [3, 5, 8])
//   })
//   it("ignores insertions if values are already present", () => {
//     let t: BinarySearchTree<boolean> = new Empty()
//     t = t.insert(true)
//     t = t.insert(false)
//     t = t.insert(true)
//     deepEqual(t.size(), 2)
//   })
// })
