/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a8slds8qhxv54f6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jcewjhtd",
    "name": "position",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a8slds8qhxv54f6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jcewjhtd",
    "name": "weight",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
