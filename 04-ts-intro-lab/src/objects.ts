interface Shape {} // === any
declare function getShape(): Shape;

interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

// ---cut---
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos);
  //                             ^?
  console.log("y coordinate at", yPos);
  //                             ^?
  // ...
}

// readonly array

// function doStuff(values: readonly string[]) {
function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
 
  // ...but we can't mutate 'values'.
  // values.splice(0, 2, "hello!");
}


// tuple destructuring
function doSomething([inputString, hash]: [string, number]) {
  console.log(inputString);
  console.log(hash);
}

doSomething(['abc', 42])
