## 1. React & TypeScript Implementation
TypeScript was essential for defining strict data models (`Task`, `FilterOptions`), ensuring predictable data flow and catching errors at compile time. I leveraged React hooks extensively: `useState` for local component state (like form inputs) and `useEffect` for side-effects, specifically syncing data with `localStorage` without blocking the initial render.

## 2. Component Composition & State Management
I implemented a "Smart/Dumb" architecture:
- **Smart Component:** `Dashboard.tsx` is the single source of truth, managing the global task list and filter state.
- **Dumb Components:** `TaskItem`, `TaskForm`, and `TaskFilter` are stateless, receiving data and callbacks via props.

To avoid state synchronization bugs, I avoided storing "filtered tasks" in state. Instead, I used **derived state**, calculating the filtered and sorted list on the fly during every render using a utility function.

## 3. Challenges & Solutions
- **Complex Filtering Logic:** Combining search, status, and priority filters inside a component gets messy. **Solution:** I abstracted this into a pure, testable utility function (`filterAndSortTasks`) to keep the UI components clean.
- **Dark Mode Hydration:** Tailwind's dark mode initially flashed incorrect styles before reading local storage. **Solution:** I lazy-loaded the initial state `useState(() => ...)` in `App.tsx` and tied DOM mutations strictly to a `useEffect` hook.
- **TypeScript in HTML Selects:** Mapping standard HTML `<select>` values back to strict TypeScript string literals (like `'todo' | 'completed'`) caused type errors. **Solution:** I used careful type assertions (`e.target.value as TaskStatus`) to safely bridge the DOM with the TypeScript compiler.