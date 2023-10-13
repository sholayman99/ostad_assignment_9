const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    email:{ type: String },
    firstName:{ type: String },
    lastName:{ type: String },
    mobile: {type: String },
    password:{ type: String },
    address:{ type: String },
    roll: {type: String },
    class: {type: String },
  },
  { versionKey: false, timestamps: true }
);

const StudentsModel = mongoose.model("students" ,StudentSchema );
module.exports = StudentsModel;
