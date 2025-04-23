# Implement Operation Reducers

In this section, we will implement and test the operation reducers for the `ToDoList` document model. In order to do this, you have to export the document model from the Connect application and import it into your powerhouse project directory. 

To export the document model, follow the steps in the `Define ToDoList Document Model` section.

## Understanding Reducers in Document Models

Reducers are a core concept in Powerhouse document models. They implement the state transition logic for each operation defined in your schema:

1. **Connection to Schema Definition Language (SDL)**: The reducers directly implement the operations you defined in your SDL. Remember how we defined `AddTodoItemInput`, `UpdateTodoItemInput`, and `DeleteTodoItemInput` in our schema? The reducers provide the actual implementation of what happens when those operations are performed.

2. **Event Sourcing Pattern**: Document models in Powerhouse follow event sourcing principles, where each operation is recorded in the document's history. The current state of the document is derived by applying all operations in sequence.

3. **Immutable Updates**: While the reducer code appears to modify the state directly, Powerhouse handles immutability behind the scenes. Each operation produces a new document state without modifying the previous one.

4. **Type Safety**: Powerhouse generates TypeScript types from your SDL, ensuring that your reducers and operations are type-safe.

5. **Pure Functions**: Reducers should be pure functions that only depend on the current state and the operation input, making them predictable and testable.

Let's see how these concepts are implemented in our `ToDoList` document model.

## Import Document Model and Generate Code

To import the document model into your powerhouse project, you can either:
 
- Copy&Paste the file directly into the root of your powerhouse project.
- Or drag&drop the file into the powerhouse project directory in the VSCode editor as seen in the image below:

Either step will import the document model into your powerhouse project.

![vscode image](./images/vscode.png)

The next steps will take place in the VSCode editor. Make sure to have it open and the terminal window inside vscode open as well. 


To write the opearation reducers of the `ToDoList` document model, you need to generate the document model code from the document model file you have exported into the powerhouse project directory.

To do this, run the following command in the terminal:

```bash
ph generate ToDoList.phdm.zip
```

Now you can navigate to `/document-models/to-do-list/src/reducers/to-do-list.ts` and start writing the operation reducers.

Open the `to-do-list.ts` file and you should see the code that needs to be filled for the three operations you have defined earlier. Image below shows the code that needs to be filled:

![to-do-list ts file](./images/reducers.png)

## Write the Operation Reducers

1. Copy&paste the code below into the `to-do-list.ts` file in the `reducers` folder.
2. Save the file.


```typescript
import type { ToDoListOperationsOperations } from "../../gen/operations/operations.js";
import type { ToDoListState, ToDoItem } from "../../gen/schema/types.js";
import type { AddTodoItemAction, UpdateTodoItemAction, DeleteTodoItemAction } from "../../gen/operations/actions.js";

// REMARKS: 
// Reducers implement the state transitions defined by our operations in the schema.
// Notice how the imports above directly reference the types we defined in our SDL:
// - ToDoListState and ToDoItem (from our schema types)
// - Action types that correspond to our GraphQL input types (AddTodoItemInput, etc.)

export const reducer: ToDoListOperationsOperations = {
  // REMARKS: 
  // This reducer implements the ADD_TODO_ITEM operation we defined in our schema.
  // It takes the current state and an action containing the input data from AddTodoItemInput.
  // The reducer directly modifies the state object (immutability is handled by the framework).
  addTodoItemOperation(state: ToDoListState, action: AddTodoItemAction) {
    // REMARKS: Here we're adding a new item to the state.items array.
    // Notice how we're using the input fields defined in AddTodoItemInput (id, text),
    // while setting the initial value for checked (which wasn't in the input).
    state.items.push({
      id: action.input.id,
      text: action.input.text,
      checked: false,
    });
  },

  // REMARKS:
  // This reducer implements the UPDATE_TODO_ITEM operation.
  // It shows how we can conditionally update only the fields that were provided in the input.
  // The operation follows the shape we defined in UpdateTodoItemInput.
  updateTodoItemOperation(state: ToDoListState, action: UpdateTodoItemAction) {
    // REMARKS: First we find the item by ID, following our data structure from the schema
    const item = state.items.find((item: ToDoItem) => item.id === action.input.id);
    if (!item) throw new Error(`Item with id ${action.input.id} not found`);
    
    // REMARKS: Both text and checked fields were defined as optional in UpdateTodoItemInput,
    // so we only update them if they were included in the input
    if (action.input.text !== undefined && action.input.text !== null) {
      item.text = action.input.text;
    }
    if (action.input.checked !== undefined && action.input.checked !== null) {
      item.checked = action.input.checked;
    }
  },

  // REMARKS:
  // This reducer implements the DELETE_TODO_ITEM operation.
  // It uses the DeleteTodoItemInput which only requires an id to identify the item to remove.
  deleteTodoItemOperation(state: ToDoListState, action: DeleteTodoItemAction) {
    // REMARKS: This filters the items array to remove the item with the matching id
    state.items = state.items.filter((item: ToDoItem) => item.id !== action.input.id);
  },
};
```

