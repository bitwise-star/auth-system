import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { singleton } from "tsyringe";

@singleton()
class Database {
    private ds: DataSource;
    
    constructor() {
        this.ds = new DataSource({
            type: "mysql",
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: Number.parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            synchronize: process.env.NODE_ENV === "development",
            entities: [User]
        });
    }

    public get conn(): DataSource {
        return this.ds;
    }
} 

export default Database;