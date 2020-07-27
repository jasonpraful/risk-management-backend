import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User'

const users = express.Router()

users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const { body } = req;
    const today = new Date();
    const userDate = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        created: today
    }

    User.findOne({
            email: body.email.toLowerCase()
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(body.password, 10, (err, hash) => {
                    userDate.password = hash
                    User.create(userDate)
                        .then(user => {
                            res.json({ status: 200,error: user.email + ' registered' })
                        })
                        .catch(err => { console.log("Oops error when registering: " + err) })
                })
            } else {
                res.json({ status: 403, error: 'User already exisrs' })

            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })

})





users.post('/login', (req, res) => {
    const { body } = req;
    User.findOne({
            email: body.email
        })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email.toLowerCase()
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.send({ status:403,
                        error: "Wrong Password" })
                }
            } else {
                res.send({ status:403,
                    error: "User doesnt exist" })
            }
        }).catch(err => console.log("Error when logging in: " + err))

})


users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    User.findOne({
            _id: decoded._id
        }).then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send({status:403,Error: "User does not exist"})
            }
        })
        .catch(err => console.log("Erorr when fetching profile: " + err))
})
module.exports = users