## Write the Operation Reducers Tests

In order to make sure the operation reducers are working as expected, you need to write tests for them.

Navigate to `/document-models/to-do-list/src/reducers/tests/to-do-list.test.ts` and copy&paste the code below into the file. Save the file.

Here are the tests for the three operations written in the reducers file. This test file creates an empty ToDoList document model, then adds a todo item, updates it and deletes it.

```typescript
import utils from '../../gen/utils';
import { reducer } from '../../gen/reducer';
import * as creators from '../../gen/creators';
import { ToDoListDocument } from '../../gen/types';

// REMARKS:
// These tests demonstrate the event sourcing principles of our document model.
// Each operation is recorded in the document's operations list and affects the state.

describe('Todolist Operations', () => {
    let document: ToDoListDocument;

    beforeEach(() => {
        // REMARKS: We start with a fresh, empty document for each test
        document = utils.createDocument();
    });

    it('should handle addTodoItem operation', () => {
        // REMARKS: We create an input object matching our AddTodoItemInput schema
        const input = { id: '1', text: 'Buy milk' };
        
        // REMARKS: We apply the operation to get a new document state
        // Note how we use the creators to generate the operation action
        const updatedDocument = reducer(document, creators.addTodoItem(input));

        // REMARKS: We verify that:
        // 1. The operation was recorded in the document's operation history
        // 2. The state was updated according to our reducer implementation
        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].type).toBe('ADD_TODO_ITEM');
        expect(updatedDocument.state.global.items).toHaveLength(1);
        expect(updatedDocument.state.global.items[0].text).toBe('Buy milk');
    });

    it('should handle updateTodoItem operation', () => {
        // REMARKS: For update, we first need to add an item, then update it
        // This demonstrates the sequential application of operations
        const addInput = { id: '1', text: 'Buy milk' };
        const updateInput = { id: '1', text: 'Buy bread' };

        // REMARKS: Operations are applied in sequence, building up document state
        const createdDocument = reducer(document, creators.addTodoItem(addInput));
        const updatedDocument = reducer(createdDocument, creators.updateTodoItem(updateInput));

        // REMARKS: Now we have 2 operations in history, and the state reflects both
        expect(updatedDocument.operations.global).toHaveLength(2);
        expect(updatedDocument.state.global.items[0].text).toBe('Buy bread');
    });

    it('should handle deleteTodoItem operation', () => {
        // REMARKS: Similar pattern - add an item, then delete it
        const addInput = { id: '1', text: 'Buy milk' };
        const deleteInput = { id: '1' };

        const createdDocument = reducer(document, creators.addTodoItem(addInput));
        const updatedDocument = reducer(createdDocument, creators.deleteTodoItem(deleteInput));

        // REMARKS: After deletion, we still have 2 operations in history,
        // but the items array is now empty again in the final state
        expect(updatedDocument.operations.global).toHaveLength(2);
        expect(updatedDocument.state.global.items).toHaveLength(0);
    });
});
```

Now you can run the tests to make sure the operation reducers are working as expected.

```bash
npm run test
```

Output should be as follows:

```bash
 Test Files  2 passed (2)
      Tests  5 passed (5)
   Start at  12:04:57
   Duration  417ms (transform 79ms, setup 0ms, collect 174ms, tests 12ms, environment 0ms, prepare 158ms)
```

If you got the same output, you have successfully implemented the operation reducers and tests for the `ToDoList` document model. Congratulations, you've succesfully setup the back-bone for a simple todolist document model. 

Continue to the next chapter to learn how to implement the document model editor so you can see a simple user interface for the `ToDoList` document model in action.