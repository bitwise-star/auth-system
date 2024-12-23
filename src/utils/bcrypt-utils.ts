import { genSalt, hash, compare } from "bcrypt";
import { Logger } from "./logger";

const SALT_ROUNDS = 10;

type IHashResult = {
    success: boolean,
    hash?: string
}

export const hashString = async (text: string): Promise<IHashResult> => {
    try {
        const salt = await genSalt(SALT_ROUNDS);
        const newHash = await hash(text, salt);
        
        return { success: true, hash: newHash };
    } catch (err) {
        Logger.error(`Ocorreu um erro ao gerar um hash: ${err}`);

        return { success: false };
    }
};

export const compareToHash = async (text: string, hash: string): Promise<boolean> => {
    return await compare(text, hash);
}