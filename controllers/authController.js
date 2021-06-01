const User      = require('../models/User')
const bcrypt  = require('bcryptjs')
const jwt  = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: 'Password is not null'
            })
        }

        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
        user.save()
            .then(user => {
                res.json({
                    message: 'User Added Successfully'
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error occured!'
                })
            })
    })
}

const login = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({$or: [{email:email}]})
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({email: user.email}, process.env.TOKEN_IDENTITY, {expiresIn: '1h'})
                        res.json({
                            message: 'Login Successful',
                            token
                        })
                    } else {
                        res.json({
                            message: 'Password does not exist.'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'No user found.'
                })
            }
        })
}

module.exports = {
    register, login
}
