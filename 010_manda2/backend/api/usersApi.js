import express from "express";
const router = express.Router();
router.use(express.json());

const ITEM_URL = "/users";
const itemName = "User";
const notFoundMessage = "404: " + itemName + " not found.";
const invalidInputMessage = "format, please submit username (string) and password (string) as JSON.";

const data = [
    {
        id: 1,
        username: "ab",
        passwordHash: "$2b$12$BNQlCD0M1z297Rwq/wTIPuwmoEqFYa65ou4q9TbTo.IMMWnGwJ4h2" // pw "123" salt 12
    },
    {
        id: 2,
        username: "Erik",
        passwordHash: "$2b$12$lJPewU2UO9P6YAsxKhBUa.lb7NVhknBEgq5yoQwXV81PaI3LsMWau" //pw "not very safe", salt 12
    },
];

const newDataEntryIdNumber = { newIdNumber: 0, };
function idNumberInitialisor() {
    data.map((item) => {
        if (newDataEntryIdNumber.newIdNumber < item.id) {
            newDataEntryIdNumber.newIdNumber = item.id;
        }
    });    
}
idNumberInitialisor();

function idNumberCounter() { return ++newDataEntryIdNumber.newIdNumber; };
function find(id) { return data.find((item => item.id === id)) };
function findOneUsername(username) { return data.find((item => item.username === username)) };
function isItemsInputBad(req) { return ( !req.username || !req.passwordHash ); };

router.get(ITEM_URL, (req, res) => {
    res.send({ data: data });
});

router.get(ITEM_URL + "/:idnumber", (req, res) => {
    const foundItems = find(Number(req.params.idnumber));
    if ( !foundItems ) {
        res.status(404).send({ data: notFoundMessage });
    } else {
        res.send({ data: foundItems });
    }
});

router.post(ITEM_URL + "/findoneusername", (req, res) => {
    const foundUser = findOneUsername(req.body.username);
    if ( foundUser ) res.send({ data: foundUser });
    else res.status(404).send({ data: notFoundMessage });
});

router.post(ITEM_URL, (req, res) => {
    console.log("inside ROUTER POST UserAPI, req body:", req.body)
    if (isItemsInputBad(req.body)) { 
        res.status(400).send("Invalid POST " + invalidInputMessage);
    } else {
        const newItem = {
            id: idNumberCounter(),
            username: req.body.username,
            passwordHash: req.body.passwordHash, 
        };
        data.push(newItem);
        res.send({ data: newItem });    
    }
});
 
router.put(ITEM_URL + "/:idnumber", (req, res) => {
    if (isItemsInputBad(req.body)) {
        res.status(400).send("Invalid PUT " + invalidInputMessage);
    } else {
        const foundItem = find(Number(req.params.idnumber));
        if ( !foundItem ) {
            res.status(404).send({ data: notFoundMessage });
        } else {
        const newItem = {
            id: foundItem.id,
            username: req.body.username,
            passwordHash: req.body.passwordHash, 
        }
        data[--foundItem.id] = newItem;
        res.send({ data: newItem });
        }
    }
}); 

router.patch(ITEM_URL + "/:idnumber", (req, res) => {
    const foundItem = find(Number(req.params.idnumber));
    if ( !foundItem ) {
        res.status(404).send({ data: notFoundMessage });
    } else {
    const newItem = {
        id: foundItem.id,
        username: req.body.username ? req.body.username : foundItem.username,
        passwordHash: req.body.passwordHash ? req.body.passwordHash : foundItem.passwordHash, 
    }
    data[--foundItem.id] = newItem;
    res.send({ data: newItem });
    }
});

router.delete(ITEM_URL + "/:idnumber", (req, res) => {
    const foundItem = find(Number(req.params.idnumber));
    if ( !foundItem ) {
        res.status(404).send({ data: notFoundMessage });
    } else {
        let deletedItem = {
            id: foundItem.id,
            username: "deleted " + itemName,
            passwordHash: null,
        }
    data[1 - foundItem.id] = deletedItem;
    res.send({ data: foundItem })
    }
});

console.log(itemName + " API router online.");

export default router;