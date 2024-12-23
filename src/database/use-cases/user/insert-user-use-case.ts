import { injectable } from "tsyringe";
import type { IUserData, IUserRegisterData } from "../../../utils/interfaces/user-data";

import { User } from "../../entities/user";
import { Logger } from "../../../utils/logger";

interface IUserInsertResult {
    status: number,
    message: string,
    data?: IUserData
}

@injectable()
export class InsertUserUseCaseImpl {
    async exec({ username, email, password }: IUserRegisterData): Promise<IUserInsertResult> {
        try {
            const existentUserData = await User.createQueryBuilder()
                .select(["email", "username"])
                .where("email=:email OR username=:username", { email, username })
                .getRawOne();

            if (existentUserData && existentUserData.email === email)
                return { status: 400, message: "Email já se encontra em uso em outra conta." };

            if (existentUserData && existentUserData.username === username)
                return { status: 400, message: "Nome já se encontra em uso em outra conta." };

            const data = await User.createQueryBuilder()
                .insert()
                .into(User)
                .values({ username, email, password })
                .execute();
            
            return {
                status: 200,
                message: "Usuário inserido com sucesso!",
                data: data.raw as IUserData
            };
        } catch (err) {
            Logger.error(err);

            return {
                status: 500,
                message: "Internal Server Error."
            };
        }
    }
}