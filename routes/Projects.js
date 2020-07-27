import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Project from '../models/Project'

const projects = express.Router()

projects.use(cors())



projects.post('/createproject', (req, res) => {
    const { body } = req;
    const today = new Date();
    const projectData = {
        projectName: body.projectName,
        projectID: body.projectID,
        pmEmail: body.pmEmail,
        createdBy: body.createdBy,
        additionalInfo: body.additionalInfo,
        created: today
    }

    Project.findOne({
            projectID: body.projectID
        })
        .then(project => {
            if (!project) {
                Project.create(projectData)
                    .then(project => {
                        res.json({ status: 200, error: 'Project Created: ' + project.projectName })
                    })
                    .catch(err => { console.log("Oops error when registering: " + err) })
            } else {
                res.json({ status: 409, error: 'Project already exisrs' })

            }
        }).catch(err => {
            res.send('error: ' + err)
        })

})


projects.get('/projects/:search', (req,res) =>{
    Project.find({
        $or:[{projectName:{ $regex: req.params.search, $options: 'i'}},{projectID:{ $regex: req.params.search, $options: 'i'}}]
    }).then(project => {
        if(project.length !== 0 ){
            res.json(project)
        }else{
            res.json({status: 404, error:"Not Found"})
        }
    }).catch(err => res.json({status: 404, error:err}))
})


module.exports = projects