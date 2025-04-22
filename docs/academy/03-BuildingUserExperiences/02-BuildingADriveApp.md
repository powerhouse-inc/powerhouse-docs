# Build a Drive-App

**Drive-Apps** enhance how contributors and organizations interact with document models.   
An 'app-like' experience is created by providing a **custom interface** for working with the contents of a drive.  
> A 'Drive-App' offers a tailored application designed around its document models.   
Think of a Drive-App as a specialized lens—it offers **different ways to visualize, organize, and interact with** the data stored within a drive, making it more intuitive and efficient for specific use cases.

### **Designed for Specific Use Cases**

Most Drive-Apps are built by organizations for specific purposes, aligning closely with a document model package or even being part of one. By integrating Drive-Apps with document models, organizations can customize user experiences, streamline workflows, and maximize efficiencyfor their contributors.

Drive-Apps **bridge the gap between raw data and usability**, unlocking the full potential of document models within the Powerhouse framework.

### **Key Features of Drive-Apps**

- **Custom Views & Organization** – Drive-Apps can present data in formats like Kanban boards, list views, or other structured layouts to suit different workflows.
- **Aggregated Insights** – They can provide high-level summaries of important details across document models, enabling quick decision-making.
- **Enhanced Interactivity** – Drive-Apps can include widgets, data processors, or read models to process and display document data dynamically.

### **Building a Drive-App**

Drive-Apps provide custom interfaces for interacting with the contents of a drive. Here's how to create one:

#### 1. Generate the scaffolding code

Use the `generate drive editor` command to create the basic structure for your Drive-App:

```bash
# Replace "drive-explorer" with your preferred name
generate drive editor drive-explorer
```

This creates a template that includes:
- A tree structure navigation panel
- Basic file/folder operations
- Standard layout components

#### 2. Update the manifest file

After creating your Drive-App, update the `manifest.json` file with relevant information:
The manifest file identifies your project and its components within the Powerhouse ecosystem.

#### 3. Customize the Drive-App

Review the generated template and modify it to better suit your document model:

1. Remove unnecessary files and components
2. Add custom views specific to your data model
3. Implement specialized interactions for your use case

The default template provides a solid foundation, but the real power comes from tailoring the interface to your specific document models. Let's implement a specific example for our Todo list we've been working on. 

#### 4. Implementation Example: Todo Drive Explorer

Let's walk through a concrete example of implementing a custom Drive-App using the [Todo Drive Explorer repository](https://github.com/powerhouse-inc/todo-drive-explorer) as a reference.

##### Generate the Drive Explorer App

```bash
# Generate the drive explorer app
ph generate --drive-editor todo-drive-explorer
```

##### Update the Manifest File

Update the `powerhouse.manifest.json` file to register your Drive-App:

```json
{
  "name": "",
  "description": "",
  "category": "",
  "publisher": {
    "name": "Powerhouse",
    "url": "https://www.powerhouse.inc/"
  },
  "documentModels": [],
  "editors": [],
  "apps": [
    {
      "id": "todo-drive-explorer",
      "name": "Todo Drive App",
      "driveEditor": "todo-drive-explorer"
    }
  ],
  "subgraphs": [],
  "importScripts": []
}
```

##### Customize the Drive Explorer App

1. Remove unnecessary default components:

```bash
# Remove default files that won't be needed
rm -rf editors/todo-drive-explorer/hooks
rm -rf editors/todo-drive-explorer/components/FileItemsGrid.tsx
rm -rf editors/todo-drive-explorer/components/FolderItemsGrid.tsx
rm -rf editors/todo-drive-explorer/components/FolderTree.tsx
```

2. Create new custom components:

```
# Create a type definition for your document model
editors/todo-drive-explorer/types/todo.ts

# Create a custom UI component for displaying progress of your todo lists
editors/todo-drive-explorer/components/ProgressBar.tsx

# Create the main Drive Explorer component
editors/todo-drive-explorer/components/DriveExplorer.tsx
```

3. Update the Editor Container:

Update `editors/todo-drive-explorer/components/EditorContainer.tsx` to integrate your document model and editors.

The result is a custom Drive-App that provides a tailored interface for working with your document model, in this case, a Todo List application with visual progress indicators and specialized interactions.
