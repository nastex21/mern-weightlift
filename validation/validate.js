module.exports = function (req, res, next) {
    console.log('vaildate');
    console.log(req.body);
    console.log('after');
    const { weightFlag, cardioFlag, bwFlag, vidsFlag, completed, color } = req.body;
    var data = req.body;
    var arr = [];
    var completeCheck = [];
    var error = {};
    //counter to keep track of errors. If at the end of the tests, the counter is not zero, don't proceed to axios.post
    var errCounter = 0;
    console.log('color');
    console.log(color);

    if (weightFlag == 1 || cardioFlag == 1 || bwFlag == 1 || color == 'red' || color == 'blue' || color == 'green') {

        //regex to search for numbers
        const re = /^\d+$\b/;
        //find any error and stop test immediately
        data.collection.some(function (item) {
            if (weightFlag == 1 || bwFlag == 1 || color == 'red' || color == 'green') {
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
            }

            if (cardioFlag == 1 || color == 'blue') {
                //find empty strings
                if (item.exercise === '' || item.distance === '' || item.hours === '' || item.minutes === '') {
                    errCounter = 1;
                    return error.emptyStringCheck = "Please don't leave blank";
                }
                //if it doesn't pass the regex test
                if (!re.test(item.hours) || !re.test(item.minutes)) {
                    errCounter = 1;
                    return error.numCheck = "Please enter numbers only";
                }
            }

        });
    }

    if (vidsFlag == 1 || color == 'black') {

        data.collection.forEach(function (item) {
            let newObj = {
                _id: '',
                exercise: "",
                hours: "",
                minutes: "",
                completed: ""
            };
            newObj._id = item._id;
            newObj.exercise = item.exercise;
            if (item.hours !== "" || item.hours !== undefined) {
                newObj.hours = item.hours;
            }
            if (item.minutes !== "" || item.minutes !== undefined) {
                newObj.minutes = item.minutes;
            }
            newObj.completed = item.completed;
            arr.push(newObj);
        });

        arr.forEach(item => {
            if (item.completed == "false") {
                console.log('false');
                if (item.exercise === '' || item.hours === '' || item.minutes === '') {
                    console.log("Undefined");
                    errCounter = 1;
                }

                if (item.hours == undefined || item.minutes == undefined) {
                    console.log("Hours and minutes can't both be zero")
                    errCounter = 1;
                }

                if (isNaN(item.hours) || isNaN(item.minutes)) {
                    errCounter = 1;
                }
            } else {
                if (data == 'true') {
                    console.log("true");
                    arr.some(function (item) {
                        console.log("else")
                        //find empty strings
                        if (item.exercise === '') {
                            console.log("found!")
                            errCounter = 1;
                        }
                    });
                }
            }})

        arr.forEach(function (item) {
            if (item.hours == 0 && item.minutes == 0) {
                errCounter = 1;
                console.log("hours and minutes can't both be zero")
            }
        })

    }

      if (errCounter === 1) {
         return res.status(400).send({
             message: 'This is an error!'
         });
     } else {
         next()
     } 
};