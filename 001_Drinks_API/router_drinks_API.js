const express = require("express");
const router = express.Router();
const data = require("./drinks_data.js");
router.use(express.json());

const newDataEntryIdNumber = { newIdNumber: 0, };
function idNumberInitialisor() {
    data.drinks.map((drink) => {
        if (newDataEntryIdNumber.newIdNumber < drink.id) {
            newDataEntryIdNumber.newIdNumber = drink.id;
        }
    });    
}
idNumberInitialisor();

function idNumberCounter() {
    return ++newDataEntryIdNumber.newIdNumber;
}

router.get("/drinks", (req, res) => {
    res.send(data.drinks);
});

router.get("/drinks/:idnumber", (req, res) => {
    const drinkIdNumberParameter = Number(req.params.idnumber);
    const foundDrink = data.drinks.find((drink => drink.id === drinkIdNumberParameter));
    if (!foundDrink) {
        res.status(404).send({data: "Sober-4: Drink not found."});
    } else {
        res.send(foundDrink);
    }
});

router.post("/drinks", (req, res) => {
    if (!req.body.name ||
        !req.body.price ||
        !req.body.color ||
        !req.body.percentage
    ) {
        res.status(400).send(`Invalid POST format, please submit name (string), 
        price (number), color (string) and percentage (number).`)
    } else {
        const newDrink = {
            id: idNumberCounter(),
            name: req.body.name,
            price: req.body.price, 
            color: req.body.color, 
            percentage: req.body.percentage,
        };
        data.drinks.push(newDrink);
        res.json(newDrink);    
    }
});

router.put("/drinks/:idnumber", (req, res) => {
    const drinkIdNumberParameter = Number(req.params.idnumber);
    const foundDrink = data.drinks.find((drink => drink.id === drinkIdNumberParameter));
    if (!foundDrink) {
        res.status(404).send({data: "Sober-4: Drink not found."});
    } else {
    const newDrink = {
        id: foundDrink.id,
        name: req.body.name,
        price: req.body.price, 
        color: req.body.color, 
        percentage: req.body.percentage,
    }
    data.drinks[--foundDrink.id] = newDrink;
    res.send(newDrink);
    }
});

router.patch("/drinks/:idnumber", (req, res) => {
    const drinkIdNumberParameter = Number(req.params.idnumber);
    const foundDrink = data.drinks.find((drink => drink.id === drinkIdNumberParameter));
    if (!foundDrink) {
        res.status(404).send({data: "Sober-4: Drink not found."});
    } else {
    const newDrink = {
        id: foundDrink.id,
        name: req.body.name ? req.body.name : foundDrink.name,
        price: req.body.price ? req.body.price : foundDrink.price, 
        color: req.body.color ? req.body.color : foundDrink.color, 
        percentage: req.body.percentage ? req.body.percentage : foundDrink.percentage,
    }
    data.drinks[--foundDrink.id] = newDrink;
    res.send(newDrink);
    }
});

router.delete("/drinks/:idnumber", (req, res) => {
    const drinkIdNumberParameter = Number(req.params.idnumber);
    const foundDrink = data.drinks.find((drink => drink.id === drinkIdNumberParameter));
    if (!foundDrink) {
        res.status(404).send({data: "Sober-4: Drink not found."});
    } else {
        deletedDrink = {
            id: foundDrink.id,
            name: null,
            price: null,
            color: null,
            percentage: null,
        }
    data.drinks[--foundDrink.id] = deletedDrink;
    res.send({data: "Deleted this drink:", foundDrink})
    }
})

module.exports = router;