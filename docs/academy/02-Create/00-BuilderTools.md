# Powerhouse Builder Tooling

This page provides an overview of all the builder tooling offered by the Powerhouse ecosystem.

## Powerhouse Command Line Interface
___
The Powerhouse CLI (`ph-cmd`) is a command-line interface tool that provides essential commands for managing Powerhouse projects. You can get access to the Powerhouse Ecosystem tools by installing them globally using:
```bash
pnpm install -g ph-cmd
``` 

Key commands include:
- `ph connect` for running the Connect application locally
- `ph switchboard` or `ph reactor` for starting the API service
- `ph init` to start a new project and build a document model
- `ph help` to get an overview of all the available commands

This tool will be fundamental on your journey when creating, building, and running Document Models.

<details>

<summary> How to clean your system of the Powerhouse CLI?</summary>

## Cleaning and Updating ph-cmd

If you need to perform a clean reinstallation of the Powerhouse CLI (`ph-cmd`), follow these steps:

1. First, uninstall the global ph-cmd package:
```bash
pnpm uninstall -g ph-cmd
```

2. Remove the Powerhouse configuration directory:
```bash
rm -rf ~/.ph
```

3. Reinstall the CLI tool (choose one):
```bash
# For the stable version
pnpm install -g ph-cmd

# For the staging version
pnpm install -g ph-cmd@staging

# For a specific version
pnpm install -g ph-cmd@<version>
```

This process ensures a clean slate by removing both the CLI tool and its configuration files before installing the desired version. It's particularly useful when:
- Troubleshooting CLI issues
- Upgrading to a new version
- Switching between stable and staging versions
- Resolving configuration conflicts 			

</details>



## Boilerplate
___
The Document Model Boilerplate is a foundational template that is used for code generation when scaffolding your editors and models. It ensures compatibility with host applications like Connect and Switchboard for seamless document model and editor integration. 

After installing `ph-cmd`, you will run `ph init`to initialize a project directory & structure. This initialization command makes use of the boilerplate. 

The boilerplate includes essential commands with NPM/PNPM scripts for:
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
Reactors are the nodes in the Powerhouse network that handle document storage, conflict resolution, and operation verification. 
The Reactor Libraries include:

### API
- **Subgraphs**: Modular GraphQL services that connect to the Reactor for structured data access
- **Processors**: Event-driven components that react to document changes and process data

### Browser
Handles client-side interactions

### Local
Manages local storage and offline functionality

### Drive App
Handles document organization and storage management, but can also be customised to offer specific functionality, categorization or tailored interfaces for your documents. 

## Code Generators
___
Powerhouse provides several code generation tools to streamline development:

    ### Document Model Scaffolding
    Generates the basic structure for new document models with the command `ph init` based on the boilerplate. 

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