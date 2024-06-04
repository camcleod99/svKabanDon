/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e7yh9ts3eodjd21")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9fcwlpxp",
    "name": "limit",
    "type": "number",
    "required": false,
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
  const collection = dao.findCollectionByNameOrId("e7yh9ts3eodjd21")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9fcwlpxp",
    "name": "limit",
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
