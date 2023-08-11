import { DataSource } from "typeorm";

export default new DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "welpassZX",
    database: "popug_auth",
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
});
