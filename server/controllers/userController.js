const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({ _id }, jwtkey, { expiresIn: '3d' });
};

const registerUser = async function (req, res) {
    
    try {
        const { name, email, password } = req.body;
        let erros = [];
        
        let existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists!' });
        }
        
        const validations = {
            name:{condition:!name || name.length<5 || name==null, message:"The name must have at least 5 characters"},
            email:{condition:!validator.isEmail(email) , message:"Email must be a valid email!"},
            password:{condition: !validator.isStrongPassword(password), message:"Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character."}
        }
        Object.entries(validations).forEach(function([
            field,{condition,message}
        ]){
            if(condition){
                erros.push({texto:message})
            }
        })

        if(erros.length>0){
            res.status(400).json(erros)
        }
        else{
            const newUser = new User({ name, email, password });        
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);
            await newUser.save();
            const token = createToken(newUser._id);
            res.status(200).json({ _id: newUser._id, name, email, token });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

const login = async function(req,res){
    const{email,password} = req.body;

    try{
        let user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json('Invalid email or password!');
        } 

        const isvalidPassword = await bcrypt.compare(password, user.password)
        
        if(!isvalidPassword){
            return res.status(400).json('Invalid email or password!');
        }

        const token = createToken(user._id)
        res.status(200).json({_id:user._id, name:user.name, email, token})

    }catch(err){
        return res.status(400).json(`Error:${err}`);

    }
}

const findUser = function(req,res){
    const UserId = req.params.id

    User.findById(UserId).then((user)=>{
        res.status(200).json(user)
    }).catch((err)=>{
        res.status(500).json(err)
    })
}
const getUsers = function(req,res){

    User.find().then((users)=>{
        res.status(200).json(users)
    }).catch((err)=>{
        res.status(500).json(err)
    })
}

module.exports = {registerUser,login, findUser, getUsers};