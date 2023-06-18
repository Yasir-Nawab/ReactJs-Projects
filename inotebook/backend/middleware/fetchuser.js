const jwt = require("jsonwebtoken");
const JWT_SECRET = 'Yasirisagoodb$oy';

// fetchuser function is a middleware function which takes three arguments. next is argument which is used to run next after this function worked correctly
const fetchuser = (req, res, next) => {


    const token = req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"Please authenticate using a valid token"});
    }

    try {
        // getting user's data from token
       const data = jwt.verify(token, JWT_SECRET);
       req.user = data.user;
       next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
}

module.exports = fetchuser;