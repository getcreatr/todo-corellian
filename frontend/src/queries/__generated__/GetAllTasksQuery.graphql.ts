/**
 * @generated SignedSource<<05c74e578ca12bc36b05e6c5593050a0>>
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
  readonly getAllTasks: ReadonlyArray<{
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
    "name": "getAllTasks",
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
    "cacheID": "5b6ab93e57ddf61ce5a38257ab5d86ae",
    "id": null,
    "metadata": {},
    "name": "GetAllTasksQuery",
    "operationKind": "query",
    "text": "query GetAllTasksQuery {\n  getAllTasks {\n    id\n    title\n    description\n    status\n    createdAt\n    updatedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "c800c7b01ab97d7777f53ac3dc8fd60d";

export default node;
