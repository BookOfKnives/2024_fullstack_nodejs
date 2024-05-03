import bcrypt from "bcrypt";
import "dotenv/config";

const SALT = Number(process.env.SALT);

async function verifyPassword(signInPassword, dbHashedPassword) {
    return await bcrypt.compare(signInPassword, dbHashedPassword)
}

async function makeNewPassword(pw) {
    const hashedPw = await bcrypt.hash(pw, SALT);
    return hashedPw;
}

export default {
    verifyPassword,
    makeNewPassword
}