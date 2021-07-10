const Projects = require("../data/helpers/projectModel.js")

module.exports = {
    validateProject,
    validateProjectById
}

function validateProject(req, res, next) {
    if(!req.body.name || !req.body.description) {
        res.status(400).json({
            errorMessage: "Use name and description."
        })
    } else {
        next()
    }
}

function validateProjectById(req, res, next) {
    const { id } = req.params
    
    Projects.get(id)
    .then( resp => {
        if(resp !== null) {
            next();
        } else {
            res.status(404).json({
                errorMessage: "Project does not exist."
            })
        }
    })
    .catch( err => {
        res.status(500).json({
            errorMessage: "Error to get the project."
        })
    })
}