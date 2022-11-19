const express = require('express');
const router = express.Router();
const userModel = require('./models/userModel')
const dataModel = require('./models/dataModel');


// This API is for creating the user by entering the user name in the user model
router.post("/createUser", async function (req, res) {
    let data = req.body
    username = data.username.toLowerCase()
    // console.log(username)
    let findUser = await userModel.findOne({ username: username })
    if (findUser) return res.status(400).send({ status: false, message:"This username already exists. Please enter another name"})
    let createData = await userModel.create({ username: username })
    return res.status(201).send({ status: true, message: 'User Created Success', data: createData })
})



// This APi is for checking that whether the username exist in the database or not. If not respond user with error
router.post("/enterDashboard", async function(req, res){
    let name = req.body.username.toLowerCase()
    let findUser = await userModel.findOne({ username: name })
    if (!findUser) return res.status(400).send({status: false, message: "User doesnot exist. Please create username" })
    return res.status(200).send({ status: true, message: 'User found Successfull', data: findUser })
})



// This APi is for fetching the content data to display in the dashboard
router.get("/getData/:userName", async function (req, res) {
    let name = req.params.userName.toLowerCase()
    // if (name === 'notlogin') return res.status(401).send({ status: false, message:"User Not Logged In"})
    let findData = await dataModel.find({ user: name })
    if (!findData) return res.status(400).send({ status: false, message: "You have no data created. Please create content" })
    // let createData = await userModel.create(data)
    return res.status(200).send({ status: true, message: 'data found successfull', data: findData })
})


//This APi is for calculating the percentage and saving the content data in the data model
router.post("/createContent", async function(req,res){
    let data = req.body
    let name = data.user.toLowerCase()
    data.user = name

    let points = Object.values(data.understanding).map(Number)
    let sumPoints = 0
    for(let num of points){
        sumPoints += num
    }
    let totalBlocks = points.length

    let percent = ((sumPoints*100)/(totalBlocks*4))
    percent = Math.round(percent)
    data.percentage = `${percent} %`

    // let findUserName = await userModel.findById( userId )
    
    // console.log(data);
    let saveData = await dataModel.create(data)
    return res.status(201).send({ status: true, message: 'Data saved Success', data: saveData })
})










module.exports = router;