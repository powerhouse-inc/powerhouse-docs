# Working with Supergraphs

A supergraph is a GraphQL schema that combines multiple underlying GraphQL APIs, known as subgraphs, into a single, unified graph. This architecture allows different teams to work independently on their respective services (subgraphs) while providing a single entry point for clients to query all available data.

## Key Concepts

*   **Subgraph:** An independent GraphQL service with its own schema. Each subgraph typically represents a specific domain or microservice within a larger system.
*   **Composition:** The process of combining subgraph schemas into a supergraph schema. This is usually handled by a gateway or router that understands how to delegate queries to the appropriate subgraphs.
*   **Gateway/Router:** A server that sits in front of the subgraphs. It receives client queries, consults the supergraph schema, and routes parts of the query to the relevant subgraphs. It then stitches the results back together before sending the final response to the client.

## Benefits of Using a Supergraph

*   **Federated Architecture:** Enables a microservices-based approach where different teams can own and operate their services independently.
*   **Scalability:** Individual subgraphs can be scaled independently based on their specific needs.
*   **Improved Developer Experience:** Clients interact with a single, consistent GraphQL API, simplifying data fetching and reducing the need to manage multiple endpoints.
*   **Schema Evolution:** Subgraphs can evolve their schemas independently, and the supergraph can be updated without breaking existing clients, as long as breaking changes are managed carefully.
*   **Clear Separation of Concerns:** Each subgraph focuses on a specific domain, leading to more maintainable and understandable codebases.


## Use the Powerhouse Supergraph

The Powerhouse supergraph for any given remote drive or reactor can be found under http://localhost:4001/graphql. To get to the endpoint open your localhost by starting the reactor and adding `graphql` to the end of the url. The following commands explain how you can test & try the supergraph. 

- Start the reactor:

  ```bash
  ph reactor
  ```

- Open the GraphQL editor in your browser:

  ```
  http://localhost:4001/graphql
  ```

The supergraph allows to both query & mutate data from the same endpoint. 

- Create a todo document in the `powerhouse` drive using the `ToDo_createDocument` mutation.
  ![ToDo_createDocument](https://i.ibb.co/GQTZr7Wk/Screenshot-2025-05-01-at-1-22-23-PM.png)

- Get the document state using the `GetDocument` query.
  ![GetDocument](https://i.ibb.co/v47cj4Q4/Screenshot-2025-05-01-at-1-22-41-PM.png)

- In a different terminal, start connect:

  ```bash
  ph connect
  ```

- Open Connect and add the `powerhouse` drive:

  ```
  http://localhost:4001/d/powerhouse
  ```

- You should now see the todo document you've created earlier. Edit the todo document with the document editor and add a few tasks that you can query later. 

- Go back to the GraphQL explorer and use the `GetDocument` query again — you should see the updated state.

This is a quick example of how the supegraph can be used. 