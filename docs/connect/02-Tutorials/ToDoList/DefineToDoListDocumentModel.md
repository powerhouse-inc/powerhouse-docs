---
sidebar_position: 3
# sidebar_label: Connect
displayed_sidebar: connectSidebar
---
# Define the ToDoList Document Model

In this tutorial, you will learn how to design your document model and export it to be later used in your Powerhouse project.
If you don't have a document model created yet, you can follow the steps in the [Create New Powerhouse Project](/docs/connect/02-Tutorials/ToDoList/CreateNewPowerhouseProject.md) tutorial to create a new document model.

Before you start, make sure you have the Connect application running.

## ToDoList Document Model Schema

We use GraphQL Schema Definition Language (SDL) to define the document model schema. Below, you can see the SDL for the `ToDoList` document model.

This schema contains the data structure of the document model and the basic operations that can be performed on the document model.

## State Schema

```graphql
# Defines a GraphQL type for the state of the to-do list document
type ToDoListState {
  items: [ToDoItem!]! # Array of to-do items
  stats: ToDoListStats! # Statistics about the to-do list items
}

# Defines a GraphQL type for a single to-do item
type ToDoItem {
  id: ID! # Unique identifier for each to-do item
  text: String! # The text description of the to-do item
  checked: Boolean! # Status of the to-do item (checked/unchecked)
}

# Defines a GraphQL type for the statistics of the to-do list
type ToDoListStats {
  total: Int! # Total number of items
  checked: Int! # Number of checked items
  unchecked: Int! # Number of unchecked items
}
```

## Operations Schema

```graphql
# Defines a GraphQL input type for adding a new to-do item
input AddTodoItemInput {
  id: ID!
  text: String!
}

# Defines a GraphQL input type for updating a to-do item
input UpdateTodoItemInput {
  id: ID!
  text: String
  checked: Boolean
}

# Defines a GraphQL input type for deleting a to-do item
input DeleteTodoItemInput {
  id: ID!
}
```

## Define the Document Model

To be able to define the document model, you need to open the ToDoList document model editor in Connect. 

The steps below show you how to do this:

1. In the Connect application, click on the `ToDoList` document model to open the document model editor.
2. You'll be welcomed with a form to fill, this is metadata about the document model, fill in the details in the fields. 

    In the `Document Type` field, type `powerhouse/todolist`. This defines the new type of document that will be created with this document model.
    
    ![ToDoList Document Model Form Metadata](./images/form.png)

3. In the code editor, you can see the SDL for the document model. Replace the existing SDL with the SDL defined in the [State Schema](#state-schema) section. Only copy and paste the types, leaving the inputs for the next step. 
4. Below the editor, there is an input field `Add module`. You need to create and name a module that the input operations will be added to. In this case, we will name the module `to_do_list`. Press enter.
5. Now there is a new field, called `Add operation`. Here you will have to add each input operation to the module, one by one.
6. Inside the `Add operation` field, type `ADD_TODO_ITEM` and press enter. A small editor will appear under with an empty input type that you have to fill. Copy the first input type from the [Operations Schema](#operations-schema) section and paste it in the editor. The editor should look like this:

    ```graphql
    input AddTodoItemInput {
        id: ID!
        text: String!
    }
    ```

7. Repeat step 6 for the other input operations. If you noticed, you only need to add the name `(UPDATE_TODO_ITEM, DELETE_TODO_ITEM)` of the operation without the `input` suffix. Then it will be generated once you press enter.
8. Once you have added all the input operations, click on the `Export` button, at the top right of the editor, to save the document model on your local machine.

Check below screenshot for the complete implementation:

![ToDoList Document Model](./images/completeEditor.png)
