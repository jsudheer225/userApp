const Users = require('../models/Users.model');
const { userSchema } = require('../config/validation_schema');
const { signAccessToken, verifyAccessToken } = require('../config/jwt_helper');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const reqBody = req.body.formObj;
            const result = await userSchema.validateAsync(reqBody);

            const isExists = await Users.findOne({ email: result.email });
            if(isExists) {
                res.status(409).json({ status: 409, message: "Email already exists" });
            }

            const user = new Users(result);
            // const savedUser = await user.save(user);
            // //need to generate accessToken
            // const accessToken = await signAccessToken(savedUser.id);
            res.status(200).json({ message: "success" });

        } catch(error) {
            res.status(500).json({ error });
            next(error)
        }
    },

    login: async (req,res, next) => {
        try {
            const { userName, password } = await req.body;
            if(!userName || !password) {
                return res.status(400).json({ message: "username and password are required"});
            }

            const user = await Users.findOne({ userName: userName });
            if(!user) {
                return res.status(404).json({ message: "User not exists" });
            }

            const isMatch = await user.isValidPassword(password);
            if(!isMatch) {
                return res.status(401).json({ message: "Username/Password not valid" });
            }

            //send accessToken
            const accessToken = await signAccessToken(user.id);
            res.status(200).json({ accessToken, userName: user.userName, displayName: user.displayName });

        } catch(error) {
            if (!res.headersSent) {
                res.json({ status: '500', error: error });
                next(error)
            }
        }
    },

    logout: async (req, res, next) => {
        try {
            Users.deleteToken(req.token, (err,user)=> {
                if(err) {
                    return res.status(400).send(err);
                } else {
                    res.sendStatus(200);
                }
            });
        } catch(error) {
            console.error(error);
        }
    }
}