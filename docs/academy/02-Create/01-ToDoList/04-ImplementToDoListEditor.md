
# Implement ToDoList Editor

In this section you will implement the `ToDoList` document model editor. This means you will create a simple user interface for the `ToDoList` document model which will be used inside the Connect app to create, update and delete your ToDoList items.

## Generate the editor template

Run below command to generate the editor template for the `ToDoList` document model. This command reads the `ToDoList` document model definition from the `document-models` folder and generates the editor template in the `editors/to-do-list/editor.tsx` folder.

Notice the `--editor` flag which defines the `ToDoList` document model. And the `--document-types` flag which defines the document type `powerhouse/todolist`.

```bash
npm run generate -- --editor ToDoList --document-types powerhouse/todolist
```

Once complete, navigate to the `editors/to-do-list/editor.tsx` file and open it in your editor.

## Write the editor code

Copy&paste the code below into the `editor.tsx` file. Save the file.

```typescript
import { EditorProps } from 'document-model/document';
import {
    ToDoListState,
    ToDoListAction,
    ToDoListLocalState,
    ToDoItem,
    actions,
} from '../../document-models/to-do-list';
import { useState } from 'react';

export type IProps = EditorProps<
    ToDoListState,
    ToDoListAction,
    ToDoListLocalState
>;

export default function Editor(props: IProps) {
    const { document, dispatch, context } = props;
    const {
        state: { global: state },
    } = document;

    const [todoItem, setTodoItem] = useState('');
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [editedText, setEditedText] = useState('');

    // Sort items by checked status
    const sortedItems: ToDoItem[] = [...state.items].sort((a, b) => {
        return (b.checked ? 1 : 0) - (a.checked ? 1 : 0);
    });

    return (
        <>
            <div>
                <div>
                    <h1>To-do List</h1>
                    <br />
                    <input
                        key="doc-title"
                        placeholder="Insert task here..."
                        onChange={(value) => {
                            setTodoItem(value.target.value);
                        }}
                        value={todoItem}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                dispatch(
                                    actions.addTodoItem({
                                        id: Math.random().toString(),
                                        text: todoItem,
                                    })
                                );
                                setTodoItem('');
                            }
                        }}
                    />
                    <button
                        onClick={() => {
                            dispatch(
                                actions.addTodoItem({
                                    id: Math.random().toString(),
                                    text: todoItem,
                                }),
                            );
                            setTodoItem('');
                        }}
                    >
                        Add
                    </button>
                    <br />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div style={{ flex: 2, marginTop: '20px' }}>
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
                                                        checked:
                                                            !item.checked,
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
                                        {editingItemId === item.id ? (
                                            <input
                                                style={{ width: '100%' }}
                                                type="text"
                                                value={editedText}
                                                onChange={(e) => setEditedText(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        dispatch(
                                                            actions.updateTodoItem({
                                                                id: item.id,
                                                                text: editedText,
                                                            }),
                                                        );
                                                        setEditingItemId(null);
                                                    }
                                                }}
                                                autoFocus
                                            />
                                        ) : (
                                            <span
                                                style={{
                                                    fontSize: '15px',
                                                    marginLeft: '10px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    setEditingItemId(item.id);
                                                    setEditedText(item.text);
                                                }}
                                            >
                                                {item.text}
                                            </span>
                                        )}
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                            {state.items.length >= 2 && (
                                <button
                                    style={{
                                        backgroundColor: '#ff4d4d',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        state.items.forEach(item => {
                                            dispatch(
                                                actions.deleteTodoItem({
                                                    id: item.id,
                                                })
                                            );
                                        });
                                    }}
                                >
                                    Remove All Todos
                                </button>
                            )}
                        </div>

                        <div style={{ flex: 1, paddingLeft: '10px' }}>
                            <span>Total: {state.stats.total}</span>
                            <br />
                            <span>Checked: {state.stats.checked}</span>
                            <br />
                            <span>Unchecked: {state.stats.unchecked}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
```

Now you can run the Connect app and see the `ToDoList` editor in action.

```bash
npm run connect
```

In connect, in the bottom right corner you'll find a new Document Model that you can create: `ToDoList`. Click on it to create a new ToDoList document.

Below GIF shows the `ToDoList` editor in action.

![ToDoList Editor](./images/mytodolist.gif)

If you managed to follow this tutorial until this point, you have successfully implemented the `ToDoList` document model with its reducer operations and editor.

Congratulations!
