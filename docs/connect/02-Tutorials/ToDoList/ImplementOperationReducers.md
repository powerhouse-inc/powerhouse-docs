---
sidebar_position: 4
# sidebar_label: Connect
displayed_sidebar: connectSidebar
---
# Implement Operation Reducers

In this section, we will implement and test the operation reducers for the `ToDoList` document model. In order to do this, you have to export the document model from the Connect application and import it into your powerhouse project directory. 

To export the document model, follow the steps in the `Define ToDoList Document Model` section.

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
npm run generate ToDoList.zip
```

Now you can navigate to `/document-models/to-do-list/src/reducers/to-do-list.ts` and start writing the operation reducers.

Open the `to-do-list.ts` file and you should see the code that needs to be filled for the three operations you have defined earlier. Image below shows the code that needs to be filled:

![to-do-list ts file](./images/reducers.png)

## Write the Operation Reducers

1. Copy&paste the code below into the `to-do-list.ts` file in the `reducers` folder.
2. Save the file.


```typescript
/**
* This is a scaffold file meant for customization: 
* - modify it by implementing the reducer functions
* - delete the file and run the code generator again to have it reset
*/

import { ToDoListToDoListOperations } from '../../gen/to-do-list/operations';

export const reducer: ToDoListToDoListOperations = {
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
}
```

## Write the Operation Reducers Tests

In order to make sure the operation reducers are working as expected, you need to write tests for them.

Navigate to `/document-models/to-do-list/src/reducers/tests/to-do-list.test.ts` and copy&paste the code below into the file. Save the file.

Here are the tests for the three operations written in the reducers file. This test file creates an empty ToDoList document model, then adds a todo item, updates it and deletes it.

```typescript
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import utils from '../../gen/utils';
import { reducer } from '../../gen/reducer';
import * as creators from '../../gen/todolist/creators';
import { ToDoListDocument } from '../../gen/types';

describe('Todolist Operations', () => {
    let document: ToDoListDocument;

    beforeEach(() => {
        document = utils.createDocument();
    });

    it('should handle addTodoItem operation', () => {
        const input = {
            id: '1',
            text: 'Buy milk',
        };
        const updatedDocument = reducer(
            document,
            creators.addTodoItem(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].type).toBe(
            'ADD_TODO_ITEM',
        );
        expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
        expect(updatedDocument.state.global.items).toHaveLength(1);
    });
    it('should handle updateTodoItem operation', () => {
        const addInput = {
            id: '1',
            text: 'Buy milk',
        };
        const updateInput = {
            id: '1',
            text: 'Buy bread',
        };
        const createdDocument = reducer(
            document,
            creators.addTodoItem(addInput),
        );
        const updatedDocument = reducer(
            createdDocument,
            creators.updateTodoItem(updateInput),
        );

        expect(updatedDocument.operations.global).toHaveLength(2);
        expect(updatedDocument.operations.global[1].type).toBe(
            'UPDATE_TODO_ITEM',
        );
        expect(updatedDocument.operations.global[1].input).toStrictEqual(updateInput);
        expect(updatedDocument.operations.global[1].index).toEqual(1);
        expect(updatedDocument.state.global.items[0].text).toBe(updateInput.text);
    });
    it('should handle deleteTodoItem operation', () => {
        const addInput = {
            id: '1',
            text: 'Buy milk',
        };
        const deleteInput = {
            id: '1',
        };
        const createdDocument = reducer(
            document,
            creators.addTodoItem(addInput),
        );
        const updatedDocument = reducer(
            createdDocument,
            creators.deleteTodoItem(deleteInput),
        );

        expect(updatedDocument.operations.global).toHaveLength(2);
        expect(updatedDocument.operations.global[1].type).toBe(
            'DELETE_TODO_ITEM',
        );
        expect(updatedDocument.operations.global[1].input).toStrictEqual(deleteInput);
        expect(updatedDocument.operations.global[1].index).toEqual(1);
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

If you got the same output, you have successfully implemented the operation reducers and tests for the `ToDoList` document model.
Continue to the next section to learn how to implement the document model editor so you can see a simple user interface for the `ToDoList` document model in action. 
