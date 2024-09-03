export const DUMMY_NOTES_TITLE:string = `Hoisting in JavaScript`;

export const DUMMY_NOTES_CONTENT:string = `
<h1>Hoisting in JavaScript</h1>
<h2>What is Hoisting?</h2>
<p>Hoisting in JavaScript is a phenomenon where you can access variables and functions before they are declared in your code. This is because JavaScript initializes memory for variables and functions before code execution.</p>

<h2>Understanding Hoisting with Examples</h2>
<ul>
  <li>
    <h3>Accessing a Variable Before Declaration</h3>
    <pre class="max-w-full text-wrap">
      let x = 7;
      console.log(x); // Outputs: 7

      // Hoisting in action:
      console.log(x); // Outputs: undefined
      let x = 7;
    </pre>
    <p>Even though the variable <code>x</code> is declared after the first <code>console.log</code> statement, JavaScript still prints <code>undefined</code>. This is because JavaScript reserves space for <code>x</code> in memory during the initialization phase, but it doesn't assign a value until the actual declaration.</p>
  </li>
  <li>
    <h3>Accessing a Function Before Declaration</h3>
    <pre class="max-w-full text-wrap">
      function getNamaste() {
        console.log("Namaste");
      }

      // Hoisting in action:
      getNamaste(); // Outputs: Namaste
      function getNamaste() {
        console.log("Namaste");
      }
    </pre>
    <p>Similarly, you can call the <code>getNamaste</code> function before its declaration because JavaScript hoists the function declaration.</p>
  </li>
</ul>

<h2>How Hoisting Works</h2>
<h3>Memory Allocation Phase</h3>
<p>When JavaScript begins executing your code, it goes through a memory allocation phase. During this phase, JavaScript:</p>
<ul>
  <li>Reserves space in memory for all variables and functions defined in the program, regardless of their position.</li>
  <li>Initializes variables with the value <code>undefined</code>.</li>
  <li>Hoists function declarations to the top of the scope.</li>
</ul>

<h3>Execution Phase</h3>
<p>After the memory allocation phase, JavaScript moves on to the execution phase. This is where the actual code execution happens.</p>

<h2>Hoisting with Function Expressions</h2>
<p>Function expressions behave differently from function declarations when it comes to hoisting. Since they are not hoisted, they are not available to be executed before they are declared.</p>

<h3>Example</h3>
<pre class="max-w-full text-wrap">
  // Function expression:
  const getNamaste = function() {
    console.log("Namaste");
  };

  // Output: Uncaught ReferenceError: Cannot access 'getNamaste' before initialization
  getNamaste(); // Outputs: TypeError: Cannot read properties of undefined (reading 'getNamaste')

  // Function declaration:
  function getNamaste() {
    console.log("Namaste");
  }
  getNamaste(); // Outputs: Namaste
</pre>

<h2>Understanding the Execution Context and Call Stack</h2>
<p>The execution context is a crucial concept in understanding how JavaScript manages code execution. Each time a function is called, a new execution context is created.</p>

<h3>Execution Context</h3>
<ul>
  <li>Contains the current state of the program's execution.</li>
  <li>Includes the code being executed, the current scope, and the values of variables and functions.</li>
</ul>

<h3>Call Stack</h3>
<p>The call stack is a data structure that keeps track of the order of execution contexts. When a function is called, its execution context is pushed onto the call stack. When the function finishes executing, its execution context is popped off the call stack.</p>

<h2>Example of Execution Context and Call Stack</h2>
<pre class="max-w-full text-wrap">
  function getNamaste() {
    console.log("Namaste");
  }

  getNamaste();
</pre>

<p>The call stack would look like this:</p>
<ol>
  <li>Global Execution Context</li>
  <li>getNamaste Execution Context</li>
</ol>

<p>When the <code>getNamaste</code> function finishes executing, its execution context is popped off the call stack, and control returns to the global execution context.</p>

<h2>The Importance of Understanding Hoisting</h2>
<p>Hoisting is a fundamental concept in JavaScript, and understanding it is essential for writing accurate and predictable code. By understanding how hoisting works, you can avoid unexpected behavior and write more reliable code.</p>
... (the rest of your HTML content continues here)
`;
export const DUMMY_VIDEO_ID:string = 'WIrA4YexLRQ';