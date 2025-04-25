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