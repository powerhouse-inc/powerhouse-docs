# Build ToDoList Editor

In this chapter we will continue with the interface or editeor implementation of the `ToDoList` document model editor. This means you will create a simple user interface for the `ToDoList` document model which will be used inside the Connect app to create, update and delete your ToDoList items.

## Generate the editor template

Run the command below to generate the editor template for the `ToDoList` document model. This command reads the `ToDoList` document model definition from the `document-models` folder and generates the editor template in the `editors/to-do-list/editor.tsx` folder.

Notice the `--editor` flag which defines the `ToDoList` document model. And the `--document-types` flag which defines the document type `powerhouse/todolist`.

```bash
ph generate -- --editor ToDoList --document-types powerhouse/todolist
```

Once complete, navigate to the `editors/to-do-list/editor.tsx` file and open it in your editor.

## Styling Options

### Setting Up Tailwind CSS (Optional)

If you want to use the Tailwind CSS version of the editor, you'll need to set up Tailwind in your project first:

1. Install Tailwind CSS and its dependencies:

```bash
pnpm install -D tailwindcss postcss autoprefixer
```

2. Initialize Tailwind CSS configuration:

```bash
pnpm dlx tailwindcss init -p
```

3. Configure the template paths in `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./editors/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. Add the Tailwind directives to your CSS file. Create a file called `editors/styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. Import the CSS file in your main editor component or in a global file that gets loaded.

If you prefer to keep things simple, you can use the HTML with inline styles version, which doesn't require any additional setup.

## Editor Implementation Options

The To-Do List editor can be implemented using different styling approaches. Below are two implementations: one using plain HTML elements with inline styles, and one using Tailwind CSS for styling.


<details>
<summary>Editor with HTML and Inline Styles</summary>

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
</details>

<details>
<summary>Editor with Tailwind CSS</summary>

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
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-2xl font-bold mb-4">To-do List</h1>
            <div className="flex gap-2 mb-4">
                <input
                    className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
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
            </div>
            <ul className="list-none p-0">
                {state.items.map((item: ToDoItem) => (
                    <li 
                        key={item.id} 
                        className="flex items-center p-2 relative border-b border-gray-100"
                    >
                        <input
                            type="checkbox"
                            className="h-5 w-5 cursor-pointer"
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
                                className="ml-2 flex-grow p-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                                autoFocus
                            />
                        ) : (
                            <div className="ml-2 flex items-center flex-grow gap-1">
                                <span
                                    className={`cursor-pointer ${item.checked ? 'line-through text-gray-500' : ''}`}
                                    onClick={() => {
                                        setEditingItemId(item.id);
                                        setEditedText(item.text);
                                    }}
                                >
                                    {item.text}
                                </span>
                                <span
                                    className="text-gray-400 cursor-pointer opacity-40 transition-all duration-200 text-base font-bold inline-flex items-center pl-1 hover:opacity-100 hover:text-red-500"
                                    onClick={() => dispatch(actions.deleteTodoItem({ id: item.id }))}
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
</details>

### Key Differences

The two implementations achieve the same functionality but use different styling approaches:

1. **HTML with Inline Styles:**
   - Uses React's style prop with JavaScript objects
   - Defines styles directly on each element
   - Manual DOM manipulation for hover effects
   - More verbose styling code

2. **Tailwind CSS:**
   - Uses utility classes via className props
   - Responsive design with predefined utility classes
   - Built-in hover states and transitions
   - More concise styling with standardized spacing and colors
   - Consistent design tokens through utility classes

Now you can run the Connect app and see the `ToDoList` editor in action.

```bash
ph connect
```

In connect, in the bottom right corner you'll find a new Document Model that you can create: `ToDoList`. Click on it to create a new ToDoList document.

:::info
The editor will update dynamically, so you can play around with your editor styling while seeing your results appear in Connect Studio. 
:::

Below GIF shows the `ToDoList` editor in action.

![ToDoList Editor](./images/mytodolist.gif)

If you managed to follow this tutorial until this point, you have successfully implemented the `ToDoList` document model with its reducer operations and editor.

Congratulations!
