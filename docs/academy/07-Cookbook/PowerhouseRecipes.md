# Powerhouse Recipes

## Powerhouse CLI Recipes

<details>
<summary>Installing 'ph-cmd'</summary>

# How to Install Powerhouse CLI

## Problem Statement
You need to install the Powerhouse CLI (`ph-cmd`) to create and manage Powerhouse projects.

## Prerequisites
- Node.js installed
- pnpm package manager installed
- Terminal or command prompt access

## Solution

### Step 1: Install the CLI globally
```bash
pnpm install -g ph-cmd
```

### Step 2: Verify the installation
```bash
ph-cmd --version
```

### Optional: Install specific versions
```bash
# For the staging version
pnpm install -g ph-cmd@staging

# For a specific version
pnpm install -g ph-cmd@<version>
```

## Expected Outcome
- Powerhouse CLI (`ph-cmd`) installed globally on your system
- Access to all Powerhouse CLI commands for project creation and management

## Common Issues and Solutions
- Issue: Permission errors during installation
  - Solution: Use `sudo` on Unix-based systems or run as administrator on Windows
- Issue: Version conflicts
  - Solution: Clean your system using the uninstallation recipe before installing a new version

## Related Recipes
- Uninstalling 'ph-cmd'
- Creating a New Document Model
- Initializing a Powerhouse Project

## Further Reading
- [Powerhouse Builder Tools](/docs/academy/Create/BuilderTools)
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
pnpm uninstall -g ph-cmd   
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
- TBD/WIP

## Further Reading
- [Powerhouse Builder Tools](/docs/academy/Create/BuilderTools)
- [Create A New Powerhouse Project](/docs/academy/Create/ToDoList/CreateNewPowerhouseProject)
</details>

## Document Model Recipes

<details>
<summary>Creating a New Document Model WIP</summary>

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
- [Domain Modeling Guide](/docs/domain-modeling)
- [GraphQL Schema Best Practices](/docs/academy/WorkWithData/GraphQLAtPowerhouse)
</details>

<details>
<summary>Implementing Custom Operations WIP</summary>

[Content to be added]
</details>

<details>
<summary>Setting Up Event Sourcing WIP</summary>

[Content to be added]
</details>

<details>
<summary>Creating Reusable Reducers WIP</summary>

[Content to be added]
</details>

## Reactor Recipes

<details>
<summary>Setting Up Local Storage WIP</summary>

[Content to be added]
</details>

<details>
<summary>Configuring Cloud Storage WIP</summary>

[Content to be added]
</details>

<details>
<summary>Implementing Synchronization WIP</summary>

[Content to be added]
</details>

<details>
<summary>Managing Conflicts WIP</summary>

[Content to be added]
</details>

## Package Development Recipes

<details>
<summary>Creating a New Package WIP</summary>

[Content to be added]
</details>

<details>
<summary>Implementing Processors WIP</summary>

[Content to be added]
</details>

<details>
<summary>Building Document Model Editors WIP</summary>

[Content to be added]
</details>

<details>
<summary>Creating Drive Apps WIP</summary>

[Content to be added]
</details>

## Integration Recipes

<details>
<summary>Setting Up Authentication WIP</summary>

[Content to be added]
</details>

<details>
<summary>Connecting to External Services WIP</summary>

[Content to be added]
</details>

<details>
<summary>Implementing Analytics WIP</summary>

[Content to be added]
</details>

<details>
<summary>Custom Storage Adapters WIP</summary>

[Content to be added]
</details>
