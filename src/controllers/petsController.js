
const fs = require("fs")
const pets = require("../models/pets")



const createPet = (req, res) => {

    let { nomeFantasia, endereco, telefone, atende } = req.body;
   
    let criarPets = {
        "id": Math.random().toString(32).substr(2),
        nomeFantasia, 
        endereco, 
        telefone, 
        atende

    }

            let newPets = new pets(criarPets)
            newPets.save(function (err){
                if (err){
                    res.status(500).send({ message: err.message })
                }else{
                    
                    pets.updateOne({$set: {criarPets}}),
                    res.status(201).send({
                        message: "Pet Shop adicionado com sucesso!"
                    });
                }
            })
        
};

const getAllPets = (req, res) => {
    
    pets.find(function (err, petsFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (petsFound && petsFound.length > 0) {
                res.status(200).send(petsFound);
            } else {
                res.status(204).send();
            }
        }
    })
};


const getPetById = (req, res) => {
    const resquestId = req.params.id;
   
    pets.findOne({ id: resquestId }, function (err, petsFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (petsFound) {
                res.status(200).send(petsFound.toJSON({ virtuals: true }));
            } else {
                res.status(204).send();
            }
        }
    })
};

const deletePet = (req, res) => {

    const petId = req.params.id
    pets.findOne({id: petId}, function (err, pet){

        if (err) {
            res.status(500).send({message: err.message})

        }else{
            if (pet){
                pets.deleteOne({id: petId }, function (err){
                    if (err){
                        res.status(500).send({
                            message: err.message,
                            status: "FAIL"
                        })
                    } else {
                        res.status(200).send({
                            message: 'Passageiro removido com sucesso',
                            status: "SUCCESS"
                        })
                    }
                })
            }else {
                res.status(404).send({ message: 'Não há petshop para ser removido com esse id' })
            }
        }






    })

};

const updatePet = (req, res) => {
    const petId = req.params.id;
    pets.findOne({ id: petId }, function (err, petFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (petFound) {
                pets.updateOne({ id: petId }, { $set: req.body }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Registro alterado com sucesso" })
                    }
                })
            } else {
                res.status(404).send({ message: "Não há registro para ser atualizado com esse id" });
            }
        }
    })
}

const updateName = (req, res) => {
    const petId = req.params.id;
    let newName = req.body.nomeFantasia;
    pets.findOne({ id: petId }, function (err, petFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (petFound) {
                pets.updateOne({ id: petId }, { $set: { nomeFantasia: newName } }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Nome alterado com sucesso" })
                    }
                })
            } else {
                res.status(404).send({ message: "Não há registro para ter o nome atualizado com esse id" });
            }
        }
    })

}





module.exports = {
    createPet,
    deletePet,
    updateName,
    updatePet,
    getAllPets,
    getPetById
}