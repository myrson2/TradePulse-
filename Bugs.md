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

# Bug Log: CORS Policy Block on Country API Fetch

### 1. The Error
* **Symptom/Message:** `Access to fetch at 'https://restcountries.com/v3.1/alpha/AM' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
* **Environment:** JavaScript

### 2. Root Cause (Why It Happens)
* **Technical Breakdown:** The REST Countries API is redirecting requests (via HTTP 301) to a static hosting domain (`files-03.restcountries.com`). In a web browser environment, a cross-origin request redirect must comply with CORS policies. Because the target servers do not return the `Access-Control-Allow-Origin` header in their response, the browser's security model blocks the redirect and prevents the client-side JavaScript from accessing the resource.
* **Analogy:** Imagine trying to enter a private club (the API data). The front door manager tells you, "We moved the party to the annex building down the street!" (HTTP 301 Redirect). You walk to the annex, but the bouncer at the annex door blocks you because the club owner forgot to put your name on the guest list (Access-Control-Allow-Origin header). The browser is like your strict school chaperone who refuses to let you enter any building that doesn't have an official guest list showing you are allowed.

### 3. The Broken Code
```javascript
const response = await fetch(`https://restcountries.com/v3.1/alpha/${country_code}`)
const countryData = await response.json();
```
