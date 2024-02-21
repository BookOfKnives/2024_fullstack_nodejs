const express = require("express");
const router = express.Router();
const data = require("./drinks_data.js");

router.use(express.json());

console.log("001 router drinks API online.");
// console.log("001 router drinks debug: this is data:::", data.drinks[0]); //2102 2024 kan slettes.
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
    // res.send(data.drinks[idnumber]);
})

module.exports = router;