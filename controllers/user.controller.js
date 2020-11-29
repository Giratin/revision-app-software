const { User } = require('../models/user.model');
const fs = require('fs');

module.exports = {
    getAll: async (req,res) => {
        const users = await User.find();
        res.status(200).render('users', { users });
    },
    showCreate: async (req,res) => {
        res.render('create');
    },
    create: async (req,res)=>{
        const { firstName, lastName, email } = req.body;

        const userExist = await User.findOne({ 'email' : email });
        if(userExist){
            return res.json("Already registred email");
        }

        const user = new User({
            firstName,
            lastName,
            email
        });

        if(req.file){
            user.image = req.file.filename;
        }
        await user.save();
        res.redirect('/users');
    },
    deleteUser: async (req,res)=>{
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if(!user){
            return res.json("User Not Found")
        }

        if(user.image){
            fs.unlinkSync(`./public/images/${user.image}`, (err)=>{
                if(err) console.log(err);
            })
        }
        await User.remove({ _id: id });
        res.redirect('/users');
    },
    showUSer: async (req,res)=>{
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        res.render('details', { user });
    }
}