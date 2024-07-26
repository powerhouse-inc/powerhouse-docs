import React from "react";
import type { ExtendedEditor } from "document-model-libs";
import {
  Action,
  ActionErrorCallback,
  ActionSigner,
  BaseAction,
  Document,
  EditorContext,
  Operation,
  OperationSignatureContext,
  Reducer,
  User,
  actions,
  utils,
} from "document-model/document";
import {
  useDocumentDispatch,
} from './document-model';
import { useEffect, useMemo, useState } from "react";

async function loadEditor() {
  const { Json } = await import("document-model-libs/editors");
  return Json as ExtendedEditor;
}

export interface EditorProps<
  T = unknown,
  A extends Action = Action,
  LocalState = unknown
> {
  document: Document<T, A, LocalState>;
  onChange?: (document: Document<T, A, LocalState>) => void;
}

export type EditorComponent<
  T = unknown,
  A extends Action = Action,
  LocalState = unknown
> = (props: EditorProps<T, A, LocalState>) => JSX.Element;

export interface IProps extends EditorProps {
  // todo: check that this is equivalent to the document ID
  fileNodeId: string;
  onClose: () => void;
  onExport: () => void;
  onAddOperation: (operation: Operation) => Promise<void>;
  onOpenSwitchboardLink?: () => Promise<void>;
  fileId: string;
}

const signOperation = async (
  operation: Operation,
  sign: (data: Uint8Array) => Promise<Uint8Array>,
  documentId: string,
  document: Document<unknown, Action>,
  reducer?: Reducer<unknown, Action, unknown>,
  user?: User
) => {
  if (!user) return operation;
  if (!operation.context) return operation;
  if (!operation.context.signer) return operation;
  if (!reducer) {
    console.error("Document model does not have a reducer");
    return operation;
  }

  const context: Omit<
    OperationSignatureContext,
    "operation" | "previousStateHash"
  > = {
    documentId,
    signer: operation.context.signer,
  };

  const signedOperation = await utils.buildSignedOperation(
    operation,
    reducer,
    document,
    context,
    sign
  );

  return signedOperation;
};

export const DocumentEditor: React.FC<IProps> = ({
  fileNodeId,
  document: initialDocument,
  onChange,
  onClose,
  onExport,
  fileId,
  onAddOperation,
  onOpenSwitchboardLink,
}) => {
  const [editor, setEditor] = useState<ExtendedEditor | null>(null);

  useEffect(() => {
    const loadEditor = async () => {
      const { Json } = await import("document-model-libs/editors");
      setEditor(Json as ExtendedEditor);
    };

    loadEditor();
  });

  const [document, _dispatch, error] = useDocumentDispatch(
    documentModel?.reducer,
    initialDocument
  );

  if (!editor) {
    return (
      <h3>
        No editor available for document of type {initialDocument.documentType}
      </h3>
    );
  }

  const EditorComponent = editor.Component;
  const { disableExternalControls } = editor.config || {};

  return (
    <EditorComponent
      document={document}
      onClose={onClose}
      onExport={onExport}
    />
  );
};
