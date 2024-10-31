"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.change = change;
exports.firstThenApply = firstThenApply;
exports.powersGenerator = powersGenerator;
exports.surfaceArea = surfaceArea;
exports.volume = volume;
exports.equals = equals;
exports.toString = toString;
function change(amount) {
    if (amount < 0) {
        throw new RangeError("Amount cannot be negative");
    }
    var counts = new Map();
    var remaining = amount;
    for (var _i = 0, _a = [25n, 10n, 5n, 1n]; _i < _a.length; _i++) {
        var denomination = _a[_i];
        counts.set(denomination, remaining / denomination);
        remaining %= denomination;
    }
    return counts;
}
// Write your first then apply function here
function firstThenApply(arr, predicate, transformer) {
    // Find the first element that matches the predicate
    var firstMatch = arr.find(function (val) { return predicate(val); });
    // If match found, apply the transformer function
    if (firstMatch !== undefined) {
        return transformer(firstMatch);
    }
    // If no match is found
    return undefined;
}
// Write your powers generator here
function powersGenerator(base) {
    var exponent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                exponent = 0n;
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, Math.pow(base, exponent)];
            case 2:
                _a.sent();
                exponent++;
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
// Function to compute the surface area
function surfaceArea(shape) {
    switch (shape.kind) {
        case "Box":
            var width = shape.width, length_1 = shape.length, depth = shape.depth;
            return 2 * (width * length_1 + width * depth + length_1 * depth);
        case "Sphere":
            return 4 * Math.PI * Math.pow(shape.radius, 2);
    }
}
// Function to compute the volume
function volume(shape) {
    switch (shape.kind) {
        case "Box":
            return shape.width * shape.length * shape.depth;
        case "Sphere":
            return (4 / 3) * Math.PI * Math.pow(shape.radius, 3);
    }
}
// Function to check equality of two shapes (value-based equality)
function equals(shape1, shape2) {
    if (shape1.kind !== shape2.kind)
        return false;
    switch (shape1.kind) {
        case "Box":
            return (shape1.width === shape2.width &&
                shape1.length === shape2.length &&
                shape1.depth === shape2.depth);
        case "Sphere":
            return shape1.radius === shape2.radius;
    }
}
// Function to provide string representation of shapes
function toString(shape) {
    switch (shape.kind) {
        case "Box":
            return "Box(width: ".concat(shape.width, ", length: ").concat(shape.length, ", depth: ").concat(shape.depth, ")");
        case "Sphere":
            return "Sphere(radius: ".concat(shape.radius, ")");
    }
}
// Write your binary search tree implementation here
