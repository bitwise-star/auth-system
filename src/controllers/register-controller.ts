import type { Request, Response } from "express";
import type { IUserRegisterData } from "../utils/interfaces/user-data";
import { InsertUserUseCaseImpl } from "../database/use-cases/user/insert-user-use-case";

import { isValidEmail } from "../utils/validators/is-valid-email";
import { hashString } from "../utils/bcrypt-utils";
import { Logger } from "../utils/logger";
import { autoInjectable, container } from "tsyringe";

@autoInjectable()
export class RegisterController {
    public async exec(req: Request, res: Response) {
        const insertUserUseCase = container.resolve(InsertUserUseCaseImpl);
        const { username, email, password } = req.body as IUserRegisterData;

        if (!isValidEmail(email))
            return res.status(400).json({ message: "Dados passados são inválidos ou estão faltando. Verifique e tente novamente." });

        try {
            const passwordHash = await hashString(password);

            if (!passwordHash.success)
                return res.status(500);

            const result = await insertUserUseCase.exec({ username, email, password: passwordHash.hash });

            if (result.status !== 200)
                return res.status(result.status).json({ message: result.message });

            return res.status(result.status).json({
                message: result.message,
            });
        } catch (err) {
            Logger.error(err);
            res.status(500).json({
                message: "Internal Server Error."
            });
        }
    }
}