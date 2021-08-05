### On13 MONGO - DB  | Integração do Banco de Dados Mongo com API

Aluna : [Ana Paula Lima ](https://www.linkedin.com/in/ana-paula-lima-3269214b/#) 

Prof.: Vanessa Jansen

<br>Essa semana criamos uma API integrada com o banco de dados MongoDB<br />

# Demandas:

- Você deve criar uma API com integração com o banco de dados. Realizar todas as etapas do CRUD:
  - POST: Inserção de um novo Pet Shop
  - PUT e PATCH : Atualizar algumas informações do Pet Shop
  - DELETE: Exclusão de documentos
  - GET: Consulta informações
  
    A estrutura do projeto esta usando o modelo MVC

<h4> Resolução: </h4>



- Criado um banco de dados PETS e uma collections Agendamentos:

![image-20210730210311594](https://github.com/anapsantos1/Projeto-On13-API_MONGODB/blob/main/image/ScreenHunter%2092.png)

- Efetuada a inserção dos dados:

```
db.pets.insertMany([
    {
        "id": "1",
        "nomeFantasia": "Pet Shop 1",
        "endereco": "Avenida Paulista, 1273 - São Paulo",
        "telefone": "11 12345-6789",
        "atende": [
            "cães",
            "gatos"
        ]
    },
    {
        "id": "2",
        "nomeFantasia": "Pet Shop 2",
        "endereco": "Niterói, 1273 - Rio de Janeiro",
        "telefone": "11 98765-4321",
        "atende": [
            "cães",
            "papagaio"
        ]
    },
    {
        "id": "3",
        "nomeFantasia": "Pet Shop 3",
        "endereco": "R. Cavalo Marinho, 1655 - Jardim Adelfiore, São Paulo - SP",
        "telefone": "11 3918-8516",
        "atende": [
            "cães",
            "aves"
        ]
    },
    {
        "id": "4",
        "nomeFantasia": "Pet Shop 4",
        "endereco": "R. Israel Pinheiro, 4000 - Lourdes, Gov. Valadares - MG",
        "telefone": "33 3272-3929",
        "atende": [
            "cães",
            "cavalos",
            "gatos"
        ]
    },
    {
        "id": "5",
        "nomeFantasia": "Pet Shop 5",
        "endereco": " R. Rio Grande do Sul, 881 - Santo Antônio, São Caetano do Sul - SP",
        "telefone": "11 4226-5276",
        "atende": [
            "cães",
            "roedores"
        ]
    },
    {
        "id": "6",
        "nomeFantasia": "Pet Shop 6",
        "endereco": "Av. Dom João VI, 108 - Brotas, Salvador - BA",
        "telefone": "71 99381-3391",
        "atende": [
            "cães",
            "gatos"
        ]
    }
])
```



- GET - Buscar todos os dados do banco:

```
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

```

- GET - Buscar um pet por ID:

```
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
```

- DELETE - excluir um pet shop:

```
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
```

- CREATE - Criar um novo pet shop:

```
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
```

- PUT - atualizar todas as informação do ID informado


```
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
```

PATCH - Alterando o nome do Pet Shop

```
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

```

