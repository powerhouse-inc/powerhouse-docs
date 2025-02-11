---
sidebar_position: 5
# sidebar_label: Connect
displayed_sidebar: connectSidebar
---

# Reusable Components

The reusable components are a set of of front-end components based on graphQL scalars. Powerhouse also has a set of custom scalars that are not part of the graphQL standard but are specific to the web3 ecosystem.

:::info
A GraphQL scalar is essentially a primitive, indivisible value in the GraphQL type system. 
Here are the key points to understand:

- **Basic Building Blocks:** Scalars are the basic data types—like String, Int, Float, Boolean, and ID—that represent atomic values.
- **Leaf Nodes:** Scalars are the "leaves" of a GraphQL query. They can't have any sub-fields, meaning once you hit a scalar in a query, that's the final value.
- **Custom Scalars:** Besides the built-in scalars, you can define custom scalars (e.g., a Date type) if you need to handle more specific formats or validations.
:::

In this documentation, we will start with the simplest scalar components first, then move on to more complex/Powerhouse-specific components, and combine these in the section-like Layout components.

**3 types of components according to complexity:**

1. **Simple Component** has a scalar value as input 
    - Component, Composition of smaller UI controls (e.g. Scalar component)
    
2. **Complex Component** has an object/array value 
    - Group of components (e.g. sidebar tree view)
    
3. **Layout Component** will contain other components 
    - Containers for other components, Sections (e.g. list of other components, color layouts, etc.)

The documentation will be structured as follows:

- **Component Context**
- **Scalar Definition**
- **Component Storybook Base Example**
    - Component Code
    - Component Default Props
- **Component Storybook Usage Examples**
