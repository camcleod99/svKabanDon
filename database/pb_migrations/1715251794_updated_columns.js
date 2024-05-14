/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e7yh9ts3eodjd21")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6wjzsgsy",
    "name": "position",
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

  // remove
  collection.schema.removeField("6wjzsgsy")

  return dao.saveCollection(collection)
})
