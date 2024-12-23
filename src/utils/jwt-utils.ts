import type { JwtPayload } from "jsonwebtoken";
import { sign, verify } from "jsonwebtoken";

const createToken = (data: object) => {
    return sign(
        { data },
        process.env.JWT_SECRET,
        { expiresIn: "6h" }
    );
}

const decodeJwt = <T>(token: string): T | null => {
    try {
        const decoded = verify(token, process.env.JWT_SECRET) as JwtPayload;

        return decoded.data as T;
    } catch (err) {
        return null;
    }
}

export { createToken, decodeJwt };