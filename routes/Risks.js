import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Risk from '../models/Risk'

const risks = express.Router()

risks.use(cors())



risks.post('/createrisk', (req, res) => {
    const { body } = req;
    const today = new Date();
    const riskData = {
        riskName: body.riskName,
        riskCategory: body.riskCategory,
        riskEffect: body.riskEffect,
        riskDefinition: body.riskDefinition,
        createdBy: body.createdBy,
        created: today
    }
    console.log("Im here:"+body)
    Risk.findOne({
            riskName: { $regex:body.riskName, $options: 'i'}
        })
        .then(risks => {
            if (!risks) {
                Risk.create(riskData)
                    .then(risk => {
                        res.json({ status: 200, error: 'Risk Created: ' + risk.riskName })
                    })
                    .catch(err => res.json({ status: 409, error: err}) )
            } else {
                res.json({ status: 409, error: 'Risk already exists' })

            }
        }).catch(err => {
            res.send('error: ' + err)
        })

})




risks.get('/risks/:search', (req,res) =>{
    console.log(req.params)
    Risk.find({
        $or:[{riskName:{ $regex: req.params.search, $options: 'i'}},{riskCategory:{ $regex: req.params.search, $options: 'i'}}]
    }).then(risk => {
        if(risk.length !== 0 ){
            res.json(risk)
        }else{
            res.json({status: 404, error:"Not Found"})
        }
    }).catch(err => res.json({status: 404, error:err}))
})


module.exports = risks