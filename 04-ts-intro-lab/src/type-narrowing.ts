//1. typeof narowing
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

console.log(padLeft(12, "Hello"));
console.log(padLeft("____________", "Hello"));


// 2. equality narrowing
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    // 3. falsy narrowing
    if (strs) {
      for (const s of strs) {
        console.log(s);
      }
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}

printAll(null);
printAll("hello");
printAll(["hello", "world"]);


// 4. in narrowing
type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
  return animal.fly();
}

function getSmallPet() {
  return Math.random() < 0.5 ? { swim() { console.log("Fish is swimming"); return } } as Fish 
  : { fly() { console.log("Bird is flying"); return } } as Bird;
}

move(getSmallPet());