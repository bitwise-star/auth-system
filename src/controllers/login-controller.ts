import type { Request, Response } from "express";
import type { IUserLoginData } from "../utils/interfaces/user-data";

import { isValidEmail } from "../utils/validators/is-valid-email";
import { compareToHash } from "../utils/bcrypt-utils";
import { createToken } from "../utils/jwt-utils";
import { container, autoInjectable } from "tsyringe";
import { FindUserByEmailUseCaseImpl } from "../database/use-cases/user/find-user-by-email-use-case";

@autoInjectable()
export class LoginController {
    public async exec(req: Request, res: Response) {
        const findUserByEmailUseCase = container.resolve(FindUserByEmailUseCaseImpl);
        const { email, password } = req.body as IUserLoginData;

        if (!isValidEmail(email))
            return res.status(400).json({ message: "Dados passados são inválidos ou estão faltando. Verifique e tente novamente." });

        const user = await findUserByEmailUseCase.exec(email);

        if (!user || !(await compareToHash(password, user.password)))
            return res.status(401).json({ message: "Credenciais passadas são inválidas." });

        return res.status(200).json({
            token: createToken({
                id: user.id,
                email
            })
        });
    }
}