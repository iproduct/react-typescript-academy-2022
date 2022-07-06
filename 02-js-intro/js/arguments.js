function func1(a1, a2) {
    //console.log(arguments);
    // expected output: 1
  
    //console.log(arguments[1]);
    // expected output: 2
  
    //console.log(arguments[2]);
    // expected output: 3
    
    // let args = Array.prototype.slice.bind(arguments, 0);
    console.log(a1, a2)
    // console.log(args)
    let args2 = Array.from(arguments);
    [...arguments].forEach(a => console.log(a))
  }
  
  func1(1, 2, 3, 4, 5, 6);
  func1Bound4 = func1.bind(undefined, 1,2,3,4)
  func1Bound4(5, 6)