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

<details>
<summary>Setting up or Resetting the Global Powerhouse Configuration</summary>

# How to Set Up or Reset the Global Powerhouse Configuration

## Problem Statement
You need to initialize the global Powerhouse configuration for the first time, or reset it to resolve issues or start fresh, potentially switching to a specific dependency environment like staging.

## Prerequisites
- Powerhouse CLI (`ph-cmd`) installed
- Terminal or command prompt access

## Solution

### Step 1: (Optional) Remove Existing Configuration
If you suspect issues with your current global setup or want a completely clean slate, remove the existing global configuration directory. **Skip this if setting up for the first time.**
```bash
# Use with caution: this removes your global settings and downloaded dependencies.
rm -rf ~/.ph
```

### Step 2: Set Up Global Defaults
Initialize the default global project configuration.
```bash
ph setup-globals
```

### Step 3: (Optional) Switch to a Specific Environment (e.g., Staging)
If you need to use non-production dependencies, switch the global environment.
```bash
# Switch to staging dependencies
ph use staging

# Or switch back to the latest stable versions
# ph use latest
```

## Expected Outcome
- A `~/.ph` directory is created or reset.
- The global project is configured, potentially using the specified environment (e.g., staging).
- You are ready to initialize or work with Powerhouse projects using the defined global settings.

## Common Issues and Solutions
- Issue: Commands fail after removing `~/.ph`.
  - Solution: Ensure you run `ph setup-globals` afterwards.
- Issue: Need to use specific local dependencies globally.
  - Solution: Use `ph use local /path/to/local/packages`.

## Related Recipes
- Installing 'ph-cmd'
- Uninstalling 'ph-cmd'
- Using/switching between different environment for your Powerhouse Project

## Further Reading
- [Powerhouse Builder Tools](/docs/academy/Create/BuilderTools)
- [GraphQL Schema Best Practices](/docs/academy/WorkWithData/GraphQLAtPowerhouse)
</details>

## Powerhouse Project Recipes

<details>
<summary>Initializing a new project & document model</summary>

# How to Initialize a new project and document model

## Problem Statement
You need to create a new, empty document model within a Powerhouse project using the local Connect application (Studio mode) to represent a worklfow of business process.

