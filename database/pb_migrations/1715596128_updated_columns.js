/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e7yh9ts3eodjd21")

  // remove
  collection.schema.removeField("fn52msfp")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e7yh9ts3eodjd21")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fn52msfp",
    "name": "tasks",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "a8slds8qhxv54f6",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
