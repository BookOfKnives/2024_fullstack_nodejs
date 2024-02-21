const express = require("express");
const router = express.Router();
const data = require("./drinks_data.js");
router.use(express.json());

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

module.exports = router;