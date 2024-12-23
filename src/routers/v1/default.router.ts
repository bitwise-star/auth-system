import type { Request, Response } from "express";

import { Router } from "express"

const defaultRouter = Router();

defaultRouter.get("/", async (req: Request, res: Response) => {
    return res.status(200);
});

export default defaultRouter;