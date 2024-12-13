
# Document Models

:::info
This page is an intro to document models, focused towards an audience of developers and builders.
:::

Document model types are available as a set of document templates within Connect. 
Each DAO that's making use of Powerhouse has the ability to generate, customise or design their own document models. To get familiar with how a document model is build and created you can try out one of our follow-along [tutorials](docs/connect/02-Tutorials). 

## Introduction to Document Models

### What is a Document Model?

A Document Model is a structured framework that represents and manages business logic within a digital environment. It is akin to a sophisticated template that encapsulates the essential aspects of a digital process or a set of data. In essence, document models serve as blueprints that define how data is captured, manipulated, and visualised within a system.

### Structure and Composition

**Defining the Structure**: Each Document Model is composed of several layers, defining its structure and capabilities:

- **A Document Model comprises a set of operations that define its editing history and final state.** Operations can be seen as a predefined set of functions that can be performed on the data. These might include creating, reading, updating, or deleting data, as well as more complex business logic.

- **State Management through the processor**: Document Models come packaged with a processor that turns the list of operations into a final state that can be read by the front end, maintains the state of the data over time, and allows users to track changes or revert to previous states if necessary.

- **A document model function according to a transaction based design pattern.** Other patterns you might be familiar with are FLUX pattern, or CQRS: Command and Query Responsibility Segregation, a pattern that separates read and update operations for a data store. The operations are akin to transactions in a blockchain, synchronizing changes across different instances of the document. This architecture allows the extraction of secondary data layers, such as operational data and analytics, making documents more than just text – they become dynamic, data-rich resources. Making them machine-readable and interactive through API interfaces.

![Untitled](./three-data-layers.png)
*A visual overview of the 3 types of data that document models unlock by being based on a transaction based design pattern (Flux, CQRS) which generates an operation history.*

### Advanced Features of document models

**Leveraging Document Models for Advanced Use Cases**: For technically advanced users, Document Models offer a range of features that can be leveraged to create sophisticated, automated, and data-driven solutions:

- **API Integration**: Document Models can be integrated with Switchboard API or external APIs, allowing for the exchange of data between Connect and other systems or services.

- **Data Analysi**s**: The structured nature of Document Models makes them ideal for data analysis and reporting. Users can extract insights and generate reports based on the data captured within the models which is accessible through read models. (Operational data + Analytics data which takes into account time series of the data). 

- **Version Control**: Similar to how Git manages changes to source code, Document Models in Connect will support version control, enabling users to track changes, compare different versions, and ensure data integrity over time.

Document Models are a powerful primitive within the Powerhouse vision, offering a flexible, structured, and efficient way to manage business logic and data. By understanding and leveraging Document Models, you will be able to significantly enhance the capabilities of your DAO and drive your organization towards greater efficiency and success.