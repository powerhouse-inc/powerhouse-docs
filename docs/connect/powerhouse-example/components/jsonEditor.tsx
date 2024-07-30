import React from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';

const JsonEditorSandpack: React.FC = () => {
  return (
    <Sandpack
      template="react"
      customSetup={{
        dependencies: {
          'document-model-libs': '^1.69.0',
          react: '17.0.2',
          'react-dom': '17.0.2',
        },
      }}
      files={{
        '/App.js': {
          code: `
          import React from 'react';
          import Editor from 'document-model-libs/editors/json/editor';

          export default function App() {
            return <Editor />;
          }
          `,
        },
        '/index.js': {
          code: `
          import React from 'react';
          import ReactDOM from 'react-dom';
          import App from './App';

          ReactDOM.render(<App />, document.getElementById('root'));
          `,
        },
        '/public/index.html': {
          code: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Sandpack Example</title>
          </head>
          <body>
            <div id="root"></div>
          </body>
          </html>
          `,
        },
      }}
    />
  );
};

export default JsonEditorSandpack;
