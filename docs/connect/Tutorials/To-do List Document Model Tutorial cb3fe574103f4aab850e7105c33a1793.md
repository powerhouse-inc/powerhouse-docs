# To-do List Document Model Tutorial

## Table of Contents

- [Introduction](#introduction)
- [Pre-requisites](#pre-requisites)
- [To-do List Document Model](#to-do-list-document-model)
    - [**State schema for the ToDo List Document Model**](#state-schema-for-the-todo-list-document-model)
    - [**Operations Schema of the ToDo List Document Model**](#operations-schema-of-the-todo-list-document-model)
- [Create Document Model in Connect](#create-document-model-in-connect)
- [Write Reducers and UI components](#write-reducers-and-ui-components)
    - [Setup the UI component](#setup-the-ui-component)


# Introduction

In this tutorial, we’ll get you up to speed with creating a simple document model with the Powerhouse tool, Connect. You’ll go through the process of creating it, writing reducer logic and also implementing a simple user experience / front-end logic for the document model so that you can see the end result and the full picture of how all the pieces are put together. 

# Pre-requisites

If you’re want to read more about how document models work and what are the best practices to write one you can check the links below:

[Best Practices for Writing Powerhouse Document Models](https://www.notion.so/Best-Practices-for-Writing-Powerhouse-Document-Models-8adc6b564cf4417188578884c0c94def?pvs=21)

- Link to intro to document models

# To-do List Document Model

Let’s setup a to-do list document model where one can add, remove and edit a list of items. Plus, to see the stats of our list of items, such as completed, checked or unchecked total items. 

The document model consists of:

- state schema - the blueprint of the structure of the document
- operations schema - the blueprint of the structure of the input operations

Below, is the Graphql state schema code that forms the to-do list document model. First you’ll understand each code block that forms the document model and then you’ll implement it in the Connect tool to later export it. 

### **State schema for the ToDo List Document Model**

```graphql
# Define a GraphQL type for the state of the to-do list document
type ToDoListState {
  items: [ToDoItem!]! # Array of to-do items
  stats: ToDoListStats! # Statistics about the to-do list items
}

# Define a GraphQL type for a single to-do item
type ToDoItem {
  id: ID! # Unique identifier for each to-do item
  text: String! # The text description of the to-do item
  checked: Boolean! # Status of the to-do item (checked/unchecked)
}

# Define a GraphQL type for the statistics of the to-do list
type ToDoListStats {
  total: Int! # Total number of items
  checked: Int! # Number of checked items
  unchecked: Int! # Number of unchecked items
}
```

**Global Initial JSON State for the ToDo List Document Model**

```json
{
	"items": [],
  "stats": {
    "total": 0,
    "checked": 0,
    "unchecked": 0
  }
}
```

Let’s walk you through each code block so you get a better understanding. 

`type ToDoListState {
  items: [ToDoItem!]! # Array of to-do items
  stats: ToDoListStats! # Statistics about the to-do list items
}`

The `TodoListState` block is the root or base or foundation where all the information that is generated in this document is stored and able to be accessed by other sources like an external API or the reducers.  It contains two sources, `items` - a list of all to do items that are generated and a`stats` object that contains the total number of checked, and unchecked items in the to do list. 

The `itens` source contains a list of a To Do Item`[ToDoItem!]!` This `ToDoItem` is another code block that defines the structure of how one To Do Item should be:

`type ToDoItem {
  id: ID! # Unique identifier for each to-do item
  text: String! # The text description of the to-do item
  checked: Boolean! # Status of the to-do item (checked/unchecked)
}`

Each ToDoItem contains an ID, text and checked fields. These fields should always be filled when a new ToDoItem is being generated. 

And the last code block that forms the ToDoList document model is the stats block:
`type ToDoListStats {
  total: Int! # Total number of items
  checked: Int! # Number of checked items
  unchecked: Int! # Number of unchecked items
}`

This one contains the total number of generated ToDoItems in the list. It contains the total value, the total of checked and total of unchecked values. Each time a new ToDoItem is created with its specific checked value, a new number is being added in this ToDoListStats state to account for this item. 

### **Operations Schema of the ToDo List Document Model**

This schema shows the structure of the operations that allow changes in the ToDoList document model. These operations define how the user can add, edit or delete ToDo items in the ToDo List. 

There’s three operations: 

- AddTodoItemInput - Adds a new item to the list.
- UpdateTodoItemInput - Updates an existing item in the list. It’s state can be change from checked (true) to unchecked (false) or the item title.
- DeleteTodoItemInput - Deletes item from the list.

```graphql
input AddTodoItemInput {
  id: ID!
  text: String!
}

input UpdateTodoItemInput {
  id: ID!
  text: String
  checked: Boolean
}

input DeleteTodoItemInput {
  id: ID!
}
```

# Create Document Model in Connect

Now let’s add this ToDo List blueprint in connect so we create the document model that can later be used to create the reducers and UI components for it.

**Steps:**

1. Open [https://apps.powerhouse.io/](https://apps.powerhouse.io/) and choose Powerhouse/dev/Connect as the app. Check below image:

![Untitled](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Untitled.png)

1. Choose `My Local Drive` and click on `Document Model` on the right to create a new document model we’ll call `ToDoList`

![Untitled](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Untitled%201.png)

![Untitled](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Untitled%202.png)

1. The document model editor has been opened and you can start adding the information about the document model. You can fill in the details as in the below image. 

![Untitled](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Untitled%203.png)

1. In `Global State Schema` copy the ToDoList code from above and paste it in the editor. And the `JSON` code in the `Global Initial State` too. Make sure it looks like in the below image in order to continue:

![Untitled](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Untitled%204.png)

1. After, you need to add the operations below that will define the input that will change the state of the document model. 
Below image shows an example of one operation. Please add all three operations shown above

![Example of one operation](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Untitled%205.png)

Example of one operation

1. Once finalised, scroll up and export the document by clicking on the Export button:

![Untitled](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Untitled%206.png)

# Write Reducers and UI components

Now that you have the ToDoList.zip file saved locally on your PC, it’s time to write the reducers and the UI components for this document model so that it can be integrated anywhere. To start, you’ll have to setup your development environment so that you can clone a repo from Github and be able to write code in an editor such as VSCode. 

If you don’t know how to do these steps, have a look here:

- Setup git: https://git-scm.com/downloads
- Setup nodejs: [https://nodejs.org](https://nodejs.org/en)
- Setup VSCode: [https://code.visualstudio.com/learn/get-started/basics](https://code.visualstudio.com/learn/get-started/basics)

Once you’re ready with Git and VSCode, clone the below repo locally on your PC and open the folder in VSCode:

1. Open terminal. On mac is `cmd + space`, type `terminal` and press enter. On other PCs, search `terminal` in your local search bar.
2. Clone command in your terminal: `git clone [https://github.com/powerhouse-inc/document-model-libs.git](https://github.com/powerhouse-inc/document-model-libs.git)`
3. Open the `document-model-libs` folder by inputting the command in terminal `cd document-model-libs`
4. Open folder in VSCode by using the terminal command: `code .` inside the document-model-libs folder. Once VSCode is opened, you should see the folder structure like in the below image:
    
    ![Screenshot 2024-07-09 at 13.17.13.png](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Screenshot_2024-07-09_at_13.17.13.png)
    

Before we start on writing the reducers, let’s open the terminal window in vscode instead. To do this, in the VSCode app do the key command: `shift + cmd + p` to open the vscode search bar, type `terminal` and choose `Terminal: Create new Terminal`

![Screenshot 2024-07-09 at 13.19.08.png](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Screenshot_2024-07-09_at_13.19.08.png)

![Screenshot 2024-07-09 at 13.21.08.png](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Screenshot_2024-07-09_at_13.21.08.png)

A terminal view should now show in VSCode. 

![Screenshot 2024-07-09 at 13.21.51.png](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Screenshot_2024-07-09_at_13.21.51.png)

Now you need to install the project’s dependencies, run this command in the terminal: `pnpm i`

After this command is set. You now need to generate the code by importing the document model zip file you created with the Connect app into this project. The easiest way to do it is paste the folder inside the `document-model-libs` folder and then run the generate command.
After you pasted it, you should be able to see the ToDoList.zip in vscode:

![Untitled](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Untitled%207.png)

Now, in terminal write the command: `pnpm generate ./ToDoList.zip` 
Once completed, you should see a new folder `to-do-list` created inside the `document-models` folder.

![Untitled](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Untitled%208.png)

You’ll write the reducers in the `to-do.ts` file. 

Copy paste the below reducers code into the `to-do.ts` file. Remove the existing generated code and paste the code below. So the file should only contain what is in the code below. Make sure to save the file once done by doing `cmd + s` or your PC alternative. 

```tsx
/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { ToDoListToDoOperations } from '../../gen/to-do/operations';

export const reducer: ToDoListToDoOperations = {
    addTodoItemOperation(state, action, dispatch) {
        state.stats.total += 1;
        state.stats.unchecked += 1;
        state.items.push({
            id: action.input.id,
            text: action.input.text,
            checked: false,
        });
    },
    updateTodoItemOperation(state, action, dispatch) {
        const item = state.items.find(item => item.id === action.input.id);
        if (!item) {
            throw new Error(`Item with id ${action.input.id} not found`);
        }
        if (action.input.text) {
            item.text = action.input.text;
        }
        if (action.input.checked) {
            state.stats.unchecked -= 1;
            state.stats.checked += 1;
            item.checked = action.input.checked;
        }
        if (action.input.checked === false) {
            state.stats.unchecked += 1;
            state.stats.checked -= 1;
            item.checked = action.input.checked;
        }
    },
    deleteTodoItemOperation(state, action, dispatch) {
        const item = state.items.find(item => item.id === action.input.id);
        state.stats.total -= 1;
        if (item?.checked) {
            state.stats.checked -= 1;
        }
        if (item?.checked === false) {
            state.stats.unchecked -= 1;
        }
        state.items = state.items.filter(item => item.id !== action.input.id);
    },
};

```

The reducer logic is creating the how-to of the ToDoList document model operations. The goal of the reducer is to handle how the data will be managed in the ToDoList document model. So, when a new to-do item is being added, how should it be added in the list. The reducer’s role is this exact process, you need to define what will happen to the ToDoList document model state. The data manipulation of the state happens through the reducers. 

As we defined three operations for the ToDoList document model, there’s three reducer functions in the above code example: `addTodoItemOperation`, `updateTodoItemOperation` and `deleteTodoItemOperation`. The name of each function implies what its operation is about. One adds a new item to the list, one allows to edit an existing item and the last one allows the user to delete an item from the list. 

Writing and adding the reducer logic to the `to-do.ts` file completes the reducers part. Next is writing some front-end code and creating a small user interface component to show how this UI component connects elegantly to the document model without you having to write extra code to handle any state in your UI component. 

### Setup the UI component

To setup the UI components you’ll need to copy paste some extra code inside a new folder and files you’ll have to create. In the same project directory you’ve been working to write the reducers, you’ll find a folder called `editors`. In this folder, create a new folder called: `to-do-list`. Inside this new folder, create three new files: `index.ts`, `to-do-list.stories.tsx` and `to-do-list.tsx`. Follow below image as an example. 

![Screenshot 2024-07-10 at 20.17.12.png](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Screenshot_2024-07-10_at_20.17.12.png)

Copy paste the code from each below examples into each respective file. Remember to save the files with the latest changes from your copy/paste.

`index.ts`

```tsx
import { lazyWithPreload } from 'document-model-libs/utils';
import type { ExtendedEditor } from '../types';

export const module: ExtendedEditor = {
    Component: lazyWithPreload(() => import('./to-do-list')),
    documentTypes: ['*'],
    config: {
        id: 'to-do-list-editor',
        disableExternalControls: false,
    },
};

export default module;
```

`to-do-list.stories.tsx`

```tsx
import { createDocumentStory } from 'document-model-libs/utils';
import { reducer, utils } from '../../document-models/to-do-list';
import Editor from './to-do-list';

const { meta, CreateDocumentStory: ToDoList } = createDocumentStory(
    Editor,
    reducer,
    utils.createExtendedState(),
);

export default {
    ...meta,
    title: 'ToDoList',
    parameters: {
        date: new Date('June 21, 2024 10:00:00'),
    },
};

export { ToDoList };
```

`to-do-list.tsx`

```tsx
import React from 'react';
import {
    DocumentEditor,
    EditorWorksheet,
    TextInput,
} from 'document-model-libs/utils';
import { EditorProps } from 'document-model/document';
import {
    ToDoItem,
    ToDoListState,
    ToDoListAction,
    ToDoListLocalState,
    actions,
} from '../../document-models/to-do-list';

export type IProps = EditorProps<
    ToDoListState,
    ToDoListAction,
    ToDoListLocalState
>;

const ToDoList = (props: IProps) => {
    const { document, dispatch, context } = props;
    const {
        state: { global: state },
    } = document;

    // Sort items by checked status
    const sortedItems: ToDoItem[] = [...state.items].sort((a, b) => {
        return (b.checked ? 1 : 0) - (a.checked ? 1 : 0);
    });

    return (
        <DocumentEditor mode={context.theme}>
            <EditorWorksheet>
                <h1>To-do List</h1>
                <TextInput
                    key="doc-title"
                    placeholder="Insert task here..."
                    size="large"
                    theme={context.theme}
                    onSubmit={value => {
                        dispatch(
                            actions.addTodoItem({
                                id: Math.random().toString(),
                                text: value,
                            }),
                        );
                    }}
                />
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <div style={{ flex: 2 }}>
                        {sortedItems.map((item: ToDoItem, index: number) => (
                            <ul key={index}>
                                <li
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={item.checked}
                                        onClick={() => {
                                            dispatch(
                                                actions.updateTodoItem({
                                                    id: item.id,
                                                    checked: !item.checked,
                                                }),
                                            );
                                        }}
                                    />
                                    <button
                                        style={{
                                            color: 'red',
                                            padding: '0px 5px 0px 5px',
                                        }}
                                        onClick={() => {
                                            dispatch(
                                                actions.deleteTodoItem({
                                                    id: item.id,
                                                }),
                                            );
                                        }}
                                    >
                                        Remove
                                    </button>
                                    <span
                                        style={{
                                            fontSize: '15px',
                                            marginLeft: '10px',
                                        }}
                                    >
                                        {item.text}
                                    </span>
                                </li>
                            </ul>
                        ))}
                    </div>
                    <div style={{ flex: 1, paddingLeft: '10px' }}>
                        <span>Total: {state.stats.total}</span>
                        <br />
                        <span>Checked: {state.stats.checked}</span>
                        <br />
                        <span>Unchecked: {state.stats.unchecked}</span>
                    </div>
                </div>
            </EditorWorksheet>
        </DocumentEditor>
    );
};

export default ToDoList;
```

Now you’re ready to run the codebase and see the result of the ToDoList Document model in action. 

Run `pnpm storybook` in the terminal in VSCode. The command should run and open a new tab in your browser at [`http://localhost:6006/`](http://localhost:6006/). And it should show the storybook component viewer, just like in the image below:

![Untitled](To-do%20List%20Document%20Model%20Tutorial%20cb3fe574103f4aab850e7105c33a1793/Untitled%209.png)

Navigate to the ToDoList view on the left menu and you’l see the user interface for this document model. If you managed to get this far, congratulations. You wrote your first document model.