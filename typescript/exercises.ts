import { open } from "node:fs/promises"

export function change(amount: bigint): Map<bigint, bigint> {
  if (amount < 0) {
    throw new RangeError("Amount cannot be negative")
  }
  let counts: Map<bigint, bigint> = new Map()
  let remaining = amount
  for (const denomination of [25n, 10n, 5n, 1n]) {
    counts.set(denomination, remaining / denomination)
    remaining %= denomination
  }
  return counts
}

// Write your first then apply function here

export function firstThenApply<T, R>(arr: T[], predicate: (val: T) => boolean, transformer: (val: T) => R): R | undefined {

  // Find the first element that matches the predicate
  const firstMatch = arr.find((val) => predicate(val));

  // If match found, apply the transformer function
  if (firstMatch !== undefined) {
    return transformer(firstMatch);
  }

  // If no match is found
  return undefined;
}



// Write your powers generator here

export function* powersGenerator(base: bigint): Generator<bigint> {
  let exponent = 0n; 
  while (true) {
    yield base ** exponent;  
    exponent++;
  }
}



// Write your line count function here

// Write your shape type and associated functions here

export type Shape = Box | Sphere;

// Define the Box type
export interface Box {
  kind: "Box";
  readonly width: number;
  readonly length: number;
  readonly depth: number;
}

// Define the Sphere type
export interface Sphere {
  kind: "Sphere";
  readonly radius: number;
}

// Function to compute the surface area
export function surfaceArea(shape: Shape): number {
  switch (shape.kind) {
    case "Box":
      const { width, length, depth } = shape;
      return 2 * (width * length + width * depth + length * depth);
    case "Sphere":
      return 4 * Math.PI * shape.radius ** 2;
  }
}

// Function to compute the volume
export function volume(shape: Shape): number {
  switch (shape.kind) {
    case "Box":
      return shape.width * shape.length * shape.depth;
    case "Sphere":
      return (4 / 3) * Math.PI * shape.radius ** 3;
  }
}

// Function to check equality of two shapes (value-based equality)
export function equals(shape1: Shape, shape2: Shape): boolean {
  if (shape1.kind !== shape2.kind) return false;

  switch (shape1.kind) {
    case "Box":
      return (
        shape1.width === (shape2 as Box).width &&
        shape1.length === (shape2 as Box).length &&
        shape1.depth === (shape2 as Box).depth
      );
    case "Sphere":
      return shape1.radius === (shape2 as Sphere).radius;
  }
}

// Function to provide string representation of shapes
export function toString(shape: Shape): string {
  switch (shape.kind) {
    case "Box":
      return `Box(width: ${shape.width}, length: ${shape.length}, depth: ${shape.depth})`;
    case "Sphere":
      return `Sphere(radius: ${shape.radius})`;
  }
}

// Write your binary search tree implementation here
