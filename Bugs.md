# Bug Log: CSS Variable Update Not Reflecting

### 1. The Error
* **Symptom/Message:** Changing `--console-text: red;` in the stylesheet does not visually update the console text color in the browser UI.
* **Environment:** CSS

### 2. Root Cause (Why It Happens)
* **Technical Breakdown:** CSS variable assignment relies heavily on block scoping and pseudo-classes. The variable `--console-text` was modified inside the `#theme-toggle:checked ~ .app-container` CSS block. This specific block acts as a theme override and remains entirely inactive (ignored by the DOM) until the hidden theme toggle checkbox is checked. While the user views the default "Dark Mode", the browser falls back to the top-level `:root` declaration, rendering the original color.
* **Analogy:** Imagine having two sets of instructions for painting a room: one for "Summer" (Light Mode) and one for "Winter" (Dark Mode). If it is currently Winter, and you cross out "blue" and write "red" on the Summer instruction sheet, the painters will still paint the room blue because they are only reading the Winter sheet.

### 3. The Broken Code
```css
/* This only applies when Light Mode is toggled on */
#theme-toggle:checked ~ .app-container {
  --console-bg: #0f172a;
  --console-text: red; /* Modification is hidden in default state */
  --console-border: rgba(255, 255, 255, 0.1);
}
```

### 4. Approach 
```css
#theme-toggle:checked ~ .app-container {
  --console-text: #38bdf8;; /* This will implement in javascript in toggling */
}
```
