import { Sandpack } from "@codesandbox/sandpack-react";
import { Button } from "@powerhousedao/design-system";

export default function App() {
  return (
        <Sandpack
          template='react'
          customSetup={{
            dependencies: {
              "@powerhousedao/design-system": "^1.0.0-beta.1",
            },
          }}
          files={{
            "/App.js":
`import { Button } from "@powerhousedao/design-system";
export default function App() {
  return <Button primary label="Click" />;
}
    `,
          }}
        />
    // <Button primary label="Click" />
  );
}
