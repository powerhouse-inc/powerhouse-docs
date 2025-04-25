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

The To-Do List editor can be built using your preferred React-based component framework, such as shadcn UI, along with standard HTML and optional styling frameworks like Tailwind CSS. 
Tailwind CSS is installed and managed automatically through Connect Studio.

There is no need to use Storybook, as Connect Studio provides a dynamic local environment to visualize your components. 

Simply run Connect Studio during development with `ph connect`
— manual build steps are only needed when publishing packages. 
- Build React components like you normally would 
— Everything else is handled for you.

Powerhouse is developing a set of resuable components that can be used to build your document model editor.
Learn more about our set of [reusable components](/docs/academy/BuildingUserExperiences/BuildingWithScalars)

<details>
<summary>To-do-list Editor Code with Tailwind CSS</summary>

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

In connect, in the bottom right corner you'll find a new Document Model that you can create: `ToDoList`. Click on it to create a new ToDoList document.

:::info
The editor will update dynamically, so you can play around with your editor styling while seeing your results appear in Connect Studio. 
:::

Congratulations!
If you managed to follow this tutorial until this point, you have successfully implemented the `ToDoList` document model with its reducer operations and editor. 

Now you can move on to creating a [custom drive explorer](/docs/academy/BuildingUserExperiences/BuildingADriveExplorer) for your ToDolist document. Imagine you have many todolists sitting in a drive. A custom drive explorer will allow you to organize and track them at a glance. Opening up a new world of possibilities to increase the functionality of your documents. 



