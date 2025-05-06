# Building with Scalars

Scalars are here to help you define custom fields in your document model schema and speed up the development process.
There are two applications of scalar components in the document model workflow:

1. At the **schema definition** level where you build your schema and write your graphql state schema.
2. At the **frontend / react** level where you import it and place it in your UI to represent the scalar field

## Scalar Definition in document model schema. 

As you might know, the document model schema is the schema that defines the structure of the document and the backbone of the document model. The graphQL state schema define how data is captured with the help of types & scalars. When you define a scalar in the document model schema, you are essentially defining a new field that can be used in the document model to capture data.

In the 'Document model editor' you can find all of the custom scalar types that are available in our documentation under the 'Scalars' section.

Insert image of the feature. 

````
scalar PHID <-- imported from the design system library? not sure
type MyType {
  myScalar: PHID
}   
````

## React component implementation in frontend

All of our reusable components are available in the design system library or package. 
Which comes as a dependency in your project when creating a new document model project.
````
import PHIDField from 'design-system'
const reactComponent = () => {

return (
  <div>
    <PHIDField
      fetchOptionsCallback={function Js(){}}
      fetchSelectedOptionCallback={function Js(){}}
      label="PHID field"
      name="phid-field"
      placeholder="phd:"
    />

  </div>
  
  )

}
````

## Scalars & Reusable Components

To make your life easier Powerhouse has defined all usefull scalars with a set of reusable code & UI components. 
The reusable components are essentially a set of of front-end components based on graphQL scalars. Powerhouse also has a set of custom scalars that are not part of the graphQL standard but are specific to the web3 ecosystem.

Read the next chapter to get familiar with our reusable components. 