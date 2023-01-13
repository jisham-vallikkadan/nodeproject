const express = require('express')
const { set } = require('mongoose');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginRouter = express.Router()

const logintb = require('../model/loginmodel')
const registertb = require('../model/registration')



loginRouter.post('/', async (req, res) => {

    try {
        const oldmail = await registertb.findOne({ Email: req.body.email })//for checking emil in register tabel exist or not
        console.log(req.body.email)
        if (!oldmail)
            return res.status(400).json({
                massage: 'user not found',
            })

        const isPasswordCurrect = await bcryptjs.compare(req.body.password, oldmail.password)//for password encryption
        if (isPasswordCurrect) {

            const token=jwt.sign({emil:oldmail.Email,userid:oldmail._id,roll:oldmail.roll},
                'secret',{expiresIn:'10h'}
                )

        console.log(oldmail);
            return res.status(200).json({
                value: oldmail,
                message: "login sucess",
                success: true,
                error: false,
                token:token
            })
        } else {
            return res.status(400).json({
                message: 'password incorrect'
            })
        }

    } catch {
        return res.status(400).json({
            message: 'something went wrong'
        })

    }

})


module.exports = loginRouter;