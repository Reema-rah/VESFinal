const { Schema, model } = require("mongoose");

const isCustomerSchema = new Schema({
    idProject: {
        type: String,
        // required: true
    },
    idMember: {
        type: String,
        // required: true
    },
    isCustomer: {
        type: Boolean,
        // required: true
    },
})


const isCustomerModel = model("isCustomer", isCustomerSchema)
module.exports = isCustomerModel