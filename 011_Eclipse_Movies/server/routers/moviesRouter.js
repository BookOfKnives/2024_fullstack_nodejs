import { Router } from "express";
const router = Router();

const eclipseMovies = [
    {id: 1, title: "Sun In A Net", director: "Stefan Uher", year: 1555 },
    {id: 2, title: "Some Sun", director: "Lars Bol", year: 87 },

]

router.get("/api/eclipse", (req, res) => {
    if (!sunglasses) res.send({ Data: "congratulations you are now blind! "})
})


router.get("/api/movies", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send({ data: eclipseMovies });
});

export default router;