## Prerequisites
- Powerhouse CLI (`ph-cmd`) installed
- A Powerhouse project initialized (see [Initializing a Powerhouse Project Recipe](#powerhouse-cli-recipes)) or follow Step 1 & 2 below.
- Access to a terminal or command prompt
- A web browser

## Solution

### Step 1: Initialize a Powerhouse Project (if needed)
If you haven't already, create a new Powerhouse project:
```bash
ph init
# Follow the prompts to name your project
```

### Step 2: Navigate to Project Directory
Change your current directory to the newly created project folder:
```bash
cd <yourprojectname>
```

### Step 3: Start the Local Connect Application
Run the `connect` command to start the local development environment:
```bash
ph connect
```
Wait for the output indicating the server is running (e.g., `Local: http://localhost:3000/`).

### Step 4: Open Connect in Browser
A browser window should open automatically to `http://localhost:3000/`. If not, navigate there manually.

### Step 5: Access Your Local Drive
Click on your local drive displayed on the Connect interface.

### Step 6: Create the Document Model
In the "New Document" section at the bottom of the page, click the `DocumentModel` button.

## Expected Outcome
- An empty document model is created and opened in the Document Model Editor within the Connect application.
- You are ready to start defining the schema and logic for your new model.

## Common Issues and Solutions
- Issue: `ph connect` command fails.
  - Solution: Ensure `ph-cmd` is installed correctly (`ph-cmd --version`). Check for port conflicts if `3000` is already in use. Make sure you are inside the project directory created by `ph init`.
- Issue: Browser window doesn't open automatically.
  - Solution: Manually open `http://localhost:3000/` in your browser.
- Issue: Cannot find the `DocumentModel` button.
  - Solution: Ensure you have navigated into your local drive within the Connect application first.

## Related Recipes
- Initializing a Powerhouse Project (Covered in Powerhouse CLI Recipes)
- Designing a Document Model Schema (WIP)
- Implementing Document Model Reducers (WIP)

## Further Reading
- [Domain Modeling Guide](/docs/domain-modeling)
- [GraphQL Schema Best Practices](/docs/academy/WorkWithData/GraphQLAtPowerhouse)
</details>

<details>
<summary>Generating Reducers from a Document Model File</summary>

# How to Generate Reducers from a Document Model File

## Problem Statement
You have a Powerhouse Document Model defined in a `.phdm` or `.phdm.zip` file and need to generate the corresponding reducer functions for your project.

## Prerequisites
- Powerhouse CLI (`ph-cmd`) installed
- A Powerhouse project initialized (`ph init`)
- A `.phdm` or `.phdm.zip` file containing your document model definition, placed in your project (e.g., at the root).

## Solution

### Step 1: Navigate to Project Directory
Ensure your terminal is in the root directory of your Powerhouse project.
```bash
cd <yourprojectname>
```

### Step 2: Run the Generate Command
Execute the `ph generate` command, providing the path to your document model file.
```bash
# Replace todo.phdm.zip with the actual filename/path of your model
ph generate todo.phdm.zip
```

### Step 3: Integrate Generated Code
The command will output the generated reducer scafolding code in the designated folders. 

## Expected Outcome
- Reducer functions corresponding to the operations defined in your document model are generated.
- The generated code is ready to be integrated into your project's state management logic.

## Common Issues and Solutions


## Related Recipes
- Initializing a new project & document model
- Generating a Document Editor

## Further Reading
- [Domain Modeling Guide](/docs/domain-modeling)

</details>

<details>
<summary>Using/switching between different environment for your Powerhouse Project </summary>

The use command allows you to switch between different environments for your Powerhouse project dependencies.

```bash
ph use <environment> [localPath]
``` 
**Available Environments**
- latest - Uses the latest stable version of all Powerhouse packages
- dev - Uses development versions of the packages
- prod - Uses production versions of the packages
- local - Uses local versions of the packages from a specified path

**Examples**

#### Switch to latest stable versions
```bash
ph use latest
``` 

#### Switch to development versions
```bash
ph use dev
``` 

#### Use local versions from a specific path
```bash
ph use local /path/to/local/packages
``` 

#### Use a specific package manager
```bash
ph use latest --package-manager pnpm
``` 

[Content to be added]
</details>

<details>
<summary>Updating your Powerhouse project dependencies</summary>

### The Update Command
The update command allows you to update your Powerhouse dependencies to their latest versions based on the version ranges specified in your package.json.

```bash
ph update [options]
```

**Examples**
#### Update dependencies based on package.json ranges
```bash
ph update
```

#### Force update to latest dev versions
```bash
ph update --force dev
```

#### Force update to latest stable versions
```bash
ph update --force prod
```

#### Use a specific package manager
```bash
ph update --package-manager pnpm
```
</details>

<details>
<summary>Running Connect with HTTPS and a Custom Port</summary>

# How to Run Connect with HTTPS and a Custom Port

## Problem Statement
You need to run the local Powerhouse Connect application using HTTPS, possibly on a different port than the default, for scenarios like testing on a remote server (e.g., EC2) or complying with specific network requirements.

## Prerequisites
- Powerhouse CLI (`ph-cmd`) installed
- A Powerhouse project initialized (`ph init`)
- Potentially, valid SSL/TLS certificates if running in a non-localhost environment that requires trusted HTTPS. (The `--https` flag may use self-signed certificates for local development).

## Solution

### Step 1: Navigate to Project Directory
Ensure your terminal is in the root directory of your Powerhouse project.
```bash
cd <yourprojectname>
```

### Step 2: Run Connect with Flags
Execute the `ph connect` command, adding the `--https` flag to enable HTTPS and the `--port` flag followed by the desired port number.
```bash
# Example using port 8442
ph connect --port 8442 --https
```

### Step 3: Access Connect
Open your web browser and navigate to the specified address. Remember to use `https` and include the custom port.
```
https://<your-hostname-or-ip>:<port>
# Example: https://localhost:8442
# Example: https://my-ec2-instance-ip:8442
```
You might encounter a browser warning about the self-signed certificate; you may need to accept the risk to proceed for local/development testing.

## Expected Outcome
- The Powerhouse Connect application starts and serves traffic over HTTPS on the specified port.
- You can access the Connect interface securely using the `https` protocol.

## Common Issues and Solutions
- Issue: Browser shows security warnings (e.g., "Your connection is not private").
  - Solution: This is expected when using the default self-signed certificate generated by `--https`. For development or internal testing, you can usually proceed by accepting the risk. For production or public-facing scenarios, configure Connect with properly signed certificates (consult Powerhouse documentation for advanced configuration).
- Issue: Port conflict (e.g., `"Port <port> is already in use"`).
  - Solution: Choose a different port number that is not currently occupied by another application.
- Issue: Cannot access Connect from a remote machine.
  - Solution: Ensure the port is open in any firewalls (on the server and potentially network firewalls). Verify you are using the correct public IP address or hostname of the machine running Connect.

## Related Recipes
- Initializing a new project & document model

## Further Reading
- [Powerhouse Builder Tools](/docs/academy/Create/BuilderTools)
- [GraphQL Schema Best Practices](/docs/academy/WorkWithData/GraphQLAtPowerhouse)
</details>

## Document & Drive Editor recipes

<details>
<summary>Generating a Document Editor</summary>

# How to Generate a Document Editor

## Problem Statement
You have a Powerhouse document model and need to create a user interface (editor) for it to be used within the Connect application.

## Prerequisites
- Powerhouse CLI (`ph-cmd`) installed
- A Powerhouse project initialized (`ph init`)
- A document model generated or defined within the project (e.g., in the `document-models` directory).

## Solution

### Step 1: Navigate to Project Directory
Ensure your terminal is in the root directory of your Powerhouse project.
```bash
cd <yourprojectname>
```

### Step 2: Generate the Editor Template
Run the `generate` command, specifying the editor name (usually matching the document model name) and the associated document type.

```bash
# Replace <ModelName> with the name of your document model (e.g., ToDoList)
# Replace <docType> with the identifier for your document (e.g., powerhouse/todolist)
ph generate --editor <ModelName> --document-types <docType>
```

## Expected Outcome
- A new directory is created under `editors/` (e.g., `editors/<model-name>/`).
- An `editor.tsx` file is generated within that directory, containing a basic template for your document editor.
- You can now customize `editor.tsx` to build your desired UI using HTML, Tailwind CSS, or custom CSS.

## Related Recipes
- Initializing a new project & document model
- Generating a Custom Drive Explorer

## Further Reading
- [Build a Todo-list Editor](/docs/academy/BuildingUserExperiences/BuildToDoListEditor)
</details>

<details>
<summary>Generating a Custom Drive Explorer</summary>

# How to Generate a Custom Drive Explorer (Drive App)

## Problem Statement
You need a custom, application-like interface to browse, organize, or interact with specific types of documents stored within a Powerhouse drive, going beyond the standard file listing.

## Prerequisites
- Powerhouse CLI (`ph-cmd`) installed
- A Powerhouse project initialized (`ph init`)

## Solution

### Step 1: Navigate to Project Directory
Ensure your terminal is in the root directory of your Powerhouse project.
```bash
cd <yourprojectname>
```

### Step 2: Generate the Drive Explorer Template
Run the `generate` command, specifying the `--drive-editor` flag and a name for your drive explorer application.

```bash
# Replace <drive-app-name> with a suitable name for your drive explorer (e.g., todo-drive-explorer)
ph generate --drive-editor <drive-app-name>
```

## Expected Outcome
- A new directory is created under `editors/` (e.g., `editors/<drive-app-name>/`).
- Template files (`EditorContainer.tsx`, components, hooks, etc.) are generated within that directory, providing a basic structure for a drive explorer.
- You can now customize these files to create your specific drive interface, potentially removing default components and adding custom views relevant to your document models.
- Remember to update your `powerhouse.manifest.json` to register the new app.

## Related Recipes
- Generating a Document Editor

## Further Reading
- [Build a Drive-Explorer](/docs/academy/BuildingUserExperiences/BuildingADriveExplorer)
</details>

## Reactor Recipes

<details>
<summary>Starting the Reactor</summary>

# How to Start the Powerhouse Reactor

## Problem Statement
You need to start the Powerhouse Reactor, the local service responsible for processing document model operations and managing state, typically for testing or development purposes.

## Prerequisites
- Powerhouse CLI (`ph-cmd`) installed
- A Powerhouse project initialized (`ph init`)
- You are in the root directory of your Powerhouse project.

## Solution

### Step 1: Navigate to Project Directory (if needed)
Ensure your terminal is in the root directory of your Powerhouse project.
```bash
cd <yourprojectname>
```

### Step 2: Run the Reactor Command
Execute the `ph reactor` command.
```bash
ph reactor
```

## Expected Outcome
- The Reactor service starts, typically listening on `localhost:4001`.
- You will see log output indicating the reactor is running and ready to process operations.
- A GraphQL endpoint is usually available at `http://localhost:4001/graphql` for direct interaction and testing.

## Common Issues and Solutions
- Issue: Reactor fails to start, mentioning port conflicts.
  - Solution: Ensure port `4001` (or the configured reactor port) is not already in use by another application. Stop the conflicting application or configure the reactor to use a different port (if possible, check documentation).
- Issue: Errors related to storage or configuration.
  - Solution: Check the `powerhouse.manifest.json` and any reactor-specific configuration files for errors. Ensure storage providers (like local disk) are accessible and configured correctly.

## Related Recipes
- Initializing a new project & document model
- Testing with GraphQL (WIP)

</details>

## Package Development Recipes

<details>
<summary>Installing a Custom Powerhouse Package</summary>

# How to Install a Custom Powerhouse Package

## Problem Statement
You have developed and published a Powerhouse package (containing document models, editors, etc.) to npm, or you have a local package, and you need to install it into another Powerhouse project.

## Prerequisites
- Powerhouse CLI (`ph-cmd`) installed
- A Powerhouse project initialized (`ph init`) where you want to install the package.
- The custom package is either published to npm or available locally.

## Solution

### Step 1: Navigate to the Target Project Directory
Ensure your terminal is in the root directory of the Powerhouse project where you want to install the package.
```bash
cd <your-target-project-name>
```

### Step 2: Install the Package
Use the `ph install` command followed by the package name (if published to npm) or the path to the local package.

**For npm packages:**
```bash
# Replace <your-package-name> with the actual name on npm
ph install <your-package-name>
```

**For local packages (using a relative or absolute path):**
```bash
# Example using a relative path
ph install ../path/to/my-local-package

# Example using an absolute path
ph install /Users/you/dev/my-local-package
```

### Step 3: Verify Installation
Check your project's `package.json` and `powerhouse.manifest.json` to ensure the package dependency has been added correctly. Run `ph connect` to see if the components from the installed package are available.

## Expected Outcome
- The custom Powerhouse package is downloaded and installed into your project's dependencies.
- The `powerhouse.manifest.json` is updated (if necessary) to reflect the installed package.
- Document models, editors, drive explorers, or other components from the package become available within the target project.

## Common Issues and Solutions
- Issue: Package not found (npm).
  - Solution: Double-check the package name for typos. Ensure the package is published and accessible on npm.
- Issue: Path not found (local).
  - Solution: Verify the relative or absolute path to the local package directory is correct.
- Issue: Conflicts with existing project components or dependencies.
  - Solution: Resolve version conflicts or naming collisions as needed. Review the installed package's structure and dependencies.

## Related Recipes
- Publishing a Powerhouse Package (WIP)
- Initializing a Powerhouse Project

</details>