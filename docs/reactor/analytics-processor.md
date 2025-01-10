# Analytics Processors

An `AnalyticsProcessor` is an object that can track analytics for operations and state changes on a set of document models. These analytics can be used to generate bespoke dashboards and reports, specific to the type of document model.

## Generating a Processor with the CLI

The `ph-cli` utility can be used to generate the scaffolding for an `AnalyticsProcessor`.

```
npx @powerhousedao/ph-cli generate --processor-type analytics --document-models ./my-document-models
```

This will generate a class that extends `AnalyticsProcessor`. At the top of the generated class, you can see the `ProcessorOptions` object that defines many configuration options on the object.

```typescript
protected processorOptions: ProcessorOptions = {
  // generate a unique id for this listener
  listenerId: generateId(),
  
  // describes which documents should be passed to this processor
  filter: {
    branch: ["main"],
    documentId: ["*"],
    documentType: ["my-doc-type"],
    scope: ["global"],
  },
  block: false,
  label: "rwa-analytics",
  system: true,
};
```

There are a number of parameters here, but there are two that are most important: `listenerId` and `filter`. The former should generally always use the `generateId()` utility to guarantee a random id.

### Filter

The `filter` parameter allows a user to tune which updates it receives. Usage is straightfoward: each field of the filter parameter can receive one to many patterns. The array for each field describes an `OR` comparison. That is, `["a", "b"]` would match `"a"` or `"b"`. However, only updates matching ALL of these fields will be passed to the processor. That is, an update must match on `branch`, `documentId`, `documentType`, AND `scope`.

Globs are accepted as input, but not regexes.

### onStrands

The `onStrands` method is the meat of the processor. this is the function called for all the updates matching the filter. 

```typescript
async onStrands(strands: ProcessorUpdate<DocumentType>[]): Promise<void> {
    if (strands.length === 0) {
      return;
    }

    for (const strand of strands) {
      if (strand.operations.length === 0) {
        continue;
      }

      const firstOp = strand.operations[0];
      const source = AnalyticsPath.fromString(
        `ph/${strand.driveId}/${strand.documentId}/${strand.branch}/${strand.scope}`,
      );
      if (firstOp.index === 0) {
        await this.clearSource(source);
      }

      for (const operation of strand.operations) {
        console.log(">>> ", operation.type);
      }
    }
  }
```

This function provides a list of strand objects, each with a list of document-model operations on them. Essentially, it is a list of lists. Each operation will have the previous state of the document as well as the next state. This allows analytics capture from new state, deltas, or the operations themselves.

> Note that on the first operation (given by `firstOp.index === 0`), we clear any previous analytics series for that source. This is so that we do not dual insert operations.

Model-specific code will go where the `console.log` statement currently resides.

## Learn By Example: RwaAnalyticsProcessor

In the `reactor-local` package, we have implemented a processor for the `makerdao/rwa-portfolio` document type. This is a document model that tracks MakerDAO's Real World Asset (RWA) portfolio. It was initially generated using the `ph-cli` utility.

In the case of the RWA processor, we only want to process updates for the rwa-specific document type, but across all documents. This is why the filter looks like:

```js
{
  branch: ["main"],
  documentId: ["*"],
  documentType: ["makerdao/rwa-portfolio"],
  scope: ["global"],
}
```

Inside of the `onStrands` function, past the boiler plate, we see what is essentially a giant switch statement.

```typescript
if (operation.type === "CREATE_GROUP_TRANSACTION") {
  const groupTransaction = operation.input as CreateGroupTransactionInput;
  if (
    groupTransaction.type !== "AssetPurchase" &&
    groupTransaction.type !== "AssetSale" &&
    groupTransaction.type !== "PrincipalDraw" &&
    groupTransaction.type !== "PrincipalReturn"
  ) {
    continue;
  }

  // elided
}
```

We only want to track analytics for operations that create transactions, and we want to filter out a few transaction types. We do this by casting the operation input as the generated type from the specific document model lib.

Below that, we can see how we are capturing analytics data:

```typescript
// create good dimensions that we will want to filter on later
const dimensions = {
  asset: AnalyticsPath.fromString(
    `sky/rwas/assets/t-bills/${fixedIncomeTransaction.assetId}`,
  ),
  portfolio: AnalyticsPath.fromString(
    `sky/rwas/portfolios/${documentId}`,
  ),
};

// create the series values
const args = {
  dimensions,
  metric: "AssetBalance",
  source,
  start: DateTime.fromISO(fixedIncomeTransaction.entryTime),
  value:
    groupTransaction.type === "AssetPurchase"
      ? fixedIncomeTransaction.amount
      : -fixedIncomeTransaction.amount,
};

await this.analyticsStore.addSeriesValue(args);
```