import bcrypt from "bcrypt";
import "dotenv/config";

const SALT = Number(process.env.SALT);
async function verifyPassword() {
    
}

async function makeNewPassword(pw) {
    const hashedPw = await bcrypt.hash(pw, SALT);
    console.log("hashed pw from makenewpassword in pw.js", hashedPw);
    return hashedPw;
}

export default {
    verifyPassword,
    makeNewPassword
}