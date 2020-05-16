const Actions = require("../data/helpers/actionModel.js")

module.exports = {
    validateActionById,
    validateAction
}

function validateActionById(req, res, next) {
    const { aId } = req.params;

    Actions.get(aId)
    .then( resp => {
        if(resp !== null) {
            next();
        } else {
            res.status(404).json({errorMessage: "The action with that id does not exist."})
        }
    })
    .catch( err => {
        res.status(500).json({errorMessage: "There was an error getting the action."})
    })
}

function validateAction(req, res, next) {
    if(!req.body.description || !req.body.notes) {
        res.status(400).json({errorMessage: "Please include a description and notes."})
    } else {
        next()
    }
}