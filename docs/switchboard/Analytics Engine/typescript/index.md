---
sidebar_position: 2
---

# Typescript API

## Overview

The analytics system is broken into several modules, allowing developers to deploy across many environments, for a diverse set of use cases.

![libs](../images/libs.jpg)

The `core` library contains common data types and abstractions used throughout. The job of the core library is to link together query, storage, and aggregation logic.

![libs](../images/libs-core.jpg)

The `knex`, `pg`, and `browser` libraries contain various storage implementations. Finally, the `graphql` library contains types, resolvers, and data types for a GraphQL API on top.

## Querying Data

The entry point for data queries in Typescript is the `AnalyticsQueryEngine`. This object exposes an interface for inserting, querying, and deleting metrics data.

This object should be created on top of a storage engine.

In this example, we create a simple in-memory storage engine which is compatible with all platforms.

```typescript
import { AnalyticsQueryEngine } from "@powerhousedao/analytics-core";
import { MemoryAnalyticsStore } from "@powerhousedao/analytics-memory";

const engine = new AnalyticsQueryEngine(new MemoryAnalyticsStore());
```

## Insert Data

The `IAnalyticsStore` interface is the primary entry point for inserting and deleting data. Multiple storage implementations are provided, but for simplicity we can get up and running quickly with the [`MemoryAnalyticsStore`](#memory).

```typescript
import { MemoryAnalyticsStore } from "@powerhousedao/analytics-engine-memory";

const store = new MemoryAnalyticsStore();
```

Data can be added using the `addSeriesValue` method.

> Note that we use the [`luxon` library](https://moment.github.io/luxon/#/) in our API for immutable, time-zone aware data types.

```typescript
import { DateTime } from "luxon";
import { AnalyticsPath } from "@powerhousedao/analytics-engine-core";

const source = AnalyticsPath.fromString("example/insert");
await store.addSeriesValue([
  {
    start: DateTime.utc(2021, 1, 1),
    source,
    value: 10000,
    unit: "DAI",
    metric: "budget",
    dimensions: {
      budget: AnalyticsPath.fromString("atlas/legacy/core-units/PE-001"),
      category: AnalyticsPath.fromString(
        "atlas/headcount/CompensationAndBenefits/FrontEndEngineering"
      ),
      project: source,
    },
  },
]);
```

## Store Implementations

Multiple storage implementations are provided, each with comprehensive documentation. See the corresponding docs for:

- [MemoryAnalyticsStore](#memory)
- [BrowserAnalyticsStore](#browser)
- [PostgresAnalyticsStore](#postgres)
