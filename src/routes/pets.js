const express = require("express")
const router = express.Router()
const pets = require("../models/pets")
const controller = require("../controllers/petsController")

// post - criacao
router.post("/pets/create", controller.createPet)

// // delete - remoção
router.delete("/:id", controller.deletePet)

// // put e patch - alteração
router.put("/:id", controller.updatePet)
router.patch("/:id", controller.updateName)

// get - recuperação
router.get("/pets/", controller.getAllPets)
router.get("/:id", controller.getPetById)

module.exports = router;
