# Building Document Editors

*Placeholder for a tutorial about building beautiful document editors.*

## Build with React on Powerhouse

At Powerhouse, frontend development follows a simple and familiar flow. Tailwind CSS is installed by default and fully managed by Connect Studio — you can use Tailwind classes freely, but you’re not required to. Regular CSS, inline styles, and any React-compatible styling method work exactly as you would expect in a standard React project. There is no need to manually configure or run Tailwind or build processes; **Connect Studio automatically handles everything during development.**

For component visualization and testing, **Connect Studio replaces the need for Storybook**. Please do not use Storybook by default — Connect Studio provides a dynamic, local environment where you can define and preview your document models and editors live. If you still wish to set up Storybook on your own, you may, but it is unsupported and discouraged.

During normal development, simply run Connect Studio with `ph connect`. Manual build commands are only needed when you publish a package, at which point the necessary build steps (including CSS generation) are handled automatically.

Powerhouse aims to keep your developer experience clean, familiar, and focused.
- Build React components as you would in any project.
- Use styling approaches you're comfortable with.
- Trust Connect Studio to handle the setup for you.

## Powerhouse Component Library

TBD