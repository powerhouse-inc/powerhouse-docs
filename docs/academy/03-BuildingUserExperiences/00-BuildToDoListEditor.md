
# Build ToDoList Editor

In this chapter we will continue with the interface or editeor implementation of the `ToDoList` document model editor. This means you will create a simple user interface for the `ToDoList` document model which will be used inside the Connect app to create, update and delete your ToDoList items.

## Generate the editor template

Run the command below to generate the editor template for the `ToDoList` document model. This command reads the `ToDoList` document model definition from the `document-models` folder and generates the editor template in the `editors/to-do-list/editor.tsx` folder.

Notice the `--editor` flag which defines the `ToDoList` document model. And the `--document-types` flag which defines the document type `powerhouse/todolist`.

```bash
ph generate -- --editor ToDoList --document-types powerhouse/todolist
```

Once complete, navigate to the `editors/to-do-list/editor.tsx` file and open it in your editor.

## Write the editor code

Copy&paste the code below into the `editor.tsx` file. Save the file.

```typescript
import { EditorProps } from 'document-model';
import {
    ToDoListState,
    ToDoListAction,
    ToDoListLocalState,
    ToDoItem,
    actions,
    ToDoListDocument
} from '../../document-models/to-do-list';
import { useState } from 'react';

export type IProps = EditorProps<ToDoListDocument>;

export default function Editor(props: IProps) {
    const { document, dispatch } = props;
    const { state: { global: state } } = document;

    const [todoItem, setTodoItem] = useState('');
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [editedText, setEditedText] = useState('');

    return (
        <div>
            <h1>To-do List</h1>
            <input
                placeholder="Insert task here..."
                value={todoItem}
                onChange={(e) => setTodoItem(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        dispatch(actions.addTodoItem({
                            id: Math.random().toString(),
                            text: todoItem,
                        }));
                        setTodoItem('');
                    }
                }}
            />
            <button
                onClick={() => {
                    dispatch(actions.addTodoItem({
                        id: Math.random().toString(),
                        text: todoItem,
                    }));
                    setTodoItem('');
                }}
            >
                Add
            </button>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {state.items.map((item: ToDoItem) => (
                    <li 
                        key={item.id} 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            padding: '8px',
                            position: 'relative',
                            borderBottom: '1px solid #eee'
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => {
                                dispatch(actions.updateTodoItem({
                                    id: item.id,
                                    checked: !item.checked,
                                }));
                            }}
                        />
                        {editingItemId === item.id ? (
                            <input
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        dispatch(actions.updateTodoItem({
                                            id: item.id,
                                            text: editedText,
                                        }));
                                        setEditingItemId(null);
                                    }
                                }}
                                style={{ marginLeft: '10px', flexGrow: 1 }}
                                autoFocus
                            />
                        ) : (
                            <div
                                style={{ 
                                    marginLeft: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexGrow: 1,
                                    gap: '4px'
                                }}
                            >
                                <span
                                    onClick={() => {
                                        setEditingItemId(item.id);
                                        setEditedText(item.text);
                                    }}
                                    style={{ 
                                        cursor: 'pointer',
                                        textDecoration: item.checked ? 'line-through' : 'none',
                                        color: item.checked ? '#888888' : 'inherit'
                                    }}
                                >
                                    {item.text}
                                </span>
                                <span
                                    onClick={() => dispatch(actions.deleteTodoItem({ id: item.id }))}
                                    style={{
                                        color: '#999999',
                                        cursor: 'pointer',
                                        opacity: 0.4,
                                        transition: 'all 0.2s',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        paddingLeft: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.target as HTMLElement).style.opacity = '1';
                                        (e.target as HTMLElement).style.color = '#ff4444';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.target as HTMLElement).style.opacity = '0.4';
                                        (e.target as HTMLElement).style.color = '#999999';
                                    }}
                                >
                                    ×
                                </span>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

Now you can run the Connect app and see the `ToDoList` editor in action.

```bash
ph connect
```

In connect, in the bottom right corner you'll find a new Document Model that you can create: `ToDoList`. Click on it to create a new ToDoList document.

Below GIF shows the `ToDoList` editor in action.

![ToDoList Editor](./images/mytodolist.gif)

If you managed to follow this tutorial until this point, you have successfully implemented the `ToDoList` document model with its reducer operations and editor.

Congratulations!
