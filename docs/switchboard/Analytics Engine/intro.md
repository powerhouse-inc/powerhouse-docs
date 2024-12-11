---
sidebar_position: 0
---

# Getting Started

## Introduction

Welcome to the Powerhouse Analytics Engine Documentation. This engine is a powerful, distributed, time-series analytics system, written in Typescript with an optional GraphQL interface on top. It is designed to run anywhere: from browsers, to server environments, or even in embedded systems.

This documentation serves as a guide for Typescript and GraphQL API usage, not library development. For documentation on how to build or contribute to this project, see our [README](https://github.com/powerhouse-inc/analytics-engine/blob/main/README.md).

## Overview

![high-level](./images/high-level.jpg)

This system can be broken up into several major systems: **queries**, **engine components**, and **storage**. This last piece, **storage**, is a good place to start, as it is important to understand how data is stored so that we can understand how it can be queried.

![untitled](dbs.png)
*Database table structures for the analytics engine.*

Analytics information  is stored in three database tables: 

- `AnalyticsSeries`: This table stores the raw data over a period with its metric, value, unit, function and parameters
- `AnalyticsDimension`: This table stores all available dimensions for each serie.





Depending on the integration, data may be queried using the [Typescript](./typescript/index.md) or [GraphQL](./graphql/index.md) APIs.


























All consumable data is available through the **[GraphQL](https://graphql.org/)** format, which allows you to only fetch the data you require.

The API is available in two environments, a developer environment (DEV) and a production environment. For testing purposes please use the DEV environment. For the latest up to date data with integration or consumption purposes use the production environment.

Both environments are available through Apollo Studio Explorer where the user can find the analytics query and start fetching information from the analytics engine.

![untitled](apse.png)
*Apollo Studio Explorer where the user can find the analytics query and start fetching information from the analytics engine.*

- DEV: https://studio.apollographql.com/public/Performance-Dashboard-Dev/variant/current/explorer

- Production: https://studio.apollographql.com/public/Performance-Dashboard-Prd/variant/current/explorer

### Basic GraphQL Structure:

- **Query**: At its core, a GraphQL query is about asking or 'querying' for specific fields on objects. The query is structured like a JSON object, but without the values. This structure lets you specify exactly which data you want to fetch from the server.

- **Fields**: In a GraphQL query, you specify a set of fields within braces. Each field corresponds to a piece of data you want to fetch.

- **Nested Fields**: Fields can also be nested, allowing you to fetch related data. For example, if you have a user, you can fetch the user's name and, within the same query, fetch a list of the user's friends and their names.

### Example:

- Imagine you have a user object and you want to fetch the user's name and email, along with the names of their friends. A basic GraphQL query might look like this:
```graphql
query {
  user(id: "1") {
    name
    email
    friends {
      name
    }
  }
}
```

- In this example, query is the operation type, user is the field on the root type, and name, email, and friends are fields on the user type. The id: `"1"` is a parameter passed to the query, specifying which user to fetch.

### Core Concepts

- Analytics Engine explained
- Explanation of key terms (metrics, dimensions, granularity, etc.)
- Overview of the database structure
- Description of the data model

As the name implies, the analytics engine is a data processing tool that crunches the raw data stored in the database into easy to digest insights. These insights are then made available through the GraphQL query.

These insights are structured into a list of series that outputs a value and a sum. Each serie is based on a set period defined by the user. Each period has the respective metric, unit and dimension. So, in other words, a user can request to find out a value for a certain metric, dimension and defined period. As an example: 

- One can find how much did a certain ecosystem actor spend over a certain day in a year on compensations & benefits. 
- Or what was the budget spend on traveling costs for the year of 2024.

The raw data is stored into these database structures:

![untitled](dbs.png)
*Database table structures for the analytics engine.*

As seen in the image above, the analytics engine consists of three database tables: 

- `AnalyticsSeries`: This table stores the raw data over a period with its metric, value, unit, function and parameters
- `AnalyticsDimension`: This table stores all available dimensions for each serie.
- `AnaltyticsSeries_AnalyticsDimension`: This table connects the relevant dimension to the relevant series.

### Analytics Query Structure

In the GraphQL query for the Analytics Engine below, each element requests specific pieces of data from the analytics API. Here is a breakdown of the fields and elements with a dropdown with their descriptions below.

```graphql
query Analytics($filter: AnalyticsFilter) {
  analytics {
    series(filter: $filter) {
      period
      start
      end
      rows {
        metric
        unit
        dimensions {
          name
          path
          label
          description
          icon
        }
        value
        sum
      }
    }
  }
}
```

<details>
  <summary>👉 Expand this dropdown to explore the list of fields and retrievable data..</summary>

In the provided GraphQL query, each field and element plays a specific role in determining what data is returned by the analytics engine. Here's a clear and concise description of each:

- `query Analytics($filter: AnalyticsFilter):` This is the declaration of the query named 'Analytics', which accepts a variable `$filter` of type `AnalyticsFilter`. This variable will be used to apply certain filters to the analytics data retrieved.

- `analytics`: This is the main query operation. It calls the analytics field on the GraphQL API.

- `series(filter: $filter)`: This field represents a collection of data points or a data set that matches the criteria specified by the filter. It's an array of results, where each result is a time-bound statistical representation of the filtered data. And passes the `$filter` variable as an argument to determine the scope of the data returned.

- `period`: Within each series, this field denotes the aggregation period for the data (e.g., monthly, quarterly, annually). It's a label describing the time span each series covers.
start: This is the starting date and time of the data series, indicating when the period begins.

- `end`: This is the ending date and time of the data series, indicating when the period ends.

- `rows`: Represents the individual records or entries in the data series. Each row corresponds to a unique combination of dimensions for the specified period.

- `metric`: Within each row, this field specifies the particular metric being measured (e.g., budget, actuals, forecast).

- `unit`: This indicates the unit of measurement for the metric, such as quantities, currency (e.g., DAI), or percentages.

- `dimensions`: A nested array that provides context for the metric by breaking it down into finer categories or segments, such as 'project' or 'category'. Each dimension can contain:
    - `name`: The identifier or key for the dimension.
    - `path`: A structured representation of the dimension's hierarchy or location within a dataset.
    - `label`: A human-readable label for the dimension, which can be used for display purposes.
    - `description`: A brief explanation of the dimension to give users an understanding of what it represents.
    - `icon`: A graphical representation or icon associated with the dimension for easier identification in user interfaces.

- `value`: The actual numerical value of the metric for each row within the specified period.
- `sum`: A total or aggregated value of the metric over the entire period, providing a summarized figure.

This query structure allows users to extract detailed and summarized analytics data with it's context provided with the help of the the dimensions, tailored to specific time frames and measurements.

</details>

### Available Metrics

To see which metrics are available to fetch analytics data, use the below query:

```graphql
query Analytics {
  analytics {
    metrics
  }
}
```

The above query will output the following list, which is described in the dropdown below.

```graphql
{
  "data": {
    "analytics": {
      "metrics": [
        "DailyDaiPriceChange",
        "Budget",
        "DailyUsdcPriceChange",
        "Actuals",
        "DailyUsdpPriceChange",
        "Contributors",
        "Forecast",
        "DailyMkrPriceChange",
        "DailyEthPriceChange",
        "ProtocolNetOutflow",
        "PaymentsOffChainIncluded",
        "PaymentsOnChain"
      ]
    }
  }
}
```

<details>
<summary>👉 Expand this dropdown to explore the list of fields and retrievable data.</summary>

- **Actuals**: This metric represents the recorded amounts that have been actually spent or received. It is used for tracking and comparing against budgeted or forecasted amounts. This will be helpful to understand the real financial performance.

    - Example Use Case: Comparing actual spending against the budget for a specific project to assess financial management efficiency.

- **Budget**: The estimated financial plan for a period, detailing the expected amounts allocated for various expenses and revenues.
    - Example Use Case: Planning financial allocations for upcoming quarters and tracking the distribution of funds across different departments.

- **Forecast**: A projection of future financial outcomes based on current trends and past data. This functions as an educated estimate that helps in planning and strategy.

    - Example Use Case: Anticipating cash flow and financial needs for the next fiscal year to make informed business decisions and adjustments.

- **PaymentsOnChain**: This metric tracks transactions executed on the blockchain, ensuring transparency and immutability of payment records.

    - Example Use Case: Auditing blockchain transactions to ensure the accuracy of financial reporting within decentralized finance operations.

- **PaymentsOffChainIncluded**: Reflects transactions that occur outside the blockchain but are recognized in the financial records, possibly including traditional banking transactions and off-chain payment channels.

    - Example Use Case: Reconciling on-chain and off-chain financial activities to maintain a comprehensive understanding of total expenditures and revenues.

- **DailyDaiPriceChange**: This metric measures the daily fluctuation in the price of DAI in USD. It's crucial for understanding the stability of DAI and its performance against the US dollar on a day-to-day basis.

    - Example Use Case: Monitoring the stability of DAI to ensure it maintains its peg to the US dollar, crucial for financial planning and risk assessment in DAI-denominated transactions.

- **DailyUsdcPriceChange**: Tracks the daily price change of USDC in USD. This metric is important for analyzing USDC's stability and its daily performance relative to the US dollar.

    - Example Use Case: Evaluating the daily fluctuations of USDC to assess its reliability as a stablecoin for operational liquidity and treasury management.

- **DailyUsdpPriceChange**: Reflects the daily price movement of USDP (Pax Dollar) in USD. It provides insights into the daily stability and performance of USDP against the US dollar.

    - Example Use Case: Analyzing USDP's stability for strategic decisions in treasury operations, especially for entities holding or transacting in USDP.

- **DailyMkrPriceChange**: This metric shows the daily variation in the price of MKR in USD. It is vital for stakeholders to track the governance token's market performance on a daily basis.

    - Example Use Case: Investors and MKR holders use this data to make informed decisions regarding buying, selling, or holding MKR based on its daily market performance.

- **DailyEthPriceChange**: Measures the daily price change of Ethereum (ETH) in USD. Given Ethereum's centrality to the DeFi ecosystem, this metric is key for evaluating the daily market dynamics of ETH.

    - Example Use Case: DeFi participants and investors track ETH's price fluctuations to adjust their investment strategies, hedge risks, and capitalize on market movements.

</details>

### Available Dimensions

To see the available dimensions use the query below:

```graphql
query Analytics {
  analytics {
    dimensions {
      name
      values {
        path
        label
        description
        icon
      }
    }
  }
}
```

The output of the query above: 

```graphql
{
  "data": {
    "analytics": {
      "dimensions": [
        {
          "name": "budget",
          "values": [
            {
              "path": "atlas/legacy/recognized-delegates/",
              "label": null,
              "description": null,
              "icon": null
            }
          ]
        },
        {
          "name": "category",
          "values": [
            {
              "path": "atlas/headcount/CompensationAndBenefits/",
              "label": null,
              "description": null,
              "icon": null
            }
          ]
        },
        {
          "name": "wallet",
          "values": [
            {
              "path": "atlas/0xbe8e3e3618f7474f8cb1d074a26affef007e98fb/",
              "label": null,
              "description": null,
              "icon": null
            }
          ]
        },
        {
          "name": "project",
          "values": [
            {
              "path": "atlas/Flip Flap Flop Delegate LLC/",
              "label": null,
              "description": null,
              "icon": null
            }
          ]
        },
        {
          "name": "report",
          "values": [
            {
              "path": "atlas/Delegates/null/2021/11/",
              "label": null,
              "description": null,
              "icon": null
            }
          ]
        },
        {
          "name": "transactionType",
          "values": [
            {
              "path": "atlas/Internal Transaction/",
              "label": null,
              "description": null,
              "icon": null
            },
          ]
        },
				{
          "name": "priceData",
          "values": [
            {
              "path": "atlas/price-data/mkr-usd/day-average/",
              "label": null,
              "description": null,
              "icon": null
            }
          ]
        }
      ]
    }
  }
}
```

<details>

<summary> Expand this dropdown to explore the list of fields and retrievable data.</summary>

**Budget**
    - **Description**: Refers to the allocation and utilization of funds within different projects or operational areas. It includes various budget categories such as recognized delegates, specific projects, and governance facilitation.

- **Values**:
    - Paths like `atlas/legacy/recognized-delegates/` and `atlas/scopes/SUP/I/PHOENIX/` represent different budget categories or segments.
    - Labels, descriptions, and icons are provided for more detailed budget segments, aiding in identifying specific budget areas and their purposes.

**Category**
    - **Description**: Categorizes transactions or allocations into broader groups like compensation, benefits, or non-headcount expenses.
    - **Values**:
        - Paths like `atlas/headcount/CompensationAndBenefits/` and `atlas/non-headcount/` help segregate financial data into meaningful categories for analysis.

**Wallet**
    - **Description**: Tracks transactions or balances associated with specific blockchain wallet addresses.
    - **Values**:
        - Each path, like `atlas/0xbe8e3e3618f7474f8cb1d074a26affef007e98fb/`, corresponds to a unique wallet address, enabling financial tracking at the wallet level.

**Project**
    - **Description**: Represents different projects or initiatives within the MakerDAO ecosystem.
    - **Values**:
        - Paths such as `atlas/Flip Flap Flop Delegate LLC/` and `atlas/Feedblack Loops LLC/` designate various projects, facilitating project-specific financial analysis and reporting.

**Report**
    - **Description**: Used for accessing specific financial reports, typically segmented by time (e.g., monthly, quarterly).
    - **Values**:
        - Paths like `atlas/Delegates/null/2021/11/` represent report segments, often organized by date, allowing users to access financial information for specific time periods.

**TransactionType**
    - **Description**: Differentiates between various types of transactions within the MakerDAO ecosystem. This dimension helps in analyzing transaction flows, such as internal transfers, governance actions, or external payments.
    - **Values**:
        - A path like `atlas/Internal Transaction/` signifies a specific category of transaction, in this case, internal transactions within the organization. This allows for a focused analysis of internal fund movements or operational transactions.

**PriceData**
    - **Description**: Provides access to historical price data for different cryptocurrencies, facilitating financial analysis and market trend observations. This dimension is crucial for tracking the day-to-day or historical price movements of tokens like MKR, DAI, etc.
    - **Values**:
        - Paths such as `atlas/price-data/mkr-usd/day-average/` offer access to daily average prices of MKR in USD, enabling detailed analysis of MKR's price performance over time. This can be invaluable for financial reporting, investment analysis, or economic research within the MakerDAO ecosystem.
</details>

### Guidelines for Selecting and Combining Dimensions

1. Understand the Purpose of Analysis: Before selecting dimensions, clarify the objective of your analysis. Are you looking to track expenses for a specific project, analyze budget utilization, or examine transaction patterns? Your objective will guide which dimensions are most relevant.

2. Choose Relevant Dimensions: Select dimensions that align with your analytical goals. For instance, use the 'Project' dimension for project-based financial tracking or 'Wallet' for blockchain transaction analysis.

3. Combining Dimensions for Depth: Combine multiple dimensions to gain more nuanced insights. For example, you might combine 'Budget' and 'Category' to understand how different categories of expenses contribute to overall budget utilization within a specific area.

4. Hierarchy and Path Considerations: Pay attention to the hierarchical structure in dimension paths. For instance, paths like atlas/scopes/SUP/I/PHOENIX/ suggest a structured breakdown that can be crucial for detailed analysis.

5. Utilize Descriptions for Context: Where available, use the descriptions provided with dimension values to understand the context and relevance of each dimension to your analysis. This is particularly helpful in dimensions with null labels, where the path and description provide critical information.

6. Avoid Over-Complication: While combining dimensions can provide depth, avoid overly complex combinations that might lead to confusing or inconclusive results. Stick to combinations that directly serve your analysis objectives.

7. Use Icons for Quick Reference: Where icons are available, they can be used as a quick visual reference to identify different dimensions or categories, particularly in user interfaces where rapid identification is beneficial.

8. Experiment and Iterate: Don’t hesitate to experiment with different combinations of dimensions to see which provide the most meaningful insights. The flexibility of the dimensions allows for various permutations and combinations to suit diverse analytical needs.

9. Stay Updated: Keep abreast of any changes or additions to the dimensions within the analytics engine, as this can impact ongoing and future analyses.

### Granularity

#### Definition of Granularity

Granularity in the context of analytics refers to the level of detail or aggregation of data over time. It determines the time span each data point or record covers. Choosing the right granularity is crucial for meaningful analysis, as it affects the interpretation and insights that can be drawn from the data.

#### Available Granularity Options

The analytics engine supports various granularity options, each suitable for different types of analysis:

1. `total`: Provides a cumulative view of data over the entire time frame available in the dataset. Best used for overall summaries and long-term analysis.

2. `annual`: Aggregates data on a yearly basis. Ideal for year-over-year comparisons and annual trend analysis.

3. `semiAnnual` : Breaks down data into six-month periods. Useful for understanding bi-annual trends and patterns.

4. `quarterly`: Divides data into quarters, offering insights into seasonal trends or quarter-over-quarter performance.

5. `monthly` : Monthly granularity is useful for a more detailed view of trends and patterns, particularly useful for operational planning and monitoring.

6. `weekly` : Provides weekly data aggregation, which is helpful for short-term performance tracking and operational adjustments.
daily: Offers a day-to-day breakdown, ideal for detailed analysis of daily operations or events.

7. `hourly`: The most granular level, providing insights into hourly fluctuations. Useful in scenarios where short-term data spikes or dips are significant.

#### How Granularity Affects Query Results

- Data Volume: Higher granularity (like hourly or daily) results in a larger volume of data points, providing more detailed insights but potentially leading to more complex analysis. Lower granularity (like annual or total) simplifies the data into fewer, broader data points.

- Trend Analysis: Finer granularity helps in identifying short-term trends and anomalies, whereas coarser granularity is better for long-term trend analysis and strategic planning.
Performance Impact: Queries with finer granularity might be more resource-intensive and take longer to execute due to the larger number of data points processed.

- Contextual Relevance: The choice of granularity should match the context of the analysis. For instance, financial planning might prefer annual or quarterly granularity, while operational monitoring might require daily or hourly data.

- Comparative Analysis: Different granularity levels can be used for comparative analysis, such as comparing detailed daily data (through daily granularity) against broader monthly trends (using monthly granularity) to understand day-to-day variations within the context of a monthly overview.

In summary, the choice of granularity in your query significantly influences the scope, detail, and utility of the analytics results. It is important to align the granularity with the specific analytical objectives and the nature of the data being analyzed to ensure that the insights derived are both relevant and actionable.

### Currency

The analytics engine currently supports the following currency for financial data:

- DAI
- MKR

To specify the currency in your analytics queries, use the following approach:

1. Setting the Currency: Specify the currency as either "DAI" or "MKR" in the currency field of your filter object, depending on which currency's data you wish to analyze.

2. Query Example:

```graphql
query Analytics($filter: AnalyticsFilter) {
  analytics(filter: $filter) {
    series {
      period
      start
      end
      rows {
        dimensions {
          name
          path
        }
        metric
        unit
        value
        sum
      }
    }
  }
}

```

With filters for MKR:

```graphql
{
  "filter": {
    "start": "2023-01-01",
    "end": "2024-01-01",
    "granularity": "total",
    "metrics": ["Budget"],
    "dimensions": [{"name": "budget", "select": "atlas", "lod": 3}],
    "currency": "MKR"
  }
}
```
This query will return budget data in MKR for the specified time frame and dimension.

3. Consistency in Currency Specification: It's essential to be consistent in specifying the currency for each query. If your analysis involves comparing data across both DAI and MKR, ensure that separate queries are made for each currency and the results are appropriately labeled and distinguished.

4. Impact of Currency Choice: The choice of currency can significantly impact the insights derived from the analytics. While DAI provides a stable measure for financial planning and tracking, MKR offers insights into governance and decision-making aspects of the ecosystem.

By appropriately specifying the currency in your queries, you can tailor the financial analysis to suit the specific needs of your investigation, whether it be transactional stability with DAI or governance dynamics with MKR.

### Filters

In the analytics engine, the filter object in a GraphQL query is crucial for tailoring the data retrieval to specific requirements. For the query to function correctly, a complete and fully structured filter object, containing all necessary parameters, must be used. Here's a guide on how to construct these filter objects and examples of different filter configurations.

### Constructing a Complete Filter Object

A filter object must include all the following parameters:


1. Start Date (`start`): The beginning date of the data retrieval period.

2. End Date (`end`): The end date of the data retrieval period.

3. Granularity(`granularity`): Determines the aggregation level of the data (e.g., total, annual, monthly).

4. Metrics (`metrics`): A list of metrics to be analyzed (e.g., Budget, Actuals).

5. Dimensions (`dimensions`): Specifies qualitative data categories for segmentation, each with sub-parameters like `name`, `select`, and level of detail (`lod`).

In the analytics engine, dimensions play a critical role in segmenting and analyzing data. The `select` field within a dimension and its correlation with the level of detail (`lod`)
parameter are particularly crucial for tailoring your query to retrieve the most relevant and precise data. Here's a detailed explanation of their importance:

The `select` Field in Dimensions
     - **Function**: The select field specifies the exact segment or category within a dimension that you want to analyze. For example, in a dimension named "project," the select field could specify a particular project like "SES" or "Atlas."
     - **Path Specification**: The value set in the select field often represents a path in the data hierarchy. This path directs the query to focus on specific segments or nodes within the broader dimension category.
     - **Precision in Data Retrieval**: By setting the right path in the select field, you ensure that the query fetches data pertinent only to that specific segment, leading to more targeted and relevant insights.
     - **Example**: If you set the **select** field to "`atlas/scopes/SUP/I/PHOENIX/`" in the "`budget`" dimension, the query will retrieve data related to the budget allocated specifically for the "`PHOENIX`" project under the "`SUP`" scope in the "`Atlas`" system.

The level of detail (`lod`) Parameter
    - **Granularity** Within Dimensions: While the select field specifies what to select within a dimension, the `lod` parameter determines how detailed or summarized the information should be.
    - **Hierarchy Levels**: Different levels in `lod` represent different levels of detail in the data hierarchy. A higher `lod` value typically means a more detailed breakdown, while a lower value indicates a more summarized or aggregated view.
    - **Correlation with `select` Path**: The lod value you choose should correspond appropriately to the path specified in the `select` field. A mismatch might lead to data that is either too granular or too generalized than what is needed.
    - **Impact on Analysis**: The level of detail can significantly affect the analysis. For instance, a high lod can provide in-depth insights into a specific area, useful for detailed audits or close examination of a particular segment. Conversely, a low lod is better for broader overviews or when comparing larger categories.

Importance of Correct Configuration
    - **Accuracy of Results**: Setting the correct path in the select field and aligning it with an appropriate lod ensures the accuracy and relevance of the query results. Incorrect or mismatched configurations might lead to misleading insights or data that doesn’t serve the intended analytical purpose.
    - **Customized Analysis**: Together, the select field and lod allow for a high degree of customization in data queries. Users can tailor their data requests precisely to their specific requirements, whether they need a broad overview or a detailed breakdown.
    - Follow the right upper or lower case letter style from metrics, granularity and dimensions.

6. **Currency (`currency`)**: The currency format for the financial data (e.g., DAI, MKR).

The filter object can be created by using the UI menu from the graphql apollo studio explorer:

![untitled](filter.png)
*Select the filter*

![untitled](filteroptions.png)
*Select all filter fields and sub fields*

### Examples of Filter Configurations

1. Analyzing MKR Budgets for a Specific Period:

```graphql
{
  "filter": {
    "start": "2023-01-01",
    "end": "2024-01-01",
    "granularity": "total",
    "metrics": ["Budget"],
    "dimensions": [
      {
        "name": "budget",
        "select": "atlas",
        "lod": 3
      }
    ],
    "currency": "MKR"
  }
}
```
This configuration fetches total MKR budget data for the entire year of 2023, focusing on the 'budget' dimension with a specific level of detail.

2. Comprehensive Yearly Financial Analysis in DAI:

```graphql
{
  "filter": {
    "start": "2023-01-01",
    "end": "2023-12-31",
    "granularity": "annual",
    "metrics": ["Actuals", "Forecast"],
    "dimensions": [
      {
        "name": "category",
        "select": "atlas",
        "lod": 2
      }
    ],
    "currency": "DAI"
  }
}

```
This filter setup is designed to provide an annual overview of actuals and forecast data across all categories in DAI for the year 2023.

These examples demonstrate how to construct a complete filter object for different types of financial analysis. By properly defining each parameter, users can ensure accurate and relevant data retrieval from the analytics engine.

### Multicurrency Series

#### Overview

The `multiCurrencySeries` is a new feature introduced to the MakerDAO Analytics Engine, which significantly enhances the engine's capabilities by allowing for currency conversions within the data analytics process. This addition enables users to view financial data in multiple currencies, making the analytics engine a powerful tool for international financial analysis and reporting.

#### Functionality

**Currency Conversion**: The `multiCurrencySeries` enables the conversion of financial data from the base series currency (such as MKR) into another specified currency (like DAI).

The conversion is based on the available price change metrics in the analytics engine. To see all available price change metrics in the engine, use the metricsfield in the query to get a list:

```graphql	
 "metrics": [
        "Actuals",
        "Budget",
        "Contributors",
        "DailyDaiPriceChange",
        "DailyEthPriceChange",
        "DailyMkrPriceChange",
        "DailyUsdcPriceChange",
        "DailyUsdpPriceChange",
        "Forecast",
        "PaymentsOffChainIncluded",
        "PaymentsOnChain",
        "ProtocolNetOutflow"
      ],
```

So far the engine covers the below price change metrics.

```graphql
"DailyDaiPriceChange",
"DailyEthPriceChange",
"DailyMkrPriceChange",
"DailyUsdcPriceChange",
"DailyUsdpPriceChange",
```

In the future, there could become more metrics available for different purposes, such as Monthly`currency` PriceChange. These can be used in the `multiCurrencySeries` to get the required data.

**Flexibility**: Users can now request and analyze financial data in different currencies, providing flexibility for international stakeholders who operate in various monetary units.

#### How it works

1. Base Series Currency: Initially, the analytics engine aggregates data in the base currency of the series. For example, budget numbers might be originally calculated in MKR.

2. Conversion Request: Through the multiCurrencySeries, a user can request these figures to be converted into another currency, such as DAI.

3. Conversion Mechanism: The engine utilizes the daily average exchange rates to convert the data from the base currency to the target currency.

4. Data Retrieval: The converted data is then retrieved as part of the analytics query, allowing users to analyze financials directly in the currency of their choice.

#### Query Structure

The query structure for fetching multicurrency data is similar to the standard analytics query, with the addition of the `multicurrencySeries` field and relevant subfields for specifying the conversion criteria.

```graphql
query MultiCurrencySeries($filter: MultiCurrencyConversions) {
  analytics {
    multiCurrencySeries(filter: $filter) {
      period
      start
      end
      rows {
        dimensions {
          name
          path
        }
        metric
        unit
        value
        sum
      }
    }
  }
}

// Variables
{
  "filter": {
    "start": "2023-10-01",
    "end": "2024-01-01",
    "granularity": "monthly",
    "metrics": [
      "Budget"
    ],
    "dimensions": [
      {
        "name": "budget",
        "select": "atlas",
        "lod": 1
      }
    ],
    "currency": "DAI",
    "conversions": [
      {
        "metric": "DailyMkrPriceChange",
        "sourceCurrency": "MKR"
      }
    ]
  }
}

```

**Example Use Case**

- **Budget Analysis in Different Currencies**: A user can analyze the MakerDAO budget in both MKR and DAI, viewing how the budget figures translate between the governance token and the stablecoin. This can be particularly useful for reports that need to present financial data in a currency that is more widely used or understood by the audience.

#### Writing Queries

Writing queries in the analytics engine involves constructing structured requests to retrieve specific data. Here’s a step-by-step guide to help you write a basic query.

**Step 1: Understand Your Data Requirements**

Before writing a query, clearly define what data you need. Determine the metrics, time period, granularity, dimensions, and currency relevant to your analysis.

**Step 2: Open Your GraphQL Interface**

Access the analytics engine through a GraphQL interface, like Apollo Studio or another GraphQL client.

**Step 3: Start with the Query Structure**

Every query begins with the keyword query, followed by an optional name, and the main query field. In our case, it’s `Analytics`:

```graphql
query MyAnalyticsQuery {
  analytics {
    series(filter: $filter)
    ...
  }
}

```

**Step 4: Define the Filter Object**

The `filter` object is crucial and must be complete. It includes parameters like start, end, granularity, metrics, dimensions, and currency. Define this object according to your data requirements:

```graphql
{
  "filter": {
    "start": "2023-01-01",
    "end": "2023-12-31",
    "granularity": "monthly",
    "metrics": [
      "Budget",
      "Actuals"
    ],
    "dimensions": [
      {
        "name": "budget",
        "select": "atlas",
        "lod": 1
      }
    ],
    "currency": "DAI"
  }
}
```

**Step 5: Specify the Data to Retrieve**

In the body of the `analytics` field, specify what data you want to retrieve. This typically includes fields like `series`,`period`,`start`,`end`,`rows` , and any sub-fields under `rows` such as `metric` , `value` , `unit` , `sum` , and `dimensions`. For example:

```graphql
query MyAnalyticsQuery($filter: AnalyticsFilter) {
  analytics {
    series(filter: $filter) {
      period
      start
      end
      rows {
        dimensions {
          name
          path
          label
          description
          icon
        }
        metric
        unit
        value
        sum
      }
    }
  }
}

```

**Step 6: Execute the Query**

Once you have constructed the query, execute it in your GraphQL interface. Ensure that the filter object is passed correctly as a variable. In most interfaces, there’s a separate section or panel where you can define these variables.

**Step 7: Review the Results**

After executing the query, review the results to ensure they align with your expectations. If the results are not as expected, revisit your query to check for any errors or adjustments needed in the filter parameters.

**Step 8: Iterate and Refine**

Query writing is often an iterative process. Based on the initial results, you might need to refine your query for more precise data or broader insights.

By following these steps, you can effectively write and execute queries in the analytics engine, tailoring the data retrieval to your specific analytical needs.

### Query Examples

Example 1: Fetching Total MakerDAO Actual Expenses and Budget for 2023

```graphql
query Analytics($filter: AnalyticsFilter) {
  analytics {
    series(filter: $filter) {
      period
      start
      end
      rows {
        dimensions {
          name
          path
        }
        metric
        unit
        value
        sum
      }
    }
  }
}

// Filter
{
  "filter": {
    "start": "2023-01-01",
    "end": "2024-01-31",
    "granularity": "total",
    "metrics": [
      "Budget",
      "Actuals"
    ],
    "dimensions": [
      {
        "name": "budget",
        "select": "atlas",
        "lod": 1
      }
    ],
    "currency": "DAI"
  }
}
```

Explanation

- This query fetches the total actual expenses and budget for MakerDAO for the entire year of 2023.
- The granularity is set to "total" to aggregate data across the whole year.
metrics include "Actuals" and "Budget" to get both actual spendings and budgeted amounts.
- The currency is set to "DAI" to ensure all financial data is in the DAI format.

Modification for Custom Use Cases

- To modify this for a different time period, adjust the start and end dates.
- For a different currency, change the currency field to "MKR" or another supported currency.

Example 2: Fetching total actuals and budget for the SES Core Unit for the year of 2023.

```graphql
query Analytics($filter: AnalyticsFilter) {
  analytics {
    series(filter: $filter) {
      period
      start
      end
      rows {
        dimensions {
          name
          path
        }
        metric
        unit
        value
        sum
      }
    }
  }
}

// filter
{
  "filter": {
    "start": "2023-01-01",
    "end": "2024-01-31",
    "granularity": "total",
    "metrics": [
      "Budget",
      "Actuals"
    ],
    "dimensions": [
      {
        "name": "budget",
        "select": "atlas/legacy/core-units/SES-001",
        "lod": 4
      }
    ],
    "currency": "DAI"
  }
}
```


### Best Practices

- Start general, end with detailed queries. In the case you want to find a specific number for a specific metric and dimension, the rule of thumb is to start general in the filter definitions and slowly start cutting down the paths to a particular team or budget period.
- For example: Looking at the dimension section in the filter options: To see available sub paths for the budget, leave the select: "atlas" and lod as 5 . With lod:5 you’ll be able to see the different paths available under your defined filter. Then, later you can apply a more detailed path in the select: "atlas/..." path that will suit your needs.

```graphql
{
  "filter": {
  ...
    "dimensions": [
      {
        "name": "budget",
        "select": "atlas",
        "lod": 5
      }
    ],
   ...
  }
}
```

Avoiding common mistakes

- Follow upper case, lower case rules. To make sure to get the results you require, you must follow the upper or lower case styling for defining the metrics and granularity. To see the available metrics and dimensions just use the referenced queries. For granularity, check the above granularity section for the different types.

Performance considerations

- Fetch per specified path if performance is an issue.

### Troubleshooting

Common issues and their solutions

- Mistyping the filter options or not using proper upper or lower case when necessary. Make sure to check this first when running into problems

How to interpret error messages

- Usually, error messages are explicit and easy to understand what is wrong, below you can find some examples.

    - `"message": "Cannot read properties of undefined (reading 'filter')"`, → There is something wrong with the filter options, make sure you’ve added all fields in the filter options.

    - `"message": "No valid metrics provided, make sure to use metrics from this list: Actuals, Budget, Forecast, FTEs, PaymentsOffChainIncluded, PaymentsOnChain, ProtocolNetOutflow"`, → A wrong format when adding metrics

    - `"message": "Variable \"$filter\" got invalid value \"Monthlyu\" at \"filter.granularity\"; Value \"Monthlyu\" does not exist in \"AnalyticsGranularity\" enum. Did you mean the enum value \"monthly\"?"`, → Granularity filter is mistyped.

- When to contact support
    - If you are receiving error messages with status code of 500, reach out to the dev team.