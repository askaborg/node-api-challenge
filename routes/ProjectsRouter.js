const express = require("express")

const Projects = require("../data/helpers/projectModel.js")
const pMid = require("../middleware/projectsMiddleware.js")
const ActionsRouter = require("./ActionsRouter.js")

const router = express.Router();
router.use(express.json());
router.use("/:id/actions", ActionsRouter)

router.post(
    "/",
    pMid.validateProject,
    (req, res) => {
        Projects.insert( req.body )
        .then( resp => {
            res.status(201).json(resp)
        })
        .catch( err => {
            res.status(500).json({
                errorMessage: "Error to create project."
            })
        })
    }
)

router.get(
    "/", 
    (req, res) => {
        Projects.get()
        .then( resp => {
            res.status(200).json(resp)
        })
        .catch( err => {
            res.status(500).json({
                errorMessage: "Error to get projects."
            })
        })
    }
)

router.get(
    "/:id", 
    pMid.validateProjectById, 
    (req, res) => {
        const { id } = req.params;
        Projects.get(id)
        .then( resp => {
            res.status(200).json(resp);
        })
        .catch( err => {
            res.status(500).json({
                errorMessage: "Error to get project."
            })
        })
    }
)

router.put(
    "/:id", 
    pMid.validateProjectById, 
    pMid.validateProject, 
    (req, res) => {
        const { id } = req.params;
        Projects.update(id, req.body)
        .then( resp => {
            res.status(200).json(resp)
        })
        .catch( err => {
            res.status(500).json({
                errorMessage: "Error to update the project."
            })
        })
    }
)

router.delete(
    "/:id", 
    pMid.validateProjectById, 
    (req, res) => {
        const { id } = req.params
        Projects.remove(id)
        .then( resp => {
            res.status(201).json({
                message: "Project removed."
            })
        })
        .catch( err => {
            res.status(500).json({
                errorMessage: "Error to delete project."
            })
        })
    }
)

module.exports = router