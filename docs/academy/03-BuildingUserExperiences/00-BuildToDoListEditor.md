# Build a Todo-list Editor

In this chapter we will continue with the interface or editeor implementation of the `ToDoList` document model editor. This means you will create a simple user interface for the `ToDoList` document model which will be used inside the Connect app to create, update and delete your ToDoList items.

## Generate the editor template

Run the command below to generate the editor template for the `ToDoList` document model. This command reads the `ToDoList` document model definition from the `document-models` folder and generates the editor template in the `editors/to-do-list/editor.tsx` folder.

Notice the `--editor` flag which defines the `ToDoList` document model. And the `--document-types` flag which defines the document type `powerhouse/todolist`.

```bash
ph generate --editor ToDoList --document-types powerhouse/todolist
```

Once complete, navigate to the `editors/to-do-list/editor.tsx` file and open it in your editor.


### Editor Implementation Options

When building your editor component within the Powerhouse ecosystem, you have several options for styling, allowing you to leverage your preferred methods:

1.  **Default HTML Styling:** Standard HTML tags (`<h1>`, `<p>`, `<button>`, etc.) will render with default browser styles or any base styling provided by the Connect environment. This is the simplest approach for basic structure.
2.  **Tailwind CSS:** Connect Studio comes with Tailwind CSS integrated. You can directly use Tailwind utility classes for rapid, consistent styling without writing separate CSS files.
3.  **Custom CSS Files:** You can import traditional CSS files (`.css`) to apply custom styles or integrate existing style libraries.

Connect Studio provides a dynamic local environment (`ph connect`) to visualize your components instantly as you build them, regardless of the styling method you choose. Manual build steps are typically only needed when publishing packages.

Let's look at a simple example component structure and how each styling method can be applied.

**Example Component Structure (Base HTML with inline styles)**

<details>
<summary>Base HTML Example</summary>

Here's a basic editor structure using only standard HTML tags.    
This demonstrates how elements look with very minimal default styling:

```typescript
import { EditorProps } from 'document-model';
// Assuming a simple document model for demonstration
// import { ExampleDocument, actions } from '../../document-models/example'; 

// Replace with your actual document type props if needed
export type IProps = EditorProps<any>; 

export default function Editor({ document, dispatch }: IProps) {
    return (
        <div>
            <h1 style={{ fontWeight: 'bold' }}>Document Title</h1>
            <h2>Document Subtitle</h2>
            <input 
                type="text" 
                placeholder="Small text input"
                style={{ border: '1px solid gray', marginBottom: '0.5rem' }}
            />
            <textarea 
                placeholder="Large text area" 
                rows={4}
                style={{ border: '1px solid gray', display: 'block', marginBottom: '0.5rem' }}
            />
            <button style={{ backgroundColor: 'yellow' }}>
                Submit
            </button>
        </div>
    );
}
```
</details>

*Run `ph connect` to see the default styles applied to components in real-time.*

**Styling with Tailwind CSS**

<details>
<summary>Tailwind CSS Example</summary>

Now, let's add Tailwind utility classes to the same structure for styling:

```typescript
import { EditorProps } from 'document-model';
// import { ExampleDocument, actions } from '../../document-models/example';

export type IProps = EditorProps<any>;

export default function Editor({ document, dispatch }: IProps) {
    return (
        <div className="p-4 space-y-4"> {/* Add padding and spacing */}
            <h1 className="text-2xl font-bold">Document Title</h1> {/* Style heading */}
            <h2 className="text-lg text-gray-600 mb-4">Document Subtitle</h2> {/* Style subheading */}
            <input 
                type="text" 
                placeholder="Small text input"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" // Style input
            />
            <textarea 
                placeholder="Large text area" 
                rows={4}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" // Style textarea
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"> {/* Style button */}
                Submit
            </button>
        </div>
    );
}
```
</details>

*Run `ph connect` to see these Tailwind styles applied in real-time.*

**Styling with a Custom CSS File**

<details>
<summary>Custom CSS File Example</summary>

You can also import a standard CSS file.

1.  Create a CSS file (e.g., `editor.css`) in the same directory as your `editor.tsx`:

    ```css
        /* editors/your-editor/editor.css */
    .editor-container {
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .editor-title {
        color: rgb(51, 51, 54);
        font-size: 2rem;
        margin-bottom: 4px;
    }

    .editor-subtitle {
        color: rgb(51, 51, 54);
        font-size: 1.5rem;
        margin-bottom: 4px;
    }

    .editor-button {
        background-color: green;
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .editor-button:hover {
        background-color: darkgreen;
    }
    ```

2.  Import the CSS file and use the classes in your component:

```typescript
  import { EditorProps } from 'document-model';
// import { ExampleDocument, actions } from '../../document-models/example';
import './editor.css'; // Import the CSS file

export type IProps = EditorProps<any>;

export default function Editor({ document, dispatch }: IProps) {
    return (
        <div className="editor-container"> {/* Use custom class */}
            <h1 className="editor-title">Document Title</h1> {/* Use custom class */}
            <h2 className="editor-subtitle">Document Subtitle</h2> {/* Default or other styles */}
            <input 
                type="text" 
                placeholder="Small text input" 
                className="w-full p-2 border rounded mb-4" // Can mix with Tailwind/defaults
            />
            <textarea 
                placeholder="Large text area" 
                rows={4} 
                className="w-full p-2 border rounded mb-4" // Can mix with Tailwind/defaults
            />
            <button className="editor-button"> {/* Use custom class */}
                Submit
            </button>
        </div>
    );
}  
```
</details>
 
*Run `ph connect` to see your custom CSS styles applied.*

---

## To-do List Editor 

Below is the complete code for the To-do List editor shown earlier, primarily using Tailwind CSS for styling.

<details>
<summary>Complete To-do-list Editor Example (using Tailwind CSS)</summary>

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

Now you can run the Connect app and see the `ToDoList` editor in action.

```bash
ph connect
```

In connect, in the bottom right corner you'll find a new Document Model that you can create: `ToDoList`.    
Click on it to create a new ToDoList document.

:::info
The editor will update dynamically, so you can play around with your editor styling while seeing your results appear in Connect Studio. 
:::

Congratulations!
If you managed to follow this tutorial until this point, you have successfully implemented the `ToDoList` document model with its reducer operations and editor. 

Now you can move on to creating a [custom drive explorer](/docs/academy/BuildingUserExperiences/BuildingADriveExplorer) for your ToDolist document.    
Imagine you have many todolists sitting in a drive. A custom drive explorer will allow you to organize and track them at a glance. **Opening up a new world of possibilities to increase the functionality of your documents!**



