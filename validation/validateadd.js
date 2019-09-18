module.exports = async function (req, res, next) {
    const rootValue = req.body.collection[0];
    const { weightFlag, cardioFlag, bwFlag, vidsFlag } = req.body;

    var error = {};

    const checkNum = (value) => {
        if (value == '') {
            error.msg = "No empty values.";
            return true;
        }

        if (isNaN(value)) {
            error.msg = "Only numbers.";
            return true;
        }

        if (value <= 0) {
            error.msg = "Number must be greater than zero.";
            return true;
        }

        var checkResult = /^[0-9]+$/;

        if (!value.match(checkResult)) {
            error.msg = "Number can't be negative.";
            return true;
        }

        return false;
    }

    const checkWeight = (value) => {

        if (value == '') {
            error.msg = 'No empty values.';
            return true;
        }

        if (value.split('.').length > 2) {
            error.msg = 'Please check your decimals.';
            return true;
        }

        if (isNaN(value)) {
            error.msg = 'Only numbers.';
            return true;
        }

        if (value <= 0) {
            error.msg = "Number must be greater than zero.";
            return true;
        }

        return false;
    }

    const checkMinutes = (value) => {
        if (value == '') {
            error.msg = 'No empty values.';
            return true;
        }

        if (isNaN(value)) {
            error.msg = "Only numbers.";
            return true;
        }

        if (value <= 0) {
            error.msg = "Number must be greater than zero.";
            return true;
        }

        if (value > 59) {
            error.msg = "Number can't be greater than 60.";
            return true;
        }

        var checkResult = /^[0-9]+$/;

        if (!value.match(checkResult)) {
            error.msg = "Number can't be negative.";
            return true;
        }

        return false;
    }

    if (weightFlag == 1) {
        for (var key in rootValue) {
            if (key == 'exercise') {
                if (rootValue.exercise == '') {
                    error.msg = "Please don't leave empty";
                    error.target = "name";
                    return res.status(400).json(error).end();
                }
            }
            if (key == "sets") {
                if (checkNum(rootValue.sets)) {
                    error.target = "sets";
                    return res.status(400).json(error).end();
                }
            }
            if (key == "reps") {
                if (checkNum(rootValue.reps)) {
                    error.target = "reps";
                    return res.status(400).json(error).end();
                }
            }
            if (key == "weight") {
                if (checkWeight(rootValue.weight)) {
                    error.target = "weight";
                    return res.status(400).json(error).end();
                }
            }
        }
    }

    if (cardioFlag == 1) {
        for (var key in rootValue) {
            if (key == 'exercise') {
                if (rootValue.exercise == '') {
                    error.msg = "Please don't leave empty";
                    error.target = "name";
                    return res.status(400).json(error).end();
                }
            }
            if (key == "distance") {
                if (checkWeight(rootValue.distance)) {
                    error.target = "distance";
                    return res.status(400).json(error).end();
                }
            }
            if (key == "hours") {
                if (checkNum(rootValue.hours)) {
                    error.target = "hrs";
                    return res.status(400).json(error).end();
                }
            }
            if (key == "minutes") {
                if (checkMinutes(rootValue.minutes)) {
                    error.target = "mins";
                    return res.status(400).json(error).end();
                }
            }
        }
    }

    if (vidsFlag == 1) {
        for (var key in rootValue) {
            if (key == 'exercise') {
                if (rootValue.exercise == '') {
                    error.msg = "Please don't leave empty";
                    error.target = "name";
                    return res.status(400).send(error).end();
                }
            }
            if (key == "completed"  && rootValue[key] == "false"){
                if (rootValue.hours == undefined || rootValue.minutes == undefined){ 
                    error.msg = "Fields can't be empty";
                    return res.status(400).send(error).end();
                }
            }
            if (key == "hours") {
                if (checkNum(rootValue.hours)) {
                    error.target = "hrs";
                    return res.status(400).send(error).end();
                }
            }
            if (key == "minutes") {
                if (checkMinutes(rootValue.minutes)) {
                    error.target = "mins";
                    return res.status(400).json(error).end();
                }
            }
        }
    }
    if (bwFlag == 1) {

        for (var key in rootValue) {
            if (key == 'exercise') {
                if (rootValue.exercise == '') {
                    error.msg = "Please don't leave empty";
                    error.target = "name";
                    return res.status(400).json(error).end();
                }
            }
            if (key == "sets") {
                if (checkNum(rootValue.sets)) {
                    error.target = "sets";
                    return res.status(400).json(error).end();
                }
            }
            if (key == "reps") {
                if (checkNum(rootValue.reps)) {
                    error.target = "reps";
                    return res.status(400).json(error).end();
                }
            }
        }
    }
    next();
}