# Introduction to Switchboard

Switchboard is the API interface that allows developers and data engineers to get access to the data, that is being collected through the use of document models in Connect & Fusion, within your open organisation.
Here you'll find all the documentation you need to get up and running with the Switchboard API. Switchboard allows you to get access to all the data your open organisation is gathering with the help of document models. 

After structurally capturing the desired data of your formalised business processes the data can be used to build insightful experiences in external websites, drive widgets or create specific reports and dashboard in fusion. 

## Quick Start

### Get your Switchboard API token

:::note
Your API requests are authenticated using API keys or tokens. Any request that doesn't include an API key will return an error. You can generate an API token from your Switchboard instance at any time [by logging in with your Ethereum address here](https://apps.powerhouse.io/powerhouse/switchboard).
:::

### Switchboard GraphQL  Endpoints

Switchboard offers different endpoints for different purposes.

- `/drives` - An endpoint to manage your different document drives as an admin.

- `/d/@ID or /d/slug` - An endpoint to query data from a specific drive.

- `/legacy` - An endpoint for an ecosystem-api.

- `/q/username/my-restful-query-endpoint` - A GET endpoint for custom queries. 

Our current documentation will focus on the queries for the Real World Asset Portfolio report document that is being delivered for MakerDAO. 

### `/d/@ID or /d/slug`

This endpoint provides information about a specific drive with system information (which is also available in `/drives`), syncing information for other drive instances (Pull Responder Queries) and further queries which are provided by modules. Modules will in the near future provide information about operational and analytical data that is being collected with the help of the specific document model.