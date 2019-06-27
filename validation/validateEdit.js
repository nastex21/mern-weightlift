module.exports = function (req, res, next) {
    if (req.body.color == "red") {
        console.log('vaildate');
        console.log(req.body);
        console.log('after');
        var data = req.body;
        var error = {};
        //counter to keep track of errors. If at the end of the tests, the counter is not zero, don't proceed to axios.post
        var errCounter = 0;
        //regex to search for numbers
        const re = /^\d+$\b/;
        //find any error and stop test immediately

        data.collection.some(function (item) {
            //find empty strings
            if (item.exercise === '' || item.sets === '' || item.reps === '' || item.weight === '') {
                errCounter = 1;
                return error.emptyStringCheck = "Please don't leave blank";
            }
            //if it doesn't pass the regex test
            if (!re.test(item.sets) || !re.test(item.reps) || !re.test(item.weight)) {
                errCounter = 1;
                return error.numCheck = "Please enter numbers only";
            }
        });

        if (errCounter === 1) {
            return res.status(400).send({
                message: 'This is an error!'
            });
        } else {
            next()
        }
    }
};