const express = require("express")

const Actions = require("../data/helpers/actionModel.js")
const actMW = require("../middleware/actionsMiddleware.js")
const prjMW = require("../middleware/projectsMiddleware.js")

const router = express.Router({mergeParams: true})
router.use(express.json())

router.post(
    "/", 
    prjMW.validateProjectById, 
    actMW.validateAction, 
    (req, res) => {
        const project_id = req.params.id

        req.body.project_id = project_id
        
        Actions.insert(req.body)
        .then( resp => {
            res.status(201).json(resp)
        })
        .catch( err => {
            res.status(500).json({
                errorMessage: "Error to create the action."
            })
        })
    }
)

router.get(
    "/", 
    prjMW.validateProjectById, 
    (req, res) => {
        Actions.get()
        .then( resp => {
            res.status(200).json(resp)
        })
        .catch( err => {
            res.status(500).json({
                errorMessage: "Error to get actions."
            })
        })
    }
)

router.get(
    "/:aId", 
    prjMW.validateProjectById, 
    actMW.validateActionById, 
    (req, res) => {
        const { aId } = req.params

        Actions.get(aId)
        .then( resp => {
            res.status(200).json(resp)
        })
        .catch( err => {
            res.status(500).json({
                errorMessage: "Error to get the action."
            })
        })
    }
)

router.put(
    "/:aId", 
    prjMW.validateProjectById, 
    actMW.validateActionById, 
    actMW.validateAction, 
    (req, res) => {
        const { aId } = req.params
        const project_id = req.params.id

        req.body.project_id = project_id

        Actions.update(aId, req.body)
        .then( resp => {
            res.status(200).json(resp)
        })
        .catch( err => {
            res.status(500).json({
                errorMessage: "Error to update the action."
            })
        })
    }
)

router.delete(
    "/:aId",
    prjMW.validateProjectById,
    actMW.validateActionById,
    (req, res) => {
        const { aId } = req.params

        Actions.remove(aId)
        .then( resp => {
            res.status(201).json({
                message: "Action deleted."
            })
        })
        .catch( err => {
            res.status(500).json({
                errorMessage: "Error to delete the action."
            })
        })
    }
)

module.exports = router