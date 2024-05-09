import mongoStore from "connect-mongo";

const sessConf = {
    secret: process.env.SESSION_SECRET,
    store: mongoStore.create({
        mongoUrl: process.env.DB_URL,
        dbName: "SessionDb",
        ttl: 5 * 60 * 1000
    }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
};

export default sessConf;