import type { Request, Response } from "express";
import type { TUserTokenData } from "../utils/interfaces/token-data";

import { decodeJwt } from "../utils/jwt-utils";
import { container, autoInjectable } from "tsyringe";
import { FindUserByEmailUseCaseImpl } from "../database/use-cases/user/find-user-by-email-use-case";

@autoInjectable()
export class ProfileController {
    public async exec(req: Request, res: Response) {
        const findUserByEmailUseCase = container.resolve(FindUserByEmailUseCaseImpl);
        const token = req.headers.authorization.split(" ")[1]; // Separing from 'Bearer' token

        if (!token)
            return res.status(401).json({
                message: "Nenhum token de autenticação encontrado."
            });

        const decoded = decodeJwt<TUserTokenData>(token);

        if (!decoded)
            return res.status(401).json({
                message: "A sessão pertencente a esse token expirou ou é inválido, realize o login novamente."
            });

        const user = await findUserByEmailUseCase.exec(decoded.email);

        if (!user)
            return res.status(404).json({
                message: "Usuário não foi encontrado."
            });

        return res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt
        });
    }
}