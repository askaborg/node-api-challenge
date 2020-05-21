const Actions = require("../data/helpers/actionModel.js")

module.exports = {
    validateActionById,
    validateAction
}

function validateActionById(req, res, next) {
    const { actId } = req.params

    Actions.get(actId)
    .then( resp => {
        if(resp !== null) {
            next()
        } else {
            res.status(404).json({
                errorMessage: "Action does not exist."
            })
        }
    })
    .catch( err => {
        res.status(500).json({
            errorMessage: "Error to get the action."
        })
    })
}

function validateAction(req, res, next) {
    if(!req.body.description || !req.body.notes) {
        res.status(400).json({
            errorMessage: "Use description and notes."
        })
    } else {
        next()
    }
}