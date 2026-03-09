1️⃣ What is the difference between `var`, `let`, and `const`?

In JavaScript, `var`, `let`, and `const` are used to declare variables, but they behave differently in scope, redeclaration, and reassignment.

### 🔹 var

- **Function scoped**
- Can be **redeclared**
- Can be **reassigned**

```javascript
var name = "Shohan";
var name = "Rahim"; // redeclare allowed
name = "Karim"; // reassign allowed

console.log(name); // Karim
```

---

### 🔹 let

- **Block scoped**
- **Cannot be redeclared**
- **Can be reassigned**

```javascript
let age = 20;
age = 25; // reassign allowed

console.log(age); // 25
```

---

### 🔹 const

- **Block scoped**
- **Cannot be redeclared**
- **Cannot be reassigned**

```javascript
const country = "Bangladesh";

console.log(country); // Bangladesh
```

---

### 📊 Comparison Table

| Feature   | var      | let    | const |
| --------- | -------- | ------ | ----- |
| Scope     | Function | Block  | Block |
| Redeclare | ✅ Yes   | ❌ No  | ❌ No |
| Reassign  | ✅ Yes   | ✅ Yes | ❌ No |

✅ Modern JavaScript mostly uses **`let`** and **`const`** instead of `var`.

2️⃣ What is the Spread Operator (`...`)?

The **spread operator (`...`)** in JavaScript is used to **expand elements of an array or object**.

### Example

```javascript
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];

console.log(newNumbers);
// Output: [1, 2, 3, 4, 5]
```

✅ It is commonly used to **copy arrays, merge arrays, and copy objects**.

3️⃣ What is the difference between `map()`, `filter()`, and `forEach()`?

- **`map()`** → Creates a **new array** by transforming each element.
- **`filter()`** → Creates a **new array** with elements that pass a condition.
- **`forEach()`** → **Loops through** the array but **does not return a new array**.

### Example

```javascript
const numbers = [1, 2, 3, 4];

numbers.map((n) => n * 2); // [2, 4, 6, 8]
numbers.filter((n) => n > 2); // [3, 4]
numbers.forEach((n) => console.log(n)); // prints each number
```
