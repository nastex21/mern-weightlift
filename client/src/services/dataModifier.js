import axios from 'axios';

export const itemService = {
    addItem,
    deleteItem,
    editItem
};

function addItem (item) {
    console.log(item);
    axios.post("/api/add-items", { id: item.id, collection: item.collection, date: item.date, weightFlag: 1 })
    .then(data => {
        console.log(data);
        return data;
        //this.props.updateData(3,this.state.collection); 
    })
    .catch(error => {
        return error.response.data;
    })
}
    
    /* .then(() => { this.props.refreshUser(); })
    .then(() => {
        console.log("form reset in submit button promise")
        this.setState({
            collection: [{
                exercise: "",
                sets: "",
                reps: ""
            }]
        })
    })
    .catch(error => {
        console.log("post /api/add-items error: ");
        console.log(error);
        const err = error.response.data;
        if (err.target == "name") {
            this.setState({
                invalidEx: true,
                msg: err.msg
            })
        }
        if (err.target == "sets") {
            this.setState({
                invalidSets: true,
                msg: err.msg
            })
        }

        if (err.target == "reps") {
            this.setState({
                invalidReps: true,
                msg: err.msg
            })
        }
 */


function deleteItem() {

}

function editItem () {

}