const jwt =require('jsonwebtoken');
require('dotenv').config();


const generateToken=({userId,role})=>{
    return jwt.sign(
        {userId,role},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN}
    );
};

const generateRefreshToken=({userId,role})=>{
    return jwt.sign(
        {userId,role},
        process.env.JWT_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN}
    );
};




module.exports={generateToken,generateRefreshToken}

