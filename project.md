# Project Specification: Globex Logistics & Global Cost Estimator

## 1. Problem Statement
When B2B import-export companies source materials internationally, procurement agents must evaluate operational overhead costs across different global target markets. Manually opening separate browser tabs to check localized currency conversions, look up country calling prefixes for delivery manifests, calculate region-based shipping timeframes, and verify trade region parameters is highly inefficient. 

**The Solution:** Build an interactive, front-end Logistics Procurement Dashboard. The app fetches live international metrics asynchronously, calculates localized shipping variables dynamically based on geographic sub-regions, and maps international trading blocks out on a unified screen interface to automate procurement decisions.

---

## 2. Technical Stack & Scope
- **Frontend Layer:** Semantic HTML5 Structure and clean CSS Flexbox/Grid layouts.
- **Logical Engine:** Functional Vanilla JavaScript (ES6 Modules preferred but not required).
- **Asynchronous Protocol:** Native Web `fetch()` API leveraging `async/await` with structural error blocks (`try/catch`).
- **Data Target:** REST Countries Public API Endpoint (`https://restcountries.com/v3.1/all`).
- **Authentication Needed:** None (Open Access Layer).

---

## 3. Core Functional Requirements (MVP Engine)

### A. Asynchronous Data Ingestion (The Fetch Engine)
- Use `fetch()` inside an `async` function to download the complete payload from `https://restcountries.com/v3.1/all`.
- Parse the resulting JSON string into a localized memory array configuration.
- Implement a strict `try/catch` error block. If the API goes down, dynamically render an inline user alert component (e.g., `"Network latency error. Unable to retrieve current global shipping index."`) inside the UI layout instead of breaking the browser thread.

### B. Dynamic Sourcing Selector (DOM Manipulation)
- Populate an HTML `<select>` dropdown menu dynamically with the names of all countries returned by the API response payload.
- Use an `change` listener (`addEventListener('change', ... )`) to intercept whenever a user chooses a new country.

### C. The Business Intelligence Calculator (Data Processing)
When a country is selected, extract its profile from the JSON payload and instantly compute and display these custom operational business analytics metrics:

| Metric | API Data Mapping Context | Business Rule / Formula to Calculate |
| :--- | :--- | :--- |
| **Primary Trading Currency** | `currencies` object key. | Extract and display both the abbreviation code (e.g., `PHP`) and symbol (`₱`). |
| **Estimated Shipping Timeline** | `subregion` property string. | **Business Logic:** If country sub-region matches `"Western Europe"` or `"North America"`, render `Express Route (3-5 Business Days)`. If it matches `"South-Eastern Asia"`, render `Regional Hub (2-4 Days)`. For all other locations, display `Standard Maritime Route (12-15 Days)`. |
| **Communication Dialing Code** | `idd.root` + `idd.suffixes[0]`. | Format and print the exact dialing prefix required on the commercial manifest document (e.g., `+63`). |
| **Independent Border Status** | `independent` boolean status. | Render a CSS-styled visual check badge: Green ✅ for "Sovereign Trade Zone" or Red ⚠️ for "Dependent Territory (Special Customs Checks Required)". |

---

## 4. UI Layout Specifications
Your `index.html` panel workspace must display three structural elements side-by-side or stacked cleanly:

1. **Procurement Intake Form:** Contains the dynamically filled country list selection field, along with an input text element where users enter their basic order cargo weight in kilograms.
2. **Operational Overview Panel:** A dashboard layout displaying the calculated output metrics (Currency, Shipping Timeline Code, and Manifest Phone Prefix) dynamically loaded via JavaScript `.innerHTML` or `.textContent` updates.
3. **Global Status Stream:** A tracking console logger at the bottom of the screen showing current execution state messages like: `[System Status]: Connected to Global API. 250 countries mapped.` or `[User Action]: recalculating data values for Philippines.`

---

## 5. Development Milestones
- [ ] **Milestone 1:** Build the static `index.html` structure shell and CSS dashboard layouts with static placeholder cards.
- [ ] **Milestone 2:** Implement the basic asynchronous `fetch()` architecture script file to pull down arrays successfully into the developer console logs.
- [ ] **Milestone 3:** Wire up the UI selector element to generate option tags dynamically from the array fields.
- [ ] **Milestone 4:** Apply the custom conditional business rule strings and calculate the outputs straight to the DOM window elements.
- [ ] **Milestone 5:** Refine the error handlers by intentionally misconfiguring the URL string to verify that your layout handles server down-times gracefully.