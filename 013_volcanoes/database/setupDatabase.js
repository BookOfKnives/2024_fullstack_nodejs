import db from "./connection.js";

console.log(process.argv);
// const isDeleteMode = process.argv.find((arg) => (arg === "delete"));
const isDeleteMode = process.argv.includes("delete");
console.log(isDeleteMode);

if (isDeleteMode) {
    await db.run(`DROP TABLE IF EXISTS volcanoes`);
    await db.run(`DROP TABLE IF EXISTS villages`);
}

//DDL
await db.exec(`
CREATE TABLE IF NOT EXISTS volcanoes (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
   	name VARCHAR(255) NOT NULL,
	is_active BOOLEAN,
    type TEXT CHECK( type IN ('Caldera', 'Underwater', 'Pointy') )

)
`
);


await db.exec(`CREATE TABLE IF NOT EXISTS villages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    volcanoe_id INTEGER,
    FOREIGN KEY (volcanoe_id) REFERENCES villages (id)
)
`)

//brug snake_case! alle ord er lowercase, mellemrum er _ og kodeorderne er CAPS
if (isDeleteMode) {
    await db.run(`
    INSERT INTO volcanoes (name, is_active, type)
    VALUES ("Etna", 1, "Caldera")
    `)
    await db.run(`
    INSERT INTO volcanoes (name, is_active, type)
    VALUES ("Vesuvius", 1, "Pointy")
    `)
}


const result = await db.all(`SELECT * FROM volcanoes`);
console.log(result)


//db.get getter 1
//db.all getter all