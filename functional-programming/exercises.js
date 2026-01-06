// Exercise 1: Pure functions
// The same input always gives the same output (idempotence), and has no side effects.
function exercise1() {
    console.clear();
    print("=== Exercise 1: Pure functions ===");
    /// Example of some Math.abs uses
    print(Math.abs('-1'));     // 1
    print(Math.abs(-1));       // 1
    print(Math.abs(null));     // 0
    print(Math.abs(Math.abs(Math.abs('-1'))));           // Still returns 1
    print(Math.abs(Math.abs(Math.abs(Math.abs('-1'))))); // Still returns 1
}

// Exercise 2: Higher order functions
function exercise2() {
    console.clear();
    print("=== Exercise 2: Higher order functions ===");
    const ages = [12,32,32,53]
    let finalAge = 0;
    // Here's a non-functional example
    for (var i=0; i < ages.length; i++) {
        finalAge += ages[i];
    }
    print(`Total age (non-functional): ${finalAge}`);

    // Here's a functional example
    const totalAge = ages.reduce( function(previousValue, currentValue){
        return previousValue + currentValue;
    })
    print(`Total age (functional): ${totalAge}`);

    // Functional example with pure recursive function
    const totalAgeCustom = myReduce(ages, function(acc, val) {
        return acc + val;
    }, 0);
    print(`Total age (functional - custom reduce): ${totalAgeCustom}`);
}

// Pure function that mimics reduce logic using recursion
function myReduce(array, callback, initialValue) {
    function reduceHelper(index, accumulator) {
        // Base case: reached end of array
        if (index === array.length) {
            return accumulator;
        }
        // Recursive case: apply callback and move to next element
        const newAccumulator = callback(accumulator, array[index]);
        return reduceHelper(index + 1, newAccumulator);
    }
    
    return reduceHelper(0, initialValue);
}

// Exercise 3: Avoid mutability
function exercise3() {
    console.clear();
    print("=== Exercise 3: Avoid mutability ===");
    const changingObject = {
        willChange: 10
    }
    changingObject.willChange = 10;  // no!
    print(`Changed value: ${changingObject.willChange}`);
    delete changingObject.willChange; // no!
    print(`Deleted value: ${changingObject.willChange}`);

    const obj = Object.freeze({
        cantChange: 'Locked'
    }) // The `freeze` function enforces immutability.

    obj.cantChange = 0      // Doesn't change the obj!
    print(`cantChange: ${obj.cantChange}`);
    delete obj.cantChange   // Doesn't change the obj!
    print(`cantChange after delete: ${obj.cantChange}`);
    obj.addProp = "Gotcha!" // Doesn't change the obj!
    print(`cantChange after addProp: ${obj.addProp}`);
}

function exercise4() {
    console.clear();
    print("=== Exercise 4: Recursion ===");

    // Factorial using recursion
    function factorial(n) {
        if (n === 0)
            return 1;
        return n * factorial(n - 1);
    }

    print(`Factorial of 5: ${factorial(5)}`);

    function recurse(start, end){
        if (start == end) {
            print(end)
            return;
        }
        print(start)
        return recurse(start+1, end)
    }

    print('Recursing from 1 to 10');
    recurse(1,10)
}

function exercise5() {
    console.clear();
    print("=== Exercise 5: Currying ===");

    function add(firstNum, secondNum){
        return firstNum + secondNum;
    }
    print(`Add 2 + 3 = ${add(2,3)}`);

    // Lets curry this function
    function curryAdd(firstNum){
        return function(secondNum){
                return firstNum + secondNum;
        }
    }
    print(`Curry Add 2 + 3 = ${curryAdd(2)(3)}`);

    let add10 = curryAdd(10);
    print(`Add 10 + 2 = ${add10(2)}`);
    print(`Add 10 + 5 = ${add10(5)}`);
    print(`Add 10 + 20 = ${add10(20)}`);
}

function exercise6() {
    console.clear();
    print("=== Exercise 6: Partial Application ===");

    function partial(fn, ...args) {
        return function(...newArgs) {
            return fn(...args, ...newArgs);
        };
    }
    function multiply(a, b, c) {
        return a * b * c;
    }
    const multiplyBy2 = partial(multiply, 2,);
    print(`2 * 3 * 4 = ${multiplyBy2(3,4)}`);
    print(`2 * 5 * 6 = ${multiplyBy2(5,6)}`);
    print(`2 * 7 * 8 = ${multiplyBy2(7,8)}`);

    const module = {
        height: 42,
        getComputedHeight: function(height) {
            return this.height + height;
        }
    };

    const unboundGetComputedHeight = module.getComputedHeight;
    print(`unboundGetComputedHeight direct usage: ${unboundGetComputedHeight(32)}`); // The function gets invoked at the global scope
    // outputs: NaN
    // Outputs NaN as this.height is undefined (on scope of window) so does 
    // undefined + 32 which returns NaN

    const boundGetComputedHeight = unboundGetComputedHeight.bind(module);
    print(`boundGetComputedHeight using bind: ${boundGetComputedHeight(32)}`);
    // expected output: 74

}

function exercise7() {
    console.clear();
    print("=== Exercise 7: Function Composition ===");
    // If we have these two functions
    function add10(num) {
        return num + 10;
    }
    function add100(num) {
        return num + 100;
    }

    // We can compose these two down to =>
    function composed(num){
        return add10(add100(num));
    }
    print(`composed(1): ${composed(1)}`); // Returns 111

    // Or we can make a generic compose function
    function compose(f, g) {
        return function(x) {
            return f(g(x));
        };
    }

    const add10ThenAdd100 = compose(add100, add10);
    print(`add10ThenAdd100(1): ${add10ThenAdd100(25)}`); // Returns 135
}

function print(data){
    console.log(data);
}