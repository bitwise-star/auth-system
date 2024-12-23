import { injectable } from "tsyringe";
import { User } from "../../entities/user";
import type { IUserData } from "../../../utils/interfaces/user-data";

@injectable()
export class FindUserByEmailUseCaseImpl {
    async exec(email: string): Promise<IUserData | null> {
        const data = await User.createQueryBuilder()
            .select()
            .where("email=:email", { email })
            .getOne();

        return data;
    }
}