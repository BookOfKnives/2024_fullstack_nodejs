import { Router } from "express";
import { pageMap } from "./pageReader.js";
const router = Router(); 

router.get( "/pages/:pageChoice", (req, res) => {
    const pageChoice = req.params.pageChoice;
    let page;
    if ( !pageMap.has(pageChoice) ) {
       page = pageMap.get("error_404");
        res.status(404);
    } else {
        page = pageMap.get(pageChoice)
    }
    res.send(page);
});

console.log("004 Page Router online.");

export default router;