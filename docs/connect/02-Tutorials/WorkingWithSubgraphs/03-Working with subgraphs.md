# Working with Subgraphs

Todays tutorial will focus on creating a new subgraph and customizing it. Let's start with the basics and gradually add more complex features and functionality.

## What is a Subgraph?

A subgraph in Powerhouse is a GraphQL-based modular data component that enables efficient data queries and mutations. Subgraphs can retrieve data from:

**The Reactor** – The core Powerhouse data system or network node. 
**Operational Data Stores** – Structured data storage for operational processes. Real-time updates, for querying structured data.
**Analytics Stores** – Aggregated historical data, useful for insights, reporting and business intelligence.

Subgraphs consist of:

- Schema (typeDefs) – Defines GraphQL Queries and Mutations.
- Resolvers – Handles data fetching and logic.
- Context Fields – Additional metadata that helps in resolving data efficiently.

Context fields allow resolvers to access extra information, such as:
- User authentication (e.g., checking if a user is an admin).
- External data sources (e.g., analytics).

Example:

```typescript
context: {
  admin: async (session) => {
    const admins = await operationalStore.get("admins");
    return admins.includes(session.user);
  }
}
```

## Step 1: Generating a Subgraph

Powerhouse provides a command-line utility to create new subgraphs easily. Run:

```bash
pnpm generate --subgraph <subgraph-name>
```
Expected Output
```bash
Loaded templates: node_modules/@powerhousedao/codegen/dist/codegen/.hygen/templates
       FORCED: ./subgraphs/<subgraph-name>/index.ts
     skipped: ./subgraphs/index.ts
      inject: ./subgraphs/index.ts
```

### What Happened Here?
A new subgraph is created in `./subgraphs/<subgraph-name>/`
It is automatically registered in `./subgraphs/index.ts`, ensuring it loads on startup.

## Step 2: Customizing the Subgraph

After generation, open:

```bash
subgraphs/<subgraph-name>/index.ts
```

### 2.1 Define the Schema
The schema (typeDefs) defines the structure of your queries and mutations:

```graphql
type Query {
  fileIds: [String]
}
```

### 2.2 Implement the Resolver
Resolvers define how data is retrieved or modified.

#### Basic Resolver Example: Returning Static Data

```js
resolvers: {
  Query: {
    fileIds: async () => {
      return ["file1", "file2", "file3"];
    }
  }
}
```

#### Advanced Resolver: Fetching from Operational Store
If your subgraph interacts with an Operational Data Store, modify the resolver:

```js
resolvers: {
  Query: {
    fileIds: async (_, __, { operationalStore }) => {
      return await operationalStore.getAll("fileIds");
    }
  }
}
```

### 2.3 Add Operational Data Storage (Optional)
If you need to persist data, initialize an operational datastore inside onSetup():

```ts
async onSetup() {
  await this.createOperationalTables();
}

async createOperationalTables() {
  await this.operationalStore.schema.createTableIfNotExists(
    "fileIds",
    (table) => {
      table.string("id").primary();
    }
  );
}
```

### 2.4 Connecting to a Processor (Optional, but Recommended)

#### Why Connect a Processor?
Subgraphs alone are limited. A subgraph only queries data, but doesn't generate or store it.
To make subgraphs useful, connect them with processors that update the data dynamically.
A Processor listens to system events and updates the operational store in real-time. This ensures:

- Live updates instead of static data.
- Scalable architecture through event-driven data changes.
- Seamless integration with other Powerhouse components.

#### Example: Creating a Simple Processor
Inside your processor, listen for new files and update the store:

```ts
async process(event) {
  if (event.type === "ADD_FILE") {
    await this.operationalStore.insert("fileIds", { id: event.fileId });
  }
}
```

Then, modify your subgraph resolver to return real-time data:

```js
resolvers: {
  Query: {
    fileIds: async (_, __, { operationalStore }) => {
      return await operationalStore.getAll("fileIds");
    }
  }
}
```

## Step 3: Testing the Subgraph

### 1. Start the Reactor
To activate the subgraph, run:

```bash
pnpm reactor
```
Or, for full system startup:

```bash
pnpm dev #this starts the reactor and connect in studio or dev mode
```

### 2. Access GraphQL Playground
Open your browser and go to:

```bash
http://localhost:4001/<subgraph-name>
```
Example:

```bash
http://localhost:4001/test-subgraph
```

### 3. Run a Query

```graphql
query {
  fileIds
}
```

### 4. Expected Response
If everything works, you should see:

```json
{
  "data": {
    "fileIds": ["file1", "file2", "file3"]
  }
}
```


### Powerhouse Already Has Prebuilt Subgraphs

Some subgraphs (e.g., System Subgraph, Drive Subgraph) already exist.
To integrate with them, register them via the Reactor API.

### Future Enhancements

Bridge Processors and Subgraphs – Currently, there's a gap in how processors and subgraphs interact. Powerhouse might improve this in future updates.