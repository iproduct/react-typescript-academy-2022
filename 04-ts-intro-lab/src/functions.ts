// call signatures
// interface DescribableFunction {
//     description: string;
//     (someArg: number): boolean;
// }

// interface DescribableFunction {
//     tags: string[]
// }

type BaseFunction = {
    description: string;
    (someArg: number): boolean;
}

type DescribableFunction = BaseFunction & {
    tags: string[]
}

function doSomething(fn: DescribableFunction) {
    console.log(fn.description + `, tags: ${fn.tags.join(', ')}` + " returned " + fn(60));
}

const f: DescribableFunction = function (n: number) {
    return n > 42;
}

f.description = 'demo function'
f.tags = ['intro', 'ts', 'functions']

doSomething(f)

// constructor signature
type SomeObject = any;
// ---cut---
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("2022-11-17");
}

const obj = fn(Date);
console.log(obj);

const obj2 = fn(String);
console.log(obj2);