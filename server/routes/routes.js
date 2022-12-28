const express = require("express");
const router = express.Router();

require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { cloudinary } = require("../utilities/cloudinary");

const User = require("../models/userSchema");
const Blog = require("../models/blogSchema")

router.post("/signup", async (req, res) => {
    await User.find({ email: req.body.email }).then((data) => {
        if (data.length) {
            return res.status(400).send("User already exists please signIn!");
        } else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword,
            });
            bcrypt
                .hash(req.body.password, saltRounds)
                .then((hash) => {
                    // Store hash in your password DB.
                    newUser.password = hash;
                    newUser.cpassword = hash;
                    newUser
                        .save()
                        .then((data) => {
                            return res.status(200).send(data);
                        })
                        .catch((err) => {
                            return res.status(403).send(err);
                        });
                })
                .catch((err) => {
                    res.status(404).send(err);
                });
        }
    });
});
router.post("/signin",async (req, res) => {
   await User.find({ email: req.body.email })
        .then((data) => {
            if (!data.length) {
                res.status(400).send("User doesn't exists!");
            } else {
                bcrypt.compare(req.body.password, data[0].password).then((result) => {
                    if (result) {
                        const authToken = jwt.sign(data[0].email, process.env.SC_KEY);
                        res.status(200).json({ authToken });
                    } else {
                        res.status(400).send("Incorrect password");
                    }
                });
            }
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});
router.get("/blogs", async (req, res) => {
    try {
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, process.env.SC_KEY);
        console.log(verifyToken);
        if (verifyToken) {
            console.log(verifyToken);
            const userDetail = await User.find({ email: verifyToken });

            if (userDetail.length) {
                const blogData = await Blog.find();
                res.status(200).json(blogData);
            }
            else res.status(409).send("Unauthorized user");
        }
        else res.status(409).send("Unauthorized user");
    } catch (error) {
        res.status(400).send(error);
    }
})
router.post("/createblog", async (req, res) => {
    try {
        // const file=req.files.pickImage
        // const result = await cloudinary.uploader.upload(file.tempFilePathp,{
        //     public_id: `${Date.now()}`,
        //     resource_type: "auto",
        //     folder: "blogtest",
        // })
        // const url=result.secure_url
        const url=req.body.pickImage
        const blog=await Blog.create({
            title:req.body.title,
            pickImage:url,
            paragraph:req.body.paragraph
        }) 
        res.json({status:"ok",blog})
    } catch (error) {
        res.status(400).json({
            status: "Failed to post",
            message: error.message,
        });
    }
})
router.get("/",(req,res)=>{
    res.json("api is created")
})
module.exports = router;