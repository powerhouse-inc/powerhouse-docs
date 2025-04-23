# Powerhouse Cookbook

## Powerhouse CLI Recipes

<details>
<summary>Installing 'ph-cmd'</summary>

# How to Create a New Document Model

## Problem Statement
You need to create a new document model to represent and manage specific business data in your Powerhouse application.

## Prerequisites
- Powerhouse CLI (`ph-cmd`) installed
- Basic understanding of GraphQL schemas
- Access to a Powerhouse project

## Solution

### Step 1: Initialize the Document Model
```bash
ph-cmd generate document-model my-model
```

### Step 2: Define the State Schema
```graphql
type MyModelState {
  id: OID!
  status: String @default(value: "DRAFT")
  content: String
  metadata: Metadata
}

type Metadata {
  createdAt: DateTime!
  updatedAt: DateTime
  author: String
}
```

### Step 3: Define Operations
```graphql
input UpdateContentInput {
  documentId: OID!
  content: String!
}

input UpdateStatusInput {
  documentId: OID!
  status: String!
}
```

### Step 4: Implement Reducers
```typescript
function updateContent(state: MyModelState, { input }: { input: UpdateContentInput }) {
  return {
    ...state,
    content: input.content,
    metadata: {
      ...state.metadata,
      updatedAt: new Date().toISOString()
    }
  };
}
```

## Expected Outcome
- A fully functional document model
- GraphQL schema for state and operations
- Implemented reducers for state transitions
- Generated TypeScript types

## Common Issues and Solutions
- Issue: Schema validation errors
  - Solution: Ensure all required fields have proper types and defaults
- Issue: Reducer not updating state
  - Solution: Verify the reducer returns a new state object with all required fields

## Related Recipes
- Implementing Custom Operations
- Creating Reusable Reducers
- Testing Document Models

## Further Reading
- [Domain Modeling Guide](/domain-modeling)
- [GraphQL Schema Best Practices](/graphql-best-practices)
</details>

<details>
<summary>Uninstalling 'ph-cmd'</summary>

# How to Uninstall Powerhouse CLI

## Problem Statement
You want to start from a clean install with the Powerhouse CLI

## Prerequisites
- Powerhouse CLI (`ph-cmd`) installed
- A terminal or IDE

## Solution

### Step 1: Uninstall `ph-cmd`
```bash
npm uninstall -g ph-cmd   
```

### Step 2: Remove the global setups folder 
```bash
rm -rf ~/.ph 
```

## Expected Outcome
- Your system should now be clean from the Powerhouse CLI

## Common Issues and Solutions
- Issue: Version is out of date 
  - Solution: Uninstall and reinstall the Powerhouse CLI

## Related Recipes
- Installing the Powerhouse CLI
- TBD

## Further Reading
- [Domain Modeling Guide](/domain-modeling)
- [GraphQL Schema Best Practices](/graphql-best-practices)
</details>

## Document Model Recipes

<details>
<summary>Creating a New Document Model</summary>

# How to Create a New Document Model

## Problem Statement
You need to create a new document model to represent and manage specific business data in your Powerhouse application.

## Prerequisites
- Powerhouse CLI (`ph-cmd`) installed
- Basic understanding of GraphQL schemas
- Access to a Powerhouse project

## Solution

### Step 1: Initialize the Document Model
```bash
ph-cmd generate document-model my-model
```

### Step 2: Define the State Schema
```graphql
type MyModelState {
  id: OID!
  status: String @default(value: "DRAFT")
  content: String
  metadata: Metadata
}

type Metadata {
  createdAt: DateTime!
  updatedAt: DateTime
  author: String
}
```

### Step 3: Define Operations
```graphql
input UpdateContentInput {
  documentId: OID!
  content: String!
}

input UpdateStatusInput {
  documentId: OID!
  status: String!
}
```

### Step 4: Implement Reducers
```typescript
function updateContent(state: MyModelState, { input }: { input: UpdateContentInput }) {
  return {
    ...state,
    content: input.content,
    metadata: {
      ...state.metadata,
      updatedAt: new Date().toISOString()
    }
  };
}
```

## Expected Outcome
- A fully functional document model
- GraphQL schema for state and operations
- Implemented reducers for state transitions
- Generated TypeScript types

## Common Issues and Solutions
- Issue: Schema validation errors
  - Solution: Ensure all required fields have proper types and defaults
- Issue: Reducer not updating state
  - Solution: Verify the reducer returns a new state object with all required fields

## Related Recipes
- Implementing Custom Operations
- Creating Reusable Reducers
- Testing Document Models

## Further Reading
- [Domain Modeling Guide](/domain-modeling)
- [GraphQL Schema Best Practices](/graphql-best-practices)
</details>

<details>
<summary>Implementing Custom Operations</summary>

[Content to be added]
</details>

<details>
<summary>Setting Up Event Sourcing</summary>

[Content to be added]
</details>

<details>
<summary>Creating Reusable Reducers</summary>

[Content to be added]
</details>

## Reactor Recipes

<details>
<summary>Setting Up Local Storage</summary>

[Content to be added]
</details>

<details>
<summary>Configuring Cloud Storage</summary>

[Content to be added]
</details>

<details>
<summary>Implementing Synchronization</summary>

[Content to be added]
</details>

<details>
<summary>Managing Conflicts</summary>

[Content to be added]
</details>

## Package Development Recipes

<details>
<summary>Creating a New Package</summary>

[Content to be added]
</details>

<details>
<summary>Implementing Processors</summary>

[Content to be added]
</details>

<details>
<summary>Building Document Model Editors</summary>

[Content to be added]
</details>

<details>
<summary>Creating Drive Apps</summary>

[Content to be added]
</details>

## Integration Recipes

<details>
<summary>Setting Up Authentication</summary>

[Content to be added]
</details>

<details>
<summary>Connecting to External Services</summary>

[Content to be added]
</details>

<details>
<summary>Implementing Analytics</summary>

[Content to be added]
</details>

<details>
<summary>Custom Storage Adapters</summary>

[Content to be added]
</details>
