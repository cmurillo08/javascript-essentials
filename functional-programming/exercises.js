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

function exercise1Desc() {
    return `
        <p>Pure functions are functions that:</p>
        <ul>
            <li>Always return the same output for the same input (idempotence)</li>
            <li>An idempotent function, is one that, when you reapply the results to that function again, doesn't produce a different result.</li>
            <li>Have no side effects (don't modify external state)</li>
            <li>Don't depend on external state</li>
        </ul>
        <p><a href="https://www.freecodecamp.org/news/functional-programming-in-javascript/" target="_blank">Learn more...</a></p>
    `;
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
    const totalAge = ages.reduce( function(accumulator, currentValue){
        return accumulator + currentValue;
    })
    print(`Total age (functional): ${totalAge}`);

    // Functional example with pure recursive function
    const totalAgeCustom = myReduce(ages, (acc, val) => acc + val, 0);

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

function exercise2Desc() {
    return `
        <p>Higher order functions are functions that:</p>
        <ul>
            <li>A function that either takes a function as an argument, returns a function, or both! You can use higher order functions to stop repeating yourself in your code.</li>
            <li>Examples include map, filter, reduce, etc.</li>
        </ul>
        <p><a href="https://www.freecodecamp.org/news/higher-order-functions-in-javascript-examples/" target="_blank">Learn more...</a></p>
    `;
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

function exercise3Desc() {
    return `
        <p>Basically, it boils down to this:</p>
        <ul>
            <li>Don't change things! Once you've made it, it is immutable (unchanging over time).</li>
            <li>We declare function arguments – any computation inside a function depends only on the arguments, and not on any global object or variable.</li>
            <li>We don't alter a variable or object – create new variables and objects and return them if need be from a function.</li>
        </ul>
        <p><a href="https://www.freecodecamp.org/news/functional-programming-in-javascript/" target="_blank">Learn more...</a></p>
    `;
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

function exercise4Desc() {
    return `
        <p>Recursion magic:</p>
        <ul>
            <li>Recursion allows us to stop mutating state variables, for one. There are also certain data structures (tree structures) that are more efficient when solved with recursion</li>
            <li>A function that calls itself in order to solve a problem. It typically has a base case to stop the recursion and a recursive case to continue the process.</li>
            <li>Common examples include calculating factorials, traversing tree structures, and solving problems like the Fibonacci sequence.</li>
        </ul>
        <p><a href="https://www.freecodecamp.org/news/functional-programming-in-javascript/" target="_blank">Learn more...</a></p>
    `;
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

function exercise5Desc() {
    return `
        <p>Curring magic:</p>
        <ul>
            <li>Curring allows us to transform a function with multiple arguments into a series of functions that each take a single argument.</li>
            <li>This can help with function reuse and creating specialized versions of general functions.</li>
            <li>Common use cases include event handling, functional programming patterns, and creating more readable code.</li>
        </ul>

        <p><a href="https://www.freecodecamp.org/news/functional-programming-in-javascript/" target="_blank">Learn more...</a></p>

        <p><strong>Key Difference: Currying vs Partial Application</strong></p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr style="background-color: #f0f0f0;">
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;"></th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Currying</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Partial Application</th>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;"><strong>Arguments</strong></td>
                <td style="border: 1px solid #ddd; padding: 8px;">One argument per call</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Multiple arguments at once</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
                <td style="border: 1px solid #ddd; padding: 8px;"><strong>Example</strong></td>
                <td style="border: 1px solid #ddd; padding: 8px;"><code>curry(2)(3)</code></td>
                <td style="border: 1px solid #ddd; padding: 8px;"><code>partial(2)(3, 4)</code></td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;"><strong>Return Value</strong></td>
                <td style="border: 1px solid #ddd; padding: 8px;">Always returns a function</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Can return final result</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
                <td style="border: 1px solid #ddd; padding: 8px;"><strong>Behavior</strong></td>
                <td style="border: 1px solid #ddd; padding: 8px;">Transforms structure</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Fixes some, leaves rest flexible</td>
            </tr>
        </table>
    `;
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

    print("\n--- bind() Example: Event Handler ---");
    const user = {
        name: "John",
        greetings: [],
        addGreeting: function(greeting) {
            this.greetings.push(`${this.name} says: ${greeting}`);
            print(this.greetings[this.greetings.length - 1]);
        }
    };

    // Without bind - 'this' is lost
    const unboundAddGreeting = user.addGreeting;
    print("Without bind:");
    try {
        unboundAddGreeting("Hello");  // This will error
    } catch(error) {
        print(`Error without bind: ${error.message}`);
    }

    // With bind - 'this' is locked to user
    print("\nWith bind:");
    const boundAddGreeting = unboundAddGreeting.bind(user);
    boundAddGreeting("Hello");     // "John says: Hello"
    boundAddGreeting("Hi there");  // "John says: Hi there"
    
    print(`\nGreetings stored: ${user.greetings.length} messages`);
}

function exercise6Desc() {
    return `
        <p>Partial Application magic:</p>
        <ul>
            <li>Partial application means that you apply a few arguments to a function at a time and return another function that is applied to more arguments.</li>
            <li><strong>bind()</strong> is the best example of partial application. Why? Because we return an inner function that gets assigned to a variable that gets called later, with <strong>this</strong> scope correctly set up and a new argument passed in later.</li>
            <li>With partial application, you create specialized versions of general functions by pre-filling some arguments.</li>
            <li>This allows for better code reuse and more readable, maintainable code.</li>
        </ul>
        <p><a href="https://www.freecodecamp.org/news/functional-programming-in-javascript/" target="_blank">Learn more...</a></p>
    `;
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

function exercise7Desc() {
    return `
        <p>Function Composition magic:</p>
        <ul>
            <li>Function composition is the process of combining two or more functions to produce a new function.</li>
            <li>It allows for the creation of more complex functions by composing simpler ones.</li>
            <li>Common use cases include data transformation pipelines and middleware in web applications.</li>
        </ul>
        <p><a href="https://www.freecodecamp.org/news/functional-programming-in-javascript/" target="_blank">Learn more...</a></p>
    `;
}

function exercise8() {
    console.clear();
    print("=== Exercise 8: IIFE (Immediately Invoked Function Expression) ===");
        // standard IIFE
        (function () {
            print('standard IIFE executed');
        })();

        // arrow function variant
        (() => {
            print('arrow function IIFE executed');
        })();

        // async IIFE
        (async () => {
            print('async IIFE executed');
        })();
}

function exercise8Desc() {
    return `
        <p>IIFE magic:</p>
        <ul>
            <li>An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.</li>
            <li>It is often used to create a new scope and avoid polluting the global namespace.</li>
            <li>Common use cases include module pattern implementations and encapsulating code to prevent variable collisions.</li>
        </ul>
        <p><a href="https://developer.mozilla.org/en-US/docs/Glossary/IIFE" target="_blank">Learn more about IIFE on MDN</a></p>
    `;
}

function exercise9() {
    console.clear();
    print("=== Exercise 9: Hoisting ===");
    print(`Value of hoistedVar before declaration: ${hoistedVar}`); // undefined due to hoisting
    var hoistedVar = 10;
    print(`Value of hoistedVar after declaration: ${hoistedVar}`); // 10

    try {
        print(`Value of notHoistedLet before declaration: ${notHoistedLet}`); // ReferenceError
    } catch (error) {
        print(`Error accessing notHoistedLet before declaration: ${error.message}`);
    }
    let notHoistedLet = 20;
    print(`Value of notHoistedLet after declaration: ${notHoistedLet}`); // 20
    
    // Hoisting with functions
    print(`Result of hoistedFunction before declaration: ${hoistedFunction(5)}`); // 10
    function hoistedFunction(num) {
        return num * 2;
    }
}

function exercise9Desc() {
    return `
        <p>Hoisting magic:</p>
        <ul>
            <li>Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope.</li>
            <li>Variable declarations (using var) are hoisted, but their initializations are not.</li>
            <li>Let and const declarations are also hoisted, but they are not initialized, leading to a ReferenceError if accessed before declaration.</li>
            <li>Function declarations are fully hoisted, meaning they can be called before they are defined in the code.</li>
        </ul>
        <p><a href="https://developer.mozilla.org/en-US/docs/Glossary/Hoisting" target="_blank">Learn more about Hoisting on MDN</a></p>
    `;
}

function exercise10() {
    console.clear();
    print("=== Exercise 10: Type Coercion ===");
    print(`String 5 + 5 = ${"5" + "5"}`); // "55"
    print(`Number 5 + 5 = ${5 + 5}`); // 10
    print(`String 5 - 5 = ${"5" - 5}`); // 0
    print(`Boolean true + 1 = ${true + 1}`); // 2
    print(`Null + 1 = ${null + 1}`); // 1
    print(`Undefined + 1 = ${undefined + 1}`); // NaN

    print(String(123)); // explicit
    print(123 + '');    // implicit

    print(Boolean(1));  // explicit
    print(1 ? true : false); // implicit

    print(Number('123')); // explicit
    print('123' - 0);     // implicit
}

function exercise10Desc(){
    return `
        <p>Type Coercion:</p>
        <ul>
            <li>Type coercion is JavaScript's automatic or implicit conversion of values from one data type to another.</li>
            <li>It occurs in various operations, such as arithmetic operations, comparisons, and string concatenation.</li>
            <li>Understanding type coercion is crucial for writing predictable and bug-free code in JavaScript.</li>
        </ul>
        <p><a href="https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839/" target="_blank">Learn more about Type Coercion</a></p>
    `;
}

function exercise11() {
    console.clear();
    print("=== Exercise 11: Closures ===");

    function outerFunction(outerVariable) {
        return function innerFunction(innerVariable) {
            print(`Outer Variable: ${outerVariable}`);
            print(`Inner Variable: ${innerVariable}`);
        }
    }

    const newFunction = outerFunction('outside');
    newFunction('inside');

    const counter = (function () {
        let privateCounter = 0;
        function changeBy(val) {
            privateCounter += val;
        }

        return {
            increment() {
            changeBy(1);
            },

            decrement() {
            changeBy(-1);
            },

            value() {
            return privateCounter;
            },
        };
    })();

    console.log(counter.value()); // 0.
    counter.increment();
    counter.increment();
    console.log(counter.value()); // 2.
    counter.decrement();
    console.log(counter.value()); // 1.
}

function exercise11Desc() {
    return `
        <p>Closures magic:</p>
        <ul>
            <li>A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope.</li>
            <li>Closures allow functions to have "private" variables and methods, enabling data encapsulation.</li>
            <li>Common use cases include data hiding, function factories, and maintaining state in asynchronous programming.</li>
        </ul>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures" target="_blank">Learn more about Closures on MDN</a></p>
    `;
}

function print(data){
    console.log(data);
}