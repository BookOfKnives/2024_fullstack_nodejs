const express = require("express");
const router = express.Router();
const data = require("./drinks_data.js");
router.use(express.json());

const newDataEntryIdNumber = { newIdNumber: 0, };
data.drinks.map((drink) => {
    if (newDataEntryIdNumber.newIdNumber < drink.id) {
        newDataEntryIdNumber.newIdNumber = drink.id;
    }
});

// console.log("001 drink api says, this is my newIdNumber:::", newDataEntryIdNumber.newIdNumber);

console.log("001 router drinks API online.");

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
    const idNumberForNewEntry = ++newDataEntryIdNumber.newIdNumber;
    const newDrink = {
        id: idNumberForNewEntry,
        name: req.body.name,
        price: req.body.price, 
        color: req.body.color, 
        percentage: req.body.percentage,
    };
    if (!newDrink.name) {
        res.status(400).send(`Invalid POST format, please submit name (string), 
        price (number), color (string) and percentage (number).`)
    } else {
        data.drinks.push(newDrink);
        res.json(newDrink);    
    }
})

module.exports = router;