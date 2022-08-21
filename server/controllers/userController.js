const UserModal = require('../models/userModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addUser = async (req, res) => {
  const {email, password} = req.body;
  const exists = await UserModal.findOne({email});
  if(!exists){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);
    const user = await UserModal.create({email, password: hash});
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'3 days'});
    res.status(200).json(
      {email, token}
    );

  }else{
    res.status(401).json(
      {message:'Email already exsits'}
    );
  }
};

const loginUser = async (req,res) => {
  const {email, password} = req.body;
  const exists = await UserModal.findOne({email});
  console.log(exists);
  if(!exists){
    
    res.status(401).json(
      {message:'Email not exsits'}
    );
  }else{
    const passwordCheck = await bcrypt.compare(password, exists.password);
    if(!passwordCheck){
      res.status(401).json(
        {message:'Wrong password'}
      );
    }else{
      const token = jwt.sign({id:exists._id},process.env.JWT_SECRET,{expiresIn:'3 days'});
      res.status(200).json(
        {token, email}
      );
    }
   
  }
};


module.exports = {
  addUser,
  loginUser
};