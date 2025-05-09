Generate the intro documentation for the `Reactor` package, also known as `document-drive`. It should be generated in the `intro.md` file in this directory. This documentation is to serve as a loose specification of the system we _want_ Reactor to be, not exactly where it is right now.

The existing document-drive package is located in `powerhouse/packages/document-drive`.

## Outline

Here is an outline of what the intro documentation should look like. Use the analytics system's intro as an example of formatting and voice (`powerhouse-docs/docs/academy/04-WorkWithData/06-Analytics Engine/intro.md`).

- Models
  - Create an entity-relation diagram in a new `entities.md` file.
    - This should be a mermaid diagram using the syntax defined here https://mermaid.js.org/syntax/entityRelationshipDiagram.html 
    - See `powerhouse/packages/document-drive/prisma/schema.prisma` for the db schema.
    - Make sure to include:
      - PHDocument
        - various fields from schema
        - one to many scopes, global required
      - Drive
        - Many to many
      - Operation
  - Brief explanation of how these objects are related
- Reactor
  - Brief explanation of what the reactor does. See `images/high-level-flowchart.md` for major pieces.
  - Usage
    - Start with a reference to a `Reactor`, i.e. `IBaseDocumentDriveServer` (`powerhouse/packages/document-drive/src/server/types.ts`)
    - Start by making up a ts api on the interface for retrieving the supported document models.
    - Then make up an a ts api on the interface for creating a new document.
    - Then make up a graphql api for creating a new document. See the existing api here: `powerhouse/packages/document-model/schemas`.