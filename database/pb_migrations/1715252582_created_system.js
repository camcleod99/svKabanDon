/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "u71rt679vdl7ql7",
    "created": "2024-05-09 11:03:02.349Z",
    "updated": "2024-05-09 11:03:02.349Z",
    "name": "system",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zpbomaru",
        "name": "board_name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("u71rt679vdl7ql7");

  return dao.deleteCollection(collection);
})
