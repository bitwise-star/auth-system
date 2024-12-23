import "dotenv/config";
import "reflect-metadata";
import Express from "express";
import Cors from "cors";
import Helmet from "helmet";
import Database from "./database/database";
import authRoute from "./routers/v1/auth.router";
import profileRouter from "./routers/v1/profile.router";
import defaultRouter from "./routers/v1/default.router";
import { Logger } from "./utils/logger";
import { container } from "tsyringe";

const db = container.resolve(Database)
const PORT = process.env.PORT;
const app = Express();

app.use(Express.json())
app.use(Cors());
app.use(Helmet())

app.use(defaultRouter);
app.use(authRoute);
app.use(profileRouter);

db.conn.initialize()
    .then(() => Logger.info("Conectado ao banco de dados MySQL."))
    .catch((err) => {
        Logger.error(`Ocorreu um erro durante a tentantiva de conexão com o banco de dados: ${err}`);
        process.exit(1);
    });

app.listen(PORT, () => {
    Logger.info(`Servidor aberto em http://localhost:${PORT}/`);
});