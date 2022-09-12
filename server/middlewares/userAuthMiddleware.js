const jwt = require('jsonwebtoken');
const Users = require('../models/userModal');

const userAuthMiddleware = async (req, res, next) => {
    const requestDenied = () => res.status(500).json({ message: 'Authorization issue' });
    const {authorization} = req.headers;
    let {id} = authorization !== 'null'?jwt.verify(authorization, process.env.JWT_SECRET) : requestDenied();
    if(id){
        const userInfo = await Users.findById({_id:id})
    console.log("sbfsbk", userInfo._id)

        req.user = userInfo;
        next();
    }else{
        requestDenied();
    }
}

module.exports = userAuthMiddleware;