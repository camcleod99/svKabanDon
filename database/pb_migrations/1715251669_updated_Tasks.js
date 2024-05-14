/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a8slds8qhxv54f6")

  collection.name = "tasks"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a8slds8qhxv54f6")

  collection.name = "Tasks"

  return dao.saveCollection(collection)
})
