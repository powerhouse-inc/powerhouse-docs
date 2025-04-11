# Powerhouse Builder Tooling

This page provides an overview of all the builder tooling offered by the Powerhouse ecosystem.

## Powerhouse CLI
___
The Powerhouse CLI (`ph-cmd`) is a command-line interface tool that provides essential commands for managing Powerhouse projects. It can be installed globally using `pnpm install ph-cmd` and gives you direct access to a series of Powerhouse ecosystem tools. Key commands include:
- `ph connect` for running the Connect application locally
- `ph switchboard` or `ph reactor` for starting the API service
- `ph init` to start a new project and build a document model

This tool is fundamental for creating, building, and running Document Models.

## Boilerplate
___
The Document Model Boilerplate is a foundational template that provides code generation for scaffolding editors and models. It ensures compatibility with host applications like Connect and Reactors for seamless document model and editor integration. 

You can initialize it using:
```bash
pnpm create document-model-lib
```

The boilerplate includes essential PNPM commands for:
- Generating code
- Linting
- Formatting
- Building
- Testing

## Design System
___
The Powerhouse Design System is a collection of reusable front-end components based on GraphQL scalars, including custom scalars specific to the web3 ecosystem. It provides:
- Consistent UI components across Powerhouse applications
- Automatic inclusion as a dependency in new document model projects
- Customization options using CSS variables

## Reactor Libraries
___
Reactors are the nodes in the Powerhouse network that handle document storage, conflict resolution, and operation verification. The Reactor Libraries include:

### API
- **Subgraphs**: Modular GraphQL services that connect to the Reactor for structured data access
- **Processors**: Event-driven components that react to document changes and process data

### Browser
Handles client-side interactions

### Local
Manages local storage and offline functionality

### Drive
Handles document organization and storage management

## Code Generators
___
Powerhouse provides several code generation tools to streamline development:

    ### Document Model Scaffolding
    Generates the basic structure for new document models with the command `ph init`

    ### Editor Generator
    Creates template code for document model editors with the command `ph generate --editor <name> --document-types <documenttype>`

    ### Drive Editor Generator
    Builds scaffolding for custom drive interfaces with the command `ph generate --drive-editor <name>`

    ### Subgraph Generator
    Creates GraphQL subgraph templates for data access automatically upon `ph reactor`

    ### Processor Generator
    Generates processor templates for event handling automatically upon `ph reactor`

    ### Analytics Processor Generator
    Creates specialized processors for analytics tracking

## Analytics Engine
___
The Analytics Engine is a system that allows tracking and analyzing operations and state changes on document models. Features include:
- Custom dashboard and report generation
- Document model-specific analytics
- Metric and dimension tracking
- Data combination from multiple document models

Generate an analytics processor using:
```bash
ph generate --processor-type analytics
```