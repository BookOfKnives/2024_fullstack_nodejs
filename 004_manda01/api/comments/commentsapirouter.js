import express from "express";
const router = express.Router();
router.use(express.json());

const ITEM_URL = "/comments";
const itemName = "Comment";
const notFoundMessage = "404: " + itemName + " not found.";
const invalidInputMessage = " format, please submit name (string) and comment text (string)";

const data = [
    {
        id: 1,
        name: "Lars",
        date: new Date(),
        commentText: "Det her er den første kommentar på siden!! Spændendenen!",
    },
    {
        id: 2,
        name: "Sanne",
        date: new Date(),
        commentText: "Jeg synes simpelthen Lars er SÅ lækker!!",
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
function isItemsInputBad(req) { return ( !req.name || !req.commentText ); };

router.get(ITEM_URL, (req, res) => {
    res.send({ data });
});

router.get(ITEM_URL + "/:idnumber", (req, res) => {
    const foundItems = find(Number(req.params.idnumber));
    if ( !foundItems ) {
        res.status(404).send({ data: notFoundMessage });
    } else {
        res.send({ data: foundItems });
    }
});

router.post(ITEM_URL, (req, res) => {
    if (isItemsInputBad(req.body)) { 
        res.status(400).send("Invalid POST " + invalidInputMessage);
    } else {
        const newItem = {
            id: idNumberCounter(),
            name: req.body.name,
            date: new Date(),
            commentText: req.body.commentText, 
        };
        data.push(newItem);
        res.json(newItem);    
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
            name: req.body.name,
            date: new Date(),
            commentText: req.body.commentText, 
        }
        data[--foundItem.id] = newItem;
        res.send(newItem);
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
        name: req.body.name ? req.body.name : foundItem.name,
        date: new Date(),
        commentText: req.body.commentText ? req.body.commentText : foundItem.commentText, 
    }
    data[--foundItem.id] = newItem;
    res.send(newItem);
    }
});

router.delete(ITEM_URL + "/:idnumber", (req, res) => {
    const foundItem = find(Number(req.params.idnumber));
    if ( !foundItem ) {
        res.status(404).send({ data: notFoundMessage });
    } else {
        let deletedItem = {
            id: foundItem.id,
            name: "deleted item",
            commentText: null,
        }
    data[1 - foundItem.id] = deletedItem;
    res.send({ data: foundItem })
    }
});

console.log("004 Items (" + itemName + ") API router online.");

export default router;