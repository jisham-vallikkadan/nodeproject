const express = require('express');
const { set } = require('mongoose');
const regsisterationRouter = express.Router()
const register = require('../model/registration');
const bcryptjs = require('bcryptjs')



regsisterationRouter.post('/', async (req, res) => {
    try {
        const olduser = await register.findOne({ Email: req.body.email })
        if (olduser) {
            return res.status(400).json({
                message: "email already exist",
                success: false
            })
        }
        const oldphone = await register.findOne({ phonenumber: req.body.Phonenumber })
        if (oldphone) {
            return res.status(400).json({
                message: "phone number already exist",
                success: false
            })
        }
        const hasedpassword = await bcryptjs.hash(req.body.Password, 10)
        var registration = {
            fristname: req.body.Ufristname,
            lastname: req.body.Ulastname,
            Email: req.body.email,
            phonenumber: req.body.Phonenumber,
            password: hasedpassword,
            roll:1,
        }
        const result = await register(registration).save()
        if (result) {
            return res.status(200).json({
                value: result,
                message: 'registertaion sucess',
                success: true,
                error: false
            })
        } else {
            return res.status(400).json({

                message: 'something went wrong',
                success: flase,
                error: true
            })
        }

    } catch {
        return res.status(400).json({

            message: 'something went wrong',
            success: flase,
            error: true
        })
    }
})


regsisterationRouter.get('/view_allusers', (req, res) => {

    register.find().then((users) => {
        res.status(200).json({
            value: users,
            message: 'get all users sucess',
            success: true,
            error: false
        })
    }).catch((error) => {
        res.status(400).json({
            error: error.message,
            message: "something wrong",
            success: false
        })
    })
})


regsisterationRouter.get('/view_singeluser/:id', (req, res) => {
    const id = req.params.Uid
    register.findOne({ _id: id }).then((data) => {
        res.status(200).json({
            values: data,
            message: "get selected user",
            success: true,
            error: false,
            
        })
    }).catch((error) => {
        req.status(400).json({
            error: error.message,
            message: "something went wrong",
            success: flase,
            error: true,
        })
    })
})


regsisterationRouter.delete('/delet_singeluser', (req, res) => {
    const id = req.body.Uid
    console.log(id)
    register.deleteOne({ _id: id }).then((user) => {
        res.status(200).json({
            value: user,
            message: "user delete sucessfully",
            success: true,
            error: false
        })
    }).catch((error) => {
        res.status(400).json({
            error: error.message,
            message: "something went wrong",
            success: flase,
            error: true,
        })
    })

})


regsisterationRouter.delete('/delete', (req, res) => {
    register.remove().then((user) => {
        res.status(200).json({
            value: user,
            message: 'delet all user',
            success: true,
            error: false
        })
    }).catch((error) => {
        res.status(400).json({


            message: 'something went wrong',
            success: flase,
            error: true

        })
    })
})




module.exports = regsisterationRouter;