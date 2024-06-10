import "dotenv/config"
import jwt from "jsonwebtoken"

export default function isAllowedToken (req, res, next) {
    if (!jwt.verify(req.session.token, process.env.PUBLIC_KEY, { algorithm: 'RS256' })) res.status(403).send('Sorry amigo, you dont have the right token!')
    else next()
}