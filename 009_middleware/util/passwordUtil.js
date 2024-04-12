import bcrypt from "bcrypt";

const saltRounds = 14; // bør definere denne globalt
const plaintextPassword = "password";

const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds)
console.log(hashedPassword)