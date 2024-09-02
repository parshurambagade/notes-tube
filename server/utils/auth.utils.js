import { JWT_SECRET } from "../constants";

export const generateToken = (savedUser) => {
    const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET);
    return token;
}