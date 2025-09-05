/**
 * @generated SignedSource<<ed58c2c2f65c665a26264964b75aa2f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TaskStatus = "COMPLETED" | "PENDING" | "%future added value";
export type GetAllTasksQuery$variables = Record<PropertyKey, never>;
export type GetAllTasksQuery$data = {
  readonly allTasks: ReadonlyArray<{
    readonly createdAt: any;
    readonly description: string | null | undefined;
    readonly id: number;
    readonly status: TaskStatus;
    readonly title: string;
    readonly updatedAt: any;
  }>;
};
export type GetAllTasksQuery = {
  response: GetAllTasksQuery$data;
  variables: GetAllTasksQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TaskItem",
    "kind": "LinkedField",
    "name": "allTasks",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "updatedAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GetAllTasksQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GetAllTasksQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2cbac732c9e08fcf0b82032d5259308a",
    "id": null,
    "metadata": {},
    "name": "GetAllTasksQuery",
    "operationKind": "query",
    "text": "query GetAllTasksQuery {\n  allTasks {\n    id\n    title\n    description\n    status\n    createdAt\n    updatedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "c05a8c47c5ec883a9a7b4ca789990ab5";

export default node;
