/**
 * @generated SignedSource<<192c17f65073c1faa9f7484706d1c8c7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TaskStatus = "COMPLETED" | "PENDING" | "%future added value";
export type CreateTaskInput = {
  description?: string | null | undefined;
  title: string;
};
export type CreateTaskMutation$variables = {
  input: CreateTaskInput;
};
export type CreateTaskMutation$data = {
  readonly createTask: {
    readonly createdAt: any;
    readonly description: string | null | undefined;
    readonly id: number;
    readonly status: TaskStatus;
    readonly title: string;
    readonly updatedAt: any;
  };
};
export type CreateTaskMutation = {
  response: CreateTaskMutation$data;
  variables: CreateTaskMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "TaskItem",
    "kind": "LinkedField",
    "name": "createTask",
    "plural": false,
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateTaskMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateTaskMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "16df837776aca023c90a9a3ec9fd17f1",
    "id": null,
    "metadata": {},
    "name": "CreateTaskMutation",
    "operationKind": "mutation",
    "text": "mutation CreateTaskMutation(\n  $input: CreateTaskInput!\n) {\n  createTask(input: $input) {\n    id\n    title\n    description\n    status\n    createdAt\n    updatedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "84437ec0733dd4584e64098f582e3b9b";

export default node;
