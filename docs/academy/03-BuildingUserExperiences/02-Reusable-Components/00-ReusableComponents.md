# Reusable Components

The reusable components are a set of of front-end components based on graphQL scalars. 
Powerhouse also has a set of custom scalars that are not part of the graphQL standard but are specific to the web3 ecosystem.

:::info
A GraphQL scalar is essentially a primitive, indivisible value in the GraphQL type system. 
Here are the key points to understand:

- **Basic Building Blocks:** Scalars are the basic data types—like String, Int, Float, Boolean, and ID—that represent atomic values.
- **Leaf Nodes:** Scalars are the "leaves" of a GraphQL query. They can't have any sub-fields, meaning once you hit a scalar in a query, that's the final value.
- **Custom Scalars:** Besides the built-in scalars, you can define custom scalars (e.g., a Date type) if you need to handle more specific formats or validations.
:::

In this documentation, we will start with the simplest scalar components first, then move on to more complex/Powerhouse-specific components, 
and combine these in the section-like Layout components.

## **3 types of components according to complexity:**

1. **Simple Component** has a scalar value as input 
    - Component, Composition of smaller UI controls (e.g. Scalar component)
    
2. **Complex Component** has an object/array value 
    - Group of components (e.g. sidebar tree view)
    
3. **Layout Component** will contain other components 
    - Containers for other components, Sections (e.g. list of other components, color layouts, etc.)

The documentation will be structured as follows:

1. **Component Context**
2. **Scalar Definition**
3. **Component Storybook Base Example**
    - Component Code
    - Component Default Props
4. **Component Storybook Usage Examples**


## How it works:
**Importing the Components:**
At the very top of the editor.tsx file, we need to tell our code where to find the Checkbox and InputField components. 
We do this with import statements. We'll add these lines:

```ts
import { Checkbox } from './Components/checkbox';
import { InputField } from './Components/inputField';
```

This tells the file:
*Look inside the Components folder for files named checkbox.tsx and inputField.tsx, and make the Checkbox and InputField components available for use here.*

cleaner and focused on what the elements do rather than how they look.

So, to summarize for your documentation:
1. We brought the specialized Checkbox and InputField components into the editor.tsx file using import statements at the top.
2. We replaced the generic HTML `<input type="text">` tag (used for adding new tasks) with our custom `<InputField ... />` component tag.
3. We replaced the generic HTML `<input type="checkbox">` tag (used for marking tasks complete) with our custom `<Checkbox ... />` component tag.
4. We passed the necessary data (like the current text value or whether the box is checked) and behaviors (like what function to call when text changes or the box is clicked) to these components using attributes called "props" (e.g., `value={...}`, `onChange={...}`, `handleInputChange={...}`).
5. The specific styling rules (like colors, borders, sizes) are now handled inside the Checkbox and InputField components themselves, thanks to the Design System, making the editor.tsx code cleaner and focused on what the elements do rather than how they look.
