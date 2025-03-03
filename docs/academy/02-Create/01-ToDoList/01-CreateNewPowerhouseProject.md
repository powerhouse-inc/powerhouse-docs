
# Create New Powerhouse Project

## Overview
This tutorial will guide you through creating a new 'Powerhouse project', which consists of a document model and its editor. You'll be using Connect locally, known as 'Studio mode'.

## Prerequisites
- Node.js and npm installed
- Visual Studio Code (or your preferred IDE)
- Terminal/Command Prompt access

## Quick Start
Create a new Powerhouse project with a single command:
```bash
npm create document-model-lib
```

## Before You Begin
1. Open your terminal (either your system terminal or VS Code's integrated terminal)
2. Navigate to your desired project directory using:
   ```bash
   cd your-directory
   ```
3. Ensure you're in the correct directory before running the create command


In the terminal, you will be asked to enter the project name. Fill in the project name and press enter.

```bash
you@yourmachine:~/Powerhouse$ npm create document-model-lib

> npx
> create-document-model-lib

? What is the project name? ‣ myToDoList
```	

Once the project is created, you will see the following output:

```bash
 The installation is done!

 You can start by typing:
    cd myToDoList
    npm run generate
```

Navigate to the newly created project directory:

```bash
cd myToDoList
```

Once you are in the project directory, now you can run the `npm run connect` command to instantiate a local version of the Connect application to start building your document model.

Run the following command to start the Connect application:

```bash
npm run connect
```

The Connect application will start and you will see the following output:

```bash
you@yourmachine:~/Powerhouse/myToDoList$ npm run connect

> myToDoList@1.0.0 connect
> connect --config-file ./powerhouse.config.json

Watching local document models at '/home/p/Powerhouse/myToDoList/document-models'...
Watching local document editors at '/home/p/Powerhouse/myToDoList/editors'...
  ➜  Local:   http://localhost:3000/
  ➜  press h + enter to show help
```

A new browser window will open and you will see the Connect application. If it doesn't open automatically, you can open it manually by navigating to `http://localhost:3000/` in your browser.

Create a new document model by clicking on the `DocumentModel` button by the "New Document" section. The Gif below shows you where to click.

![Create New Document Model](./images/connectApp.gif)

If you followed the steps correctly, you should have an empty document model created called `ToDoList`.

In the next tutorial, you will learn how to design your document model and export it to be later used in your Powerhouse project.
