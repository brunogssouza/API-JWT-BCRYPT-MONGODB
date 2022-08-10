import jwt from 'jsonwebtoken'
import SECRET_TOKEN from './secret-token.js';

const verifier = (req, res, next) => {
    
    const token  = req.header('auth-token');
    if(!token) {
       return res.send('access denied');
    }

    try {
        const verified = jwt.verify(token, SECRET_TOKEN);
        req.user = verified;
        next();
    }catch(error) {
    res.send('invalid token').status(401)
    }
}

export default verifier;